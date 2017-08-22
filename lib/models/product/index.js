import Schema from 'schema-object';
import Image from 'models/image';

const constructors = {
  default: function(values) {
    this.super(values);

    if(this.id === undefined) {
      this.id = 'asdfasdfasdf';
    }

    if(this.url === undefined) {
      // this.url = ; // do urlify of name
    }
  },
};

const methods = {
  available: function() {},
  compare_at_price_varies: function() {
    return Boolean(this.compare_at_price_min === this.compare_at_price_max);
  },
};

const Product = new Schema({
  // available:{},  // Returns true if a product is available for purchase. Returns falseif all of the products variants' inventory_quantity values are zero or less
  // collections:{}, // Returns collections
  // compare_at_price_max:{}, // Returns the highest compare at price
  // compare_at_price_min:{}, // Returns the lowest compare at price
  // price_max:{}, //
  // price_min:{}, //
  // price_varies:{}, // Returns true if the product's variants have varying prices
  // selected_variant:{}, // Returns the variant object of the currently-selected variant if there is a valid ?variant= parameter in the URL
  // selected_or_first_available_variant:{}, //
  // first_available_variant:{}, // Returns the variant object of the first product variant that is available for purchase
  // has_only_default_variant:{}, // Returns true if the product only has the default variant. This lets you determine whether to show a variant picker in your product forms.
  description: {type: String}, // Static method
  content: {type: 'alias', invisible: true, index: 'description'},
  featured_image: {type: String},
  handle: {type: String}, // Static method
  id: {type: String}, // Static method
  options: {type: String},
  options_with_values: {type: String},
  price: {type: String}, // Static method
  tags: [{type: String, minLength: 1}], // Static method
  template_suffix: {type: String}, // Static method
  title: {type: String, required: true}, // Static method
  type: {type: String}, // Static method
  url: {type: String}, // Static method
  variants: {},
  vendor: {type: String}, // Static method
  images: {type: Array, arrayType: Image},
}, {
  constructors,
  methods,
});

export default Product;
