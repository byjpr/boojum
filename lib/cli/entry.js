#!/usr/bin/env babel-node

import App from "../app";
import yargs from "yargs";

yargs
	.commandDir('./cmds')
  .demandCommand()
  .help()
  .argv
