const { encodeBoolean, encodeNumber, encodeString, encodeKeyValuePair } = require('../encodeUtils');
const { decodeType, decodeBoolean, decodeNumber, decodeString, decodeKeyValuePair } = require('../decodeUtils');
const { booleanType, stringType, numberType } = require('../constants');

describe('decode', () => {
    let buff, result;

    describe('when decoding a boolean', () => {
        beforeEach(() => {
            buff = encodeBoolean(Buffer.alloc(3), true, 0).stream;
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
            buff = encodeNumber(Buffer.alloc(3), 6, 0).stream;
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
            buff = encodeString(Buffer.alloc(5), 'foo', 0).stream;
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

    describe('decode key value pair', () => {
        describe('when value is boolean', () => {
            beforeEach(() => {
                buff = encodeKeyValuePair(Buffer.alloc(7), 'foo', true, 0).stream;
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
                buff = encodeKeyValuePair(Buffer.alloc(7), 'foo', 6, 0).stream;
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
                buff = encodeKeyValuePair(Buffer.alloc(10), 'foo', 'bar', 0).stream;
                result = decodeKeyValuePair(buff, 1);
            });

            it('should have the correct key', () => {
                expect(result.key).toBe('foo');
            });

            it('should have the correct value', () => {
                expect(result.value).toBe('bar');
            });
        });
    });
});
