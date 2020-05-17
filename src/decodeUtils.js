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

module.exports = {
    decodeType,
    decodeBoolean,
    decodeNumber,
    decodeString
};
