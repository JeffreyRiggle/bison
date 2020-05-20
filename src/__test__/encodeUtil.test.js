const { encodeArray, encodeBoolean, encodeNumber, encodeString, encodeKeyValuePair, encodeObject }= require('../encodeUtils');
const {
    smallStringType,
    stringType,
    largeStringType,
    booleanType,
    numberType,
    objectKey,
    smallArrayType,
    arrayType,
    objectType,
    nanoNumberType,
    smallNumberType,
    floatType,
    doubleType
} = require('../constants');

describe('encode util', () => {
    let result;

    describe('when a boolean is provided', () => {
        describe('when value is true', () => {
            beforeEach(() => {
                result = encodeBoolean(Buffer.alloc(0), true);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(booleanType);
            });

            it('should have the correct value', () => {
                expect(result[1]).toBe(1);
            });
        });

        describe('when value is false', () => {
            beforeEach(() => {
                result = encodeBoolean(Buffer.alloc(2), false);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(booleanType);
            });

            it('should have the correct value', () => {
                expect(result[1]).toBe(0);
            });
        });
    });

    describe('when a string is provided', () => {
        const original = 'foobar';

        beforeEach(() => {
            result = encodeString(Buffer.alloc(0), original);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(smallStringType);
        });

        it('should have the correct length', () => {
            expect(result[1]).toBe(original.length);
        });

        it('should have the correct string', () => {
            expect(result.toString('utf8', 2)).toBe(original);
        });
    });

    describe('when a long string is provided', () => {
        const original = 'Bacon ipsum dolor amet pork belly tongue pancetta turducken, bresaola shank meatball fatback salami sirloin ground round. Pork loin shankle strip steak salami chicken sausage prosciutto flank. Andouille salami corned beef, prosciutto chislic turducken shank doner jerky kielbasa pork loin bresaola chuck burgdoggen. Cupim ground round pork belly ham, biltong rump frankfurter bresaola shank shankle andouille fatback.';

        beforeEach(() => {
            result = encodeString(Buffer.alloc(0), original);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(stringType);
        });

        it('should have the correct length', () => {
            expect(result.readInt16LE(1)).toBe(original.length);
        });

        it('should have the correct string', () => {
            expect(result.toString('utf8', 3)).toBe(original);
        });
    });

    describe('when a nano number is provided', () => {
        beforeEach(() => {
            result = encodeNumber(Buffer.alloc(0), 6);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(nanoNumberType);
        });

        it('should have the correct value', () => {
            expect(result.readInt8(1)).toBe(6);
        });
    });

    describe('when a small number is provided', () => {
        beforeEach(() => {
            result = encodeNumber(Buffer.alloc(0), 2000);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(smallNumberType);
        });

        it('should have the correct value', () => {
            expect(result.readInt16LE(1)).toBe(2000);
        });
    });

    describe('when a float number is provided', () => {
        beforeEach(() => {
            result = encodeNumber(Buffer.alloc(0), 10.5);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(floatType);
        });

        it('should have the correct value', () => {
            expect(result.readFloatLE(1)).toBe(10.5);
        });
    });

    describe('when a double number is provided', () => {
        beforeEach(() => {
            result = encodeNumber(Buffer.alloc(0), 50024.4);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(doubleType);
        });

        it('should have the correct value', () => {
            expect(result.readDoubleLE(1)).toBe(50024.4);
        });
    });

    describe('when a large number is provided', () => {
        beforeEach(() => {
            result = encodeNumber(Buffer.alloc(0), 2147483647);
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(numberType);
        });

        it('should have the correct value', () => {
            expect(result.readInt32LE(1)).toBe(2147483647);
        });
    });

    describe('when array is encoded', () => {
        describe('and values are numbers', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(0), [5, 8, 2]);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(smallArrayType);
            });

            it('should have the correct array length', () => {
                expect(result[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result[2]).toBe(nanoNumberType);
            });

            it('should have the correct first value', () => {
                expect(result[3]).toBe(5);
            });

            it('should have the correct second value type', () => {
                expect(result[4]).toBe(nanoNumberType);
            });

            it('should have the correct second value', () => {
                expect(result[5]).toBe(8);
            });

            it('should have the correct third value type', () => {
                expect(result[6]).toBe(nanoNumberType);
            });

            it('should have the correct third value', () => {
                expect(result[7]).toBe(2);
            });
        });

        describe('and values are booleans', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(0), [true, true, false]);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(smallArrayType);
            });

            it('should have the correct array length', () => {
                expect(result[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result[2]).toBe(booleanType);
            });

            it('should have the correct first value', () => {
                expect(result[3]).toBe(1);
            });

            it('should have the correct second value type', () => {
                expect(result[4]).toBe(booleanType);
            });

            it('should have the correct second value', () => {
                expect(result[5]).toBe(1);
            });

            it('should have the correct third value type', () => {
                expect(result[6]).toBe(booleanType);
            });

            it('should have the correct third value', () => {
                expect(result[7]).toBe(0);
            });
        })

        describe('and values are strings', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(0), ['foo', 'bar', 'baz']);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(smallArrayType);
            });

            it('should have the correct array length', () => {
                expect(result[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result[2]).toBe(smallStringType);
            });

            it('should have the correct first value', () => {
                expect(result.toString('utf8', 4, 7)).toBe('foo');
            });

            it('should have the correct second value type', () => {
                expect(result[7]).toBe(smallStringType);
            });

            it('should have the correct second value', () => {
                expect(result.toString('utf8', 9, 12)).toBe('bar');
            });

            it('should have the correct third value type', () => {
                expect(result[12]).toBe(smallStringType);
            });

            it('should have the correct third value', () => {
                expect(result.toString('utf8', 14, 17)).toBe('baz');
            });
        })

        describe('and values are arrays', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(0), [[5], [8], [2]]);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(smallArrayType);
            });

            it('should have the correct array length', () => {
                expect(result[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result[2]).toBe(smallArrayType);
            });

            it('should have the correct first value', () => {
                expect(result[5]).toBe(5);
            });

            it('should have the correct second value type', () => {
                expect(result[6]).toBe(smallArrayType);
            });

            it('should have the correct second value', () => {
                expect(result[9]).toBe(8);
            });

            it('should have the correct third value type', () => {
                expect(result[10]).toBe(smallArrayType);
            });

            it('should have the correct third value', () => {
                expect(result[13]).toBe(2);
            });
        });

        describe('and values are mixed', () => {
            beforeEach(() => {
                result = encodeArray(Buffer.alloc(0), [5, true, 'foo']);
            });

            it('should have the correct type', () => {
                expect(result[0]).toBe(smallArrayType);
            });

            it('should have the correct array length', () => {
                expect(result[1]).toBe(3);
            });

            it('should have the correct first value type', () => {
                expect(result[2]).toBe(nanoNumberType);
            });

            it('should have the correct first value', () => {
                expect(result[3]).toBe(5);
            });

            it('should have the correct second value type', () => {
                expect(result[4]).toBe(booleanType);
            });

            it('should have the correct second value', () => {
                expect(result[5]).toBe(1);
            });

            it('should have the correct third value type', () => {
                expect(result[6]).toBe(smallStringType);
            });

            it('should have the correct third value', () => {
                expect(result.toString('utf8', 8)).toBe('foo');
            });
        });
    });

    describe('when an object is provided', () => {
        beforeEach(() => {
            result = encodeObject(Buffer.alloc(0), { foo: 5, bar: 'foo' });
        });

        it('should have the correct type', () => {
            expect(result[0]).toBe(objectType);
        });

        it('should have the correct length', () => {
            expect(result[1]).toBe(2);
        });

        it('should have the correct first key', () => {
            expect(result.toString('utf8', 4, 7)).toBe('foo');
        });

        it('should have the correct first value', () => {
            expect(result[8]).toBe(5);
        });

        it('should have the correct second key', () => {
            expect(result.toString('utf8', 11, 14)).toBe('bar');
        });

        it('should have the correct second value', () => {
            expect(result.toString('utf8', 16)).toBe('foo');
        });
    });

    describe('when key value is provided', () => {
        describe('and value is string', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(0), 'foo', 'bar');
            });

            it('should have the correct type for object', () => {
                expect(result[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result[5]).toBe(smallStringType);
            });

            it('should have the correct value', () => {
                expect(result.toString('utf8', 7)).toBe('bar');
            });
        });

        describe('and value is boolean', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(0), 'foo', true);
            });

            it('should have the correct type for object', () => {
                expect(result[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result[5]).toBe(booleanType);
            });

            it('should have the correct value', () => {
                expect(result[6]).toBe(1);
            });
        });

        describe('and value is number', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(0), 'foo', 6);
            });

            it('should have the correct type for object', () => {
                expect(result[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result[5]).toBe(nanoNumberType);
            });

            it('should have the correct value', () => {
                expect(result[6]).toBe(6);
            });
        });

        describe('and value is an array', () => {
            beforeEach(() => {
                result = encodeKeyValuePair(Buffer.alloc(0), 'foo', [6]);
            });

            it('should have the correct type for object', () => {
                expect(result[0]).toBe(objectKey);
            });

            it('should have the correct property key', () => {
                expect(result.toString('utf8', 2, 5)).toBe('foo');
            });

            it('should have the correct value type', () => {
                expect(result[5]).toBe(smallArrayType);
            });

            it('should have the correct value', () => {
                expect(result[8]).toBe(6);
            });
        });

        describe('and value is function', () => {
            let thrown;
            beforeEach(() => {
                try {
                    result = encodeKeyValuePair(Buffer.alloc(0), 'foo', () => {});
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
