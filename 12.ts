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
    console.log(paths, paths.size);
}

console.log({part1: part1(input)});
