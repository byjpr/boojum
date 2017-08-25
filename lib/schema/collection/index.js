import Schema from 'schema-object';

const constructors = {};

const methods = {
  products: function() {
    // TODO:
    // Search for Products that have
    // `this.id` in their collections array

    // FUTURE:
    // Create a cache, and check it first

  },
  all_tags: function() {
    // TODO:
    // Search all products in this collection
    // Add each unique tag into an array and return it

  },
  all_types: function() {
    // TODO:
    // Search all products in this collection
    // Add each unique type into an array and return it

  },
  all_products_count: function() {
    // NOTE:
    // collection.all_products_count returns all products in collection regardless of input filters

    // TODO:
    // Return a count of products in collection

  },
  products_count: function(filters) {
    // NOTE:
    // collection.products_count returns all tags for a collection for the current view.
    // collection.product_count respects the users current input of filters

    // TODO:
    // Return a count of products in collection after using filters to remove products
    // that do not match the current users view.

  },
  all_vendors: function() {
    // TODO:
    // Search all products in this collection
    // Add each unique vendor into an array and return it

  }
};

const Collection = new Schema({
  id: {type: String}, // Static method
  title: {type: String, required: true}, // Static method
  description: {type: String},
  url: {type: String}, // Static method
  author: {type: String},
  content: {type: String},
  handle: {type: String},
  published_at: {type: String},
  template_suffix: {type: String},

  current_type: {type: String},
  current_vendor: {type: String},
  default_sort_by: {type: String},
  image: {type: String},
  next_product: {type: String},
  previous_product: {type: String},
  products_count: {type: String},
  tags: {type: String}

}, {
  constructors,
  methods,
});

export default Collection;
