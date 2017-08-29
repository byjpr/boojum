import updateNotifier from 'update-notifier';
import path, {sep} from 'path';

import pkg from 'package.json';

// Config: {
//   databaseFullPath: "~/Work/shopify-developement/store/db.json",
//   databaseLocation: "~/Work/shopify-developement/store",
//   databaseName: "db.json",
//   debug: true,
//   safe: false,
//   silent: false,
// }

export default function(context) {
  // Check if the app needs to be updated
  // and let people know if it does
  updateNotifier({pkg}).notify();

  const args = context.args;

  // Global Enviroment
  context.env = {
    args,
    env: process.env.NODE_ENV || 'production',
    debug: Boolean(args.debug),
    safe: Boolean(args.safe),
    silent: Boolean(args.silent),
    version: pkg.version,
    name: pkg.name,
    init: false,
  };

  // Global Location Information
  context.baseDir = context.utils.addTrailingSep(context.base, sep);
  context.databasePath = getDatabaseLocation(context.base, args);

  // Global State
  context._isGenerating = false;
  context.version = context.env.version;
}

function getDatabaseLocation(base, args) {
  if(args.databaseFullPath) {
    return args.databaseLocation;
  }

  else if(args.databaseLocation) {
    return path.join(args.databaseLocation, args.databaseName);
  }

  return path.join(base, 'db.json');
}
