function parseInput(input: string): [string[][], string] {
  const tmp = input.split("\n\n");
  const grid = tmp[0].trim().split("\n").map((x: string) => x.split(""));
  const moves = tmp[1].trim().split("\n").join("");

  return [grid, moves];
}

function findRobot(grid: string[][]): number[] {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[0].length; row++) {
      if (grid[col][row] === "@") return [col, row];
    }
  }

  return [-1, -1];
}

function computeGPSCoords(grid: string[][]): number {
  let res = 0;
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[0].length; row++) {
      if (grid[col][row] === "O" || grid[col][row] === "[") {
        res += (100 * col) + row;
      }
    }
  }

  return res;
}

function scaleUp(grid: string[][]): string[][] {
  const newObjects: { [key: string]: string } = {
    "#": "##",
    "O": "[]",
    ".": "..",
    "@": "@.",
  };
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[0].length; row++) {
      grid[col][row] = newObjects[grid[col][row]];
    }
  }
  return grid.map((x) => x.join("")).map((x) => x.split(""));
}

function serializeKey(coords: number[]) {
  return `${coords[0]},${coords[1]}`;
}

function deserializeKey(key: string) {
  return key.split(",").map(Number);
}

export function partOne(input: string): number {
  const [grid, moves] = parseInput(input);
  let robot = findRobot(grid);
  const movesDict: { [key: string]: number[] } = {
    "^": [-1, 0],
    "<": [0, -1],
    ">": [0, 1],
    "v": [1, 0],
  };

  for (const move of moves) {
    const moveX = movesDict[move][1];
    const moveY = movesDict[move][0];
    let nx = robot[1] + moveX;
    let ny = robot[0] + moveY;
    if (grid[ny][nx] === "#") continue;

    const boxes: number[][] = [];
    let canMove = true;
    while (true) {
      if (grid[ny][nx] === "#") {
        canMove = false;
        break;
      } else if (grid[ny][nx] === ".") {
        break;
      } else if (grid[ny][nx] === "O") {
        boxes.push([ny, nx]);
      }
      nx += moveX;
      ny += moveY;
    }

    if (!canMove) continue;

    for (const box of boxes) {
      grid[box[0] + moveY][box[1] + moveX] = "O";
    }

    grid[robot[0]][robot[1]] = ".";
    robot = [robot[0] + moveY, robot[1] + moveX];
    grid[robot[0]][robot[1]] = "@";

    // console.log(grid.map((x) => x.join("")).join("\n"));
  }
  // console.log(grid.map((x) => x.join("")).join("\n"));

  return computeGPSCoords(grid);
}

export function partTwo(input: string): number {
  let [grid, moves] = parseInput(input);
  grid = scaleUp(grid);
  let robot = findRobot(grid);
  const movesDict: { [key: string]: number[] } = {
    "^": [-1, 0],
    "<": [0, -1],
    ">": [0, 1],
    "v": [1, 0],
  };

  for (const move of moves) {
    const moveX = movesDict[move][1];
    const moveY = movesDict[move][0];

    const objects: Map<string, string> = new Map();
    objects.set(serializeKey([robot[0], robot[1]]), "@");

    let canMove = true;
    for (const key of objects.keys()) {
      const [y, x] = deserializeKey(key);
      const nx = x + moveX;
      const ny = y + moveY;
      if (objects.has(serializeKey([ny, nx]))) continue;

      if (grid[ny][nx] === "#") {
        canMove = false;
        break;
      } else if (grid[ny][nx] === "[") {
        objects.set(serializeKey([ny, nx]), "[");
        objects.set(serializeKey([ny, nx + 1]), "]");
      } else if (grid[ny][nx] === "]") {
        objects.set(serializeKey([ny, nx]), "]");
        objects.set(serializeKey([ny, nx - 1]), "[");
      }
    }

    if (!canMove) continue;

    for (const key of objects.keys()) {
      const [y, x] = deserializeKey(key);
      grid[y][x] = ".";
    }

    for (const [key, char] of objects) {
      const [y, x] = deserializeKey(key);
      grid[y + moveY][x + moveX] = char;
    }

    robot = [robot[0] + moveY, robot[1] + moveX];
    // console.log(grid.map((x) => x.join("")).join("\n"));
  }
  // console.log(grid.map((x) => x.join("")).join("\n"));

  return computeGPSCoords(grid);
}
