type Instruction = { instruction: string; index: number };
type Multiplication = { numbers: number[]; index: number };

function parseInput(input: string): number[][] {
  const re = /mul\((\d*,\d*)\)/g;
  return Array.from(input.matchAll(re), (x) => x[1]).map((x) =>
    x.split(",").map(Number)
  );
}

function parseInput2(input: string): [Instruction[], Multiplication[]] {
  let re = /(do|don't)\(\)/g;
  const instructions = [...input.matchAll(re)].map((x) => ({
    "instruction": x[1],
    "index": x.index,
  }));

  re = /mul\((\d*,\d*)\)/g;
  const multiplications = [...input.matchAll(re)].map((x) => ({
    "numbers": x[1].split(",").map(Number),
    "index": x.index,
  }));

  return [
    instructions.sort((a, b) => a.index - b.index),
    multiplications.sort((a, b) => a.index - b.index),
  ];
}

export function partOne(input: string): number {
  const parsed = parseInput(input);
  return parsed
    .map((numbers) => numbers[0] * numbers[1])
    .reduce((acc, number) => acc + number);
}

export function partTwo(input: string): number {
  const [instructions, multiplications] = parseInput2(input);

  let i = 0;
  let res = 0;
  let prevInstruction = "do";
  for (const instruction of instructions) {
    while (multiplications[i].index < instruction.index) {
      if (prevInstruction === "do") {
        const [a, b] = multiplications[i].numbers;
        res += a * b;
      }
      i++;
    }
    prevInstruction = instruction.instruction;
  }

  if (prevInstruction === "do") {
    return res +
      multiplications.slice(i)
        .map((mult) => mult.numbers[0] * mult.numbers[1])
        .reduce((acc, number) => acc + number);
  }
  return res;
}
