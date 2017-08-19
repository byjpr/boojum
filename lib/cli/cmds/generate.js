import App from 'app';

module.exports = {
  command: 'generate [dir] <command>',
  aliases: ['g'],
  desc: 'Generate placeholder content',
  builder: function(yargs) {
    return yargs.commandDir('generate_cmds');
  },
  handler: function(argv) {

  }
};
