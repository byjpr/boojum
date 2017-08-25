import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export default function(context) {
  const adapter = new FileSync(context.databaseLoc);
  const db = low(adapter);

  const defaults = {
    collections: require('schema/collection/defaults').default,
    pages: require('schema/page/defaults').default,
    products: require('schema/product/defaults').default,
    shop: require('schema/shop/defaults').default
  };

  // Set some defaults if your JSON file is empty
  db.defaults(defaults)
    .write();

  context.db = db;
}
