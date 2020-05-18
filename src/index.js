const { encodeObject } = require('./encodeUtils');
const { decodeObject } = require('./decodeUtils');

module.exports.encode = (json) => {
    return encodeObject(Buffer.alloc(0), json);
};

module.exports.decode = (stream) => {
    return decodeObject(stream, 1).value;
};
