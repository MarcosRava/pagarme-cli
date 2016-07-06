/*jslint indent: 2, node: true, nomen: true*/
"use strict";

var Sequelize = require('sequelize');
var path = require('path');
var pathToDB = process.env.PAGARME_DB_PATH || path.resolve(__dirname, './database.sqlite');

var sequelize = new Sequelize('database', 'someuser', '', {
  dialect: 'sqlite',
  storage: pathToDB
});

module.exports = sequelize;


