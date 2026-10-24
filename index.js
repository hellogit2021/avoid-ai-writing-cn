/**
 * avoid-ai-writing-cn — DeepSeek Harness 插件
 * 中文写作去 AI 味（AI-isms）：重写、学习、只标记、就地改文件。
 *
 * 启动时把本包 skills/ 复制到用户目录，并把个人词表内联进 SKILL.md：
 * 每次触发技能，用户的调教经验默认就在上下文里，不依赖模型"记得去读那个文件"。
 */
import { fileURLToPath } from "node:url";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { apply as applyFilesystemProvider } from "@deepseek-ai/dsh-skill-filesystem";

const bundledSkillsRoot = fileURLToPath(new URL("./skills/", import.meta.url));

export const name = "avoid-ai-writing-cn";
export const inject = ["skills", "agents"];

const INLINE_MARKER = "<!-- avoid-ai-writing-cn:user-patterns -->";
const SKILL_RELATIVE_PATH = "avoid-ai-writing-cn/SKILL.md";

function userDataDir() {
  const base = process.env.APPDATA || join(homedir(), "AppData", "Roaming");
  return join(base, "avoid-ai-writing-cn");
}

function inlineUserPatterns(skillFile) {
  const source = readFileSync(skillFile, "utf8");
  if (!source.includes(INLINE_MARKER)) return;

  const patternsFile = join(userDataDir(), "user-patterns.md");
  let block;
  if (existsSync(patternsFile)) {
    const body = readFileSync(patternsFile, "utf8").trim();
    block = body
      ? `> 由插件启动时从 \`${patternsFile}\` 自动内联，这就是本次生效的个人经验。\n\n${body}\n`
      : `> \`${patternsFile}\` 当前是空文件，本次没有个人经验生效。\n`;
  } else {
    block = `> 还没有个人词表（\`${patternsFile}\` 不存在），本次没有个人经验生效；用户说"写的不错"时按上文规则新建。\n`;
  }

  writeFileSync(skillFile, source.replace(INLINE_MARKER, block), "utf8");
}

function materializeSkillsRoot() {
  const runtimeRoot = join(userDataDir(), "runtime-skills");
  rmSync(runtimeRoot, { recursive: true, force: true });
  cpSync(bundledSkillsRoot, runtimeRoot, { recursive: true });
  inlineUserPatterns(join(runtimeRoot, SKILL_RELATIVE_PATH));
  return runtimeRoot;
}

export function apply(ctx) {
  let skillsRoot = bundledSkillsRoot;
  try {
    skillsRoot = materializeSkillsRoot();
  } catch (error) {
    ctx.logger?.warn?.(
      `avoid-ai-writing-cn: 个人词表内联失败，本次回退到内置技能树（${error?.message ?? error}）`,
    );
  }

  const options = {
    providerName: "avoid-ai-writing-cn",
    includeDefaultRoots: false,
    bundledSkillDir: skillsRoot,
    watch: false,
  };

  try {
    applyFilesystemProvider(ctx, options);
  } catch (error) {
    if (skillsRoot === bundledSkillsRoot) throw error;
    ctx.logger?.warn?.(
      `avoid-ai-writing-cn: 挂载用户目录技能树失败，回退到内置技能树（${error?.message ?? error}）`,
    );
    applyFilesystemProvider(ctx, { ...options, bundledSkillDir: bundledSkillsRoot });
  }
}
