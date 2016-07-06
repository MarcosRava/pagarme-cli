//TODO
/*jslint node:true, unparam: true, indent: 2, vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */
"use strict";

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var TransactionRepository = require('../../src/repositories').Transaction;
var transactionRepository = new TransactionRepository();

describe('Transactions', function () {

  this.timeout(10000);

  describe("Bank slip", function () {

    before(function () {
      if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
      }
    });

    it('Should make a R$ 100 transaction ', function () {
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
