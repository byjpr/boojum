import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export default function(context) {
  const adapter = new FileSync(context.databasePath);
  const db = low(adapter);

  const defaults = {
    pages: require('schema/page/defaults').default,
    products: require('schema/product/defaults').default,
    collections: require('schema/collection/defaults').default,
    shop: require('schema/shop/defaults').default
  };

  // Set some defaults if your JSON file is empty
  db.defaults(defaults)
    .write();

  context.db = db;
}
