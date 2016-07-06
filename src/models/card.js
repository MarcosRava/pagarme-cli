/*jslint indent: 2, node: true*/
"use strict";

// Reference: https://docs.pagar.me/api/#objeto-card

var Sequelize = require('sequelize');
var sequelize = require('./sqlite.js');

var Card = sequelize.define('card', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  id: {
    type: Sequelize.STRING,
    field: 'pagarme_id'
  },
  date_created: {
    type: Sequelize.DATE
  },
  date_updated: {
    type: Sequelize.DATE
  },
  brand: {
    type: Sequelize.STRING
  },
  holder_name: {
    type: Sequelize.STRING
  },
  first_digits: {
    type: Sequelize.STRING
  },
  last_digits: {
    type: Sequelize.STRING
  },
  fingerprint: {
    type: Sequelize.STRING
  },
  valid: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Card;
