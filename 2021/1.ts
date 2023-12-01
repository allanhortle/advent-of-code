const raw = await Deno.readTextFile('./input/1.txt');

const data = raw
    .trim()
    .split('\n')
    .map((ii) => parseInt(ii, 10));

// part 1
let part1 = 0;
data.reduce((aa, bb) => {
    if (bb > aa) part1++;
    return bb;
});

let part2 = 0;

data.forEach((value, index) => {
    if (index === 0 || index > data.length - 3) return;
    const previous = data.slice(index - 1, index + 2).reduce((aa, bb) => aa + bb, 0);
    const current = data.slice(index, index + 3).reduce((aa, bb) => aa + bb, 0);
    if (current > previous) part2++;
});

console.log({part1, part2});
