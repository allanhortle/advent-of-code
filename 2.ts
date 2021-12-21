const raw = await Deno.readTextFile('./input/2.txt');

const data = raw.trim().split('\n');

// part 1
let part1Depth = 0;
let part1Position = 0;
data.forEach((instruction) => {
    const match = instruction.match(/([a-z]*)\s(\d*)/) || [];
    const command = match[1];
    const value = parseInt(match[2]);

    switch (command) {
        case 'forward':
            part1Position += value;
            return;

        case 'up':
            part1Depth -= value;
            return;

        case 'down':
            part1Depth += value;
            return;
    }
});
const part1 = part1Depth * part1Position;

// part 2
let part2Depth = 0;
let part2Position = 0;
let part2Aim = 0;

data.forEach((instruction) => {
    const match = instruction.match(/([a-z]*)\s(\d*)/) || [];
    const command = match[1];
    const value = parseInt(match[2]);

    switch (command) {
        case 'forward':
            part2Position += value;
            part2Depth += part2Aim * value;
            return;

        case 'up':
            part2Aim -= value;
            return;

        case 'down':
            part2Aim += value;
            return;
    }
});
const part2 = part2Depth * part2Position;
console.log({part1, part2});
