function parseInput(input: string): number[][] {
  const first: number[] = [];
  const second: number[] = [];

  input.trim().split("\n").forEach((line) => {
    const lineSplit = line.split(" ").map(Number);
    first.push(lineSplit[0]);
    second.push(lineSplit.at(-1)!);
  });

  return [first, second];
}

export function partOne(input: string): number {
  const parsed = parseInput(input);

  const first = parsed[0].sort((a, b) => a - b);
  const second = parsed[1].sort((a, b) => a - b);

  // let diff = 0;
  // for (let i = 0; i < first.length; i++) {
  //   diff = diff + Math.abs(first[i] - second[i]);
  // }
  // return diff;

  return first.reduce((acc, val, i) => {
    return acc + Math.abs(val - second[i]);
  }, 0);
}

export function partTwo(input: string): number {
  const [first, second] = parseInput(input);
  const freq = new Map<number, number>();

  second.forEach((val) => freq.set(val, (freq.get(val) || 0) + 1));
  return first.reduce((acc, val) => {
    return acc + (val * (freq.get(val) || 0));
  }, 0);
}
