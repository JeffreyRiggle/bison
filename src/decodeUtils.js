const { booleanType, numberType, stringType, arrayType } = require('./constants');

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

const decodeArray = (stream, offset) => {
    let curr = offset;
    const len = stream.readInt8(curr++);
    let iter = 0;
    const retVal = [];

    while (iter < len) {
        const typeResult = decodeType(stream, curr);
        const result = decodeValue(stream, typeResult.value, typeResult.offset);
        retVal.push(result.value);
        curr = result.offset;
        iter++;
    }

    return {
        value: retVal,
        offset: curr
    };
};

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

    if (type === arrayType) {
        return decodeArray(stream, offset);
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
    decodeArray,
    decodeKeyValuePair
};
