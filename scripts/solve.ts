let day = Deno.args[0] || [...Deno.readDirSync("./days")][0].name;
day = day.padStart(2, "0");

let input = Deno.args[1] || "input";
input = input.concat(".txt");

const { partOne, partTwo } = await import(`../days/${day}/solution.ts`);
const data = await Deno.readTextFile(`days/${day}/${input}`);

const startOne = performance.now();
const resultOne = partOne(data);
const endOne = performance.now();

const startTwo = performance.now();
const resultTwo = partTwo(data);
const endTwo = performance.now();

console.log(`First part: ${resultOne} (${(endOne - startOne).toFixed(2)}ms)`);
console.log(`Second part: ${resultTwo} (${(endTwo - startTwo).toFixed(2)}ms)`);
