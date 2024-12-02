let day = Deno.args[0] || [...Deno.readDirSync('./days')][0].name;
day = day.padStart(2, '0');

const {partOne, partTwo} = await import(`../days/${day}/solution.ts`);
const data = await Deno.readTextFile(`days/${day}/input.txt`);

console.log(`First part: ${partOne(data)}`)
console.log(`Second part: ${partTwo(data)}`)
