function parseInput(input: string): number[] {
  return input.trim().split(" ").map(Number);
}

function blink(stones: number[]): number[] {
  for (let j = 0; j < stones.length; j++) {
    if (stones[j] === 0) {
      stones[j] = 1;
    } else if (String(stones[j]).length % 2 === 0) {
      const tmp = String(stones[j]);
      stones.splice(
        j,
        1,
        Number(tmp.slice(0, tmp.length / 2)),
        Number(tmp.slice(tmp.length / 2)),
      );
      j++;
    } else {
      stones[j] *= 2024;
    }
  }

  return stones;
}

function blink2(stonesMap: Map<number, number>): Map<number, number> {
  const newMap = new Map<number, number>();

  for (const [stone, count] of stonesMap.entries()) {
    if (stone === 0) {
      newMap.set(1, (newMap.get(1) || 0) + count);
    } else {
      const tmp = String(stone);
      if (tmp.length % 2 === 0) {
        const part1 = Number(tmp.slice(0, tmp.length / 2));
        const part2 = Number(tmp.slice(tmp.length / 2));
        newMap.set(part1, (newMap.get(part1) || 0) + count);
        newMap.set(part2, (newMap.get(part2) || 0) + count);
      } else {
        const newStone = stone * 2024;
        newMap.set(newStone, (newMap.get(newStone) || 0) + count);
      }
    }
  }

  return newMap;
}

export function partOne(input: string): number {
  let stones = parseInput(input);
  const blinks = 25;
  for (let i = 0; i < blinks; i++) {
    stones = blink(stones);
  }

  return stones.length;
}

export function partTwo(input: string): number {
  const stones = parseInput(input);

  let stonesMap = new Map<number, number>();
  for (const stone of stones) {
    stonesMap.set(stone, (stonesMap.get(stone) || 0) + 1);
  }

  const blinks = 75;
  for (let i = 0; i < blinks; i++) {
    stonesMap = blink2(stonesMap);
  }

  let totalStones = 0;
  for (const count of stonesMap.values()) {
    totalStones += count;
  }

  return totalStones;
}
