const input = (await Deno.readTextFile('./input/14.txt')).trim();
const test = (await Deno.readTextFile('./test/14.txt')).trim();

function part1(data: string) {
    const chain = [...(data.match(/.*$/m) || [])[0]];
    const rawInstructions = [...data.matchAll(/([A-Z]+) -> ([A-Z])/g)] || [];
    const instructions = rawInstructions.reduce((rr, [, pair, out]) => {
        rr[pair] = out;
        return rr;
    }, {} as Record<string, string>);

    const counts = [...new Array(10)]
        .reduce((chain: string[]) => {
            const pairs = chain.map((aa, ii) => aa.concat(chain[ii + 1] || ''));
            return [...pairs.map((ii) => ii[0] + (instructions[ii] || '')).join('')];
        }, chain)
        .reduce((rr, ii) => {
            rr[ii] ||= 0;
            rr[ii]++;
            return rr;
        }, {} as Record<string, number>);

    const sorted = Object.entries(counts).sort((aa, bb) => bb[1] - aa[1]);
    console.log(counts);
    return sorted[0][1] - sorted[sorted.length - 1][1];
}

function part2(data: string) {
    const steps = 40;
    const template = (data.match(/.*$/m) || [])[0];
    const rawInstructions = [...data.matchAll(/([A-Z]+) -> ([A-Z])/g)] || [];
    const instructions = rawInstructions.reduce((rr, [, pair, insert]) => {
        rr[pair] = insert;
        return rr;
    }, {} as Record<string, string>);

    let pairs: Record<string, number> = {};
    const last = template[template.length - 1];

    for (let i = 0; i < template.length - 1; i++) {
        const key = template[i] + template[i + 1];
        pairs[key] ||= 0;
        pairs[key]++;
    }

    for (let i = 0; i < steps; i++) {
        const update: Record<string, number> = {};
        Object.entries(pairs).forEach(([key, count]) => {
            const a = key[0] + instructions[key];
            const b = instructions[key] + key[1];
            update[a] ||= 0;
            update[a] += count;
            update[b] ||= 0;
            update[b] += count;
        });
        pairs = update;
    }

    const counts: Record<string, number> = {};
    Object.entries(pairs).forEach(([key, count]) => {
        counts[key[0]] ||= 0;
        counts[key[0]] += count;
    });
    counts[last]++;

    const sorted = Object.entries(counts).sort((aa, bb) => bb[1] - aa[1]);
    return sorted[0][1] - sorted[sorted.length - 1][1];
}

console.log({part1: part1(input), part2: part2(input)});
