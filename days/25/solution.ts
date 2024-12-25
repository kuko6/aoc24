function parseInput(input: string) {
  const schematics = input.trim().split("\n\n");

  const keys: string[][] = [];
  const locks: string[][] = [];
  for (const schematic of schematics) {
    if (schematic[0] === "#") {
      keys.push(schematic.split("\n"));
    } else {
      locks.push(schematic.split("\n"));
    }
  }

  return [keys, locks];
}

function convertToHeights(schematics: string[][]) {
  const numberOfSchematics = schematics.length;
  const columns = schematics[0].length;
  const rows = schematics[0][0].length;

  const heights = [];
  for (let i = 0; i < numberOfSchematics; i++) {
    const schematic = schematics[i];
    const curHeights = [];
    for (let j = 0; j < rows; j++) {
      let curHeight = 0;
      for (let k = 0; k < columns; k++) {
        if (schematic[k][j] === "#") curHeight++;
      }
      curHeights.push(curHeight === 0 ? 0 : curHeight - 1);
    }
    heights.push(curHeights);
  }

  return heights;
}

export function partOne(input: string): number {
  const [keys, locks] = parseInput(input);
  const keysTopology = convertToHeights(keys);
  const locksTopology = convertToHeights(locks);

  const maxHeight = locks[0].length;
  let res = 0;
  for (const key of keysTopology) {
    for (const lock of locksTopology) {
      let bad = false;
      for (let i = 0; i < lock.length; i++) {
        if (maxHeight - (lock[i] + key[i]) - 1 <= 0) {
          bad = true;
          break;
        }
      }
      if (!bad) res++;
    }
  }

  return res;
}

export function partTwo(input: string): number {}
