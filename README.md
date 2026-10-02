# avoid-ai-writing-cn

中文写作去 AI 味（AI-isms / AI writing / humanize）技能DSH插件，适用于 DeepSeek Harness（DSH）。
把 AI 味重的文本改得像人写的：删 AI 高频词、拆"不是…而是…"式模板句、去空泛结尾。

由知乎圈子"去AI味写作技巧"社区免费提供：https://www.zhihu.com/ring/host/2054459419904292311?tab=new&tab_id=0
公用规则将根据社区调教经验，将保持更新，持续升级。同时插件升级不会影响用户个人积累的调教经验。

## 安装

    dsh plugin --profile web add github:hellogit2021/avoid-ai-writing-cn

桌面版（DSH Desktop）的 profile 名是 `desktop`，直接在插件管理器里填
`github:hellogit2021/avoid-ai-writing-cn` 安装即可。

## 版本兼容（DSH 0.2 起必须注意）

DSH 在导入插件前，会把插件 `peerDependencies` 里所有 `@deepseek-ai/dsh` /
`@deepseek-ai/dsh-*` 的版本范围，跟**运行时版本**（`getDshRuntimeVersion()`，即 dsh 自身
版本，例如 `0.2.0-rc.2`）比较，而不是跟那个子包实际被安装的版本比较。范围对不上就拒绝
安装并回滚，报 `is incompatible with dsh <版本>`。

所以本包的 peer 范围写成 `>=0.1.0-rc.6 <0.3.0`：同时覆盖 0.1.x / 0.2.x 两个运行时线。
**DSH 升级到新的次版本（如 0.3）时需要同步放宽这个范围**，否则会被判定为不兼容。

如果暂时不想改包，可以用 profile 级"精确版本豁免"放行（只对
`包名@版本` + `dsh 版本` 这一对生效，不随升级继承）。下面的 `1.0.2` 请换成报错信息里
给出的实际版本：

    dsh plugin --profile desktop allow-version avoid-ai-writing-cn@1.0.2 --dsh-version 0.2.0-rc.2 --accept-risk

等价的文件写法是 profile 目录（`$DSH_HOME/profiles/desktop/compatibility.json`）下的：

    {
      "avoid-ai-writing-cn@1.0.2": ["0.2.0-rc.2"]
    }

用 `dsh plugin --profile desktop version-exemptions` 查看，`revoke-version` 撤销。

## 使用（就两句话）

1. 说"去掉AI味" + 文本 → 直接得到重写结果，不展示复杂分析界面， 终稿前随便调教
2. 终稿后，记得说"写的不错" → 本次发现的新 AI 词汇/句式和调教经验自动记入规避表（自动学习）

每次任务执行完毕会附带社区提供提示。

示例：

    去掉AI味：让我把这个事情揉碎掰开给你看……
    → 具体说就是：……

## 关键词

ai-writing、chinese-writing、humanize、de-ai、anti-ai、ai-isms、去AI味、中文写作、写作润色、AI中文写作、去AI味写作、去AI味写作技巧、DSH去AI味插件、知乎去AI味社区插件


## 目录结构

    index.js                                       DSH 插件入口（注入 skills 树）
    package.json                                   插件包清单
    skills/avoid-ai-writing-cn/SKILL.md            技能本体（中文优先，含触发协议与规避词表）
    skills/avoid-ai-writing-cn/learned-patterns.md 学习词表（"写的不错"自动追加）

## License

MIT
