/**
 * MIT License
 *
 * Copyright (c) 2016 - 2018 RDUK <tech@rduk.fr>
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

    describe('.create without name arg', function() {
        it('shoul throw an ArgumentNullError', function() {
            expect(function() {
                errors.create();
            }).toThrowError(errors.ArgumentNullError);
        });
    });

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

        describe('call with bad name', function() {
            it('should throw an ArgumentError', function() {
                expect(function() {
                    errors.add([]);
                }).toThrowError(errors.ArgumentError);
            });
        });

        describe('call with bad ctor', function() {
            it('should throw an ArgumentError on error instantiation', function() {
                expect(function() {
                    errors.add('UnknownError');
                    errors.throwUnknownError();
                }).toThrowError(errors.ArgumentError);
            });
        });

        describe('call with bad base', function() {
            it('should throw an ArgumentError', function() {
                expect(function() {
                    errors.add('FakeError1', path.resolve('spec/FakeError1'), 'bad base');
                }).toThrowError(errors.ArgumentError);
            });
        });

        describe('call with name and ctor as class path', function() {
            it('should success', function() {
                errors.add('FakeError1', path.resolve('spec/FakeError1'));

                expect(function() {
                    errors.throwFakeError1();
                }).toThrowError(errors.FakeError1);
            });
        });

        describe('call with name and ctor as function', function() {
            it('should success', function() {
                errors.add('FakeError2', require('./FakeError2'));

                expect(function() {
                    errors.throwFakeError2();
                }).toThrowError(errors.FakeError2);
            });
        });

        describe('call with custom base', function() {
            it('should success', function() {
                errors.add('FakeError3', require('./FakeError3'), errors.FakeError2);

                expect(function() {
                    errors.throwFakeError3();
                }).toThrowError(errors.FakeError3);

                expect(new errors.FakeError3() instanceof Error).toBe(true);
                expect(new errors.FakeError3() instanceof errors.FakeError2).toBe(true);
            });
        });

        describe('call with custom base', function() {
            it('should success', function() {
                errors.add('FakeError4', function FakeError4() {
                    FakeError4.super_.call(this);
                }, errors.FakeError3);

                expect(function() {
                    errors.throwFakeError4();
                }).toThrowError(errors.FakeError4);

                expect(new errors.FakeError4() instanceof Error).toBe(true);
                expect(new errors.FakeError4() instanceof errors.FakeError2).toBe(true);
                expect(new errors.FakeError4() instanceof errors.FakeError3).toBe(true);
            });
        });

    });
});
