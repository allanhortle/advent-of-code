const raw = await Deno.readTextFile('./input/7.txt');
const test = '16,1,2,0,4,2,7,1,2,14';

function part1() {
    const data = raw.split(',').map((ii) => parseInt(ii));
    const min = Math.min(...data);
    const max = Math.max(...data);
    return Math.min(
        ...Array.from(new Array(max), (_, i) => i + min).map((goal) => {
            return data.reduce((rr, ii) => {
                const used = ii > goal ? ii - goal : goal - ii;
                return rr + used;
            }, 0);
        })
    );
}

function part2() {
    const data = raw.split(',').map((ii) => parseInt(ii));
    const min = Math.min(...data);
    const max = Math.max(...data);
    return Math.min(
        ...Array.from(new Array(max), (_, i) => i + min).map((goal) => {
            return data.reduce((rr, ii) => {
                const used = ii > goal ? ii - goal : goal - ii;
                const triangle = (used * (used + 1)) / 2;
                return rr + triangle;
            }, 0);
        })
    );
}

console.log({part1: part1(), part2: part2()});
