type Robot = {
  "P": number[];
  "V": number[];
};

function parseInput(input: string): Robot[] {
  const values = input.trim().split("\n").map((m) =>
    Array.from(m.matchAll(/-?\d+/g), (x) => x[0]).map(Number)
  );

  return values.map((r) => ({
    "P": [r[0], r[1]],
    "V": [r[2], r[3]],
  }));
}

function createMap(n: number, m: number): string[][] {
  const grid: string[][] = [];

  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < m; j++) {
      grid[i][j] = ".";
    }
  }
  return grid;
}

function drawRobots(n: number, m: number, robots: Robot[]): string {
  const grid = createMap(n, m);
  robots.forEach((robot) => {
    if (grid[robot.P[1]][robot.P[0]] === ".") {
      grid[robot.P[1]][robot.P[0]] = "1";
    } else {
      grid[robot.P[1]][robot.P[0]] = String(
        Number(grid[robot.P[1]][robot.P[0]]) + 1,
      );
    }
  });
  // console.log(grid.map((x) => x.join("")).join("\n"), "\n");

  // const middleX = Math.floor(m / 2);
  // const middleY = Math.floor(n / 2);
  // for (let row = 0; row < m; row++) {
  //   grid[middleY][row] = " ";
  // }
  // for (let col = 0; col < n; col++) {
  //   grid[col][middleX] = " ";
  // }

  // console.log(grid.map((x) => x.join("")).join("\n"), "\n");
  return grid.map((x) => x.join("")).join("\n");
}

function getSafetyFactor(n: number, m: number, robots: Robot[]): number {
  const middleX = Math.floor(m / 2);
  const middleY = Math.floor(n / 2);
  const quadrants = [0, 0, 0, 0];

  robots.forEach((robot) => {
    if (robot.P[0] < middleX && robot.P[1] < middleY) {
      quadrants[0]++;
    } else if (
      (robot.P[0] > middleX && robot.P[0] < m) && robot.P[1] < middleY
    ) {
      quadrants[1]++;
    } else if (
      robot.P[0] < middleX && (robot.P[1] > middleY && robot.P[1] < n)
    ) {
      quadrants[2]++;
    } else if (
      (robot.P[0] > middleX && robot.P[0] < m) &&
      (robot.P[1] > middleY && robot.P[1] < n)
    ) {
      quadrants[3]++;
    }
  });

  // console.log(quadrants);
  return quadrants.reduce((acc, val) => acc *= val, 1);
}

export function partOne(input: string): number {
  const robots = parseInput(input);
  // const m = 11;
  const m = 101;
  // const n = 7;
  const n = 103;
  const t = 100;

  robots.forEach((robot) => {
    for (let s = 0; s < t; s++) {
      let nx = robot.P[0] + robot.V[0];
      if (nx >= m) {
        nx = nx % m;
      } else if (nx < 0) {
        nx = m + nx;
      }

      let ny = robot.P[1] + robot.V[1];
      if (ny >= n) {
        ny = ny % n;
      } else if (ny < 0) {
        ny = n + ny;
      }
      robot.P = [nx, ny];
    }
  });
  // drawRobots(n, m, robots);
  return getSafetyFactor(n, m, robots);
}

export function partTwo(input: string): number {
  const robots = parseInput(input);
  const m = 101;
  const n = 103;

  let s = 0;
  while (true) {
    s += 1;
    robots.forEach((robot) => {
      let nx = robot.P[0] + robot.V[0];
      if (nx >= m) {
        nx = nx % m;
      } else if (nx < 0) {
        nx = m + nx;
      }

      let ny = robot.P[1] + robot.V[1];
      if (ny >= n) {
        ny = ny % n;
      } else if (ny < 0) {
        ny = n + ny;
      }
      robot.P = [nx, ny];
    });

    const grid = drawRobots(n, m, robots);
    const isTree = grid.split("\n").every((line) =>
      /^[1.]*$/.test(line.trim())
    );

    if (isTree) {
      console.log(grid);
      break;
    }
  }
  return s;
}
