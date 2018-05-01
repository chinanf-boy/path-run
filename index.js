'use strict';
const nodepaths = require("nodepaths")
const relative = require('relative');
const path = require('path')
const chalk = require('chalk')

async function pathRun(options){

	let { InPath, OutPath } = options

	InPath = IsTruePath(InPath)
	OutPath = IsTruePath(OutPath)

	const files   = options.cwd

	let replaceMesaages = []

	let pathRunMap = await nodepaths(files)

	let Ks = Object.keys(pathRunMap)

	if(Ks.length) // <==== [] will too many for let i in []
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
				from: new RegExp(`( from)([\\s]+)(\\'|\\")+(`+fileToInPath+`)+((\\'|\\")+([^\\S;])?)`,'g'),
				to: ` from '${fileToOutPath}'`
			}
			replaceMesaages.push(replaceOptions)
			replaceOptions = {
				files: Ks[i],
				from: new RegExp(`(require\\()(\\'|\\")(`+fileToInPath+`)+((\\'|\\")([\\)])+)`,'g'),
				to: `require('${fileToOutPath}')`
			}
			replaceMesaages.push(replaceOptions)
		}
	}
	return replaceMesaages
};

function IsTruePath(Abs){
	try{

		return require.resolve(Abs)

	}catch(err){
		throw new TypeError(chalk.red('错误路径 ==>>> '+Abs+'\n'))
	}
};

module.exports = {
	IsTruePath,
	pathRun
}
