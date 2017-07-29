#!/usr/bin/env babel-node

import app from "../app";
import meow from "meow";

const cli = meow(`
	Usage
	  $ boojum <input>

	Options
	  --rainbow, -r  Include a rainbow

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`, {
	alias: {
		r: 'rainbow'
	}
});

if(cli.input[0]) {
	new app(cli.input[0]).init()
} else {
	new app().init()
}
