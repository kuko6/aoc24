type ClawMachine = {
  A: {
    X: number;
    Y: number;
  };
  B: {
    X: number;
    Y: number;
  };
  Prize: {
    X: number;
    Y: number;
  };
};

function parseInput(input: string): ClawMachine[] {
  const values = input.trim().split("\n\n").map((m) =>
    Array.from(m.matchAll(/\d+/g), (x) => x[0]).map(Number)
  );

  return values.map((m) => ({
    "A": { "X": m[0], "Y": m[1] },
    "B": { "X": m[2], "Y": m[3] },
    "Prize": { "X": m[4], "Y": m[5] },
  }));
}

export function partOne(input: string): number {
  const clawMachines = parseInput(input);
  let res = 0;
  clawMachines.forEach((clawMachine) => {
    const aPresses = (clawMachine.Prize.X * clawMachine.B.Y -
      clawMachine.B.X * clawMachine.Prize.Y) /
      (clawMachine.A.X * clawMachine.B.Y - clawMachine.A.Y * clawMachine.B.X);
    const bPresses = (clawMachine.Prize.X - clawMachine.A.X * aPresses) /
      clawMachine.B.X;

    if (Number.isInteger(aPresses) && Number.isInteger(bPresses)) {
      res += aPresses * 3 + bPresses;
    }
  });

  return res;
}

export function partTwo(input: string): number {
  const clawMachines = parseInput(input);
  let res = 0;
  clawMachines.forEach((clawMachine) => {
    clawMachine.Prize.X += 10000000000000;
    clawMachine.Prize.Y += 10000000000000;

    const aPresses = (clawMachine.Prize.X * clawMachine.B.Y -
      clawMachine.B.X * clawMachine.Prize.Y) /
      (clawMachine.A.X * clawMachine.B.Y - clawMachine.A.Y * clawMachine.B.X);
    const bPresses = (clawMachine.Prize.X - clawMachine.A.X * aPresses) /
      clawMachine.B.X;

    if (Number.isInteger(aPresses) && Number.isInteger(bPresses)) {
      res += aPresses * 3 + bPresses;
    }
  });

  return res;
}
