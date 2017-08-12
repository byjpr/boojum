

import App from '../../app';

exports.command = 'generate [dir] <command>';
exports.aliases = ['g'];
exports.desc = 'Generate placeholder content';
exports.builder = function(yargs) {
  return yargs.commandDir('generate_cmds');
};
exports.handler = function(argv) {

};
