function parseInput(input: string) {
  return input.trim().split("\n").map(Number);
}

function step(num: number) {
  num = (num ^ (num << 6)) & 0xffffff;
  num = (num ^ (num >> 5)) & 0xffffff;
  num = (num ^ (num << 11)) & 0xffffff;

  return num;
}

function serializeKey(nums: number[]) {
  return `${nums[0]},${nums[1]},${nums[2]},${nums[3]},${nums[4]}`;
}

export function partOne(input: string): number {
  const numbers = parseInput(input);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < 2000; j++) {
      numbers[i] = step(numbers[i]);
    }
  }
  return numbers.reduce((acc, num) => acc += num, 0);
}

export function partTwo(input: string): number {
  const numbers = parseInput(input);
  const pricesChanges: Map<string, number> = new Map();

  for (let i = 0; i < numbers.length; i++) {
    let tmp = [numbers[i] % 10];
    const seen = new Set<string>();

    for (let j = 0; j < 2000; j++) {
      numbers[i] = step(numbers[i]);
      tmp.push(numbers[i] % 10);
      if (tmp.length === 5) {
        const key = serializeKey([
          tmp[1] - tmp[0],
          tmp[2] - tmp[1],
          tmp[3] - tmp[2],
          tmp[4] - tmp[3],
        ]);

        if (!seen.has(key)) {
          seen.add(key);

          if (pricesChanges.has(key)) {
            const prev = pricesChanges.get(key)!;
            pricesChanges.set(key, prev + tmp[4]);
          } else {
            pricesChanges.set(key, tmp[4]);
          }
        }
        tmp = tmp.slice(1);
      }
    }
  }

  return Math.max(...pricesChanges.values());
}
