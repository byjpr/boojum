import path, {sep} from 'path';

export default function(context) {

  const args = context.args;

  context.baseDir = context.utils.addTrailingSep(context.base, sep);
  context.databasePath = getDatabaseLocation(context.base, args);

  context._isGenerating = false;
  context.version = context.env.version;
}

function getDatabaseLocation(base, args) {
  if(args.databaseFullPath) {
    return args.databaseLocation;
  }

  // If `args.databaseFullPath` is truthy
  // `dbName` doesn't need to be evaluated so move it below if statement
  const dbName = args.databaseName ? args.databaseName : "db.json";

  if(args.databaseLocation) {
    return path.join(args.databaseLocation, dbName);
  }

  return path.join(base, dbName);
}
