//TODO
/*jslint node:true, unparam: true, indent: 2, vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */
"use strict";

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var path = require('path');
chai.use(chaiAsPromised);
var expect = chai.expect;

process.env.PAGARME_DB_PATH = path.resolve(__dirname, './database-test.sqlite');

var PagarMe = require('../../lib/pagarme.js');
var ReportRepository = require('../../src/repositories').Report;
var TransactionRepository = require('../../src/repositories').Transaction;
var transactionRepository = new TransactionRepository();

describe('Reports', function () {

  this.timeout(15000);

  describe("Bank slip", function () {

    before(function () {
      if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
      }
    });

    it('Should make a R$ 100 transaction and store it', function () {

      var reportRepository, amount, form;

      reportRepository = new ReportRepository();

      amount = 10000;
      form  = {
        amount: amount,
        payment_method: 'boleto'
      };

      return transactionRepository.send(form)
        .then(function (transaction) {
          return reportRepository.createTransaction(transaction);
        })
        .then(function (transactionModel) {
          expect(reportRepository.getTransactions({where: {uuid: transactionModel.dataValues.uuid }}))
            .to.eventually.deep.property('[0].dataValues.uuid', transactionModel.dataValues.uuid);
        });
    });

  });

  describe("Credit card", function () {

    before(function () {
      if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
      }
    });

    beforeEach(function () {
      PagarMe.encryption_key = process.env.PAGARME_ENCRYPTION_KEY;
      this.creditCard = new PagarMe.creditCard();
      this.creditCard.cardHolderName = 'Marcos Rava';
      this.creditCard.cardExpirationMonth = '05';
      this.creditCard.cardExpirationYear = '18';
      this.creditCard.cardNumber = '4012001037141112';
      this.creditCard.cardCVV = '123';
    });


    it('Should make a R$ 100 transaction 1 installment and store it', function () {

      var reportRepository = new ReportRepository();

      this.creditCard.generateHash(function (cardHash) {
        var amount = 10000,
          form = {
            amount: amount,
            payment_method: 'credit_card',
            card_hash: cardHash
          };
        return transactionRepository.send(form)
          .then(function (transaction) {
            return reportRepository.createTransaction(transaction);
          })
          .then(function (transactionModel) {
            expect(reportRepository.getTransactions({where: {uuid: transactionModel.dataValues.uuid }}))
              .to.eventually.deep.property('[0].dataValues.uuid', transactionModel.dataValues.uuid);
          });
      });
    });
  });
});
