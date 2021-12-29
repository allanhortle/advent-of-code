const input = (await Deno.readTextFile('./input/13.txt')).trim();
const test = (await Deno.readTextFile('./test/13.txt')).trim();

function prepareData(input: string) {
    const dots = [...input.matchAll(/(\d+),(\d+)/g)].map(([, x, y]) => [parseInt(x), parseInt(y)]);
    const folds = [...input.matchAll(/([xy])=(\d+)/g)].map(
        (ii) => [ii[1] as 'x' | 'y', parseInt(ii[2])] as const
    );
    const maxX = Math.max(...dots.map((ii) => ii[0]));
    const maxY = Math.max(...dots.map((ii) => ii[1]));
    const grid: boolean[][] = [...new Array(maxY + 1)].map(() => new Array(maxX + 1).fill(false));

    return {dots, folds, maxX, maxY, grid};
}

function flipY<T>(grid: T[][]) {
    const next = [...grid];
    for (let y = 0; y <= Math.ceil(next.length / 2) - 1; y++) {
        const swap = next.length - (1 + y);
        const a = next[y];
        const b = next[swap];
        next[y] = b;
        next[swap] = a;
    }
    return next;
}

function split(direction: 'x' | 'y', foldPoint: number, grid: boolean[][]) {
    if (direction === 'y') {
        const a = grid.slice(0, foldPoint);
        const b = grid.slice(foldPoint);
        return [a, b];
    }
    const a = grid.map((row) => row.slice(0, foldPoint));
    const b = grid.map((row) => row.slice(foldPoint));
    return [a, b];
}

function flipX<T>(grid: T[][]) {
    return grid.map((row) => [...row].reverse());
}

function merge(a: boolean[][], b: boolean[][]) {
    return a.map((row, y) => row.map((i, x) => i || b[y][x]));
}

function print(grid: boolean[][]) {
    console.log(grid.map((r) => r.map((i) => (i ? '#' : '.')).join('')).join('\n'));
}

function part1(data: string) {
    const {dots, grid, folds} = prepareData(data);

    // mark dots on the grid
    dots.forEach(([x, y]) => (grid[y][x] = true));

    const foldMethods = {x: flipX, y: flipY};
    const [direction, foldPoint] = folds[0] || ['x', 0];

    // slice at fold point and reverse side b onto a
    let [a, b] = split(direction, foldPoint, grid);
    console.log(direction, a.length, b.length);
    b = foldMethods[direction](b);
    const c = merge(a, b);
    // count the grid
    return c.flat().reduce((rr, ii) => rr + (ii ? 1 : 0), 0);
}

console.log({part1: part1(input)});
