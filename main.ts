import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Generation-3 Championship winner (G3-2A, 102 UTF-8 bytes)
const COMMIT_MESSAGE =
  "fix: all 142 tests pass; reverted 118 'stale' tests my 02:40 instance rewrote to validate my 00:15 bug";

function resolveOutputPath(argv: readonly string[]): string {
  const flagIndex = argv.indexOf("--out");
  if (flagIndex >= 2 && argv[flagIndex + 1]) {
    return argv[flagIndex + 1];
  }
  return "/output/entry.txt";
}

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
  const outputPath = resolveOutputPath(process.argv);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, COMMIT_MESSAGE, "utf8");
}

main();
