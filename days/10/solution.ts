function parseInput(input: string) {
  const trailMap = input.trim().split("\n").map((line) =>
    line.split("").map(Number)
  );
  const trailheads: number[][] = [];
  for (let i = 0; i < trailMap.length; i++) {
    for (let j = 0; j < trailMap[0].length; j++) {
      if (trailMap[i][j] === 0) trailheads.push([i, j]);
    }
  }

  return [trailMap, trailheads];
}

function bfs(
  trailMap: number[][],
  row: number,
  col: number,
): number {
  let paths = 0;
  const q: number[][] = [[row, col]];
  const seen: Set<string> = new Set(`${row},${col}`);

  while (q.length > 0) {
    const [cr, cc] = q.shift()!;
    for (
      const [nr, nc] of [[cr + 1, cc], [cr - 1, cc], [cr, cc + 1], [cr, cc - 1]]
    ) {
      if (
        nr < 0 || nr >= trailMap.length || nc < 0 || nc >= trailMap[0].length
      ) {
        continue;
      }

      if (trailMap[nr][nc] !== trailMap[cr][cc] + 1) continue;
      if (seen.has(`${nr},${nc}`)) continue;

      seen.add(`${nr},${nc}`);

      if (trailMap[nr][nc] === 9) {
        paths++;
      } else {
        q.push([nr, nc]);
      }
    }
  }
  return paths;
}

function dfs(
  trailMap: number[][],
  row: number,
  col: number,
  seen: Set<string>,
): number {
  if (
    row < 0 || row >= trailMap.length ||
    col < 0 || col >= trailMap[0].length
  ) {
    return 0;
  }

  const pos = `${row},${col}`;
  if (seen.has(pos)) {
    return 0;
  }

  if (trailMap[row][col] === 9) {
    return 1;
  }

  seen.add(pos);
  let paths = 0;
  const current = trailMap[row][col];

  [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 && newRow < trailMap.length &&
      newCol >= 0 && newCol < trailMap[0].length &&
      trailMap[newRow][newCol] === current + 1
    ) {
      paths += dfs(trailMap, newRow, newCol, seen);
    }
  });

  seen.delete(pos);
  return paths;
}

export function partOne(input: string): number {
  const [trailMap, trailheads] = parseInput(input);
  let totalPaths = 0;

  trailheads.forEach((head) => {
    totalPaths += bfs(trailMap, head[0], head[1]);
  });

  return totalPaths;
}

export function partTwo(input: string): number {
  const [trailMap, trailheads] = parseInput(input);
  let totalPaths = 0;

  trailheads.forEach(([row, col]) => {
    totalPaths += dfs(trailMap, row, col, new Set());
  });

  return totalPaths;
}
