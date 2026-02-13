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
  "kotlin-coroutines-best-practices",
  "android-security-best-practices",
  "android-performance-best-practices",
  "play-store-readiness",
  "android-testing-best-practices",
  "android-accessibility-best-practices",
  "android-build-infra",
  "android-background-work",
  "android-navigation-best-practices",
  "play-billing-best-practices",
  "firebase-best-practices",
  "android-dependency-injection",
  "android-networking",
  "android-local-storage",
  "android-auth-identity",
  "android-media",
  "android-ci-cd",
  "android-maps-location",
  "android-ml-ondevice",
  "revenuecat-best-practices",
];

const CROSS_CUTTING_SKILLS = [
  "kotlin-coroutines-best-practices",
  "android-security-best-practices",
  "android-performance-best-practices",
  "play-store-readiness",
  "android-testing-best-practices",
  "android-accessibility-best-practices",
  "android-build-infra",
  "android-background-work",
  "android-navigation-best-practices",
  "play-billing-best-practices",
  "firebase-best-practices",
  "android-dependency-injection",
  "android-networking",
  "android-local-storage",
  "android-auth-identity",
  "android-media",
  "android-ci-cd",
  "android-maps-location",
  "android-ml-ondevice",
  "revenuecat-best-practices",
];

// ── Tool registry for project-level init ──────────────────────────────

const INIT_TOOLS = {
  codex:     { file: "AGENTS.md",                                  type: "single" },
  claude:    { dir: ".claude/skills",                               type: "per-skill-dir" },
  copilot:   { dir: ".github", file: "copilot-instructions.md",   type: "single" },
  cursor:    { dir: ".cursor/rules",                               type: "per-skill", ext: ".mdc" },
  windsurf:  { file: ".windsurfrules",                             type: "single" },
  cline:     { dir: ".clinerules",                                 type: "per-skill", ext: ".md" },
  jetbrains: { dir: ".aiassistant/rules",                          type: "per-skill", ext: ".md" },
  amazonq:   { dir: ".amazonq/rules",                              type: "per-skill", ext: ".md" },
  aider:     { file: "CONVENTIONS.md",                             type: "single", extra: ".aider.conf.yml" },
  opencode:  { dir: ".opencode/skills",                            type: "per-skill-dir" },
};

const INIT_TOOL_NAMES = Object.keys(INIT_TOOLS);

// ── Content pipeline ──────────────────────────────────────────────────

function parseYamlFrontmatter(text) {
  const match = text.match(/^[\s]*---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: text.trim() };
  const raw = match[1];
  const meta = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: match[2].trim() };
}

function readSkillContent(skillName) {
  const skillDir = path.join(projectRoot, skillName);
  const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
  const { meta, body } = parseYamlFrontmatter(skillMd);

  const references = [];
  const refsDir = path.join(skillDir, "references");
  if (fs.existsSync(refsDir)) {
    for (const f of fs.readdirSync(refsDir).sort()) {
      if (!f.endsWith(".md")) continue;
      references.push({
        name: f.replace(/\.md$/, ""),
        content: fs.readFileSync(path.join(refsDir, f), "utf8").trim(),
      });
    }
  }

  return { name: skillName, meta, body, references };
}

function activationMatrix() {
  return `## Skill activation matrix

If the project contains \`commonMain\` (KMP):

- If shared UI composables exist in \`commonMain\`:
  - Use **compose-multiplatform-best-practices**
- Else (shared business logic only):
  - Use **kmp-architecture-best-practices**

If the project is Android-only:

- Use **compose-best-practices**

**Always activate** (cross-cutting concerns — apply to all project types):

- **kotlin-coroutines-best-practices**
- **android-security-best-practices**
- **android-performance-best-practices**
- **play-store-readiness**
- **android-testing-best-practices**
- **android-accessibility-best-practices**
- **android-build-infra**
- **android-background-work**
- **android-navigation-best-practices**
- **play-billing-best-practices**
- **firebase-best-practices**
- **android-dependency-injection**
- **android-networking**
- **android-local-storage**
- **android-auth-identity**
- **android-media**
- **android-ci-cd**
- **android-maps-location**
- **android-ml-ondevice**
- **revenuecat-best-practices**

## Enterprise Mode auto-detection (optional)

Enterprise Mode turns on automatically when tooling is detected in the repo root:
- detekt.yml / detekt.yaml
- lint.xml
- ktlint/spotless config

If not detected, tool-specific enforcement is disabled (tool-agnostic guidance only).`;
}

