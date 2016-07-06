/*jslint indent: 2, node: true*/
"use strict";

// Reference: https://docs.pagar.me/api/#objeto-transaction

var Sequelize = require('sequelize');
var sequelize = require('./sqlite.js');
var Card = require('./card.js');

var Transaction = sequelize.define('transaction', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING
  },
  refuse_reason: {
    type: Sequelize.STRING
  },
  status_reason:  {
    type: Sequelize.STRING
  },
  acquirer_response_code: {
    type: Sequelize.STRING
  },
  acquirer_name:  {
    type: Sequelize.STRING
  },
  authorization_code: {
    type: Sequelize.STRING
  },
  soft_descriptor: {
    type: Sequelize.STRING
  },
  tid: {
    type: Sequelize.STRING
  },
  nsu: {
    type: Sequelize.STRING
  },
  date_created: {
    type: Sequelize.DATE
  },
  date_updated: {
    type: Sequelize.DATE
  },
  postback_url:  {
    type: Sequelize.STRING
  },
  payment_method:  {
    type: Sequelize.STRING
  },
  capture_method:  {
    type: Sequelize.STRING
  },
  boleto_url:  {
    type: Sequelize.STRING
  },
  boleto_barcode:  {
    type: Sequelize.STRING
  },
  boleto_expiration_date: {
    type: Sequelize.DATE
  },
  referer: {
    type: Sequelize.STRING
  },
  ip:  {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER
  },
  authorized_amount: {
    type: Sequelize.INTEGER
  },
  paid_amount: {
    type: Sequelize.INTEGER
  },
  refunded_amount: {
    type: Sequelize.INTEGER
  },
  installments: {
    type: Sequelize.INTEGER
  },
  id:  {
    type: Sequelize.INTEGER,
    field: 'pagarme_id'
  },
  cost: {
    type: Sequelize.INTEGER
  },
  subscription_id: {
    type: Sequelize.INTEGER
  }
});

Transaction.belongsTo(Card);

module.exports = Transaction;
