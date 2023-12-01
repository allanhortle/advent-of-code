const raw = await Deno.readTextFile('./input/5.txt');

const test = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

function data(input: string): number[][] {
    return input
        .trim()
        .split('\n')
        .map((row) => row.split(/,| -> /).map((ii) => parseInt(ii, 10)));
}

function countOverlap(instructions: number[][]): number {
    // given a length and start, end. Print an array of coordinates for the line
    function range(length: number, a: number, b: number) {
        const data = new Array(length);
        if (a === b) return data.fill(a);
        return Array.from(data, (_, i) => (b > a ? i + a : a - i));
    }

    // use range to create coordinates for all possible x,y positions.
    // count how many times each are hit
    const coordinates: Record<string, number> = {};
    for (const [x1, y1, x2, y2] of instructions) {
        const length = Math.max(x2 - x1, x1 - x2, y2 - y1, y1 - y2) + 1;
        const x = range(length, x1, x2);
        const y = range(length, y1, y2);
        x.forEach((_, index) => {
            const key = `${x[index]},${y[index]}`;
            coordinates[key] ||= 0;
            coordinates[key]++;
        });
    }

    // count the coordinates visited more that twice
    return Object.values(coordinates).reduce((cc, ii) => (ii >= 2 ? cc + 1 : cc), 0);
}

const part1 = countOverlap(data(raw).filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2));
const part2 = countOverlap(data(raw));

console.log({part1, part2});
