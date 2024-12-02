function parseInput(input: string): number[][] {
  return input.trim().split("\n").map((line) => line.split(" ").map(Number));
}

function isSafe(report: number[]): boolean {
  const isIncreasing = report[0] < report[1] ? true : false;
  return report.every((num, idx, arr) => {
    if (idx == 0) return true;

    const diff = Math.abs(num - arr[idx - 1]);
    return ((isIncreasing && num > arr[idx - 1]) ||
      (!isIncreasing && num < arr[idx - 1])) && (diff >= 1 && diff <= 3);
  });
}

function isSafeWithDampener(report: number[]): boolean {
  for (let i = 0; i < report.length; i++) {
    if (isSafe(report.toSpliced(i, 1))) {
      return true;
    }
  }

  return false;
}

export function partOne(input: string): number {
  const parsed = parseInput(input);
  let safe = 0;
  parsed.forEach((report) => {
    if (isSafe(report)) safe += 1;
  });

  return safe;
}

export function partTwo(input: string) {
  const parsed = parseInput(input);
  let safe = 0;
  parsed.forEach((report) => {
    if (isSafeWithDampener(report)) safe += 1;
  });

  return safe;
}
