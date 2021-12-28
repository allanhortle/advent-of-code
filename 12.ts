const input = (await Deno.readTextFile('./input/12.txt')).trim();
const test = (await Deno.readTextFile('./test/12a.txt')).trim();

function part1(data: string) {
    const graph: Record<string, string[]> = {};
    data.split('\n').forEach((row) => {
        const [start, end] = row.split('-');
        graph[start] ||= [] as string[];
        graph[end] ||= [] as string[];
        graph[start].push(end);
        graph[end].push(start);
    });

    const paths = new Set();

    function visit(path: string[]): any {
        const key = path[path.length - 1];
        return graph[key].map((target) => {
            if (target.toLowerCase() === target && path.includes(target)) return;
            if (target === 'end') {
                paths.add(path.join(','));
                return;
            }
            return visit(path.concat(target));
        });
    }

    visit(['start']);
    return paths.size;
}

function part2(data: string) {
    const graph: Record<string, string[]> = {};
    data.split('\n').forEach((row) => {
        const [start, end] = row.split('-');
        graph[start] ||= [] as string[];
        graph[end] ||= [] as string[];
        graph[start].push(end);
        graph[end].push(start);
    });

    const paths = new Set();
    const smallCaves = Object.keys(graph).filter(
        (ii) => ii === ii.toLowerCase() && ii !== 'start' && ii !== 'end'
    );
    console.log(smallCaves);

    function visit(path: string[]): any {
        const key = path[path.length - 1];

        return graph[key].map((target) => {
            if (target === 'start') return;
            if (target === 'end') {
                paths.add(path.concat('end').join(','));
                return;
            }
            if (target.toLowerCase() === target) {
                const caveCounts = path
                    .filter((ii) => smallCaves.includes(ii))
                    .reduce((rr, key) => {
                        rr[key] ||= 0;
                        rr[key]++;
                        return rr;
                    }, {} as Record<string, number>);
                if (
                    caveCounts[target] > 1 ||
                    (caveCounts[target] === 1 && Object.values(caveCounts).some((ii) => ii > 1))
                ) {
                    return;
                }
            }
            return visit(path.concat(target));
        });
    }

    visit(['start']);
    //console.log(paths);
    return paths.size;
}

console.log({part1: part1(input), part2: part2(input)});
