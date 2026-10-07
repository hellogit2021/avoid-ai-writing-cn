# avoid-ai-writing-cn

中文写作去 AI 味（AI-isms / humanize）的 DSH 插件。把 AI 味重的文本改得像人写的：删 AI 高频词、拆"不是…而是…"式模板句、去空泛结尾。

由知乎圈子"去AI味写作技巧"社区免费提供：https://www.zhihu.com/ring/host/2054459419904292311?tab=new&tab_id=0
公用规则随社区调教经验持续更新；插件升级不影响你个人积累的调教经验。

## 安装

桌面版：在插件管理器里填 `github:hellogit2021/avoid-ai-writing-cn`

命令行：

    dsh plugin --profile web add github:hellogit2021/avoid-ai-writing-cn

## 用法

1. 说"去掉AI味" + 文本 → 直接给重写结果，不展示复杂分析界面；终稿前可以反复调教
2. 满意后说"写的不错" → 本次新发现的 AI 词和句式自动记入你的个人词表，下次生效

另外两条指令："只标记"只审计不改写；"改文件 <路径>"就地最小修改。

示例：

    去掉AI味：让我把这个事情揉碎掰开给你看……
    → 具体说就是：……

## 你的调教经验存在哪

    %APPDATA%\avoid-ai-writing-cn\user-patterns.md

固定位置，插件升级、重装、换安装方式都不会覆盖它，也可以直接手工编辑。

## 文件

    index.js                             插件入口（注入 skills 树）
    cordis.patch.yml                     组合包 patch
    skills/avoid-ai-writing-cn/SKILL.md  技能本体（触发方式 + 通用词表）
    package.json                         插件包清单

## 兼容性

peer 范围为 `>=0.1.0-rc.6 <0.3.0`，覆盖 DSH 0.1.x / 0.2.x。DSH 升到新的次版本（如 0.3）时需同步放宽，否则安装会报 `is incompatible with dsh <版本>`。临时放行（只对 `包名@版本` + `dsh 版本` 这一对生效）：

    dsh plugin --profile <你的 profile> allow-version avoid-ai-writing-cn@<版本> --dsh-version <dsh 版本> --accept-risk

## License

MIT
