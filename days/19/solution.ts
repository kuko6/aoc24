function parseInput(input: string): [Set<string>, string[]] {
  const tmp = input.trim().split("\n\n");
  const towels = new Set<string>(tmp[0].split(", "));
  const patterns = tmp[1].split("\n");

  return [towels, patterns];
}

function canMatch(pattern: string, towels: Set<string>): boolean {
  if (pattern.length === 0) return true;

  for (let i = 1; i <= pattern.length; i++) {
    const prefix = pattern.slice(0, i);
    if (towels.has(prefix)) {
      if (canMatch(pattern.slice(i), towels)) {
        return true;
      }
    }
  }

  return false;
}

function countMatches(
  pattern: string,
  towels: Set<string>,
  memo: Map<string, number>,
): number {
  if (pattern.length === 0) return 1;
  if (memo.has(pattern)) return memo.get(pattern)!;

  let ways = 0;
  for (let i = 1; i <= pattern.length; i++) {
    const prefix = pattern.slice(0, i);
    if (towels.has(prefix)) {
      ways += countMatches(pattern.slice(i), towels, memo);
    }
  }

  memo.set(pattern, ways);
  return ways;
}

export function partOne(input: string): number {
  const [towels, patterns] = parseInput(input);

  let res = 0;
  for (const pattern of patterns) {
    if (canMatch(pattern, towels)) {
      res++;
    }
  }

  return res;
}

export function partTwo(input: string): number {
  const [towels, patterns] = parseInput(input);

  let total = 0;
  for (const pattern of patterns) {
    total += countMatches(pattern, towels, new Map());
  }
  return total;
}
