import test from 'ava';
import path from 'path';

import {
	IsTruePath,
	pathRun
} from '../index.js';

test('IsTruePath', t => {
	const err = t.throws(() => {
		IsTruePath(123);
	}, TypeError);

	t.true(err.message.includes("错误路径"))
	let P = path.resolve(__dirname, __filename)
	t.is(!!IsTruePath(P), true);
});

test.serial('pathRun', async t => {
	const DemoPath = path.resolve(__dirname, './fixture/demo')
	let InPath = path.resolve(DemoPath, './output/output3')
	let OutPath = path.resolve(DemoPath, './input/input1')

	// console.log(InPath, OutPath, __dirname)
	let R = await pathRun({InPath, OutPath, cwd:__dirname}).catch(err =>
		console.log(err))

	t.is(R.length, 8)

});

test('pathRun InPath OutPath fail must Abs', async t => {
	const DemoPath = path.resolve(__dirname, './demo')
	let InPath = path.resolve(DemoPath, './output/outp')
	let OutPath = path.resolve(DemoPath, './input/input1.js')

	let Err = await pathRun({InPath, OutPath, cwd:__dirname}).catch(err => err)
	t.is(Err.message.includes("错误路径"), true)
});

test.serial('pathRun default [].length 0', async t => {
	const DemoPath = path.resolve(__dirname, './fixture/demo')
	let InPath = path.resolve(DemoPath, './input/input1')
	let OutPath = path.resolve(DemoPath, './output/output3')

	let R = await pathRun({InPath, OutPath, cwd:__dirname}).catch(err => err)

	t.is(R.length, 2)

});
