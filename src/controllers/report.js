/*jslint indent: 2, node: true*/
"use strict";

var prompt = require('prompt');
var Promise = require("bluebird");
var promptGet = Promise.promisify(prompt.get);
var colors = require("colors");
var ReportRepository = require('../repositories').Report;

var REPORT_TYPE = {
  TRANSACTIONS: '1',
  CARDS: '2'
};

var schema = {
  properties: {
    type: {
      required: true,
      description: 'Report Type:\n'.bold.green + '  1- Transactions \n  2- Credit Cards '.green,
      message: 'Choose "1" for credit card or "2" for bank slip'.italic.gray,
      default: REPORT_TYPE.TRANSACTIONS,
      enum: [REPORT_TYPE.TRANSACTIONS, REPORT_TYPE.CARDS]
    },
    limit: {
      type: 'integer',
      description: 'Enter with limit quantity or press enter to show all'.bold.green,
      message: 'Quantity should be a integer'.italic.gray
    }
  }
};

prompt.message = "";

function start() {

  prompt.start();

  promptGet(schema)
    .then(function (program) {
      var reportRepository = new ReportRepository(),
        params = program.limit ? {limit: program.limit} : undefined;

      if (program.type === REPORT_TYPE.CARDS) {
        reportRepository.getCards(params)
          .then(function (reports) {
            var report, card;
            for (report in reports) {
              if (reports.hasOwnProperty(report)) {
                card = reports[report].dataValues;
                console.log('\n');
                console.log(card);
                console.log('\n');
              }
            }
          });
      } else {
        reportRepository.getTransactions(params)
          .then(function (reports) {
            var report, transaction;
            for (report in reports) {
              if (reports.hasOwnProperty(report)) {
                transaction = reports[report].dataValues;
                if (transaction.card) {
                  transaction.card = transaction.card.dataValues;
                }
                console.log('\n');
                console.log(transaction);
                console.log('\n');
              }
            }
          });
      }
    });
}

exports.start = start;
