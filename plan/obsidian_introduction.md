# Obsidian 入门：先认识每个东西是什么

这份说明先**不讲 GitHub**，也不要求你会开发插件。目标只有一个：分清 Obsidian、vault、笔记、插件和主题分别是什么。

## 一句话版本

```text
Obsidian 是一个打开和编辑 Markdown 笔记的软件。
vault 是一个装着这些笔记的普通文件夹。
插件是给 Obsidian 增加新功能的小程序。
主题 / CSS 是改变 Obsidian 外观的样式规则。
```

## 1. Obsidian 是什么？

Obsidian 是你安装在 Mac 上的应用程序，和 VS Code、微信、Safari 一样，是一个软件。

它的主要工作是：打开、编辑和组织你的笔记文件。

你的笔记通常是 Markdown 文件，扩展名是 `.md`。例如：

```text
介绍.md
学习计划.md
读书笔记.md
```

这些文件本质上是普通文字文件。即使不安装 Obsidian，也能用 VS Code、TextEdit 等软件打开它们。

可以把 Obsidian 理解为“特别擅长管理 Markdown 笔记的编辑器”。

## 2. vault 是什么？

**vault（库）就是一个你选择交给 Obsidian 管理的普通文件夹。**

例如你的测试 vault 是：

```text
/Users/elinam/Desktop/agent_first/ObsidianinTest
```

它里面有一篇笔记：

```text
ObsidianinTest/
├── 介绍.md             ← 你写的笔记
└── .obsidian/          ← Obsidian 的隐藏配置文件夹
```

“隐藏”只是因为名称以点 `.` 开头；它仍然是普通文件夹。

一个人可以拥有多个 vault。比如：

```text
我的主笔记库/            ← 重要笔记，不让实验插件碰它
ObsidianinTest/          ← 开发和测试插件的安全练习场
工作资料库/              ← 另一套独立笔记
```

这就是为什么我们让你新建测试 vault：插件有 bug 时，最多影响 `ObsidianinTest` 里的测试笔记，不影响主笔记。

## 3. `.obsidian` 文件夹是做什么的？

`.obsidian` 保存的是“这个 vault 在 Obsidian 里的设置”，不是你的笔记内容。

常见结构：

```text
ObsidianinTest/
├── 介绍.md
├── 其他笔记.md
└── .obsidian/
    ├── app.json                 ← 此 vault 的一些设置
    ├── workspace.json           ← 上次打开了哪些面板、笔记等界面状态
    ├── plugins/                 ← 社区插件放这里
    ├── themes/                  ← 已安装的主题放这里
    └── snippets/                ← 自己写的小段 CSS 放这里
```

注意：不同 vault 的 `.obsidian` 文件夹彼此独立。

所以，你在测试 vault 启用插件，不会自动在主 vault 启用它。

## 4. “核心插件”和“社区插件”是什么？

### 核心插件

核心插件是 Obsidian 自带的功能开关，例如命令面板、反向链接、日记、模板。

它们跟着 Obsidian 一起安装，你只是在设置中启用或关闭它们。

### 社区插件

社区插件是其他开发者（也可以是你）写的小程序，用来给 Obsidian 增加新能力。

例如：

- 将选中文字改成多种高亮颜色；
- 自动整理笔记；
- 同步某个服务；
- 添加日历、任务面板。

我们正在写的是**社区插件**。

## 5. 插件在哪里？它是怎么运行的？

每个社区插件在一个自己的文件夹里：

```text
<某个 vault>/.obsidian/plugins/<插件 ID>/
```

我们当前的测试插件大致在：

```text
ObsidianinTest/
└── .obsidian/
    └── plugins/
        └── obsidian-sample-plugin/   ← 当前测试用的插件文件夹
            ├── src/                  ← 我们写的 TypeScript 源码
            ├── manifest.json         ← 插件的名称、ID、版本等信息
            ├── main.js               ← Obsidian 真正执行的文件
            └── styles.css            ← 插件自己的样式
```

