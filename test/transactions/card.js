//TODO
/*jslint node:true, unparam: true, indent: 2, vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */
"use strict";

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var PagarMe = require('../../lib/pagarme.js');
var TransactionRepository = require('../../src/repositories').Transaction;
var transactionRepository = new TransactionRepository();

describe('Transactions', function () {

  this.timeout(10000);

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

    it('Should make a R$ 100 transaction 1 installment', function () {
      this.creditCard.generateHash(function (cardHash) {
        var amount, form;
        amount = 10000;
        form  = {
          amount: amount,
          payment_method: 'boleto'
        };

        return expect(transactionRepository.send(form))
          .to.eventually.have.deep.property("amount", amount);
      });

    });

  });


});


