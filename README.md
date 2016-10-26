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
var argumentError = new errors.ArgumentError('name');

// or throw an error directly
errors.throwArgumentError('name');

```

## Available errors
* errors.ArgumentError
* errors.ArgumentNullError
* errors.ArgumentOutOfRangeError
* errors.ConfigurationError
* errors.NotImplementedError
* errors.NotSupportedError
