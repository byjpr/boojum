'use strict';

var Schema = require('warehouse').Schema;
var Promise = require('bluebird');

module.exports = function(context) {
  context.log.debug('Cache Model booted')

  var Cache = new Schema({
    _id: {type: String, required: true},
    hash: {type: String, default: ''},
    modified: {type: Number, default: Date.now}
  });

  return Cache;
};
