const input = (await Deno.readTextFile('./input/11.txt')).trim();
const test = (await Deno.readTextFile('./test/11.txt')).trim();
const FLASH_POINT = 10;

class Point {
    x: number;
    y: number;
    level: number;
    constructor(x: number, y: number, level: number) {
        this.x = x;
        this.y = y;
        this.level = level;
    }
    get key() {
        return `(${this.x},${this.y})`;
    }
    surrounding(grid: Point[][]) {
        const {x, y} = this;
        return [
            // top row
            grid[y - 1]?.[x - 1],
            grid[y - 1]?.[x],
            grid[y - 1]?.[x + 1],
            // middle row
            grid[y]?.[x - 1],
            grid[y]?.[x + 1],
            // bottom row
            grid[y + 1]?.[x - 1],
            grid[y + 1]?.[x],
            grid[y + 1]?.[x + 1]
        ].filter((ii) => ii);
    }
}

function part1(data: string, iterations: number) {
    const grid = data
        .split('\n')
        .map((ii, y) => (ii.match(/\d/g) || []).map((nn, x) => new Point(x, y, parseInt(nn))));
    const list = grid.flat();

    const steps = [...new Array(iterations)]
        .map(() => {
            const flashes = new Map();
            list.forEach((point) => point.level++);
            const queue = list.filter((p) => p.level >= FLASH_POINT);

            while (queue.length > 0) {
                const point = queue.shift()!;
                flashes.set(point.key, point);
                const newFlashes = point.surrounding(grid).filter((p) => {
                    p.level = Math.min(10, p.level + 1);
                    return !flashes.get(p.key) && queue.indexOf(p) === -1 && p.level >= FLASH_POINT;
                });
                queue.push(...newFlashes);
            }
            list.forEach((p) => {
                if (p.level >= FLASH_POINT) p.level = 0;
            });

            return flashes.size;
        })
        .reduce((rr, ii) => rr + ii, 0);

    return steps;
}

function part2(data: string) {
    const grid = data
        .split('\n')
        .map((ii, y) => (ii.match(/\d/g) || []).map((nn, x) => new Point(x, y, parseInt(nn))));
    const list = grid.flat();

    let go = true;
    let step = 1;

    while (go) {
        const flashes = new Map();
        list.forEach((point) => point.level++);
        const queue = list.filter((p) => p.level >= FLASH_POINT);

        while (queue.length > 0) {
            const point = queue.shift()!;
            flashes.set(point.key, point);
            const newFlashes = point.surrounding(grid).filter((p) => {
                p.level = Math.min(10, p.level + 1);
                return !flashes.get(p.key) && queue.indexOf(p) === -1 && p.level >= FLASH_POINT;
            });
            queue.push(...newFlashes);
        }
        list.forEach((p) => {
            if (p.level >= FLASH_POINT) p.level = 0;
        });

        if (flashes.size === list.length) {
            go = false;
        } else {
            step++;
        }
    }
    return step;
}

console.log({part1: part1(input, 100), part2: part2(input)});
