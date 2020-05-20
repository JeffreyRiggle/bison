const {
    encodeBoolean,
    encodeNumber,
    encodeString,
    encodeKeyValuePair,
    encodeArray
} = require('../encodeUtils');

const {
    decodeType,
    decodeBoolean,
    decodeNumber,
    decodeNanoNumber,
    decodeSmallNumber,
    decodeFloat,
    decodeDouble,
    decodeSmallString,
    decodeString,
    decodeLargeString,
    decodeKeyValuePair,
    decodeArray
} = require('../decodeUtils');

const {
    smallStringType,
    stringType,
    largeStringType,
    booleanType,
    numberType,
    objectKey,
    arrayType,
    objectType,
    nanoNumberType,
    smallNumberType,
    floatType,
    doubleType
} = require('../constants');

describe('decode', () => {
    let buff, result;

    describe('when decoding a boolean', () => {
        beforeEach(() => {
            buff = encodeBoolean(Buffer.alloc(0), true, 0);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(booleanType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeBoolean(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(true);
            });
        });
    });

    describe('when decoding a nano number', () => {
        beforeEach(() => {
            buff = encodeNumber(Buffer.alloc(0), 6);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(nanoNumberType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeNanoNumber(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(6);
            });
        });
    });

    describe('when decoding a small number', () => {
        beforeEach(() => {
            buff = encodeNumber(Buffer.alloc(0), 230);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(smallNumberType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeSmallNumber(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(230);
            });
        });
    });

    describe('when decoding a number', () => {
        beforeEach(() => {
            buff = encodeNumber(Buffer.alloc(0), 50689);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(numberType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeNumber(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(50689);
            });
        });
    });

    describe('when decoding a float', () => {
        beforeEach(() => {
            buff = encodeNumber(Buffer.alloc(0), 10.5);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(floatType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeFloat(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(10.5);
            });
        });
    });

    describe('when decoding a double', () => {
        beforeEach(() => {
            buff = encodeNumber(Buffer.alloc(0), 50024.4);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(doubleType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeDouble(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(50024.4);
            });
        });
    });

    // TODO string and large string
    describe('when decoding a small string', () => {
        beforeEach(() => {
            buff = encodeString(Buffer.alloc(0), 'foo');
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(smallStringType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeSmallString(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe('foo');
            });
        });
    });

    describe('when decoding a string', () => {
        let str;

        beforeEach(() => {
            str = '';
            for (let iter = 0; iter < 130; iter++) {
                str += iter;
            }

            buff = encodeString(Buffer.alloc(0), str);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(stringType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeString(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(str);
            });
        });
    });

    describe('when decoding a large string', () => {
        let str;

        beforeEach(() => {
            str = '';
            for (let iter = 0; iter < 10000; iter++) {
                str += iter;
            }

            buff = encodeString(Buffer.alloc(0), str);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(largeStringType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeLargeString(buff, 1);
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(str);
            });
        });
    });

    describe('when decoding an array', () => {
        beforeEach(() => {
            buff = encodeArray(Buffer.alloc(0), [5, true, 'foo']);
        });

        describe('when decoding the type', () => {
            beforeEach(() => {
                result = decodeType(buff, 0);
            });

            it('should have the correct type', () => {
                expect(result.value).toBe(arrayType);
            });
        });

        describe('when decoding the value', () => {
            beforeEach(() => {
                result = decodeArray(buff, 1);
            });

            it('should have the correct length', () => {
                expect(result.value.length).toBe(3);
            });

            it('should have the correct first value', () => {
                expect(result.value[0]).toBe(5);
            });

            it('should have the correct second value', () => {
                expect(result.value[1]).toBe(true);
            });

            it('should have the correct third value', () => {
                expect(result.value[2]).toBe('foo');
            });
        });
    });

    describe('decode key value pair', () => {
        describe('when value is boolean', () => {
            beforeEach(() => {
                buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', true);
                result = decodeKeyValuePair(buff, 1);
            });

            it('should have the correct key', () => {
                expect(result.key).toBe('foo');
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(true);
            });
        });

        describe('when value is number', () => {
            beforeEach(() => {
                buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', 6);
                result = decodeKeyValuePair(buff, 1);
            });

            it('should have the correct key', () => {
                expect(result.key).toBe('foo');
            });

            it('should have the correct value', () => {
                expect(result.value).toBe(6);
            });
        });

        describe('when value is string', () => {
            beforeEach(() => {
                buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', 'bar');
                result = decodeKeyValuePair(buff, 1);
            });

            it('should have the correct key', () => {
                expect(result.key).toBe('foo');
            });

            it('should have the correct value', () => {
                expect(result.value).toBe('bar');
            });
        });

        describe('when value is array', () => {
            beforeEach(() => {
                buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', [3]);
                result = decodeKeyValuePair(buff, 1);
            });

            it('should have the correct key', () => {
                expect(result.key).toBe('foo');
            });

            it('should have the correct value length', () => {
                expect(result.value.length).toBe(1);
            });

            it('should have the correct value fist item', () => {
                expect(result.value[0]).toBe(3);
            });
        });
    });
});
