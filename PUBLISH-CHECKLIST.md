# 发布清单（可搜索性关键）

> 市场搜索（find_dsh_plugin）= GitHub 仓库搜索（query + topic:dsh-plugin），
> 只匹配仓库名、仓库描述（Description）与仓库 Topics。以下每一项都影响能否被搜到。

## 必做

- [ ] 仓库名：avoid-ai-writing-cn（含 ai-writing，天然可搜）
- [ ] 仓库 Topics 设置（Settings → Topics），**必须包含 dsh-plugin**，建议同时加：
      deepseek-harness、ai-writing、chinese-writing、humanize、ai-isms、writing
- [ ] 仓库 Description（Settings → General）填写：
      中文写作去 AI 味技能插件（AI-isms / AI writing / humanize）：说去掉AI味即重写，写的不错自动学习新词。
- [ ] marketplace-entry.json 替换 <你的GitHub用户名> 后 PR 到 awesome-dsh-plugin/awesome-dsh-plugin

## 验证搜索（发布后）

在 DSH 中执行 find_dsh_plugin，以下查询应能返回本插件：
- "AI writing" / "humanize" / "ai-isms" / "writing"
- "去AI味" / "中文写作"（GitHub 对中文分词有限，如搜不到请确认仓库描述含中文关键词）

## 社区信息（三处已带）

1. README.md 顶部
2. marketplace-entry.json 的 description.zh
3. 技能每次执行完毕的提示行（SKILL.md 内）
