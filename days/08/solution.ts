function parseInput(input: string): [string[][], string[]] {
  const antennaMap = input.trim().split("\n").map((line) => line.split(""));
  const antennas = [...new Set(antennaMap.flat())].filter((c) => c !== ".");
  return [antennaMap, antennas];
}

function getAntennaCoords(antennaMap: string[][], antenna: string): number[][] {
  const coords: number[][] = [];
  antennaMap.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === antenna) {
        coords.push([i, j]);
      }
    });
  });
  return coords;
}

function inBoundaries(rows: number, cols: number, coords: number[]): boolean {
  return coords[0] >= 0 && coords[0] < rows && coords[1] >= 0 &&
    coords[1] < cols;
}

export function partOne(input: string): number {
  const [antennaMap, antennas] = parseInput(input);
  const rows = antennaMap.length;
  const cols = antennaMap[0].length;
  const antinodes = new Set<string>();

  const markedMap = antennaMap.map((row) => [...row]);

  for (const antenna of antennas) {
    const antennaCoords = getAntennaCoords(antennaMap, antenna);
    for (let i = 0; i < antennaCoords.length; i++) {
      for (let j = i + 1; j < antennaCoords.length; j++) {
        const [y1, x1] = antennaCoords[i];
        const [y2, x2] = antennaCoords[j];

        const antinodeCoords = [
          [2 * y1 - y2, 2 * x1 - x2],
          [2 * y2 - y1, 2 * x2 - x1],
        ];

        for (const [y, x] of antinodeCoords) {
          if (inBoundaries(rows, cols, [y, x])) {
            antinodes.add(`${y},${x}`);
            markedMap[y][x] = "#";
          }
        }
      }
    }
  }
  // console.log(markedMap.map((row) => row.join("")).join("\n"));
  return antinodes.size;
}

export function partTwo(input: string): number {
  const [antennaMap, antennas] = parseInput(input);
  const rows = antennaMap.length;
  const cols = antennaMap[0].length;
  const antinodes = new Set<string>();

  for (const antenna of antennas) {
    const antennaCoords = getAntennaCoords(antennaMap, antenna);
    for (let i = 0; i < antennaCoords.length; i++) {
      for (let j = 0; j < antennaCoords.length; j++) {
        if (i === j) continue;

        const [y1, x1] = antennaCoords[i];
        const [y2, x2] = antennaCoords[j];
        const dy = y2 - y1;
        const dx = x2 - x1;
        let x = x1;
        let y = y1;

        while (inBoundaries(rows, cols, [y, x])) {
          antinodes.add(`${y},${x}`);
          x += dx;
          y += dy;
        }
      }
    }
  }

  return antinodes.size;
}
