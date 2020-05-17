const { booleanType, numberType, stringType } = require('./constants');

const decodeType = (stream, offset) => {
    return {
        value: stream.readInt8(offset),
        offset: offset + 1
    };
}

const decodeString = (stream, offset) => {
    const stringLen = stream.readInt8(offset);

    return {
        value: stream.toString('utf8', offset + 1, offset + stringLen + 1),
        offset: offset + stringLen + 1
    };
}

const decodeBoolean = (stream, offset) => {
    return {
        value: stream.readInt8(offset) === 1,
        offset: offset + 1
    };
}

const decodeNumber = (stream, offset) => {
    return {
        value: stream.readInt8(offset),
        offset: offset + 1
    }
}

const decodeValue = (stream, type, offset) => {
    if (type === booleanType) {
        return decodeBoolean(stream, offset);
    }

    if (type === stringType) {
        return decodeString(stream, offset);
    }

    if (type === numberType) {
        return decodeNumber(stream, offset);
    }

    throw new Error(`Unknown type ${type}`);
}

const decodeKeyValuePair = (stream, offset) => {
    const keyResult = decodeString(stream, offset);
    const valueTypeResult = decodeType(stream, keyResult.offset);
    const valueResult = decodeValue(stream, valueTypeResult.value, valueTypeResult.offset);

    return {
        key: keyResult.value,
        value: valueResult.value,
        offset: valueResult.offset
    }
}

module.exports = {
    decodeType,
    decodeBoolean,
    decodeNumber,
    decodeString,
    decodeKeyValuePair
};
