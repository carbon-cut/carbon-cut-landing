import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsDirectory = path.join(root, "docs");

function markdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(file);
    return entry.isFile() && entry.name.endsWith(".md") ? [file] : [];
  });
}

const files = [
  ...fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(root, entry.name)),
  ...markdownFiles(docsDirectory),
].sort();

const missing = [];

for (const file of files) {
  const markdown = fs.readFileSync(file, "utf8");
  const destinations = [
    ...Array.from(markdown.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g), (match) => match[1]),
    ...Array.from(markdown.matchAll(/^\s{0,3}\[[^\]]+\]:\s*(\S+)/gm), (match) => match[1]),
  ];

  for (const rawDestination of destinations) {
    const destination = rawDestination
      .trim()
      .match(/^<([^>]+)>|^(\S+)/)
      ?.slice(1)
      .find(Boolean);
    if (!destination || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(destination)) continue;

    let decoded;
    try {
      decoded = decodeURIComponent(destination.split(/[?#]/, 1)[0]);
    } catch {
      missing.push(`${path.relative(root, file)}: invalid link ${destination}`);
      continue;
    }

    if (!fs.existsSync(path.resolve(path.dirname(file), decoded))) {
      missing.push(`${path.relative(root, file)}: ${destination}`);
    }
  }
}

if (missing.length > 0) {
  console.error(`Broken local Markdown links (${missing.length}):\n${missing.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Checked local links in ${files.length} Markdown files.`);
}
