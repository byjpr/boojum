import Schema from 'schema-object';

const constructors = {};

const methods = {};

const Shop = new Schema({
  address: {
    summary: {type: String},
    street: {type: String},
    city: {type: String},
    province: {type: String},
    province_code: {type: String},
    country: {type: String},
    country_upper: {type: String},
    zip: {type: String},
  },
  collections_count: {type: Number},
  currency: {type: String},
  description: {type: String},
  domain: {type: String},
  email: {type: String},
  enabled_payment_types: {type: String},
  metafields: {type: String},
  money_format: {type: String},
  money_with_currency_format: {type: String},
  name: {type: String},
  policies: {type: String},
  password_message: {type: String},
  permanent_domain: {type: String},
  products_count: {type: String},
  types: {type: String},
  url: {type: String},
  secure_url: {type: String},
  vendors: {type: String},
  locale: {type: String},
}, {
  constructors,
  methods,
});

export default Shop;
