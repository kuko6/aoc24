function parseInput(input: string) {
  return input.trim().split("\n").map((x) => x.split(""));
}

function findStart(grid: string[][]): number[] {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === "S") return [x, y];
    }
  }
  return [-1, -1];
}

function createDistanceGrid(n: number, m: number): number[][] {
  const distances: number[][] = [];
  for (let i = 0; i < m; i++) {
    const tmp = [];
    for (let j = 0; j < n; j++) {
      tmp.push(-1);
    }
    distances.push(tmp);
  }

  return distances;
}

function exploreGrid(
  grid: string[][],
  n: number,
  m: number,
) {
  let [x, y] = findStart(grid);
  const q: number[][] = [[x, y]];
  const distances = createDistanceGrid(n, m);
  distances[y][x] = 0;

  while (q.length > 0) {
    [x, y] = q.shift()!;
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (grid[ny][nx] === "#") continue;
      if (distances[ny][nx] !== -1) continue;
      distances[ny][nx] = distances[y][x] + 1;
      q.push([nx, ny]);
    }
  }

  return distances;
}

function serializeKey(coords: number[], saved: number) {
  return `${coords[0]},${coords[1]},${saved}`;
}

export function partOne(input: string): number {
  const grid = parseInput(input);
  const m = grid.length;
  const n = grid[0].length;

  const distances = exploreGrid(grid, n, m);

  let res = 0;
  for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
      if (grid[y][x] === "#") continue;
      for (const [nx, ny] of [[x + 2, y], [x - 2, y], [x, y + 2], [x, y - 2]]) {
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (grid[ny][nx] === "#") continue;
        if (distances[ny][nx] - distances[y][x] >= 102) {
          res++;
        }
      }
    }
  }
  return res;
}

export function partTwo(input: string): number {
  const grid = parseInput(input);
  const m = grid.length;
  const n = grid[0].length;

  const distances = exploreGrid(grid, n, m);
  const res = new Set<string>();
  for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
      if (grid[y][x] === "#") continue;
      for (let timeCheating = 2; timeCheating <= 20; timeCheating++) {
        for (let dx = 0; dx <= timeCheating; dx++) {
          const dy = timeCheating - dx;
          for (
            const [nx, ny] of [
              [x + dx, y + dy],
              [x + dx, y - dy],
              [x - dx, y + dy],
              [x - dx, y - dy],
            ]
          ) {
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (grid[ny][nx] === "#") continue;
            const saved = distances[ny][nx] - distances[y][x];
            if (saved >= 100 + timeCheating) {
              res.add(serializeKey([x, y], saved));
            }
          }
        }
      }
    }
  }
  return res.size;
}
