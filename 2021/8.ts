const raw = await Deno.readTextFile('./input/8.txt');
const test = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

function part1(data: string) {
    let count = 0;
    data.trim()
        .split('\n')
        .forEach((row) => {
            const [_, output] = row.split(' | ');
            output.split(' ').forEach((ii) => {
                if (ii.length === 2) count++;
                if (ii.length === 4) count++;
                if (ii.length === 3) count++;
                if (ii.length === 7) count++;
            });
        });
    return count;
}

function part2(data: string) {
    /*
    [2,3,5]
    mask 1 = 4,3,4 (length 3 = 3)
    mask 4 = 3,2,2,(length 3 = 2)
    left over = 5;

    [0,6,9]
    mask 1 = 4,5,4 (length 5 = 6)
    mask 4 = 3,3,2 (length 2 = 9)
    left over is 0
    */
    // sort a string
    function sort(items: string): string {
        return [...items].sort().join('');
    }

    // given a list mask each item with a number and find the item with the target length
    function find(list: string[], mask: string, target: number) {
        return list.find((ii) => ii.replace(new RegExp(`[${mask}]`, 'g'), '').length === target);
    }

    return data
        .trim()
        .split('\n')
        .reduce((count, row) => {
            const [input, output] = row.split(' | ');

            // Partial knowledge
            const twoFiveThree: string[] = (input.match(/\b[abcdefg]{5}\b/g) || []).map(sort);
            const zeroSixNine: string[] = (input.match(/\b[abcdefg]{6}\b/g) || []).map(sort);

            // Known
            const one = sort(input.match(/\b[abcdefg]{2}\b/g)?.[0] || '');
            const four = sort(input.match(/\b[abcdefg]{4}\b/g)?.[0] || '');
            const seven = sort(input.match(/\b[abcdefg]{3}\b/g)?.[0] || '');
            const eight = sort(input.match(/\b[abcdefg]{7}\b/g)?.[0] || '');

            // Derived
            const three = find(twoFiveThree, one, 3);
            const two = find(twoFiveThree, four, 3);
            const five = twoFiveThree.find((ii) => ii !== two && ii !== three);
            const six = find(zeroSixNine, one, 5);
            const nine = find(zeroSixNine, four, 2);
            const zero = zeroSixNine.find((ii) => ii !== six && ii !== nine);

            const counts = [zero, one, two, three, four, five, six, seven, eight, nine];

            const number = output
                .split(' ')
                .reduce((rr, ii) => rr.concat(String(counts.indexOf(sort(ii)))), '');

            return count + parseInt(number, 10);
        }, 0);
}

console.log({part1: part1(raw), part2: part2(raw)});
