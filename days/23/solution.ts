function parseInput(input: string) {
  return input.trim().split("\n").map((x) => x.split("-"));
}

function getAdjList(connections: string[][]): Record<string, string[]> {
  const neighbours: Record<string, string[]> = {};
  for (const [a, b] of connections) {
    if (!neighbours[a]) neighbours[a] = [];
    if (!neighbours[b]) neighbours[b] = [];
    neighbours[a].push(b);
    neighbours[b].push(a);
  }

  return neighbours;
}

function searchNetwork(
  node: string,
  req: string[],
  neighbours: Record<string, string[]>,
) {
  for (const pc of req) {
    if (neighbours[node].includes(pc)) continue;
  }
}

export function partOne(input: string): number {
  const connections = parseInput(input);
  const neighbours = getAdjList(connections);

  const threes = new Set<string>();
  for (const a in neighbours) {
    for (const b of neighbours[a]) {
      for (const c of neighbours[b]) {
        if (neighbours[c].includes(a)) {
          if ([a, b, c].some((computer) => computer.startsWith("t"))) {
            threes.add([a, b, c].sort().join(","));
          }
        }
      }
    }
  }
  return threes.size;
}

export function partTwo(input: string): number {
  const connections = parseInput(input);
  const neighbours = getAdjList(connections);
}
