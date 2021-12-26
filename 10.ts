const input = (await Deno.readTextFile('./input/10.txt')).trim();
const test = (await Deno.readTextFile('./test/10.txt')).trim();

const pairs: Record<string, string> = {
    '{': '}',
    '(': ')',
    '[': ']',
    '<': '>'
};
const opening = new Set(['(', '{', '[', '<']);
const points: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

function part1(data: string) {
    return data
        .split('\n')
        .map((row) => {
            const stack: string[] = [];
            let bad: null | string = null;
            for (const c of row.split('')) {
                if (opening.has(c)) {
                    stack.unshift(c);
                    continue;
                }
                if (c === pairs[stack[0]]) {
                    stack.shift();
                    continue;
                }
                bad = c;
                break;
            }
            return bad;
        })
        .reduce((rr, ii) => rr + (ii ? points[ii] : 0), 0);
}

console.log({part1: part1(input)});
