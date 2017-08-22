/**
 * app.js
 *
 * This is the entry file for the application, only setup code.
 */

// From NPM
import logger from 'hexo-log';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';

// Built in Node Packages
import path, {sep} from 'path';
import {EventEmitter} from 'events';

// Local Includes
import pkg from 'package.json';
import Render from 'controllers/render';
import Stalker from 'controllers/stalker';
import {Renderer, Generator} from 'registers';
import Theme from 'theme';
import utils from 'utils';

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
  this.baseDir = utils.addTrailingSep(base, sep);
  this.databaseLoc = path.join(base, 'db.json');

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

  this.utils = utils;

  // Load controllers
  require('controllers/renderer').default(this);
  require('controllers/router').default(this);
}

export default App;
