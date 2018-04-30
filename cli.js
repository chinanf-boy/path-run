#!/usr/bin/env node
'use strict';
const meow = require('meow');
const pathRun = require('.');

const cli = meow(`
	Usage
	  $ path-run [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ path-run
	  unicorns & rainbows
	  $ path-run ponies
	  ponies & rainbows
`);

console.log(pathRun(cli.input[0] || 'unicorns'));
