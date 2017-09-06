import Schema from 'schema-object';
import _ from 'lodash';

const constructors = {};

const methods = {
  products: function(products) {
    return _.filter(
      products,
      {collections: [{id: this.id}]}
    );
  },
  all_tags: function(products) {
    const catalogProducts = this.products(products);
    return _.uniq(_.map(catalogProducts, 'tags'));
  },
  all_types: function(products) {
    const catalogProducts = this.products(products);
    return _.uniq(_.map(catalogProducts, 'type'));
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

    console.log(`Collections product_count currently doesn't use the filters: ${filters}`);
    return this.all_products_count();
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
  handle: {type: String},
  published_at: {type: Date},
  template_suffix: {type: String},
  current_type: {type: String},
  current_vendor: {type: String},
  default_sort_by: {type: String, enum: ["manual", "best-selling", "title-ascending", "title-descending", "price-ascending", "price-descending", "created-ascending", "created-descending"]},
  image: {type: String},
  tags: {type: String}
}, {
  constructors,
  methods,
});

export default Collection;

//
// var products = loadProducts();
//
// var collection1 = new Collection({
//   id: "1",
//   title: "All Products",
//   description: "",
//   url: "/collections/all",
//   author: "Admin",
//   handle: "all",
//   published_at: "",
//   default_sort_by: "manual"
// });
//
// collection1.products(products);
// collection1.all_tags(products);
//
