import Schema from 'schema-object';

const constructors = {
  default: function(values) {
    this.super(values);

    if(this.address.street === undefined) this.address.street = '150 Elgin Street';
    if(this.address.city === undefined) this.address.city = 'Ottawa';
    if(this.address.province === undefined) this.address.province = 'Ontario';
    if(this.address.province_code === undefined) this.address.province_code = 'On';
    if(this.address.country === undefined) this.address.country = 'Canada';
    if(this.address.country_upper === undefined) this.address.country_upper = 'CANADA';
    if(this.address.zip === undefined) this.address.zip = 'K2P 1L4';
    if(this.collections_count === undefined) this.collections_count = 0;
    if(this.currency === undefined) this.currency = 'GBP';
  },
};

const methods = {
  available: function() {},
  compare_at_price_varies: function() {
    return Boolean(this.compare_at_price_min === this.compare_at_price_max);
  },
};

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
