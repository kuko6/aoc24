// inspired by https://www.youtube.com/watch?v=KXwKGWSQvS0

function parseInput(input: string) {
  return input.trim().split("\n").map((x) => x.split(""));
}

function bfs(
  grid: string[][],
  i: number,
  j: number,
  field: string,
): Set<string> {
  const q: number[][] = [[i, j]];
  const region: Set<string> = new Set();
  region.add(`${i},${j}`);

  while (q.length > 0) {
    const [ci, cj] = q.shift()!;
    for (
      const [ni, nj] of [[ci + 1, cj], [ci - 1, cj], [ci, cj + 1], [ci, cj - 1]]
    ) {
      if (
        ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[0].length
      ) {
        continue;
      }
      if (region.has(`${ni},${nj}`)) continue;
      if (grid[ni][nj] !== field) continue;

      q.push([ni, nj]);
      region.add(`${ni},${nj}`);
    }
  }

  return region;
}

function getRegions(grid: string[][]): Set<string>[] {
  const regions = [];
  let seen: Set<string> = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (seen.has(`${i},${j}`)) continue;
      seen.add(`${i},${j}`);

      const newRegion = bfs(grid, i, j, grid[i][j]);
      regions.push(newRegion);
      seen = seen.union(newRegion);
    }
  }

  return regions;
}

function getPrice(regions: Set<string>[]) {
  let price = 0;
  regions.forEach((region) => {
    let perimeter = 0;
    for (const field of region) {
      const [i, j] = field.split(",").map(Number);
      perimeter += 4;
      for (const [ni, nj] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) {
        if (region.has(`${ni},${nj}`)) perimeter--;
      }
    }
    price += perimeter * region.size;
  });

  return price;
}

export function partOne(input: string): number {
  const grid = parseInput(input);
  const regions = getRegions(grid);

  // console.log(regions);
  return getPrice(regions);
}

export function partTwo(input: string): number {}
