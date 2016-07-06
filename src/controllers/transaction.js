/*jslint indent: 2, node: true*/
"use strict";

var prompt = require('prompt');
var Promise = require("bluebird");
var promptGet = Promise.promisify(prompt.get);
var colors = require("colors");
var creditCard = require('./card.js');
var TransactionRepository = require('../repositories').Transaction;
var ReportRepository = require('../repositories').Report;

var PAYMENT_METHODS = {
  CREDIT_CARD: '1',
  BANK_SLIP: '2'
};

var schema = {
  properties: {
    amount: {
      pattern: /^\d+$/,
      description: 'Enter with amount'.bold.green,
      message: 'Amount must be a positive number'.italic.gray,
      required: true
    },
    paymentMethod: {
      required: true,
      description: 'Payment Method:\n'.bold.green + '  1- Credit Card \n  2- Bank Slip '.green,
      message: 'Choose "1" for credit card or "2" for bank slip'.italic.gray,
      enum: [PAYMENT_METHODS.CREDIT_CARD, PAYMENT_METHODS.BANK_SLIP]
    }
  }
};

prompt.message = "";

function start() {
  prompt.start();

  promptGet(schema)
    .then(function (result) {
      if (result.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
        return creditCard.getInfo()
          .then(function (form) {
            form.amount = result.amount;
            form.payment_method = 'credit_card';
            return form;
          });
      }

      var form = {
        amount: result.amount,
        payment_method: 'boleto'
      };

      return form;
    })
    .then(function (form) {
      var transactionRepository = new TransactionRepository();
      return transactionRepository.send(form);
    })
    .then(function (result) {
      var reportRepository = new ReportRepository();
      reportRepository.createTransaction(result);
    })
    .catch(function (error) {
      console.error(error);
      throw error;
    });
}

exports.start = start;
