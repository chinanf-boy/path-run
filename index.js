'use strict';
const nodepaths = require("nodepaths")

const globby = require('globby')
const path = require('path')
const chalk = require('chalk')




async function pathRun(In, Out){

	let results = {}

	if (typeof In !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof In}`);
	}
	let Files = await globby(path.join(process.cwd(),'*.*'))
	// console.log(Files)
	for(let i in Files){
		results = Object.assign(results, await nodepaths(Files[i]))
	}

	return results
};

function IsTruePath(Abs){
	try{

		require.resolve(Abs)

	}catch(err){
		throw new Error(chalk.red('错误路径 ==>>> '+Abs+'\n'))
	}
};

module.exports = {
	IsTruePath,
	pathRun
}