function generateMarkdown(skill, { includeRefs = true } = {}) {
  let out = skill.body;
  if (includeRefs && skill.references.length) {
    for (const ref of skill.references) {
      out += `\n\n---\n\n${ref.content}`;
    }
  }
  return out + "\n";
}

function generateMdc(skill, { includeRefs = true } = {}) {
  const desc = skill.meta.description || skill.name;
  const body = generateMarkdown(skill, { includeRefs });
  return `---
description: ${desc}
globs: "**/*.kt,**/*.kts"
alwaysApply: false
---

${body}`;
}

function generateSingleFile(skills, { includeRefs = true } = {}) {
  let out = `# Android AI Skills\n\n${activationMatrix()}\n`;
  for (const skill of skills) {
    out += `\n---\n\n${generateMarkdown(skill, { includeRefs })}`;
  }
  return out;
}

// ── CLI helpers ───────────────────────────────────────────────────────

function help() {
  console.log(`
android-ai-skills — install AI governance skills for Android, KMP & Compose

Supported tools: Codex, Claude Code, GitHub Copilot, Cursor, Windsurf,
                 Cline, JetBrains AI, Amazon Q, Aider, OpenCode.

Usage:
  npx android-ai-skills@latest [options]            Global install (Codex + Claude + OpenCode)
  npx android-ai-skills@latest uninstall [options]   Remove global install
  npx android-ai-skills@latest init [options]        Project-level files (all 10 tools)
  npx android-ai-skills@latest print-paths [options]

Skill selection:
  --android-only          Install only compose-best-practices
  --kmp-only              Install only kmp-architecture-best-practices
  --compose-mp-only       Install only compose-multiplatform-best-practices

Global install targets:
  --target <all|codex|claude|opencode>  Default: all
  --codex-only            Same as --target codex
  --claude-only           Same as --target claude
  --opencode-only         Same as --target opencode

Init options:
  --path <dir>            Where to write files (default: current directory)
  --tools <tool,...>      Only generate for these tools (comma-separated)
  --exclude <tool,...>    Skip these tools (comma-separated)
  --no-references         Omit reference docs for smaller output

  Available tool names: ${INIT_TOOL_NAMES.join(", ")}

Advanced:
  --dest <path>           Override destination base folder (advanced)
  --dry-run               Print actions without writing files
  --force                 Overwrite existing files
  --print-paths           Print resolved install paths and exit
  --help                  Show this help

Examples:
  npx android-ai-skills@latest
  npx android-ai-skills@latest --android-only
  npx android-ai-skills@latest --target codex
  npx android-ai-skills@latest --dry-run
  npx android-ai-skills@latest uninstall --target all
  npx android-ai-skills@latest init
  npx android-ai-skills@latest init --tools cursor,copilot
  npx android-ai-skills@latest init --exclude aider --force
  npx android-ai-skills@latest init --no-references
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
    const booleanKeys = new Set([
      "android-only", "kmp-only", "compose-mp-only",
      "codex-only", "claude-only", "opencode-only",
      "dry-run", "force", "help", "print-paths",
      "no-references",
    ]);
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

function removeFile(dest, { dryRun }) {
  if (!fs.existsSync(dest)) return;
  if (dryRun) return;
  fs.unlinkSync(dest);
}

function resolveSkills(args) {
  const selected = new Set();
  if (args["android-only"] || args["kmp-only"] || args["compose-mp-only"]) {
    if (args["android-only"]) selected.add("compose-best-practices");
    if (args["kmp-only"]) selected.add("kmp-architecture-best-practices");
    if (args["compose-mp-only"]) selected.add("compose-multiplatform-best-practices");
    for (const s of CROSS_CUTTING_SKILLS) selected.add(s);
    return [...selected];
  }
  return [...ALL_SKILLS];
}

// ── Global install targets ────────────────────────────────────────────

function resolveGlobalTargets(args) {
  let target = (args.target || "all").toLowerCase();
  if (args["codex-only"]) target = "codex";
  if (args["claude-only"]) target = "claude";
  if (args["opencode-only"]) target = "opencode";
  if (target === "both") target = "all";

  if (args.dest) {
    return [{ type: "codex", base: path.resolve(process.cwd(), args.dest) }];
  }

  const home = os.homedir();
  const targets = [];
  if (target === "all" || target === "codex") {
    targets.push({ type: "codex", base: path.join(home, ".codex", "skills") });
  }
  if (target === "all" || target === "claude") {
    targets.push({ type: "claude", base: path.join(home, ".claude", "skills") });
  }
  if (target === "all" || target === "opencode") {
    targets.push({ type: "opencode", base: path.join(home, ".config", "opencode", "skills") });
  }
  if (!targets.length) throw new Error(`Unknown --target ${args.target}. Use all|codex|claude|opencode.`);
  return targets;
}

function checkClaudeMigration(skills) {
  const oldBase = path.join(os.homedir(), ".claude", "rules");
  if (!fs.existsSync(oldBase)) return;
  const found = skills.filter(s => fs.existsSync(path.join(oldBase, s + ".md")));
  if (found.length) {
    console.log(`⚠️  Found old Claude rules in ~/.claude/rules/`);
    console.log(`   Skills now install to ~/.claude/skills/ as on-demand skills.`);
    console.log(`   You can remove old rules: rm ~/.claude/rules/{${found.join(",")}}.md`);
    console.log("");
  }
}

function printResolvedPaths(args) {
  const skills = resolveSkills(args);
  const targets = resolveGlobalTargets(args);
  console.log("Resolved install paths:");
  for (const t of targets) {
    console.log(`- ${t.base} (${t.type})`);
    for (const s of skills) {
      console.log(`  - ${path.join(t.base, s)}/`);
    }
  }
}

// ── Init command ──────────────────────────────────────────────────────

function resolveInitTargets(args) {
  let tools = [...INIT_TOOL_NAMES];
  if (args.tools) {
    tools = args.tools.split(",").map(t => t.trim().toLowerCase());
    for (const t of tools) {
      if (!INIT_TOOLS[t]) throw new Error(`Unknown tool: ${t}. Available: ${INIT_TOOL_NAMES.join(", ")}`);
    }
  }
  if (args.exclude) {
    const excl = new Set(args.exclude.split(",").map(t => t.trim().toLowerCase()));
    tools = tools.filter(t => !excl.has(t));
  }
  return tools;
}

function writeProjectFiles(outDir, skills, tools, { dryRun, force, includeRefs }) {
  const skillContents = skills.map(s => readSkillContent(s));
  const written = [];

  for (const toolName of tools) {
    const cfg = INIT_TOOLS[toolName];

    if (cfg.type === "single") {
      const filePath = cfg.dir
        ? path.join(outDir, cfg.dir, cfg.file)
        : path.join(outDir, cfg.file);

      if (fs.existsSync(filePath) && !force) {
        console.log(`⏭️  Skipped ${path.relative(outDir, filePath)} (exists, use --force)`);
        continue;
      }

      const content = generateSingleFile(skillContents, { includeRefs });
      if (!dryRun) {
        ensureDir(path.dirname(filePath), false);
        fs.writeFileSync(filePath, content, "utf8");
      }
      console.log(`${dryRun ? "🧪" : "✅"} ${toolName} → ${path.relative(outDir, filePath)}`);
      written.push(filePath);

      // Aider extra: .aider.conf.yml
      if (cfg.extra) {
        const extraPath = path.join(outDir, cfg.extra);
        if (!fs.existsSync(extraPath)) {
          const yaml = `read:\n  - ${cfg.file}\n`;
          if (!dryRun) fs.writeFileSync(extraPath, yaml, "utf8");
          console.log(`${dryRun ? "🧪" : "✅"} ${toolName} → ${path.relative(outDir, extraPath)}`);
          written.push(extraPath);
        } else {
          console.log(`⏭️  Skipped ${path.relative(outDir, extraPath)} (exists)`);
        }
      }
    } else if (cfg.type === "per-skill-dir") {
      // per-skill directory copy (Claude Code on-demand skills)
      const dir = path.join(outDir, cfg.dir);
      for (const skill of skillContents) {
        const destDir = path.join(dir, skill.name);

        if (fs.existsSync(destDir) && !force) {
          console.log(`⏭️  Skipped ${path.relative(outDir, destDir)}/ (exists, use --force)`);
          continue;
        }

        const srcDir = path.join(projectRoot, skill.name);
        if (!dryRun) {
          copyDir(srcDir, destDir, { dryRun, force: true });
        }
        console.log(`${dryRun ? "🧪" : "✅"} ${toolName} → ${path.relative(outDir, destDir)}/`);
        written.push(destDir);
      }
    } else {
      // per-skill file
      const dir = path.join(outDir, cfg.dir);
      for (const skill of skillContents) {
        const fileName = skill.name + cfg.ext;
        const filePath = path.join(dir, fileName);

        if (fs.existsSync(filePath) && !force) {
          console.log(`⏭️  Skipped ${path.relative(outDir, filePath)} (exists, use --force)`);
          continue;
        }

        let content;
        if (toolName === "cursor") {
          content = generateMdc(skill, { includeRefs });
        } else {
          content = generateMarkdown(skill, { includeRefs });
        }

        if (!dryRun) {
          ensureDir(dir, false);
          fs.writeFileSync(filePath, content, "utf8");
        }
        console.log(`${dryRun ? "🧪" : "✅"} ${toolName} → ${path.relative(outDir, filePath)}`);
        written.push(filePath);
      }
    }
  }

  return written;
}

// ── Main ──────────────────────────────────────────────────────────────

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
    const dryRun = !!args["dry-run"];
    const force = !!args.force;
    const includeRefs = !args["no-references"];
    const skills = resolveSkills(args);
    const tools = resolveInitTargets(args);

    console.log(`🚀 Initializing project-level AI skill files`);
    if (dryRun) console.log("🧪 Dry-run (no files will be written)");
    console.log(`   Tools: ${tools.join(", ")}`);
    console.log(`   Skills: ${skills.join(", ")}`);
    console.log("");

    writeProjectFiles(outDir, skills, tools, { dryRun, force, includeRefs });
    console.log("\n🎉 Done.");
    return;
  }

  const uninstall = sub === "uninstall";
  const dryRun = !!args["dry-run"];
  const force = !!args.force;

  if (args["print-paths"]) {
    printResolvedPaths(args);
    console.log("");
  }

  const skills = resolveSkills(args);
  const targets = resolveGlobalTargets(args);

  if (!uninstall) checkClaudeMigration(skills);

  console.log(`🚀 ${uninstall ? "Uninstalling" : "Installing"} android-ai-skills`);
  if (dryRun) console.log("🧪 Dry-run (no files will be written)");
  console.log("");

  for (const target of targets) {
    ensureDir(target.base, dryRun);

    if (target.type === "codex") {
      for (const skill of skills) {
        const src = path.join(projectRoot, skill);
        const dest = path.join(target.base, skill);
        if (uninstall) {
          console.log(`🗑️  ${skill} → ${dest}`);
          removeDir(dest, { dryRun });
        } else {
          console.log(`✅ ${skill} → ${dest}`);
          copyDir(src, dest, { dryRun, force });
        }
      }
    } else if (target.type === "claude" || target.type === "opencode") {
      for (const skill of skills) {
        const src = path.join(projectRoot, skill);
        const dest = path.join(target.base, skill);
        if (uninstall) {
          console.log(`🗑️  ${skill} → ${dest}`);
          removeDir(dest, { dryRun });
        } else {
          console.log(`✅ ${skill} → ${dest}`);
          copyDir(src, dest, { dryRun, force });
        }
      }
    }
  }

  console.log("\n🎉 Done.");
}

try { main(); } catch (e) { console.error("❌ " + (e?.message || String(e))); process.exit(1); }
