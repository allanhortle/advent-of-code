const input = await Bun.file('./input').text();

const lines = input.split('\n').filter(Boolean);

const numbers = lines
    .map((raw) => {
        const [, first] = raw.match(/^\D*?(\d)/);
        const [, last] = raw.match(/(\d)\D*?$/);
        return parseInt(`${first}${last}`, 10);
    })
    .reduce((rr, ii) => rr + ii, 0);

console.log(numbers);
