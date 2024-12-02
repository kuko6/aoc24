let day = Deno.args[0] || [...Deno.readDirSync("./days")][0].name;
day = day.padStart(2, "0");

let input = Deno.args[1] || "input";
input = input.concat(".txt");

const { partOne, partTwo } = await import(`../days/${day}/solution.ts`);
const data = await Deno.readTextFile(`days/${day}/${input}`);

console.log(`First part: ${partOne(data)}`);
console.log(`Second part: ${partTwo(data)}`);
