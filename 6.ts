const raw = await Deno.readTextFile('./input/6.txt');
const test = '3,4,3,1,2';

function data(input: string): number[] {
    return input.split(',').map((ii) => parseInt(ii, 10));
}

//
// Part 1
//

function cycle(fish: number[]) {
    const newFish: number[] = [];
    const nextFish = fish.map((ii) => {
        if (ii === 0) {
            newFish.push(8);
            return 6;
        }
        return ii - 1;
    });

    return nextFish.concat(newFish);
}

const part1 = [...new Array(80)].reduce((aa) => cycle(aa), data(raw)).length;

//
// Part 2
//

const part2data = raw.split(',').reduce((rr, ii) => {
    rr[parseInt(ii)]++;
    return rr;
}, new Array(9).fill(0));

const part2 = [...new Array(256)]
    .reduce((state) => {
        const newFish = state.shift();
        state[6] += newFish;
        state[8] = newFish;
        return state;
    }, part2data)
    .reduce((aa: number, bb: number) => aa + bb);

console.log({part1, part2});
