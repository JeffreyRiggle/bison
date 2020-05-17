module.exports.encode = (json) => {
    return Buffer.from(JSON.stringify(json));
};

module.exports.decode = (stream) => {
    return JSON.parse(stream.toString());
};
