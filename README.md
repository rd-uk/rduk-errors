# RDUK - errors

[![Build Status](https://travis-ci.org/rd-uk/rduk-errors.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-errors)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-errors/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-errors?branch=master)

## Installation

```
npm install @rduk/errors --save --save-exact
```

## Usage

```js
var errors = require('@rduk/errors');
```

You can instantiate a new error from the available errors. see the [list](#available_errors)

```js
var myarg = 1;

try {
    var err = new errors.ArgumentError('myarg', myarg);
    throw err;
} catch(err) {
    console.log(err instanceof Error); // will output true
    console.log(err instanceof errors.ArgumentError); // will output true
}
```

or throw it directly

```js
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

You can also add your own custom error

```js

/* FakeError.js */
(function(module) {

    'use strict';

    module.exports = function FakeError(message) {
        FakeError.super_.call(this, message);
    };

} (module));

/* main.js */
var errors = require('@rduk/errors');
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
var errors = require('@rduk/errors');

errors.add('ChildFakeError', function ChildFakeError() {
    ChildFakeError.super_.call(this, 'this is a fake error.');
}, errors.FakeError);

try {
    errors.throwChildFakeError();
} catch (err) {
    /* ... */
}
```

<a name="available_errors"></a>
## Available errors
* `errors.ArgumentNullError` ( `propertyName` );
* `errors.ArgumentError` ( `propertyName` , `propertyValue` );
* `errors.ArgumentOutOfRangeError` ( `propertyName` );
* `errors.ConfigurationError` ( `message` );
* `errors.NotImplementedError` ( `methodName` );
* `errors.NotSupportedError` ( `methodName` );
