# 我们刚才做了什么：从 Obsidian 新手到跑起 sample plugin

这份说明只解释已经完成的事情。我们**还没有**开始实现“自动修改荧光笔颜色”的功能。

## 先建立一个整体概念

可以把 Obsidian 想成一个已经写好的桌面应用；插件则是你额外写的一小段程序，让它增加新能力。

它和你熟悉的 Python / Java 开发有一个重要区别：

```text
你写的 TypeScript 源码  --编译/打包-->  main.js  --由 Obsidian 加载-->  插件功能出现
src/main.ts                                插件目录                 骰子按钮、命令等
```

- 在 Python 中，通常可直接运行 `.py` 文件。
- 在 Java 中，`.java` 需要先编译成 `.class` / `.jar`。
- Obsidian 插件的写法更接近 Java：我们写 `.ts`（TypeScript）文件，再生成 Obsidian 实际运行的 `main.js`。

TypeScript 可以看成“带类型检查的 JavaScript”。它的类型、类、函数等概念与你见过的 Java 很接近；最终浏览器/Obsidian 运行的是 JavaScript。

## 为什么另建一个 vault

你提供的开发 vault 是：

```text
/Users/elinam/Desktop/agent_first/ObsidianinTest
```

这是正确且安全的做法。插件可以读取、修改 vault 中的笔记；如果插件有 bug，就可能影响当前 vault。所以我们只在这个测试 vault 中安装和启用插件，不会操作你的主笔记库。

## 我检查了什么

开始时，当前项目目录只有官方教程 `build_a_plugin.md`，没有真正的插件代码。因此它并不是一个可运行的 Obsidian 插件项目。

我还检查了开发环境：

- Git 已安装：用于从 GitHub 下载官方示例。
- Node.js / npm 当时没有安装：它们是构建 TypeScript/JavaScript 插件所需要的工具。
- 你的测试 vault 已存在，且其中已有 `.obsidian` 文件夹：这证明它已经被 Obsidian 初始化。

## 我安装了什么

我通过 Homebrew 安装了 Node.js（版本 `v26.8.1`）和 npm（版本 `11.19.0`）。

它们的角色可以这样理解：

- **Node.js**：在终端运行 JavaScript 工具的运行环境。
- **npm**：Node 的包管理器，类似 Python 的 `pip` 或 Java 的 Maven/Gradle 下载依赖那部分功能。

安装 Node.js 不会修改任何笔记；它是系统级开发工具。

## 我把官方 sample plugin 放在哪里

我从 Obsidian 官方 GitHub 仓库下载了 sample plugin，并放在：

```text
/Users/elinam/Desktop/agent_first/ObsidianinTest/
└── .obsidian/
    └── plugins/
        └── obsidian-sample-plugin/
```

Obsidian 会在 `<vault>/.obsidian/plugins/` 里查找本地社区插件。`obsidian-sample-plugin` 就像一个 Java 项目的模块目录，里面放着插件源码、配置与构建脚本。

## 这个插件目录中的关键文件

```text
obsidian-sample-plugin/
├── src/
│   ├── main.ts          # 插件入口；主要示例功能在这里
│   └── settings.ts      # 示例插件的设置界面和设置数据
├── manifest.json        # 插件“身份证”：ID、名称、版本、描述
├── package.json         # npm 配置：依赖列表与可执行脚本
├── esbuild.config.mjs   # 如何把 TypeScript 打包成 JavaScript
├── styles.css           # 可选的插件样式
└── main.js              # 编译生成；Obsidian 真正加载它
```

最重要的两个文件：

- `src/main.ts`：**人写的源码**。以后我们会在这里或新增的 `.ts` 文件中编写功能。
- `main.js`：**机器生成的运行文件**。不要直接修改它；每次编译都会覆盖它。

`manifest.json` 中现在的名称是 `Sample Plugin`，所以你在 Obsidian 设置里看到的也是这个名字。

## 我运行了哪些命令

### 1. `npm install`

这个命令根据 `package.json` 下载构建所需的库，存放到 `node_modules/` 文件夹。

它类似于：

```bash
pip install -r requirements.txt
```

或 Maven / Gradle 下载项目依赖。

npm 显示了“3 个高危依赖”的审计提醒。我**没有**运行 `npm audit fix`，因为它可能自动升级依赖、改变官方样例；对于第一步学习，保持官方版本更稳妥。

### 2. `npm run build`

这个命令完成一次正式编译：先检查 TypeScript 类型，再用 esbuild 生成 `main.js`。

编译成功，生成的 `main.js` 文件已经存在。这就是为什么 Obsidian 能加载这个插件。

## 你在 Obsidian 界面中做了什么

1. 打开测试 vault `ObsidianinTest`。
2. 进入 **设置 → 第三方插件**。
3. 退出“受限模式”，允许这个测试 vault 加载社区插件。
4. 启用 **Sample Plugin**。
5. 点击左侧的骰子图标，看到 `This is a notice!`。

最后一步是最关键的验收：它证明了下面的整条链路已经打通。

```text
官方源码 → 安装依赖 → 编译 main.js → Obsidian 找到插件 → 你启用插件 → 插件代码实际运行
```

## “命令面板”是什么

按 `⌘ + P` 会打开 Obsidian 的命令面板。它相当于应用内的“按名称搜索并执行操作”的窗口。

官方示例注册了几个命令，例如：

- **Sample Plugin: Open modal (simple)**：打开一个演示弹窗。
- **Sample Plugin: Replace selected content**：把当前选中的文字替换成 `Sample editor command`。

这些不是你最终需要的荧光笔功能，只是官方样例用来展示“插件能添加命令、弹窗、编辑器操作”的例子。

## 以后你修改代码时的日常流程

在这个目录运行：

```bash
cd /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin
npm run dev
```

`npm run dev` 会持续运行并监听源码变化：每当你保存 `.ts` 文件，它就会自动重新生成 `main.js`。

然后回到 Obsidian，使用命令面板运行 **Reload app without saving**，Obsidian 就会重新加载新的 `main.js`。

```text
修改 src/main.ts → 保存文件 → dev 自动编译 main.js → Reload app → 测试效果
```

## 当前状态

- [x] 有安全的独立测试 vault。
- [x] Node.js 与 npm 已安装。
- [x] 官方 sample plugin 已下载。
- [x] 依赖已安装。
- [x] `main.js` 已成功编译。
- [x] 插件已在 Obsidian 中启用，并通过骰子图标验证运行。
- [ ] 自动修改荧光笔颜色功能尚未实现。

下一阶段会先确定“自动修改颜色”具体指什么触发条件与规则，再从这个可运行的 sample plugin 中移除无关示例，逐步实现你的功能。
