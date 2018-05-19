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

	// first step: change other file require/import InPath to Outpath
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

	// second step : change OutPath-file , inside require/import other file path
	if(Ks.length){
		let requireList = pathRunMap[InPath]
		let replaceOptions = {}
		let fileAbs = requireList.map(f =>{
			try{
				return require.resolve(path.resolve(path.dirname(InPath), f))
				// get every file abs path
			}catch(err){
				return "" // and node module or @/index.vue :vue  == ""
			}
		})

		fileAbs.forEach((absPath,index) =>{
			if(!absPath || absPath.includes("node_modules/")){
				return
			}
			let oldRelativePath = requireList[index]

			let newRelativePath = relative(OutPath, absPath)

			replaceOptions = {
				files: OutPath,
				from: new RegExp(`(require\\()(\\'|\\")(`+oldRelativePath+`)+((\\'|\\")([\\)])+)`,'g'),
				to: `require('${newRelativePath}')`
			}
			replaceMesaages.push(replaceOptions)

			replaceOptions = {
				files: Ks[i],
				from: new RegExp(`( from)([\\s]+)(\\'|\\")+(`+oldRelativePath+`)+((\\'|\\")+([^\\S;])?)`,'g'),
				to: ` from '${newRelativePath}'`
			}
			replaceMesaages.push(replaceOptions)
		})

	}

	return replaceMesaages
};

function IsTruePath(Abs){
	// Abs == absolute path
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
