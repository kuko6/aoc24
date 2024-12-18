import { ascend, BinaryHeap } from "@std/data-structures";

function parseInput(input: string) {
  return input.trim().split("\n").map((x) => x.split(""));
}

function findDeer(grid: string[][]): number[] {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") return [y, x];
    }
  }

  return [-1, -1];
}

function serializeKey(coords: number[], direction: number[]) {
  return `${coords[0]},${coords[1]},${direction[0]},${direction[1]}`;
}

// function deserializeKey(key: string) {
//   return key.split(",").map(Number);
// }

export function partOne(input: string): number {
  const grid = parseInput(input);
  const deer = findDeer(grid);
  const pq = new BinaryHeap<number[]>((a, b) => ascend(a[0], b[0]));
  const visited = new Set<string>();
  pq.push([0, deer[0], deer[1], 0, 1]);

  while (pq.length > 0) {
    const [cost, y, x, dy, dx] = pq.pop()!;
    visited.add(serializeKey([y, x], [dy, dx]));

    if (grid[y][x] === "E") return cost;

    const directions = [
      [cost + 1, y + dy, x + dx, dy, dx],
      [cost + 1000, y, x, dx, dy * -1],
      [cost + 1000, y, x, dx * -1, dy],
    ];
    for (const [nCost, ny, nx, ndy, ndx] of directions) {
      if (grid[ny][nx] === "#") continue;
      const key = serializeKey([ny, nx], [ndy, ndx]);
      if (visited.has(key)) continue;
      pq.push([nCost, ny, nx, ndy, ndx]);
    }
  }

  return -1;
}

export function partTwo(input: string): number {
  return -1;
}
