const { encodeBoolean, encodeNumber, encodeString, encodeKeyValuePair }= require('../encodeUtils');
const { booleanType, stringType, numberType, objectKey } = require('../constants');

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
