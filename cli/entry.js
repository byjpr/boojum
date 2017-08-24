#!/usr/bin/env babel-node

import yargs from 'yargs';

yargs
  .commandDir('./cmds')
  .demandCommand()
  .help()
  .argv;
