#!/usr/bin/env babel-node

import yargs from 'yargs';

const currentDirectory = process.cwd();

yargs
  .commandDir('./cmds')
  .demandCommand()
  .help()
  .epilog('Default [dir] is current directory ('+ currentDirectory +')')
  .argv;
