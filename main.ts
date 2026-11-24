// Everyday Things, Two Lines — entry program.
//
// The entry is two lines about ONE everyday thing: a traffic jam.
// Line 1 explains it to a 10-year-old through a single vivid analogy:
// a school hallway at bell time, everyone squeezing through one door.
// That picture is concrete (a hallway, a door, kids the reader knows)
// and surprising (a road full of cars behaving like a crowded school).
// Line 2 is the honest accounting the judge asks for: it names what the
// analogy maps (the bottleneck and the waiting) and what it leaves out
// (drivers choose their own roads and can turn back, unlike kids
// following the bell). No second metaphor, no list, no praise of the
// analogy itself — just the mapping and its limit, in plain words.
//
// The program is deterministic: it writes exactly these two lines,
// joined by one newline and with no trailing newline, so every run
// produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A traffic jam is a school hallway at bell time, everyone squeezing through one door.";
const LINE_2 =
  "It maps the bottleneck and the wait, but leaves out drivers choosing their roads and turning back.";

const ENTRY = `${LINE_1}\n${LINE_2}`;

// Guard: the sealed gate only accepts 1–400 UTF-8 characters, and the
// brief asks for two lines under 200 characters in total. Fail loudly
// instead of writing an entry the gate would refuse.
if ([...ENTRY].length < 1 || [...ENTRY].length > 200) {
  throw new Error(`entry is ${[...ENTRY].length} characters, expected 1-200`);
}
if (ENTRY.split("\n").length !== 2) {
  throw new Error("entry must be exactly two lines");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
