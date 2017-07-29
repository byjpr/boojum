var Schema = require('warehouse').Schema;

module.exports = function(context) {
  context.log.debug('Product Model booted')

  var Product = new Schema({
    id: {type: Number, default:0},
    available: {type: Boolean, default: true},
    compare_at_price_max: {type: Number, default: 0},
    compare_at_price_min: {type: Number, default: 0},
    title: {type: String, default: '' },
    description: {type: String, default: '' },
    url: {type: String, default: ''},
    vendor: {type: String, default: ''}
  });

  Product.virtual('compare_at_price_varies', function() {
    if(this.compare_at_price_max == this.compare_at_price_min) {
      return false
    }
    return true
  })

  // Alias'
  Product.virtual('content', function() {
    return this.description;
  })
}
