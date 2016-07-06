/*jslint indent: 2, node: true*/
"use strict";

var Reports;
var extend = require('extend');
var TransactionModel = require('../models').Transaction;
var CardModel = require('../models').Card;

function createCard(card) {
  return CardModel.sync()
    .then(function () {
      return CardModel.findOrCreate({where: {id: card.id}, defaults: card});
    }).spread(function (card) {
      return card;
    });
}

function createTransaction(transaction) {
  return TransactionModel.sync()
    .then(function () {
      if (transaction.card) {
        var cardModel, transactionModel;
        return createCard(transaction.card)
          .then(function (cardModelResponse) {
            cardModel = cardModelResponse;
            return TransactionModel.create(transaction);
          })
          .then(function (transactionResponse) {
            transactionModel = transactionResponse;
            return transactionModel.setCard(cardModel);
          })
          .then(function () {
            return transactionModel;
          });
      }
      return TransactionModel.create(transaction);

    });
}

function getTransaction(params) {
  var options = {
    order: [{raw: '`transaction`.`date_created`'}],
    include: [{ all: true, nested: true }]
  };

  extend(true, options, params);

  return TransactionModel.findAll(options);
}

function getCards(params) {
  var options = {
    order: 'updatedAt DESC'
  };

  extend(true, options, params);

  return CardModel.findAll(options);
}

module.exports = Reports = (function () {
  function Reports() {
    Reports.prototype.createTransaction = createTransaction;
    Reports.prototype.createCard = createCard;
    Reports.prototype.getTransactions = getTransaction;
    Reports.prototype.getCards = getCards;

    TransactionModel.sync();
    CardModel.sync();

  }
  return Reports;

}());
