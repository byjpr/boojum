
const Schema = require('warehouse').Schema;

module.exports = function(context) {
  context.log.debug('Cache Model booted');

  const Cache = new Schema({
    _id: {type: String, required: true},
    hash: {type: String, default: ''},
    modified: {type: Number, default: Date.now},
  });

  return Cache;
};
