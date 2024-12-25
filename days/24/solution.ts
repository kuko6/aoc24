type Operation = {
  "in1": string;
  "in2": string;
  "operator": string;
};

function parseInput(
  input: string,
): [Record<string, number>, Record<string, Operation>] {
  const tmp = input.trim().split("\n\n");

  const wires: Record<string, number> = {};
  tmp[0].split("\n").forEach((line: string) => {
    const wire = line.split(": ");
    wires[wire[0]] = Number(wire[1]);
  });

  const operations: Record<string, Operation> = {};
  tmp[1].split("\n").forEach((line: string) => {
    const x = line.split(" ").filter((x: string) => x !== "->");
    operations[x[3]] = {
      "in1": x[0],
      "operator": x[1],
      "in2": x[2],
    };
  });

  return [wires, operations];
}

function op(operator: string, in1: number, in2: number) {
  if (operator === "AND") {
    return in1 & in2;
  } else if (operator === "OR") {
    return in1 | in2;
  }
  return in1 ^ in2;
}

export function partOne(input: string): number {
  const [wires, operations] = parseInput(input);

  function calculate(wire: string): number {
    if (wires[wire] !== undefined) {
      return wires[wire];
    }

    wires[wire] = op(
      operations[wire].operator,
      calculate(operations[wire].in1),
      calculate(operations[wire].in2),
    );

    return wires[wire];
  }

  for (const wire of Object.keys(operations)) {
    calculate(wire);
  }

  const outputs = Object.keys(wires)
    .filter((key) => key.startsWith("z"))
    .sort();

  // console.log(wires);
  return parseInt(outputs.map((key) => wires[key]).reverse().join(""), 2);
}

export function partTwo(input: string): number {}
