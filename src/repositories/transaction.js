/*jslint indent: 2, node: true*/
"use strict";

var Transaction;
var request = require('request-promise');
var datas = {};

function send(form) {
  form = form || {};
  form.api_key = process.env.PAGARME_API_KEY;
  if (process.env.PAGARME_POSTBACK_URL) {
    form.postback_url = process.env.PAGARME_POSTBACK_URL;
  }
  return request({
    uri: 'https://api.pagar.me/1/transactions',
    method: 'POST',
    form: form,
    json: true
  });
}

module.exports = Transaction = (function () {
  function Transaction() {
    Transaction.prototype.send = send;
  }
  return Transaction;

}());
