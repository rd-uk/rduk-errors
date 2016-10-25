# RDUK - errors

## Installation

```
npm install https://github.com/rduk/rduk-errors
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
* errors.NotSUpportedError