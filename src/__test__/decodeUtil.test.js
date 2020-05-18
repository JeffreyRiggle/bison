const { encodeBoolean, encodeNumber, encodeString, encodeKeyValuePair, encodeArray } = require('../encodeUtils');
const { decodeType, decodeBoolean, decodeNumber, decodeString, decodeKeyValuePair, decodeArray } = require('../decodeUtils');
const { booleanType, stringType, numberType, arrayType } = require('../constants');

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

    describe('when decoding a number', () => {
        beforeEach(() => {
            buff = encodeNumber(Buffer.alloc(0), 6);
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
                expect(result.value).toBe(6);
            });
        });
    });

    describe('when decoding a string', () => {
        beforeEach(() => {
            buff = encodeString(Buffer.alloc(0), 'foo');
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
                expect(result.value).toBe('foo');
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
