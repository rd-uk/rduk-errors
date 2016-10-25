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

var path = require('path');

describe('errors', function() {

    var errors = require('../lib/factory.js');

    describe('.throwArgumentError', function() {
        it('should throw an instance of ArgumentError', function() {
            expect(function() {
                errors.throwArgumentError('name', 'value');
            }).toThrowError(errors.ArgumentError);
        });
    });

    describe('.throwArgumentNullError', function() {
        it('should throw an instance of ArgumentNullError', function() {
            expect(function() {
                errors.throwArgumentNullError('name');
            }).toThrowError(errors.ArgumentNullError);
        });
    });

    describe('.throwArgumentOutOfRangeError', function() {
        it('should throw an instance of ArgumentOutOfRangeError', function() {
            expect(function() {
                errors.throwArgumentOutOfRangeError('name');
            }).toThrowError(errors.ArgumentOutOfRangeError);
        });
    });

    describe('.throwNotImplementedError', function() {
        it('should throw an instance of NotImplementedError', function() {
            expect(function() {
                errors.throwNotImplementedError('method');
            }).toThrowError(errors.NotImplementedError);
        });
    });

    describe('.throwNotSupportedError', function() {
        it('should throw an instance of NotSupportedError', function() {
            expect(function() {
                errors.throwNotSupportedError();
            }).toThrowError(errors.NotSupportedError);
        });
    });

    describe('.throwConfigurationError', function() {
        it('should throw an instance of ConfigurationError', function() {
            expect(function() {
                errors.throwConfigurationError();
            }).toThrowError(errors.ConfigurationError);
        });
    });

    describe('.add', function() {

        describe('call without argument', function() {
            it('should throw an ArgumentNullError', function() {
                expect(function() {
                    errors.add();
                }).toThrowError(errors.ArgumentNullError);
            });
        });

        describe('call with an array containing a null value as argument', function() {
            it('should throw an ArgumentNullError', function() {
                expect(function() {
                    errors.add([null]);
                }).toThrowError(errors.ArgumentNullError);
            });
        });

        describe('call with an array containing a non string value as argument', function() {
            it('should throw an ArgumentError', function() {
                expect(function() {
                    errors.add([{}]);
                }).toThrowError(errors.ArgumentError);
            });
        });

        describe('call with a string argument', function() {
            it('should success', function() {
                errors.add(path.resolve('spec/FakeError'));
                expect(function() {
                    errors.throwFakeError()
                }).toThrowError(errors.FakeError);
            });
        })

    });
});
