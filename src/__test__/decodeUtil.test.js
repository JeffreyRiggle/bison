const { encodeBoolean, encodeNumber, encodeString } = require('../encodeUtils');
const { decodeType, decodeBoolean, decodeNumber, decodeString } = require('../decodeUtils');
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
});
