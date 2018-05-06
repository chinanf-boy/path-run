# path-run [![Build Status](https://travis-ci.org/chinanf-boy/path-run.svg?branch=master)](https://travis-ci.org/chinanf-boy/path-run) [![codecov](https://codecov.io/gh/chinanf-boy/path-run/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/path-run?branch=master)

> esay change you require paths Now

[中文](./readme.md) | [english](./readme.en.md)

如果改变, 一个文件的位置, 那么相对应, 其他文件对这个文件的引用修改就是个问题

你可以试试 `path-run`, 改动你的文件位置不那么手动

## Install

```
npm install path-run
```

-

```
yarn add path-run
```

## 正确做法使用-Cli

1. 复制文件到目的地

```
- demo
	- index.js
	- input
		- input1.js
		- input2.js
	- output
		- output1.js
		- output2.js
```

```
- demo
	- index.js
	- input
		- ✂️input1.js // <===== copy to output
		- input2.js
	- output
		- ➕output3.js // <===== from input/input1.js
		- output1.js
		- output2.js
```

2. 运行 `cli`


``` bash
path-run demo/input/input1.js demo/output/output3.js
# path-run [input] [output]

```

`process.cwd()` 下所有引用 `input` 的 路径 都会变为 `output`


3. 移除 `input1.js`

```
- demo
	- index.js
	- input
					<===== ✂️cut
		- input2.js
	- output
		- output3.js // <===== from input/input1.js
		- output1.js
		- output2.js
```

> DONE

---


## API

### pathRun({options})

#### options

##### 1. InPath

Type: `string`

Abs Path

##### 2. OutPath

Type: `string`

Abs Path
##### 3. cwd

Type: `string`

default : `process.cwd()`



## CLI

```
npm install --global path-run
```

```
  esay change you require paths Now

  Usage
    $ path-run [input] [output]

  Options
        input  要更改的路径
        output 变成的路径

  Examples
        $ path-run './index' './lib/index'

  will change all process.cwd()/* files require Path 'index' => './lib/index'
```

## 联系

[nodepaths](https://github.com/chinanf-boy/NodePath) js 模块描述

## License

MIT © [chinanf-boy](http://llever.com)
