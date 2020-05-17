const { stringType, booleanType, numberType, objectKey, arrayType } = require('./constants');

const encodeString = (stream, str, offset) => {
    let curr = offset;
    stream.writeInt8(stringType, curr++);
    stream.writeInt8(str.length, curr++);
    stream.write(str, curr);
    return {
        stream,
        offset: curr + str.length
    };
}

const encodeBoolean = (stream, boolean, offset) => {
    stream.writeInt8(booleanType, offset);
    stream.writeInt8(boolean ? 1 : 0, offset + 1);
    return {
        stream,
        offset: offset + 2
    };
};

const encodeNumber = (stream, num, offset) => {
    stream.writeInt8(numberType, offset);
    stream.writeInt8(num, offset + 1);
    return {
        stream,
        offset: offset + 2
    };
};

const encodeArray = (stream, value, offset) => {
    let curr = offset;
    stream.writeInt8(arrayType, curr++);
    stream.writeInt8(value.length, curr++);

    value.forEach(arrValue => {
        const result = encodeValue(stream, arrValue, curr);
        curr = result.offset;
    });

    return {
        stream,
        offset: curr
    }
};

const encodeValue = (stream, value, offset) => {
    if (typeof value === 'boolean') {
        return encodeBoolean(stream, value, offset);
    }

    if (typeof value === 'string') {
        return encodeString(stream, value, offset);
    }

    if (typeof value === 'number') {
        return encodeNumber(stream, value, offset);
    }

    if (Array.isArray(value)) {
        return encodeArray(stream, value, offset);
    }

    throw new Error(`Unkown type for ${typeof value}`);
};

const encodeKeyValuePair = (stream, key, value, offset) => {
    let curr = offset;
    stream.writeInt8(objectKey, curr++);
    stream.writeInt8(key.length, curr++);
    stream.write(key, curr);
    curr += key.length;

    return encodeValue(stream, value, curr);
};

module.exports = {
    encodeBoolean,
    encodeNumber,
    encodeString,
    encodeArray,
    encodeKeyValuePair
};
