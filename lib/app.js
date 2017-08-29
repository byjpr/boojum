/**
 * app.js
 *
 * This is the entry file for the application, only setup code.
 */

// From NPM
import logger from 'hexo-log';
import chalk from 'chalk';

// Built in Node Packages
import {EventEmitter} from 'events';

// Local Includes
import Render from 'controllers/render';
import Stalker from 'controllers/stalker';
import {Renderer, Generator} from 'registers';
import Schema from 'schema';
import Theme from 'theme';
import utils from 'utils';

import bootDatabase from 'db';
import setGlobalState from 'settings';

// The App Constructor
// This contains everything that is needed
// for any service to communicate
// or run something
function App(base, args) {
  this.base = base = base || process.cwd();
  this.args = args = args || {};

  this.schema = Schema;
  this.utils = utils;

  EventEmitter.call(this);

  // Set the log function to be something
  this.log = logger({
    debug: true,
    silent: false,
  });

  setGlobalState(this);
  bootDatabase(this);

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

  // Load controllers
  require('controllers/renderer').default(this);
  require('controllers/router').default(this);
}

export default App;
