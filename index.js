'use strict';
const nodepaths = require("nodepaths")

const fl = require('node-filelist');
const path = require('path')
const chalk = require('chalk')
const NODE_MODULES = '/node_modules'


const files   = [ process.cwd() ];
const fileOption  = { "ext" : "js|jsx|ts|vue" };

async function getAllFiles(files, fileOption){
	return new Promise((ok,Err)=>{
		try{
			fl.read(files, fileOption , function (results){
				ok(results)
			});
		}catch(err){
			Err(err)
		}
	})
}


async function pathRun(In, Out){

	let results = {}

	if (typeof In !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof In}`);
	}
	// let Files = await globby(path.join(process.cwd(),'*.*'))

	let Files = await getAllFiles(files, fileOption)

	Files = Files.map(F =>F.path).filter(x => !x.includes(NODE_MODULES))

	for(let i in Files){
		results = Object.assign(results, await nodepaths(Files[i]))
	}

	return results
};

function IsTruePath(Abs){
	try{

		return require.resolve(Abs)

	}catch(err){
		throw new Error(chalk.red('错误路径 ==>>> '+Abs+'\n'))
	}
};

module.exports = {
	IsTruePath,
	pathRun,
	getAllFiles
}
