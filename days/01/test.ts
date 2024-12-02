import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./solution.ts";

Deno.test(function partOneTest() {
  assertEquals(partOne(Deno.readTextFileSync("days/01/example.txt")), 11);
});

Deno.test(function partTwoTest() {
  assertEquals(partTwo(Deno.readTextFileSync("days/01/example.txt")), 31);
});
