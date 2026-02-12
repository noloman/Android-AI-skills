#!/usr/bin/env node
import fs from "fs";
import path from "path";
import os from "os";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const ALL_SKILLS = [
  "compose-best-practices",
  "kmp-architecture-best-practices",
  "compose-multiplatform-best-practices",
];

function help() {
  console.log(`
android-ai-skills — install Claude + Codex skills

Usage:
  npx android-ai-skills@latest [options]
  npx android-ai-skills@latest uninstall [options]
  npx android-ai-skills@latest init [options]
  npx android-ai-skills@latest print-paths [options]

Install options:
  --android-only          Install only compose-best-practices
  --kmp-only              Install only kmp-architecture-best-practices
  --compose-mp-only       Install only compose-multiplatform-best-practices

Target options:
  --target <both|codex|claude>  Default: both
  --codex-only            Same as --target codex
  --claude-only           Same as --target claude

Advanced:
  --dest <path>           Override destination base folder (advanced)
  --dry-run               Print actions without writing files
  --force                 Overwrite existing skill folders
  --print-paths           Print resolved install paths and exit (or include in output)
  --help                  Show this help

init options:
  --path <dir>            Where to write AGENTS.md (default: current directory)
  --force                 Overwrite existing AGENTS.md

Examples:
  npx android-ai-skills@latest
  npx android-ai-skills@latest --android-only
  npx android-ai-skills@latest --target codex
  npx android-ai-skills@latest --dry-run
  npx android-ai-skills@latest uninstall --target both
  npx android-ai-skills@latest init
  npx android-ai-skills@latest print-paths
`);
}

function parse(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const s = argv[i];
    if (!s.startsWith("--")) { a._.push(s); continue; }
    const k = s.slice(2);
    const n = argv[i + 1];
    const booleanKeys = new Set(["android-only","kmp-only","compose-mp-only","codex-only","claude-only","dry-run","force","help","print-paths"]);
    if (!booleanKeys.has(k) && n && !n.startsWith("--")) { a[k] = n; i++; }
    else a[k] = true;
  }
  return a;
}

function ensureDir(p, dry) { if (!dry) fs.mkdirSync(p, { recursive: true }); }

function copyDir(src, dest, { dryRun, force }) {
  if (!fs.existsSync(src)) throw new Error(`Source not found: ${src}`);
  if (fs.existsSync(dest) && !force) throw new Error(`Destination exists: ${dest}. Use --force.`);
  if (dryRun) return;
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sp = path.join(src, entry.name);
    const dp = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp, { dryRun, force: true });
    else fs.copyFileSync(sp, dp);
  }
}

function removeDir(dest, { dryRun }) {
  if (!fs.existsSync(dest)) return;
  if (dryRun) return;
  fs.rmSync(dest, { recursive: true, force: true });
}

function resolveSkills(args) {
  const selected = new Set();
  if (args["android-only"] || args["kmp-only"] || args["compose-mp-only"]) {
    if (args["android-only"]) selected.add("compose-best-practices");
    if (args["kmp-only"]) selected.add("kmp-architecture-best-practices");
    if (args["compose-mp-only"]) selected.add("compose-multiplatform-best-practices");
    return [...selected];
  }
  return [...ALL_SKILLS];
}

function resolveTargets(args) {
  const home = os.homedir();
  let target = (args.target || "both").toLowerCase();
  if (args["codex-only"]) target = "codex";
  if (args["claude-only"]) target = "claude";

  if (args.dest) return [path.resolve(process.cwd(), args.dest)];

  if (target === "both") return [path.join(home, ".codex", "skills"), path.join(home, ".claude", "skills")];
  if (target === "codex") return [path.join(home, ".codex", "skills")];
  if (target === "claude") return [path.join(home, ".claude", "skills")];
  throw new Error(`Unknown --target ${args.target}. Use both|codex|claude.`);
}

function printResolvedPaths(args) {
  const skills = resolveSkills(args);
  const targets = resolveTargets(args);
  console.log("Resolved install paths:");
  for (const t of targets) {
    console.log(`- ${t}`);
    for (const s of skills) console.log(`  - ${path.join(t, s)}`);
  }
}

function writeAgentsMd(outDir, force) {
  const p = path.join(outDir, "AGENTS.md");
  if (fs.existsSync(p) && !force) {
    throw new Error(`AGENTS.md already exists at ${p}. Use --force to overwrite.`);
  }
  const content = `# AGENTS.md

## Skill activation matrix

If the project contains \`commonMain\` (KMP):

- If shared UI composables exist in \`commonMain\`:
  - Use **compose-multiplatform-best-practices**
- Else (shared business logic only):
  - Use **kmp-architecture-best-practices**

If the project is Android-only:

- Use **compose-best-practices**

## Enterprise Mode auto-detection (optional)

Enterprise Mode turns on automatically when tooling is detected in the repo root:
- detekt.yml / detekt.yaml
- lint.xml
- ktlint/spotless config

If not detected, tool-specific enforcement is disabled (tool-agnostic guidance only).
`;
  fs.writeFileSync(p, content, "utf8");
  return p;
}

function main() {
  const args = parse(process.argv.slice(2));
  const sub = (args._[0] || "").toLowerCase();

  if (args.help) { help(); return; }

  if (sub === "print-paths") {
    printResolvedPaths(args);
    return;
  }

  if (sub === "init") {
    const outDir = path.resolve(process.cwd(), args.path || ".");
    ensureDir(outDir, false);
    const p = writeAgentsMd(outDir, !!args.force);
    console.log(`✅ Wrote ${p}`);
    return;
  }

  const uninstall = sub === "uninstall";
  const dryRun = !!args["dry-run"];
  const force = !!args.force;

  if (args["print-paths"]) {
    printResolvedPaths(args);
    if (!uninstall) console.log("");
  }

  const skills = resolveSkills(args);
  const targets = resolveTargets(args);

  console.log(`🚀 ${uninstall ? "Uninstalling" : "Installing"} android-ai-skills`);
  if (dryRun) console.log("🧪 Dry-run (no files will be written)");
  console.log("");

  for (const baseDest of targets) {
    ensureDir(baseDest, dryRun);
    for (const skill of skills) {
      const src = path.join(projectRoot, skill);
      const dest = path.join(baseDest, skill);
      if (uninstall) {
        console.log(`🗑️  ${skill} → ${dest}`);
        removeDir(dest, { dryRun });
      } else {
        console.log(`✅ ${skill} → ${dest}`);
        copyDir(src, dest, { dryRun, force });
      }
    }
  }

  console.log("\n🎉 Done.");
}

try { main(); } catch (e) { console.error("❌ " + (e?.message || String(e))); process.exit(1); }
