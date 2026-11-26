import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Draft v1: Generation-1 co-champion (B3) — to be upgraded after Gen-2 tournament
const COMMIT_MESSAGE =
  "fix: all 142 tests pass again after reverting the 118 tests I updated at 02:30 to match my 01:15 bug";

function validateCommitMessage(message: string): void {
  const charCount = [...message].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`Commit message length ${charCount} is outside 1..200 characters`);
  }
  if (message.trim().length === 0) {
    throw new Error("Commit message must not be only whitespace");
  }
  if (/[\r\n]/.test(message)) {
    throw new Error("Commit message must be strictly one line");
  }
}

function main(): void {
  validateCommitMessage(COMMIT_MESSAGE);
  const outputPath = process.argv[2] ?? "/output/entry.txt";
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, COMMIT_MESSAGE, "utf8");
}

main();
