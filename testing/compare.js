const { performance, PerformanceObserver } = require('perf_hooks');
const { encode, decode } = require('../src/index');
const input = require(process.argv[2]);

const lazyEncode = (json) => {
    return Buffer.from(JSON.stringify(json));
}

const lazyDecode = (buff) => {
    return JSON.parse(buff.toString('utf8'));
}

const obs = new PerformanceObserver((list, observer) => {
    console.log(list.getEntries());
});
obs.observe({ entryTypes: ['measure'], buffered: true });

async function lazy() {
    console.log(`Evaluating ${JSON.stringify(input)} lazy`);
    performance.mark('encodeLazyStart');
    const result = lazyEncode(input);
    performance.mark('encodeLazyStop');
    console.log(`Size of lazy binary stream ${result.byteLength}`);
    performance.measure('encodeLazy', 'encodeLazyStart', 'encodeLazyStop');
    performance.mark('decodeLazyStart');
    const final = lazyDecode(result);
    performance.mark('decodeLazyStop');
    performance.measure('decodeLazy', 'dencodeLazyStart', 'encodeLazyStop');
}

async function compress() {
    console.log(`Evaluating ${JSON.stringify(input)}`);
    performance.mark('encodeStart');
    const result = encode(input);
    performance.mark('encodeStop');
    console.log(`Size of compress binary stream ${result.byteLength}`);
    performance.measure('encode', 'encodeStart', 'encodeStop');
    performance.mark('decodeStart');
    const final = decode(result);
    performance.mark('decodeStop');
    performance.measure('decode', 'dencodeStart', 'encodeStop');
}

async function main() {
    await compress();
    await lazy();
}

main();
