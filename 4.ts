const raw = await Deno.readTextFile('./input/4.txt');

const testData = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;
const [rawDraws, ...rawBoards] = raw.trim().split('\n\n');
//const [rawDraws, ...rawBoards] = testData.trim().split('\n\n');

class BingoBoard {
    coordinates: Record<string, [number, number]>;
    items: string[];
    counts: number[];
    unmarked: Set<string>;
    marked: Set<string>;
    won: boolean;
    constructor(items: string[]) {
        this.coordinates = {};
        this.items = items;
        this.unmarked = new Set();
        this.marked = new Set();
        this.won = false;
        this.counts = new Array(10).fill(0);
        items.forEach((item, index) => {
            this.coordinates[item] = [Math.floor(index / 5), index % 5];
            this.unmarked.add(item);
        });
    }
    draw(draw: string): boolean {
        if (this.won) return true;
        const [x, y] = this.coordinates[draw] || [];
        if (x != null && y !== null) {
            this.counts[x]++;
            this.counts[y + 5]++;
            this.unmarked.delete(draw);
            this.marked.add(draw);
        }
        this.won = this.counts.indexOf(5) !== -1;
        return this.won;
    }
    get score() {
        const sum = [...this.unmarked].reduce((a, b) => a + parseInt(b, 10), 0);
        const lastDraw = parseInt([...this.marked][this.marked.size - 1]);
        return sum * lastDraw;
    }
}

const draws = rawDraws.split(',');

//
// Part 1

let part1;
const part1Boards = rawBoards.map(
    (ii) => new BingoBoard(ii.split('\n').flatMap((ii) => ii.trim().split(/\s+/)))
);
for (const draw of draws) {
    const run = part1Boards.map((bb) => bb.draw(draw));
    const winner = part1Boards[run.indexOf(true)];
    if (winner) {
        part1 = winner.score;
        break;
    }
}

//
// Part 2

const part2Boards = rawBoards.map(
    (ii) => new BingoBoard(ii.split('\n').flatMap((ii) => ii.trim().split(/\s+/)))
);
const runs = draws.map((draw) => part2Boards.map((bb) => bb.draw(draw)).indexOf(false));
const part2 = part2Boards[runs.reduce((aa, bb) => (aa > bb ? aa : bb))].score;
console.log({part1, part2});
