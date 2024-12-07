function parseInput(input: string): Map<number, number[]> {
  return new Map(
    input.trim().split("\n").map((line) => {
      const [key, values] = line.split(": ");
      return [Number(key), values.split(" ").map(Number)];
    }),
  );
}

function tryOperations(
  nums: number[],
  target: number,
): boolean {
  if (nums.length === 1) return nums[0] === target;
  if (
    target % nums.at(-1)! === 0 &&
    tryOperations(nums.slice(0, -1), target / nums.at(-1)!)
  ) return true;
  if (
    target > nums.at(-1)! &&
    tryOperations(nums.slice(0, -1), target - nums.at(-1)!)
  ) return true;

  return false;
}

function tryOperationsWithConcat(
  nums: number[],
  target: number,
): boolean {
  if (nums.length === 1) return nums[0] === target;

  if (
    target % nums.at(-1)! === 0 &&
    tryOperationsWithConcat(nums.slice(0, -1), target / nums.at(-1)!)
  ) return true;
  if (
    target > nums.at(-1)! &&
    tryOperationsWithConcat(nums.slice(0, -1), target - nums.at(-1)!)
  ) return true;

  const targetStr = String(target);
  const concatenated = nums.slice(-1).join("");
  if (
    targetStr.length > concatenated.length &&
    targetStr.endsWith(concatenated) &&
    tryOperationsWithConcat(
      nums.slice(0, -1),
      Number(targetStr.slice(0, -concatenated.length)),
    )
  ) return true;

  return false;
}

export function partOne(input: string): number {
  const numbers = parseInput(input);

  let total = 0;
  for (const [target, nums] of numbers) {
    if (tryOperations(nums, target)) {
      total += target;
    }
  }

  return total;
}

export function partTwo(input: string): number {
  const numbers = parseInput(input);

  let total = 0;
  for (const [target, nums] of numbers) {
    if (tryOperationsWithConcat(nums, target)) {
      total += target;
    }
  }

  return total;
}
