
# Path-run[![Build Status](https://travis-ci.org/chinanf-boy/path-run.svg?branch=master)](https://travis-ci.org/chinanf-boy/path-run) [![codecov](https://codecov.io/gh/chinanf-boy/path-run/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/path-run?branch=master)

> Esay change you require paths now

[Chinese](./readme.md)\|[English](./readme.en.md)

If you change the location of a file, then the corresponding file modification of other files is a problem.

You can try`Path-run`, change your file location is not so manual

## Install

    npm install path-run

\-

    yarn add path-run

## Correct use of -cli

1.  Copy files to destination


    - demo
    	- index.js
    	- input
    		- input1.js
    		- input2.js
    	- output
    		- output1.js
    		- output2.js

    - demo
    	- index.js
    	- input
    		- ✂️input1.js // <===== copy to output
    		- input2.js
    	- output
    		- ➕output3.js // <===== from input/input1.js
    		- output1.js
    		- output2.js

2.  Running`Cli`

```bash
path-run demo/input/input1.js demo/output/output3.js
# path-run [input] [output]
```

`Process.cwd()`All references below`Input`The path will become`Output`

3.  Remove`Input1.js`


    - demo
    	- index.js
    	- input
    					<===== ✂️cut
    		- input2.js
    	- output
    		- output3.js // <===== from input/input1.js
    		- output1.js
    		- output2.js

> Done

* * *

## Api

### Pathrun({options})

#### Options

##### 1. InPath

Type:`String`

Abs path

##### 2. OutPath

Type:`String`

Abs path

##### 3. cwd

Type:`String`

Default :`Process.cwd()`

## Cli

    npm install --global path-run

      esay change you require paths Now

      Usage
        $ path-run [input] [output]

      Options
            input  要更改的路径
            output 变成的路径

      Examples
            $ path-run './index' './lib/index'

      will change all process.cwd()/* files require Path 'index' => './lib/index'

## License

Mit ©[Chinanf-boy](http://llever.com)