当你在 **设置 → 第三方插件** 中打开一个插件的开关时，Obsidian 会：

1. 找到这个插件文件夹；
2. 读取 `manifest.json`，知道它叫什么名字；
3. 运行 `main.js`；
4. 于是插件新增的命令、按钮或功能出现。

你点击骰子图标并看到提示，说明第 4 步已经成功。

## 6. `src/main.ts` 和 `main.js` 的区别

这和 Java 非常像：

```text
我们写：src/main.ts       →     编译      →  Obsidian 运行：main.js
          （源码）                                  （成品）
```

- `src/main.ts` 是给开发者读和修改的源码。
- `src/highlight.ts` 是我们后来新增的“颜色功能”源码。
- `main.js` 是电脑生成出来给 Obsidian 运行的文件。

你不需要直接编辑 `main.js`。我们改好 `.ts` 文件后，运行构建命令，它会自动更新。

## 7. “高亮颜色插件”目前做了什么？

它是一个小程序，给 Obsidian 注册了五个命令：黄色、绿色、粉色、蓝色和紫色。

流程是：

```text
你在笔记中选中文字
        ↓
运行“Highlight selected text: Yellow”等命令
        ↓
插件修改该笔记的 Markdown 文字
        ↓
Obsidian 显示为对应颜色的高亮
```

它只修改你当前选中的文字；没有自动上传笔记，也没有接触你的主 vault。

## 8. 主题、背景修改、CSS snippet 又是什么？

它们主要改变“看起来怎样”，而不是“能做什么”。

```text
插件：增加行为 / 功能
      例：一键把选中文字改成粉色

主题：大范围改变外观
      例：整体绿色森林风、半透明侧边栏、按钮形状、字体颜色

CSS snippet：一小段局部外观修改
      例：只把标题改成绿色，或只把笔记背景调成半透明
```

一个很有用的判断方法：

- “我点击后要发生一件事” → 通常是插件。
- “我希望界面一直长成某种样子” → 通常是主题或 CSS。

### 主题

主题是一套较完整的 CSS 外观规则，类似给整个应用换皮肤。主题文件通常放在：

```text
<vault>/.obsidian/themes/<主题名称>/
```

例如你说的“半透明绿色自然森系背景”，更适合做成主题。

### CSS snippet

CSS snippet 是一小段你自己写的 CSS。它适合小实验，因为不用一次设计完整主题。文件放在：

```text
<vault>/.obsidian/snippets/forest-test.css
```

你可以在 **设置 → 外观 → CSS 代码片段** 中启用或关闭它。

对于你现在的阶段，最安全的路线是：先用 CSS snippet 做森林背景小实验；喜欢后，再整理为完整主题。

## 9. 插件和主题可以同时使用吗？

可以，而且很常见。

```text
Obsidian 应用
└── 测试 vault：ObsidianinTest
    ├── 笔记：介绍.md
    ├── 社区插件：Highlight Palette
    │   └── 负责“给选中文字换颜色”
    └── CSS snippet / 主题：Forest style
        └── 负责“绿色、半透明、自然森系外观”
```

插件和主题最好分开：一个项目只解决一类问题。这样你以后修 bug、发布和让别人安装都会更简单。

## 10. 现在最值得记住的五件事

1. Obsidian 是应用程序。
2. vault 是装笔记的普通文件夹。
3. `.obsidian` 是这个 vault 的设置文件夹。
4. 插件改变功能；主题 / CSS 改变外观。
5. 测试 vault 是安全练习场，主 vault 不参与实验。

## 现在不需要理解的东西

以下内容我们之后再学，不用现在硬记：

- Git、commit、push、GitHub release；
- TypeScript、npm、编译器的完整原理；
- 如何把插件提交到官方社区目录；
- 如何制作完整主题。

接下来的最小目标可以只有一个：把当前颜色功能从“命令面板能使用”升级到“选中文字后更容易点选颜色”。
