module.exports.decodeType = (stream, offset) => {
    return stream.readInt8(offset);
}

module.exports.decodeString = (stream, offset) => {
    const stringLen = stream.readInt8(offset);

    return {
        value: stream.toString(offset + 1, ),
        offset: offset + stringLen + 1
    };
}

module.exports.decodeBoolean = (stream, offset) => {
    // 0 is true?
    return {
        value: stream.readInt8(offset) === 0,
        offset: offset + 1
    };
}

module.exports.decodeNumber = (stream, offset) => {
    return {
        value: stream.readInt8(offset),
        offset: offset + 1
    }
}