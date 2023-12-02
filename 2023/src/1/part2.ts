const test = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;
const input = await Bun.file('./input').text();

const lines = input.split('\n').filter(Boolean);

const numberWords = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
};

const keyGroup = Object.entries(numberWords).flat().join('|');
const firstMatch = new RegExp(`(${keyGroup})`);
const lastMatch = new RegExp(`.*(${keyGroup}).*?$`);
console.log(keyGroup);
const numbers = lines
    .map((raw) => {
        const [, first] = raw.match(firstMatch);
        const [, last] = raw.match(lastMatch);
        const out = parseInt(`${numberWords[first] ?? first}${numberWords[last] ?? last}`, 10);

        return out;
    })
    .reduce((rr, ii) => rr + ii, 0);

console.log(numbers);
