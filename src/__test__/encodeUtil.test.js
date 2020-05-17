const { encodeArray, encodeBoolean, encodeNumber, encodeString, encodeKeyValuePair, encodeObject }= require('../encodeUtils');
const { arrayType, booleanType, stringType, numberType, objectKey, objectType } = require('../constants');

describe('encode util', () => {
    let result;

    describe('when a boolean is provided', () => {
        describe('when value is true', () => {
            beforeEach(() => {
                result = encodeBoolean(Buffer.alloc(2), true, 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(booleanType);
            });

            it('should have the correct value', () => {
                expect(result.stream[1]).toBe(1);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(2);
            });
        });

        describe('when value is false', () => {
            beforeEach(() => {
                result = encodeBoolean(Buffer.alloc(2), false, 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(booleanType);
            });

            it('should have the correct value', () => {
                expect(result.stream[1]).toBe(0);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(2);
            });
        });
    });

    describe('when a string is provided', () => {
        const original = 'foobar';

        beforeEach(() => {
            result = encodeString(Buffer.alloc(2 + original.length), original, 0);
        });

        it('should have the correct type', () => {
            expect(result.stream[0]).toBe(stringType);
        });

        it('should have the correct length', () => {
            expect(result.stream[1]).toBe(original.length);
        });

        it('should have the correct string', () => {
            expect(result.stream.toString('utf8', 2)).toBe(original);
        });

        it('should have the correct offset', () => {
            expect(result.offset).toBe(2 + original.length);
        });
    });

    describe('when a number is provided', () => {
        beforeEach(() => {
            result = encodeNumber(Buffer.alloc(2), 6, 0);
        });

        it('should have the correct type', () => {
            expect(result.stream[0]).toBe(numberType);
        });

        it('should have the correct value', () => {
            expect(result.stream[1]).toBe(6);
        });

        it('should have the correct offset', () => {
            expect(result.offset).toBe(2);
        });
    });

    describe('when array is encoded', () => {
        describe('and values are numbers', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(8), [5, 8, 2], 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(arrayType);
            });

            it('should have the correct array length', () => {
                expect(result.stream[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result.stream[2]).toBe(numberType);
            });

            it('should have the correct first value', () => {
                expect(result.stream[3]).toBe(5);
            });

            it('should have the correct second value type', () => {
                expect(result.stream[4]).toBe(numberType);
            });

            it('should have the correct second value', () => {
                expect(result.stream[5]).toBe(8);
            });

            it('should have the correct third value type', () => {
                expect(result.stream[6]).toBe(numberType);
            });

            it('should have the correct third value', () => {
                expect(result.stream[7]).toBe(2);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(8);
            });
        });

        describe('and values are booleans', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(8), [true, true, false], 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(arrayType);
            });

            it('should have the correct array length', () => {
                expect(result.stream[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result.stream[2]).toBe(booleanType);
            });

            it('should have the correct first value', () => {
                expect(result.stream[3]).toBe(1);
            });

            it('should have the correct second value type', () => {
                expect(result.stream[4]).toBe(booleanType);
            });

            it('should have the correct second value', () => {
                expect(result.stream[5]).toBe(1);
            });

            it('should have the correct third value type', () => {
                expect(result.stream[6]).toBe(booleanType);
            });

            it('should have the correct third value', () => {
                expect(result.stream[7]).toBe(0);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(8);
            });
        })

        describe('and values are strings', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(17), ['foo', 'bar', 'baz'], 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(arrayType);
            });

            it('should have the correct array length', () => {
                expect(result.stream[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result.stream[2]).toBe(stringType);
            });

            it('should have the correct first value', () => {
                expect(result.stream.toString('utf8', 4, 7)).toBe('foo');
            });

            it('should have the correct second value type', () => {
                expect(result.stream[7]).toBe(stringType);
            });

            it('should have the correct second value', () => {
                expect(result.stream.toString('utf8', 9, 12)).toBe('bar');
            });

            it('should have the correct third value type', () => {
                expect(result.stream[12]).toBe(stringType);
            });

            it('should have the correct third value', () => {
                expect(result.stream.toString('utf8', 14, 17)).toBe('baz');
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(17);
            });
        })

        describe('and values are arrays', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(14), [[5], [8], [2]], 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(arrayType);
            });

            it('should have the correct array length', () => {
                expect(result.stream[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result.stream[2]).toBe(arrayType);
            });

            it('should have the correct first value', () => {
                expect(result.stream[5]).toBe(5);
            });

            it('should have the correct second value type', () => {
                expect(result.stream[6]).toBe(arrayType);
            });

            it('should have the correct second value', () => {
                expect(result.stream[9]).toBe(8);
            });

            it('should have the correct third value type', () => {
                expect(result.stream[10]).toBe(arrayType);
            });

            it('should have the correct third value', () => {
                expect(result.stream[13]).toBe(2);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(14);
            });
        });

        describe('and values are mixed', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(11), [5, true, 'foo'], 0);
            });

            it('should have the correct type', () => {
                expect(result.stream[0]).toBe(arrayType);
            });

            it('should have the correct array length', () => {
                expect(result.stream[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result.stream[2]).toBe(numberType);
            });

            it('should have the correct first value', () => {
                expect(result.stream[3]).toBe(5);
            });

            it('should have the correct second value type', () => {
                expect(result.stream[4]).toBe(booleanType);
            });

            it('should have the correct second value', () => {
                expect(result.stream[5]).toBe(1);
            });

            it('should have the correct third value type', () => {
                expect(result.stream[6]).toBe(stringType);
            });

            it('should have the correct third value', () => {
                expect(result.stream.toString('utf8', 8, 11)).toBe('foo');
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(11);
            });
        });
    });

    describe('when an object is provided', () => {
        beforeEach(() => {
            result = encodeObject(Buffer.alloc(19), { foo: 5, bar: 'foo' }, 0);
        });

        it('should have the correct type', () => {
            expect(result.stream[0]).toBe(objectType);
        });

        it('should have the correct length', () => {
            expect(result.stream[1]).toBe(2);
        });

        it('should have the correct first key', () => {
            expect(result.stream.toString('utf8', 4, 7)).toBe('foo');
        });

        it('should have the correct first value', () => {
            expect(result.stream[8]).toBe(5);
        });

        it('should have the correct second key', () => {
            expect(result.stream.toString('utf8', 11, 14)).toBe('bar');
        });

        it('should have the correct second value', () => {
            expect(result.stream.toString('utf8', 16, 19)).toBe('foo');
        });

        it('should have the correct offset', () => {
            expect(result.offset).toBe(19);
        });
    });

    describe('when key value is provided', () => {
        describe('and value is string', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(10), 'foo', 'bar', 0);
            });

            it('should have the correct type for object', () => {
                expect(result.stream[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.stream.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result.stream[5]).toBe(stringType);
            });

            it('should have the correct value', () => {
                expect(result.stream.toString('utf8', 7)).toBe('bar');
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(10);
            });
        });

        describe('and value is boolean', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(7), 'foo', true, 0);
            });

            it('should have the correct type for object', () => {
                expect(result.stream[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.stream.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result.stream[5]).toBe(booleanType);
            });

            it('should have the correct value', () => {
                expect(result.stream[6]).toBe(1);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(7);
            });
        });

        describe('and value is number', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(7), 'foo', 6, 0);
            });

            it('should have the correct type for object', () => {
                expect(result.stream[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.stream.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result.stream[5]).toBe(numberType);
            });

            it('should have the correct value', () => {
                expect(result.stream[6]).toBe(6);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(7);
            });
        });

        describe('and value is an array', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(9), 'foo', [6], 0);
            });

            it('should have the correct type for object', () => {
                expect(result.stream[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.stream.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result.stream[5]).toBe(arrayType);
            });

            it('should have the correct value', () => {
                expect(result.stream[8]).toBe(6);
            });

            it('should have the correct offset', () => {
                expect(result.offset).toBe(9);
            });
        });

        describe('and value is function', () => {
            let thrown;
            beforeEach(() => {
                try {
                    result = encodeKeyValuePair(Buffer.alloc(1), 'foo', () => {}, 0);
                    thrown = false;
                } catch (err) {
                    thrown = true;
                }
            });

            it('should throw', () => {
                expect(thrown).toBe(true);
            });
        });
    });
});
