import { ensureDir } from "@std/fs";

let day = Deno.args[0] || [...Deno.readDirSync('./days')].at(-1)!.name + 1;
day = day.padStart(2, '0');

await ensureDir(`./days/${day}`);
await Deno.writeTextFile(`./days/${day}/solution.ts`, `export function partOne() {}
export function partTwo() {}
`);

await Deno.writeTextFile(`./days/${day}/test.ts`, `import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./solution.ts";

Deno.test(function partOneTest() {
  assertEquals(partOne(Deno.readTextFileSync('days/${day}/example.txt')), [value]);
});

Deno.test(function partTwoTest() {
  assertEquals(partTwo(Deno.readTextFileSync('days/${day}/example.txt')), [value]);
});
`);
