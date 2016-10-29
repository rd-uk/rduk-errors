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

    var path = require('path'),
        util = require('util'),
        BaseError = require('./type/BaseError');

    var factory = exports;

    factory.create = function(name) {
        if (!name) {
            factory.throwArgumentNullError('name');
        }

        var err = Object.create(factory[name].prototype);

        factory[name].apply(err, Array.prototype.slice.call(arguments, 1));

        return err;
    };

    var errors = [
        './type/ArgumentError',
        './type/ArgumentNullError',
        './type/ArgumentOutOfRangeError',
        './type/ConfigurationError',
        './type/NotImplementedError',
        './type/NotSupportedError'
    ];

    factory.add = function (name, ctor, base) {
        if (!name) {
            factory.throwArgumentNullError('name');
        }

        if (typeof name !== 'string') {
            factory.throwArgumentError('name', name);
        }

        if (!!base && !(base.prototype instanceof BaseError)) {
            factory.throwArgumentError('base', base);
        }

        var hidden = '_' + name;
        
        Object.defineProperty(factory, name, {
            get: function() {
                if (!factory.hasOwnProperty(hidden)) {
                    if (typeof ctor === 'string') {
                        ctor = require(ctor);
                    }

                    if (typeof ctor !== 'function') {
                        factory.throwArgumentError('ctor', ctor);
                    }

                    util.inherits(ctor, !!base ? base : BaseError);
                    factory[hidden] = ctor;
                }

                return factory[hidden];
            }
        });

        factory['throw' + name] = function() {
            throw factory.create.apply(factory, [name].concat(Array.prototype.slice.call(arguments)));
        };
    };

    errors.forEach(function(error) {
        var name = path.basename(error);

        factory.add(name, error);
    });

}(require, exports));
