function parseInput(input: string) {
  const bytes = input.trim().split("\n").map((x) => x.split(",").map(Number));
  return bytes;
}

function getGrid(n: number): string[][] {
  const grid = [];

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(".");
    }
    grid.push(row);
  }
  return grid;
}

function simulateFalling(grid: string[][], bytes: number[][], firstN: number) {
  for (const [x, y] of bytes.slice(0, firstN)) {
    grid[y][x] = "#";
  }
}

function serializeKey(coords: number[]) {
  return `${coords[0]},${coords[1]}`;
}

function findBestPath(grid: string[][], end: number[]) {
  const visited = new Set<string>();
  const q: [number, number, number][] = []; // [x, y, distance]
  q.push([0, 0, 0]); // Start with distance 0

  while (q.length > 0) {
    const [x, y, dist] = q.shift()!;
    const key = serializeKey([x, y]);

    if (visited.has(key)) continue;
    visited.add(key);

    if (x === end[0] && y === end[1]) return dist;

    const directions = [[x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]];
    for (const [nx, ny] of directions) {
      if (nx < 0 || nx >= grid[0].length || ny < 0 || ny >= grid.length) {
        continue;
      }
      const newKey = serializeKey([nx, ny]);
      if (visited.has(newKey)) continue;
      if (grid[ny][nx] === "#") continue;

      q.push([nx, ny, dist + 1]);
    }
  }

  return -1;
}

export function partOne(input: string): number {
  const bytes = parseInput(input);
  const grid = getGrid(71);

  simulateFalling(grid, bytes, 1024);
  // console.log(grid.map((x) => x.join("")).join("\n"));
  return findBestPath(grid, [70, 70]);
}

export function partTwo(input: string): number[] {
  const bytes = parseInput(input);

  let l = 1024;
  let r = bytes.length - 1;
  let mid = 0;
  while (l < r) {
    mid = Math.floor((r + l) / 2);
    const grid = getGrid(71);
    simulateFalling(grid, bytes, mid);
    if (findBestPath(grid, [70, 70]) === -1) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return bytes[mid];
}
