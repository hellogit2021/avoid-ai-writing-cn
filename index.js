/**
 * avoid-ai-writing-cn — DeepSeek Harness 插件
 * 中文写作去 AI 味（AI-isms）：重写、学习、只标记、就地改文件。
 * 向 DSH 注入本包 skills/ 目录下的技能树（只注入本包，不动宿主默认技能根）。
 */
import { fileURLToPath } from "node:url";
import { apply as applyFilesystemProvider } from "@deepseek-ai/dsh-skill-filesystem";

const skillsRoot = fileURLToPath(new URL("./skills/", import.meta.url));

export const name = "avoid-ai-writing-cn";
export const inject = ["skills", "agents"];

export function apply(ctx) {
  applyFilesystemProvider(ctx, {
    providerName: "avoid-ai-writing-cn",
    includeDefaultRoots: false,
    bundledSkillDir: skillsRoot,
    watch: false,
  });
}
