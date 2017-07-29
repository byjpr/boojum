var Schema = require('warehouse').Schema;

module.exports = function(context) {
  context.log.debug('Shop Model booted')

  var Shop = new Schema({
    address: {
      summary: {type: String, default: '150 Elgin Street, Ottawa, Ontario, Canada'},
      street: {type: String, default: '150 Elgin Street'},
      city: {type: String, default: 'Ottawa'},
      province: {type: String, default: 'Ontario'},
      province_code: {type: String, default: 'On'},
      country: {type: String, default: 'Canada'},
      country_upper: {type: String, default: 'CANADA'},
      zip: {type: String, default: 'K2P 1L4'},
    },
    collections_count: {type: Number, default: 0 },
    currency: {type: String, default: 'GBP' },
    description: {type: String, default: '' },
    domain: {type: String, default: '' },
    email: {type: String, default: '' },
    enabled_payment_types: {type: String, default: '' },
    metafields: {type: String, default: '' },
    money_format: {type: String, default: '' },
    money_with_currency_format: {type: String, default: '' },
    name: {type: String, default: '' },
    policies: {type: String, default: '' },
    password_message: {type: String, default: '' },
    permanent_domain: {type: String, default: '' },
    products_count: {type: String, default: '' },
    types: {type: String, default: '' },
    url: {type: String, default: '' },
    secure_url: {type: String, default: '' },
    vendors: {type: String, default: '' },
    locale: {type: String, default: '' }
  });
}
