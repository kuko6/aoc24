type DiskFile = {
  "index": string;
  "position": number;
  "length": number;
};

function parseInput(input: string): string[] {
  const disk = [];
  let file = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < Number(input[i]); j++) {
      disk.push(i % 2 === 0 ? String(file) : ".");
    }
    if (i % 2 === 0) file++;
  }
  return disk;
}

function parseInput2(disk: string[]) {
  // const files = disk.join("").match(/\d+/g) || [];
  const fileMap: Map<number, DiskFile[]> = new Map();

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === ".") continue;

    let fileLength = 0;
    const file = disk[i];
    while (i < disk.length && disk[i] === file) {
      fileLength++;
      i++;
    }

    const fileObject: DiskFile = {
      "index": file[0],
      "position": i - fileLength,
      "length": fileLength,
    };

    const updatedArray = fileMap.has(fileLength)
      ? [fileObject, ...fileMap.get(fileLength)!]
      : [fileObject];

    i--;

    fileMap.set(fileLength, updatedArray);
  }

  return fileMap;
}

function computeChecksum(disk: string[]): number {
  return disk.reduce(
    (checksum, block, i) =>
      block === "." ? checksum : checksum + Number(block) * i,
    0,
  );
}

function getFreeBlockSize(disk: string[], idx: number) {
  let free = 0;
  while (disk[idx] === ".") {
    free++;
    idx++;
  }
  return free;
}

export function partOne(input: string): number {
  const disk = parseInput(input);

  let j = disk.length - 1;
  let i = 0;
  while (j >= i) {
    if (disk[j] === ".") {
      j--;
      continue;
    }

    if (disk[i] === ".") {
      disk[i] = disk[j];
      disk[j] = ".";
      j--;
    } else {
      i++;
    }
  }

  return computeChecksum(disk);
}

export function partTwo(input: string): number {
  const disk = parseInput(input);
  const fileMap = parseInput2(disk);
  console.log(disk.join(""));
  // console.log(fileMap);

  for (let i = 0; i < disk.length; i++) {
    let freeSpace = 0;
    if (disk[i] === ".") {
      freeSpace = getFreeBlockSize(disk, i);
      // console.log(freeSpace);

      let bestLength = -1;
      for (const [length, files] of fileMap) {
        if (length <= freeSpace && length > bestLength) {
          bestLength = length;
        }
      }

      if (bestLength !== -1) {
        const file = fileMap.get(bestLength)?.shift();
        if (!file) fileMap.delete(bestLength);
        else {
          let tmp = i;
          for (let j = 0; j < file.length; j++) {
            disk[tmp] = disk[j + file.position];
            disk[j + file.position] = ".";
            tmp++;
          }
        }
      }

      i += freeSpace;
    }
  }
  console.log(disk.join(""));
  return 0;
}
