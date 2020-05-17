const { performance, PerformanceObserver } = require('perf_hooks');
const { encode, decode } = require('../src/index');
const input = require(process.argv[2]);

const obs = new PerformanceObserver((list, observer) => {
    console.log(list.getEntries());
});
obs.observe({ entryTypes: ['measure'], buffered: true });

async function main() {
    console.log(`Evaluating ${JSON.stringify(input)}`);
    performance.mark('encodeStart');
    const result = encode(input);
    performance.mark('encodeStop');
    console.log(`Size of binary stream ${result.byteLength}`);
    performance.measure('encode', 'encodeStart', 'encodeStop');
    performance.mark('decodeStart');
    const final = decode(result);
    performance.mark('decodeStop');
    performance.measure('dencode', 'dencodeStart', 'encodeStop');
}

main();
