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
    .filter(({id, match}) => {
        const limit = {
            red: 12,
            green: 13,
            blue: 14
        };

        return match.every((draw) => {
            const [count, color] = draw.split(' ');
            return parseInt(count, 10) <= limit[color];
        });
    })
    .reduce((rr, ii) => rr + ii.id, 0);

console.log(out);
