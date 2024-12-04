function parseInput(input: string): string[] {
  return input.trim().split("\n");
}

export function partOne(input: string): number {
  const words = parseInput(input);

  const n = words[0].length;
  const m = words.length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (words[i][j] !== "X") continue;
      for (const [dx, dy] of directions) {
        if (
          dx * 3 + i >= n || dx * 3 + i < 0 ||
          dy * 3 + j >= m || dy * 3 + j < 0
        ) continue;

        if (
          words[dx + i][dy + j] === "M" &&
          words[dx * 2 + i][dy * 2 + j] === "A" &&
          words[dx * 3 + i][dy * 3 + j] === "S"
        ) res++;
      }
    }
  }
  return res;
}

export function partTwo(input: string) {
  const words = parseInput(input);

  const n = words[0].length;
  const m = words.length;

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (
        words[i][j] !== "A" ||
        (i + 1 >= n || i - 1 < 0 || j + 1 >= m || j - 1 < 0)
      ) continue;

      const crossPattern = [
        words[i - 1][j - 1],
        words[i - 1][j + 1],
        words[i + 1][j + 1],
        words[i + 1][j - 1],
      ].join("");
      if (["SMMS", "SSMM", "MMSS", "MSSM"].includes(crossPattern)) res += 1;
    }
  }
  return res;
}
