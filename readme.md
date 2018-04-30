# path-run [![Build Status](https://travis-ci.org/chinanf-boy/path-run.svg?branch=master)](https://travis-ci.org/chinanf-boy/path-run) [![codecov](https://codecov.io/gh/chinanf-boy/path-run/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/path-run?branch=master)

> esay change you require paths Now



## Install

```
$ npm install path-run
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

2. 运行cli


``` bash
path-run demo/input/input1.js demo/output/output3.js
# path-run [input] [output]

```

`process.cwd()` 下所有引用 `input` 的 路径 都会变为 `output`

---


## API

### pathRun(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global path-run
```

```
$ path-run --help

  Usage
    path-run [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ path-run
    unicorns & rainbows
    $ path-run ponies
    ponies & rainbows
```


## License

MIT © [chinanf-boy](http://llever.com)
