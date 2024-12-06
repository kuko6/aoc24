function parseInput(input: string) {
  return input.trim().split("\n").map((x) => x.split(""));
}

export function partOne(input: string): number {
  let labMap = parseInput(input);
  let guardPosition = labMap.map((line, rowIndex) => {
    const colIndex = line.indexOf("^");
    return colIndex !== -1 ? [rowIndex, colIndex] : null;
  }).filter((pos) => pos !== null)[0];

  const n = labMap.length;
  const m = labMap[0].length;
  const movement = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let currentMovement = 0;

  while (
    guardPosition[0] >= 0 && guardPosition[0] < n &&
    guardPosition[1] >= 0 && guardPosition[1] < m
  ) {
    if (labMap[guardPosition[0]][guardPosition[1]] === "#") {
      guardPosition[0] -= movement[currentMovement % 4][0];
      guardPosition[1] -= movement[currentMovement % 4][1];
      currentMovement++;
    } else {
      labMap[guardPosition[0]][guardPosition[1]] = "X";
    }

    guardPosition[0] += movement[currentMovement % 4][0];
    guardPosition[1] += movement[currentMovement % 4][1];

    // console.log("After move:");
    // console.log(labMap.map((x) => x.join("")).join("\n"));
    // console.log("-------------------");
  }

  return labMap.map((x) => x.join("")).join("\n").match(/X/g)!.length;
}
export function partTwo(input: string): number {}
