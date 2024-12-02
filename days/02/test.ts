import { assertEquals } from "@std/assert";
import { partOne, partTwo } from "./solution.ts";

Deno.test(function partOneTest() {
  assertEquals(partOne(Deno.readTextFileSync("days/02/example.txt")), 2);
});

Deno.test(function partTwoTest() {
  assertEquals(partTwo(Deno.readTextFileSync("days/02/example.txt")), 4);
});
