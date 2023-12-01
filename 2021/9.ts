const input = (await Deno.readTextFile('./input/9.txt')).trim();
const test = (await Deno.readTextFile('./test/9.txt')).trim();

class Point {
    x: number;
    y: number;
    height: number;
    constructor(x: number, y: number, height: number) {
        this.x = x;
        this.y = y;
        this.height = height;
    }
    get key() {
        return `(${this.x},${this.y})`;
    }
    equals(point: Point) {
        return this.key === point.key;
    }
    surrounding(grid: Point[][]) {
        const up = grid[this.y - 1]?.[this.x];
        const down = grid[this.y + 1]?.[this.x];
        const left = grid[this.y]?.[this.x - 1];
        const right = grid[this.y]?.[this.x + 1];
        return [up, right, down, left].filter((ii) => ii);
    }
}

function part1(data: string) {
    const grid = data
        .split('\n')
        .map((ii, y) => (ii.match(/\d/g) || []).map((nn, x) => new Point(x, y, parseInt(nn))));
    const lowPoints: Point[] = [];

    grid.forEach((row) => {
        row.forEach((i) => {
            if (i.surrounding(grid).every((s) => i.height < s.height)) {
                lowPoints.push(i);
            }
        });
    });

    return lowPoints.reduce((rr, ii) => {
        return rr + ii.height + 1;
    }, 0);
}

function part2(data: string) {
    const grid = data
        .split('\n')
        .map((ii, y) => (ii.match(/\d/g) || []).map((nn, x) => new Point(x, y, parseInt(nn))));
    const lowPoints: Point[] = [];

    grid.forEach((row) => {
        row.forEach((i) => {
            if (i.surrounding(grid).every((s) => i.height < s.height)) {
                lowPoints.push(i);
            }
        });
    });

    return lowPoints
        .map((low) => {
            // create a queue and a map to track visited squares
            const queue = [low];
            const basin = new Map();

            // while there are still items in the queue, take the first and get the surrounding points
            // if they have not already been visited, and are not 9, add them to the queue
            while (queue.length > 0) {
                const point = queue.shift()!;
                basin.set(point.key, point);
                queue.push(
                    ...point.surrounding(grid).filter((ii) => !basin.get(ii.key) && ii.height !== 9)
                );
            }
            // once the while is done be have a basin
            return basin;
        })
        .map((ii) => ii.size)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((aa, bb) => aa * bb);
}

console.log({part1: part1(input), part2: part2(input)});
