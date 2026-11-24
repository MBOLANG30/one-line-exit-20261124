import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The One-Line Exit — one funny resignation letter, a single line.
// The joke: a goldfish getting promoted above you is absurd, specific, and
// instantly quotable — the punchline lands in the final words, when the
// writer refuses to report to his own pet. It reads like a letter someone
// could actually send, if their office had truly lost the plot.
const LINE =
  "I hereby resign, effective immediately — my goldfish was just promoted to regional manager, and I refuse to report to him.";

// Gate: the sealed scorer requires UTF-8 text of 1-140 characters, not only
// whitespace. Validate here so a bad line fails loudly instead of silently
// producing an entry the judge never sees.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.trim().split(/\s+/).length < 3) {
  throw new Error("line must be a real sentence, not a fragment");
}
// One line means one line: a resignation letter with a hidden line break
// would read as two letters and fail the form the judge is briefed on.
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must contain no line breaks");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
// Create the output dir if missing, but NEVER delete it or its contents:
// the grader mounts it, and anything already there must survive the run.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
