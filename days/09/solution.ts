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
  const fileMap: DiskFile[] = [];

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

    fileMap.push(fileObject);

    i--;
  }

  return fileMap.reverse();
}

function computeChecksum(disk: string[]): number {
  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === ".") continue;
    checksum += Number(disk[i]) * i;
  }
  return checksum;
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
  let fileMap = parseInput2(disk);
  // console.log(disk);
  // console.log(fileMap);

  // iterate through files
  for (let i = 0; i < fileMap.length; i++) {
    const file = fileMap[i];

    // iterate through disk
    for (let j = 0; j < disk.length; j++) {
      if (j >= file.position) break;

      let freeSpace = 0;
      if (disk[j] === ".") {
        freeSpace = getFreeBlockSize(disk, j);

        // if we found enought space, move the file
        if (file.length <= freeSpace) {
          for (let k = 0; k < file.length; k++) {
            const srcIndex = file.position + k;
            const destIndex = j + k;

            disk[destIndex] = disk[srcIndex];
            disk[srcIndex] = ".";
          }
          // console.log(disk.join(""));
          fileMap = fileMap.filter((f) => f.index !== file.index);
          break;
        }
      }
      j += freeSpace;
    }
  }

  console.log(disk.join(""));
  return computeChecksum(disk);
}
