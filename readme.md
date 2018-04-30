# path-run [![Build Status](https://travis-ci.org/chinanf-boy/path-run.svg?branch=master)](https://travis-ci.org/chinanf-boy/path-run) [![codecov](https://codecov.io/gh/chinanf-boy/path-run/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/path-run?branch=master)

> esay change you require paths Now


## Install

```
$ npm install path-run
```


## Usage

```js
const pathRun = require('path-run');

pathRun('unicorns');
//=> 'unicorns & rainbows'
```


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
