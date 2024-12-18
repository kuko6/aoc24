const REG = [0, 0, 0, 0];

function parseInput(input: string) {
  input.matchAll(/Register (A|B|C): (\d+)/g).forEach((match) => {
    REG.push(Number(match[2]));
  });
  const program = (/Program: ([\d,]+)/g).exec(input)![1].split(",").map(Number);

  return program;
}

function combo(operand: number) {
  if (operand >= 0 && operand <= 3) return operand;
  return REG[operand];
}

function runProgram(program: number[]): number[] {
  const out: number[] = [];

  let pointer = 0;
  while (pointer < program.length) {
    const instruction = program[pointer];
    const operand = program[pointer + 1];

    if (instruction === 0) {
      REG[4] = REG[4] >> combo(operand);
    } else if (instruction === 1) {
      REG[5] = REG[5] ^ operand;
    } else if (instruction === 2) {
      REG[5] = combo(operand) % 8;
    } else if (instruction === 3) {
      if (REG[4] !== 0) {
        pointer = operand;
        continue;
      }
    } else if (instruction === 4) {
      REG[5] = REG[5] ^ REG[6];
    } else if (instruction === 5) {
      out.push(combo(operand) % 8);
    } else if (instruction === 6) {
      REG[5] = REG[4] >> combo(operand);
    } else if (instruction === 7) {
      REG[6] = REG[4] >> combo(operand);
    }
    pointer += 2;
  }

  return out;
}

// function reverseEngineerProgram(program: number[]): string {
//   const out: number[] = [];

//   // let reversePointer = 0;
//   let pointer = 0;
//   while (pointer < program.length) {
//     const instruction = program[pointer];
//     const operand = program[pointer + 1];

//     if (instruction === 0) {
//       REG[4] = REG[4] >> combo(operand);
//     } else if (instruction === 1) {
//       REG[5] = REG[5] ^ operand;
//     } else if (instruction === 2) {
//       REG[5] = combo(operand) % 8;
//     } else if (instruction === 3) {
//       if (REG[4] !== 0) {
//         pointer = operand;
//         continue;
//       }
//     } else if (instruction === 4) {
//       REG[5] = REG[5] ^ REG[6];
//     } else if (instruction === 5) {
//       const tmp = combo(operand) % 8;
//       out.push(tmp);
//       if (tmp !== program[out.length - 1]) {
//         // console.log("break");
//         return "-1";
//       }
//     } else if (instruction === 6) {
//       REG[5] = REG[4] >> combo(operand);
//     } else if (instruction === 7) {
//       REG[6] = REG[4] >> combo(operand);
//     }
//     pointer += 2;
//   }

//   return out.join(",");
// }

export function partOne(input: string): string {
  const program = parseInput(input);

  return runProgram(program).join(",");
}

export function partTwo(input: string): number {
  const program = parseInput(input);
  // const programStr = program.join(",");
  //   // REG[4] = 117440;
  //   // console.log(reverseEngineerProgram(program) === programStr);

  //   let a = 1;
  //   while (true) {
  //     console.log(a);
  //     REG[4] = a;
  //     if (reverseEngineerProgram(program) === programStr) return a;
  //     a++;
  //   }
}
