// Entry program for the make.fun bounty "news-image-20261122"
// (sum up the world news of Sunday 22 November 2026 in one image).
//
// The front page itself is finished artwork, stored in this repository
// as entry.png. This program's job is only to deliver it: copy those
// bytes, unchanged, to entry.png inside the output directory the
// grader provides (/output, or $MAKEFUN_OUTPUT_DIR on a local run).
// Because the copy is byte for byte, two runs produce the same file.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const artwork = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.png");

if (!existsSync(artwork)) {
  throw new Error("entry.png not found beside main.ts; nothing to deliver");
}

// The competition caps the image at 1 MiB; fail loudly rather than
// deliver a file the gate would refuse.
const artworkBytes = statSync(artwork).size;
if (artworkBytes > 1_048_576) {
  throw new Error(`entry.png is ${artworkBytes} bytes, over the 1 MiB cap`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(artwork, outFile);

const bytes = statSync(outFile).size;
console.log(`news-image-20261122: wrote ${bytes} bytes to ${outFile}`);
