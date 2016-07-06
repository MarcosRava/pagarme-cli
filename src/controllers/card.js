/*jslint indent: 2, node: true*/
"use strict";

var prompt = require('prompt');
var Promise = require("bluebird");
var promptGet = Promise.promisify(prompt.get);
var promptAddProperties = Promise.promisify(prompt.addProperties);
var colors = require("colors");
var extend = require('extend');
var PagarMe = require('../../lib/pagarme.js');

PagarMe.encryption_key = process.env.PAGARME_ENCRYPTION_KEY;

var schema = {
  properties: {
    cardHolderName: {
      description: 'Enter with Card holder name'.bold.green,
      message: 'Card holder name'.italic.gray,
      required: true
    },
    cardExpirationMonth: {
      required: true,
      type: 'integer',
      minimum: 1,
      maximum: 12,
      description: 'Card expiration month'.bold.green,
      message: 'Card expiration month'.italic.gray,
      before: function (value) { return String(value); }
    },
    cardExpirationYear: {
      required: true,
      type: 'integer',
      minimum: 16,
      maximum: 99,
      description: 'Card expiration year'.bold.green,
      message: ('Enter the card expiration year. Ex: 16').italic.gray,
      before: function (value) { return String(value); }
    },
    cardNumber: {
      required: true,
      description: 'Card number'.bold.green,
      message: 'Enter the card number'.italic.gray
    },
    cardCVV: {
      required: true,
      description: 'Card CVV'.bold.green,
      message: 'Enter the card CVV'.italic.gray
    },
    installments: {
      required: true,
      type: 'integer',
      minimum: 1,
      maximum: 12,
      default: 1,
      description: 'Installments'.bold.green,
      message: 'Installments (1 - 12)'.italic.gray
    }
  }
};


function getInfo() {
  prompt.message = "";
  prompt.start();

  return new Promise(function (resolve, reject) {
    promptGet(schema)
      .then(function (result) {
        var fieldErrors, creditCard = new PagarMe.creditCard();

        extend(false, creditCard, result);

        fieldErrors = creditCard.fieldErrors();

        if (Object.keys(fieldErrors).length > 0) {
          return reject(fieldErrors);
        }

        creditCard.generateHash(function (cardHash) {
          resolve({
            card_hash: cardHash,
            installments: result.installments
          });
        });
      });
  });
}

exports.getInfo = getInfo;

