const raw = await Deno.readTextFile('./input/3.txt');
const data = raw.trim().split('\n');

//
// Part 1

// Build an array to count the frequency of each bit
const trueCounts = new Array(data[0].length).fill(0);
const half = data.length / 2;

// iterate through every number and count the 1s
data.forEach((number) => {
    trueCounts.forEach((_, index) => {
        if (number[index] === '1') trueCounts[index]++;
    });
});

// is gamma if count is below half
const part1Gamma = trueCounts.map((ii) => (ii < half ? '0' : '1')).join('');
// is epsilon if count is aboce half
const part1Epsilon = trueCounts.map((ii) => (ii > half ? '0' : '1')).join('');

// multiply the new numbers
const part1 = parseInt(part1Gamma, 2) * parseInt(part1Epsilon, 2);

//
// Part 2

// Given set of numbers and an index find the most common value
function mostCommonBitAtIndex(data: string[], index: number) {
    const trueCount = data.reduce((rr, ii) => {
        if (ii[index] === '1') return rr + 1;
        return rr;
    }, 0);
    return trueCount >= data.length / 2 ? '1' : '0';
}

// Recurse through a data set based on the rules given
function findReading(most: boolean, data: string[], index = 0): string {
    const commonBit = mostCommonBitAtIndex(data, index);
    // Filter out numbers that dont match the common bit for the current index
    const next = data.filter((ii) => (most ? ii[index] === commonBit : ii[index] !== commonBit));
    // Return if there is one number
    if (next.length <= 1) return next[0];
    // Otherwise keep going with the next index
    return findReading(most, next, index + 1);
}

const oxygen = findReading(true, data);
const co2 = findReading(false, data);
const part2 = parseInt(oxygen, 2) * parseInt(co2, 2);

console.log({part1, part2});
