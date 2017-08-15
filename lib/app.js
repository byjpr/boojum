/**
 * app.js
 *
 * This is the entry file for the application, only setup code.
 */

// From NPM
import logger from 'hexo-log';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import Warehouse from 'warehouse';

// Built in Node Packages
import path, {sep} from 'path';
import {EventEmitter} from 'events';

// Local Includes
import pkg from '../package.json';
import Render from './controllers/render';
import Stalker from './controllers/stalker';
import {Renderer, Generator} from './registers';
import Theme from './theme';
import utils from './utils';

import instantiateModels from './utils/bootstrap/models';

// The App Constructor
// This contains everything that is needed
// for any service to communicate
// or run something
function App(base, args) {
  base = base || process.cwd();
  args = args || {};

  // Global Enviroment
  this.env = {
    args,
    env: process.env.NODE_ENV || 'production',
    debug: Boolean(args.debug),
    safe: Boolean(args.safe),
    silent: Boolean(args.silent),
    version: pkg.version,
    name: pkg.name,
    dbVersion: 1,
    init: false,
  };

  // Check if the app needs to be updated
  // and let people know if it does
  updateNotifier({pkg}).notify();

  EventEmitter.call(this);

  // Global Location Information
  this.base_dir = utils.addTrailingSep(base, sep);
  this.lib_dir = utils.addTrailingSep(`${base + sep}lib`, sep);
  this.public_dir = utils.addTrailingSep(path.join(base, 'public'), sep);
  this.source_dir = utils.addTrailingSep(path.join(base, 'source'), sep);
  this.database_loc = path.join(base, 'db.json');

  // Global State
  this._dbLoaded = false;
  this._isGenerating = false;
  this.version = this.env.version;

  // Set the log function to be something
  this.log = logger({
    debug: true,
    silent: false,
  });

  this.log.debug(chalk.magenta(this.env.name));
  this.log.debug('Version: %s', chalk.magenta(this.version));
  this.log.debug('Working directory: %s', chalk.magenta(this.base_dir));

  // The global register
  this.register = {
    generator: new Generator(),
    renderer: new Renderer(),
  };

  this.render = new Render(this);
  this.stalker = new Stalker(this);
  this.theme = new Theme(this);

  // Our database
  this.database = new Warehouse({
    version: 1,
    path: this.database_loc,
  });

  this.utils = utils;

  instantiateModels(this);

  // Load controllers
  require('./controllers/renderer').default(this);
  require('./controllers/router').default(this);

}

export default App;
