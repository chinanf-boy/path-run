#!/usr/bin/env node
(async () => {
	"use strict";
	const meow = require("meow");
	const path = require("path");
	const chalk = require("chalk");
	const replace = require('replace-in-file');
	const { pathRun, IsTruePath} =  require('./index.js');




	const cli = meow(`
	Usage
	  $ path-run [input] [output]

	Options
		input  要更改的路径
		output 变成的路径

		Examples
        $ path-run './index' './lib/index'

  will change all process.cwd()/* files require Path 'index' => './lib/index'`);

const CWD = process.cwd()

if (!cli.input || cli.input.length !== 2) {
	console.log(cli.help);
	process.exit(1);
}

let In = cli.input[0];
let Out = cli.input[1];

let InPath = path.resolve(CWD, In)
let OutPath = path.resolve(CWD, Out)

try{

	let replaceMesaages = await pathRun({InPath, OutPath, cwd:CWD})

	if(replaceMesaages.length)
	for(let i in replaceMesaages){

		let changes = await replace(replaceMesaages[i])

		changes.length > 0 && (console.log(chalk.green(changes),chalk.blue(" >>> Done")))
	}

	if(process.env.RUN_DEBUG){
		console.log(replaceMesaages)
	}

	console.log(chalk.yellow("All done"))

}catch(err){
	throw new Error("cli"+err)
}
})();
