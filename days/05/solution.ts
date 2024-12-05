function parseInput(input: string): [Map<string, Set<string>>, string[][]] {
  const [ordering, updates] = input.trim().split("\n\n");

  const parsedOrdering = new Map<string, Set<string>>();
  ordering.split("\n").map((line) => line.split("|"))
    .forEach((a) => {
      if (!parsedOrdering.has(a[0])) {
        parsedOrdering.set(a[0], new Set<string>([a[1]]));
      } else {
        parsedOrdering.get(a[0])!.add(a[1]);
      }
    });

  const parsedUpdates = updates.split("\n").map((line) => line.split(","));

  return [parsedOrdering, parsedUpdates];
}

export function partOne(input: string): number {
  const [parsedOrdering, parsedUpdates] = parseInput(input);

  let res = 0;
  parsedUpdates.forEach((line) => {
    let correct = true;
    for (let i = 0; i < line.length; i++) {
      correct = line.slice(0, i).every((page) =>
        !parsedOrdering.get(line[i])?.has(page)
      );
      if (!correct) break;
    }
    if (correct) {
      res += Number(line[Math.floor((line.length - 1) / 2)]);
    }
  });

  return res;
}

function swapUpdates(line: string[], i: number, j: number): string[] {
  const tmp = line[i];
  line[i] = line[j];
  line[j] = tmp;

  return line;
}

export function partTwo(input: string): number {
  const [parsedOrdering, parsedUpdates] = parseInput(input);

  let res = 0;
  parsedUpdates.forEach((line) => {
    let correct = true;
    for (let i = 0; i < line.length; i++) {
      const prev = line.slice(0, i);
      for (let j = 0; j < prev.length; j++) {
        if (parsedOrdering.get(line[i])?.has(prev[j])) {
          correct = false;
          swapUpdates(line, i, j);
        }
      }
    }
    if (!correct) {
      res += Number(line[Math.floor((line.length - 1) / 2)]);
    }
  });

  return res;
}
