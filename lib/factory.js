/**
 * MIT License
 *
 * Copyright (c) 2016 Kim UNG
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function(require, exports) {

    'use strict';

    var path = require('path');

    var factory = exports;

    factory.create = function(name) {
        var err = Object.create(factory[name].prototype);

        factory[name].apply(err, Array.prototype.slice.call(arguments, 1));

        return err 
    };

    var errors = [
        './type/ArgumentError',
        './type/ArgumentNullError',
        './type/ArgumentOutOfRangeError',
        './type/ConfigurationError',
        './type/NotImplementedError',
        './type/NotSupportedError'
    ];

    var initError = function(error) {
        if (!error) {
            factory.throwArgumentNullError('error');
        }

        if (typeof error !== 'string') {
            factory.throwArgumentError('error', error);
        }

        var name = path.basename(error),
            hidden = '_' + name;

        Object.defineProperty(factory, name, {
            get: function() {
                if (!factory.hasOwnProperty(hidden)) {
                    factory[hidden] = require(error);
                }

                return factory[hidden];
            }
        });

        factory['throw' + name] = function() {
            throw factory.create.apply(factory, [name].concat(Array.prototype.slice.call(arguments)));
        };
    };

    factory.add = function(errors) {
        if (!errors) {
            factory.throwArgumentNullError('errors');
        }

        if (!Array.isArray(errors)) {
            errors = [errors];
        }

        errors.forEach(initError);
    };

    factory.add(errors);

}(require, exports));
