import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const BASE = "https://chef-aniket-consulting.web.app";
const ROOT = process.cwd();

const files = [
  "index.html",
  "style.css",
  "script.js",
  "assets/chef-aniket.jpg",
  "assets/hnh-salad.jpg",
  "assets/fresh-fusion.jpg",
  "assets/leanfuel.jpg",
  "assets/service-menu.jpg",
  "assets/service-training.jpg",
  "assets/service-kitchen.jpg",
  "video/video_2026-09-29_12-19-02.mp4",
  "video/video_2026-09-29_12-19-12.mp4",
  "video/video_2026-09-29_12-19-17.mp4",
  "video/video_2026-09-29_12-19-22.mp4",
  "video/video_2026-09-29_12-19-31.mp4",
  "video/video_2026-09-29_12-19-36.mp4",
  "video/video_2026-09-29_12-19-41.mp4",
];

for (const f of files) {
  const url = `${BASE}/${f}`;
  const out = `${ROOT}/${f}`;
  try {
    const r = await fetch(url);
    if (!r.ok) { console.log(`FAIL ${f} -> ${r.status}`); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    console.log(`OK   ${f} (${buf.length} bytes)`);
  } catch (e) {
    console.log(`ERR  ${f} -> ${e.message}`);
  }
}
