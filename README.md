# RDUK - errors

[![Build Status](https://travis-ci.org/rd-uk/rduk-errors.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-errors)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-errors/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-errors?branch=master)

## Installation

```
npm install rduk-errors --save --save-exact
```

## How to use it

```js
var errors = require('rduk-errors');

// you can instantiate a new error
var myarg = 1;
var err = new errors.ArgumentError('myarg', myarg);

console.log(err instanceof Error); // will output true
console.log(err instanceof errors.ArgumentError); // will output true

// or throw an error directly
try {
    errors.throwArgumentError('myarg', myarg);
} catch(err) {
    console.error(err);
    /**
     * will output:
     * { [ArgumentError: Invalid argument "myarg" (value: "1").]
     *   name: 'ArgumentError',
     *   message: 'Invalid argument "myarg" (value: "1").' }
     */
}
```

You can add your own custom error

```js

/* FakeError.js */
(function(module) {

    'use strict';

    module.exports = function FakeError(message) {
        FakeError.super_.call(this, message);
    };

} (module));

/* main.js */
var errors = require('rduk-errors');
errors.add('FakeError', require('pathToFakeError/FakeError'));

try {
    errors.throwFakeError('this is a fake error.');
} catch (err) {
    console.log(err instanceof errors.FakeError); // will output true
}

```

By default, your custom error inherits `BaseError`. The `BaseError` class is in charge 
to initialize all error specific properties.
```js
/* BaseError.js */
(function(require, module) {

    'use strict';

    module.exports = function BaseError(message) {
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message;
    };

    require('util').inherits(module.exports, Error);

} (require, module));
```

But you can, if needed, inherit from your own custom error
```js
var errors = require('rduk-errors');

errors.add('ChildFakeError', function ChildFakeError() {
    ChildFakeError.super_.call(this, 'this is a fake error.');
}, errors.FakeError);

try {
    errors.throwChildFakeError();
} catch (err) {
    /* ... */
}
```

## Available errors
* errors.ArgumentError
* errors.ArgumentNullError
* errors.ArgumentOutOfRangeError
* errors.ConfigurationError
* errors.NotImplementedError
* errors.NotSupportedError
