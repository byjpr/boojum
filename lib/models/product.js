import Schema from "warehouse";

module.exports = function(ctx) {
  var Product = new Schema({
    available: {type: Boolean, default: true},
    // collections
    compare_at_price_max: {type: Number, default: 0},
    compare_at_price_min: {type: Number, default: 0},
    // compare_at_price_varies
    description: {type: String, default: ''},
    // featured_image
    // first_available_variant
    // handle
    // has_only_default_variant
    id: {type: Number, default: (Math.random() * (99999999 - 111111) + 111111)},
    images: [
      {
        src: {type: String, default: ''},
        alt: {type: String, default: ''},
        id: {type: Number, default: (Math.random() * (99999999 - 111111) + 111111)}
      }
    ],
    // options
    // options_with_values
    // price
    // price_max
    // price_min
    // price_varies
    // selected_variant
    // selected_or_first_available_variant
    // tags
    // template_suffix
    title: {type: String, default: ''},
    // type
    url: {type: String, default: ''},
    // variants
    vendor: {type: String, default: ''}
  })

  Product.virtual('compare_at_price_varies', function() {
    if(this.compare_at_price_max !== this.compare_at_price_min) {
      return true
    }
    return false
  })

  // Alias'
  Product.virtual('content', function() {
    return this.description;
  })

}
