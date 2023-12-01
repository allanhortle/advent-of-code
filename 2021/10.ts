const input = (await Deno.readTextFile('./input/10.txt')).trim();
const test = (await Deno.readTextFile('./test/10.txt')).trim();

const pairs: Record<string, string> = {
    '{': '}',
    '(': ')',
    '[': ']',
    '<': '>'
};
const opening = new Set(['(', '{', '[', '<']);

function part1(data: string) {
    const points: Record<string, number> = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
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

function part2(data: string) {
    const points: Record<string, number> = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    };
    const scores = data
        .split('\n')
        // process stacks
        .flatMap((row) => {
            const stack: string[] = [];
            const fullStack: string[] = [];
            for (const c of row.split('')) {
                if (opening.has(c)) {
                    stack.unshift(c);
                    fullStack.unshift(c);
                    continue;
                }
                if (c === pairs[stack[0]]) {
                    stack.shift();
                    continue;
                }
                return [];
            }
            return [stack];
        })
        // calculate scores
        .map((stack) => {
            return stack.reduce((rr, ii) => rr * 5 + points[pairs[ii]], 0);
        })
        .sort((aa, bb) => bb - aa);

    return scores[Math.floor(scores.length / 2)];
    //.reduce((rr, ii) => rr + (ii ? points[ii] : 0), 0);
}

console.log({part1: part1(input), part2: part2(input)});
