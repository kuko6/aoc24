function parseInput(input: string) {
  return input.trim().split("\n").map((x) => x.split(""));
}

function getStartingPosition(labMap: string[][]): number[] {
  return labMap.map((line, rowIndex) => {
    const colIndex = line.indexOf("^");
    return colIndex !== -1 ? [rowIndex, colIndex] : null;
  }).filter((pos) => pos !== null)[0];
}

function checkGuardMovement(
  labMap: string[][],
  guardPosition: number[],
): number {
  const n = labMap.length;
  const m = labMap[0].length;
  const movement = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let currentMovement = 0;
  const seen: Set<string> = new Set();

  while (true) {
    seen.add(`${guardPosition[0]},${guardPosition[1]}`);
    labMap[guardPosition[0]][guardPosition[1]] = "X"; // for debugging :d

    const nextGuardPosition = [
      guardPosition[0] + movement[currentMovement % 4][0],
      guardPosition[1] + movement[currentMovement % 4][1],
    ];

    if (
      nextGuardPosition[0] >= n || nextGuardPosition[0] < 0 ||
      nextGuardPosition[1] >= m || nextGuardPosition[1] < 0
    ) break;

    if (labMap[nextGuardPosition[0]][nextGuardPosition[1]] === "#") {
      currentMovement++;
    } else {
      guardPosition = nextGuardPosition;
    }
  }

  // console.log(labMap.map((x) => x.join("")).join("\n"));
  // console.log(guardPosition);
  return seen.size;
}

function checkGuardMovement2(
  labMap: string[][],
  guardPosition: number[],
): boolean {
  const n = labMap.length;
  const m = labMap[0].length;
  const movement = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let currentMovement = 0;
  const seen: Set<string> = new Set();

  while (true) {
    const entry = `${guardPosition[0]},${guardPosition[1]},${
      currentMovement % 4
    }`;

    if (seen.has(entry)) {
      return true;
    }

    seen.add(entry);

    const nextGuardPosition = [
      guardPosition[0] + movement[currentMovement % 4][0],
      guardPosition[1] + movement[currentMovement % 4][1],
    ];

    if (
      nextGuardPosition[0] >= n || nextGuardPosition[0] < 0 ||
      nextGuardPosition[1] >= m || nextGuardPosition[1] < 0
    ) break;

    if (labMap[nextGuardPosition[0]][nextGuardPosition[1]] === "#") {
      currentMovement++;
    } else {
      guardPosition = nextGuardPosition;
    }
  }

  return false;
}

export function partOne(input: string): number {
  const labMap = parseInput(input);
  const guardPosition = getStartingPosition(labMap);

  return checkGuardMovement(labMap, guardPosition);
}

export function partTwo(input: string): number {
  const labMap = parseInput(input);
  const guardPosition = getStartingPosition(labMap);

  let res = 0;

  // would be better to just test the '.' right infront of the guard
  // but this works too -_(o,o)_-
  for (let i = 0; i < labMap.length; i++) {
    for (let j = 0; j < labMap[0].length; j++) {
      if (labMap[i][j] !== ".") continue;

      labMap[i][j] = "#";
      if (checkGuardMovement2(labMap, guardPosition)) {
        res += 1;
      }
      labMap[i][j] = ".";
    }
  }

  return res;
}
