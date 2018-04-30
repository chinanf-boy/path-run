#!/usr/bin/env node
(async () => {
	"use strict";
	const meow = require("meow");
	const path = require("path");
	const chalk = require("chalk");
	const relative = require('relative');
	const replace = require('replace-in-file');
	const { pathRun, IsTruePath} =  require('./index.js');




	const cli = meow(`
	Usage
	  $ path-run [input] [output]

	Options
		input  要更改的路径
		output 变成的路径

	Examples
		$ path-run 'vue' './vue'

	will change all process.cwd()/* files require Path 'vue' => './vue'
`);

if (!cli.input || cli.input.length !== 2) {
	console.log(cli.help);
	process.exit(1);
}

let In = cli.input[0];
let Out = cli.input[1];

let InPath = path.resolve(process.cwd(), In)
let OutPath = path.resolve(process.cwd(), Out)

try{

	InPath = IsTruePath(InPath)
	OutPath = IsTruePath(OutPath)

	let replaceMesaages = []

	let pathRunMap = await pathRun(InPath, OutPath)
	// console.log(pathRunMap)
	let Ks = Object.keys(pathRunMap)
	for( let i in Ks){
		let replaceOptions = {}
		let fileAbs = pathRunMap[Ks[i]].map(f =>{
			try{
				return require.resolve(path.resolve(path.dirname(Ks[i]), f))
			}catch(err){
				return ""
			}
		})
		let Index = fileAbs.indexOf(InPath)
		if(Index >= 0){ // match Abs path from user InPath

			let fileToInPath = pathRunMap[Ks[i]][Index] // file content require relative path : user
			let fileToOutPath = relative(Ks[i], OutPath) // file content require relative path : Path-run
			if(!fileToOutPath.startsWith('.')){
				fileToOutPath = './'+fileToOutPath
			}
			if(fileToInPath === fileToOutPath) continue

			// replace content in file
			replaceOptions = {
				files: Ks[i],
				from: new RegExp(`( from)([\\s]+)(\\'|\\")+[`+fileToInPath+`]+((\\'|\\")+([^\\S;])?)`,'g'),
				to: ` from '${fileToOutPath}'`
			}
			replaceMesaages.push(replaceOptions)
			replaceOptions = {
				files: Ks[i],
				from: new RegExp(`(require\\()(\\'|\\")[`+fileToInPath+`]+((\\'|\\")([\\)])+)`,'g'),
				to: `require('${fileToOutPath}')`
			}
			replaceMesaages.push(replaceOptions)
		}


	}

	// console.log(pathRunMap)
	for(let i in replaceMesaages){

		let changes = await replace(replaceMesaages[i])

		changes.length > 0 && (console.log(chalk.green(changes),chalk.blue(" >>> Done")))
	}

	console.log(chalk.yellow("All done"))
}catch(err){
	throw new Error(err)
}
})();
