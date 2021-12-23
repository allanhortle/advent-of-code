const raw = await Deno.readTextFile('./input/6.txt');
const test = '3,4,3,1,2';

function data(input: string): number[] {
    return input.split(',').map((ii) => parseInt(ii, 10));
}

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

console.log({part1});
