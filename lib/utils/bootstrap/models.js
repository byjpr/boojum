

import models from '../../models';

export default function(context) {
  context.log.debug('Starting to bootstrap models');
  const db = context.database;

  const keys = Object.keys(models);
  let key = '';

  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i];
    context.log.debug('Attempting to boot model:', key);
    db.model(key, models[key](context));
  }
}
