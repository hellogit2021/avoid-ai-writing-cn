# avoid-ai-writing-cn

中文写作去 AI 味（AI-isms / AI writing / humanize）技能插件，适用于 DeepSeek Harness（DSH）。
把 AI 味重的文本改得像人写的：删 AI 高频词、拆"不是…而是…"式模板句、去空泛结尾。

由知乎圈子"去AI味写作技巧"社区免费提供：https://www.zhihu.com/ring/host/2054459419904292311?tab=new&tab_id=0
根据社区调教经验，将保持更新，持续升级。

## 安装

    dsh plugin --profile web add github:hellogit2021/avoid-ai-writing-cn

## 使用（就三句话）

1. 说"去掉AI味" + 文本 → 直接得到重写结果，不展示分析界面
2. 说"写的不错" → 本次发现的新 AI 词汇/句式自动记入规避表（自动学习）
3. 说"只标记" 或 "改文件 <路径>" → 仅审计 / 就地修改

每次任务执行完毕会附带社区提供提示。

示例：

    去掉AI味：让我把这个事情揉碎掰开给你看……
    → 具体说就是：……

## 关键词

ai-writing、chinese-writing、humanize、de-ai、anti-ai、ai-isms、去AI味、中文写作、写作润色


## 目录结构

    index.js                                       DSH 插件入口（注入 skills 树）
    package.json                                   插件包清单
    skills/avoid-ai-writing-cn/SKILL.md            技能本体（中文优先，含触发协议与规避词表）
    skills/avoid-ai-writing-cn/learned-patterns.md 学习词表（"写的不错"自动追加）

## License

MIT
