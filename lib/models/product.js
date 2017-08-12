const Schema = require('warehouse').Schema;

module.exports = function(context) {
  context.log.debug('Product Model booted');

  const Product = new Schema({
    id: {type: Number, default: 0},
    available: {type: Boolean, default: true},
    compare_at_price_max: {type: Number, default: 0},
    compare_at_price_min: {type: Number, default: 0},
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    url: {type: String, default: ''},
    vendor: {type: String, default: ''},
  });

  return Product;
};
