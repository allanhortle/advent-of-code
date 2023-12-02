const test = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
Game 100: 100 red
`;
const input = await Bun.file('./input').text();

const out = input
    .split('\n')
    .filter(Boolean)
    .map((rawGame) => {
        const [, id, draws] = rawGame.match(/Game (\d+): (.*)/) ?? [];
        const match = draws.match(/((\d+) (blue|red|green))/g);
        return {id: parseInt(id, 10), draws, match};
    })
    .map(({id, match}) => {
        const minimum = {
            red: 0,
            green: 0,
            blue: 0
        };

        match.forEach((str) => {
            const [value, color] = str.split(' ');
            const count = parseInt(value, 10);
            if (count > minimum[color]) minimum[color] = count;
        });

        return minimum.red * minimum.green * minimum.blue;
    })
    .reduce((rr, ii) => rr + ii, 0);

console.log(out);
