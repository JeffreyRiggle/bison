const {
    smallStringType,
    stringType,
    largeStringType,
    booleanType,
    numberType,
    objectKey,
    smallArrayType,
    arrayType,
    largeArrayType,
    objectType,
    nanoNumberType,
    smallNumberType,
    floatType,
    doubleType
} = require('./constants');

const handleLength = (obj, small, medium, large) => {
    const len = obj.length;

    if (len < 127) {
        const buff = Buffer.alloc(2);
        buff.writeInt8(small, 0);
        buff.writeInt8(len, 1);

        return buff;
    }
    
    if (len < 32768) {
        const buff = Buffer.alloc(3);
        buff.writeInt8(medium, 0);
        buff.writeInt16LE(len, 1);

        return buff;
    }


    const buff = Buffer.alloc(5);
    buff.writeInt8(large, 0);
    buff.writeInt32LE(len, 1);

    return buff;
};

const encodeString = (stream, str) => {
    const buff = Buffer.alloc(str.length);
    buff.write(str);
    const buffWithSize = Buffer.concat([handleLength(str, smallStringType, stringType, largeStringType), buff]);

    return Buffer.concat([stream, buffWithSize]);
}

const encodeBoolean = (stream, boolean) => {
    const buff = Buffer.alloc(2);
    buff.writeInt8(booleanType);
    buff.writeInt8(boolean ? 1 : 0, 1);

    return Buffer.concat([stream, buff]);
};

const encodeNanoNumber = (stream, num) => {
    const buff = Buffer.alloc(2);
    buff.writeInt8(nanoNumberType);
    buff.writeInt8(num, 1);
    
    return Buffer.concat([stream, buff]);
}

const encodeFloat = (stream, num) => {
    const buff = Buffer.alloc(5);
    buff.writeInt8(floatType);
    buff.writeFloatLE(num, 1);
    
    return Buffer.concat([stream, buff]);
}

const encodeSmallNumber = (stream, num) => {
    const buff = Buffer.alloc(3);
    buff.writeInt8(smallNumberType);
    buff.writeInt16LE(num, 1);
    
    return Buffer.concat([stream, buff]);
}

const encodeDouble = (stream, num) => {
    const buff = Buffer.alloc(9);
    buff.writeInt8(doubleType);
    buff.writeDoubleLE(num, 1);
    
    return Buffer.concat([stream, buff]);
}

const encodeLargeNumber = (stream, num) => {
    const buff = Buffer.alloc(5);
    buff.writeInt8(numberType);
    buff.writeInt32LE(num, 1);
    
    return Buffer.concat([stream, buff]);
}

const encodeNumber = (stream, num) => {
    const isDecimal = !Number.isInteger(num);

    if (num < 128) {
        return isDecimal ? encodeFloat(stream, num) : encodeNanoNumber(stream, num);
    }

    if (num < 32768) {
        return isDecimal ? encodeFloat(stream, num) : encodeSmallNumber(stream, num);
    }

    return isDecimal ? encodeDouble(stream, num) : encodeLargeNumber(stream, num);
};

const encodeArray = (stream, value) => {
    const rootBuff = handleLength(value, smallArrayType, arrayType, largeArrayType)
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
