const { stringType, booleanType, numberType, objectKey } = require('./constants');

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

const encodeKeyValuePair = (stream, key, value, offset) => {
    let curr = offset;
    stream.writeInt8(objectKey, curr++);
    stream.writeInt8(key.length, curr++);
    stream.write(key, curr);
    curr += key.length;

    if (typeof value === 'boolean') {
        return encodeBoolean(stream, value, curr);
    }

    if (typeof value === 'string') {
        return encodeString(stream, value, curr);
    }

    if (typeof value === 'number') {
        return encodeNumber(stream, value, curr);
    }

    throw new Error(`Unkown type for ${typeof value}`);
}

module.exports = {
    encodeBoolean,
    encodeNumber,
    encodeString,
    encodeKeyValuePair
};
