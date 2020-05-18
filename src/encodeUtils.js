const { stringType, booleanType, numberType, objectKey, arrayType, objectType } = require('./constants');

const encodeString = (stream, str) => {
    const buff = Buffer.alloc(str.length + 2);
    buff.writeInt8(stringType, 0);
    buff.writeInt8(str.length, 1);
    buff.write(str, 2);

    return Buffer.concat([stream, buff]);
}

const encodeBoolean = (stream, boolean) => {
    const buff = Buffer.alloc(2);
    buff.writeInt8(booleanType);
    buff.writeInt8(boolean ? 1 : 0, 1);

    return Buffer.concat([stream, buff]);
};

const encodeNumber = (stream, num) => {
    const buff = Buffer.alloc(2);
    buff.writeInt8(numberType);
    buff.writeInt8(num, 1);
    
    return Buffer.concat([stream, buff]);
};

const encodeArray = (stream, value) => {
    const rootBuff = Buffer.alloc(2);
    rootBuff.writeInt8(arrayType, 0);
    rootBuff.writeInt8(value.length, 1);

    const buffs = [];

    value.forEach(arrValue => {
        buffs.push(encodeValue(Buffer.alloc(0), arrValue));
    });

    return Buffer.concat([stream, rootBuff, ...buffs]);
};

const encodeObject = (stream, value) => {
    const buff = Buffer.alloc(2);
    const keys = Object.keys(value);
    buff.writeInt8(objectType);
    buff.writeInt8(keys.length, 1);
    const buffs = [];

    keys.forEach(key => {
        buffs.push(encodeKeyValuePair(Buffer.alloc(0), key, value[key]));
    });

    return Buffer.concat([stream, buff, ...buffs]);
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

    if (typeof value === 'object') {
        return encodeObject(stream, value, offset);
    }

    throw new Error(`Unkown type for ${typeof value}`);
};

const encodeKeyValuePair = (stream, key, value) => {
    const buff = Buffer.alloc(key.length + 2);
    buff.writeInt8(objectKey);
    buff.writeInt8(key.length, 1);
    buff.write(key, 2);

    return Buffer.concat([stream, encodeValue(buff, value)])
};

module.exports = {
    encodeBoolean,
    encodeNumber,
    encodeString,
    encodeArray,
    encodeObject,
    encodeKeyValuePair
};
