/*jslint indent: 2, node: true*/
"use strict";

var program = require('commander');
var cliPackage = require('../package.json');

program
  .version(cliPackage.version)
  .option('-h, --help', 'output usage information')
  .option('-t, --transaction', 'Make a transaction')
  .option('-r, --report', 'See all transactions')
  .parse(process.argv);

if (!process.argv.slice(2).length || program.hasOwnProperty('help')) {
  program.outputHelp(function (text) {
    return text.replace('index', 'npm start -- ');
  });
  process.exit(0);
}
if (program.transaction) {
  require('./controllers').transaction.start();
} else if (program.report) {
  require('./controllers').report.start();
}

