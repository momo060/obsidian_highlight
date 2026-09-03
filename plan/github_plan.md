# 第一次将 Obsidian 插件提交到 GitHub：你的专属计划

这份计划回答两个问题：**什么应该上传到 GitHub？为什么？**

目前的情况是：

- 你的 GitHub 仓库：`obsidian_highlight`，目前是空仓库。
- 你实际运行的插件代码：在测试 vault 中的官方 sample plugin 文件夹。
- 我们已在该 sample 中增加了“给选中文字设置预设颜色”的功能。

在开始前，最重要的一句话是：**GitHub 仓库应该保存“能让别人重新构建插件的源材料”，而不是保存你电脑上的全部文件。**

## 先用一个比喻理解 GitHub

把插件想成一道菜：

- 源码是菜谱。
- `npm install` 下载的依赖是厨房里按菜谱准备的原料。
- `main.js` 是已经做好的成品。
- GitHub 是保存菜谱、记录菜谱版本的地方。

其他人拿到 GitHub 上的菜谱后，运行 `npm install` 和 `npm run build`，可以重新做出同样的 `main.js`。

因此，我们要上传菜谱和必要说明；不上传临时原料、你的个人笔记和电脑系统文件。

## 你当前的两个目录，各自是什么

```text
/Users/elinam/Desktop/agent_first/
├── obsidian_highlight/                         # 你的 GitHub 仓库工作目录
│   └── 未来应放“正式插件项目源码”
│
└── ObsidianinTest/                             # 专门用于测试的 Obsidian vault
    └── .obsidian/plugins/obsidian-sample-plugin/
        └── 当前实际运行的 sample plugin 与颜色代码
```

现在的问题不在于代码丢失，而是它们暂时位于测试 vault 内，而且那个文件夹是从**官方 sample 仓库**克隆而来。我们需要把自己的项目整理到 `obsidian_highlight`，并让它连接到你的 GitHub 仓库。

## 第一阶段：先确定自己的插件身份

建议使用：

```text
GitHub 仓库：obsidian_highlight         # 可以保留，不必改名
插件显示名：Highlight Palette
插件 ID：highlight-palette
本地插件目录：.obsidian/plugins/highlight-palette
```

这三个名称的用途不同：

- **仓库名**：GitHub 页面上的项目名称；可以用下划线。
- **显示名**：Obsidian 设置里给人看的名称；可以更友好。
- **插件 ID / 文件夹名**：Obsidian 内部识别插件的稳定名称；必须使用小写英文和连字符，且二者必须一致。

插件发布后不要轻易改 ID，因为用户的设置和快捷键可能依赖它。

## 第二阶段：哪些文件要提交，哪些不要提交

### 必须提交：插件的源码与构建说明

| 文件 / 目录 | 为什么要提交 |
| --- | --- |
| `src/main.ts` | 插件的入口：告诉 Obsidian 启动时注册哪些功能。 |
| `src/highlight.ts` | 我们写的预设高亮颜色功能。 |
| 以后新增的 `src/` 文件 | 色盘、浮动工具栏、设置等功能的源码。 |
| `manifest.json` | 插件身份证：ID、名称、版本、兼容的 Obsidian 版本。 |
| `package.json` | 项目依赖和命令，例如 `npm run build`。 |
| `package-lock.json` | 锁定依赖的准确版本，保证你和其他人安装到相同版本。 |
| `tsconfig.json` | TypeScript 的编译规则。 |
| `esbuild.config.mjs` | 如何将 TypeScript 生成 `main.js` 的规则。 |
| `styles.css` | 插件自身需要的 CSS 样式。 |
| `.gitignore` | 告诉 Git 哪些本地文件永远不要提交。 |
| `README.md` | 告诉未来的你、其他开发者和用户：插件做什么、怎样安装与开发。 |
| `LICENSE` | 明确别人能否及如何使用你的代码；官方 sample 的许可证要求应被保留或正确替换。 |
| `versions.json` | 将来正式发布多个版本时，记录版本和最低 Obsidian 版本的对应关系。 |

### 暂时可选：自动检查配置

| 文件 / 目录 | 是否提交 | 为什么 |
| --- | --- | --- |
| `.github/workflows/lint.yml` | 建议提交 | 每次 push 后 GitHub 自动检查代码风格。 |
| `.github/workflows/release.yml` | 以后再决定 | 现在不需要自动发布；先理解手动发布流程更好。 |
| `docs/` 或 `plan/` 中的学习笔记 | 可提交 | 如果你希望学习记录也跟随项目保存，可以提交。 |

### 不提交：可重新生成、私密或与插件无关的文件

| 文件 / 目录 | 为什么不提交 |
| --- | --- |
| `node_modules/` | `npm install` 可以重新下载；文件很多，会让仓库变大。 |
| `.obsidian/` | 这是某一个 vault 的私有界面、插件与工作区配置；不是插件源码。 |
| `data.json` | 将来保存你的颜色预设和个人设置，属于个人数据。 |
| `.DS_Store` | macOS 自动产生的文件，不是代码。 |
| `.Rhistory` | 与这个 TypeScript 插件无关。 |
| `.git/` | 每个 Git 仓库自己的历史数据库，不能把官方 sample 的 `.git` 复制进你的仓库。 |
| `main.js` | 它可以由源码构建生成。日常开发仓库不提交它；未来创建 GitHub Release 时再作为发布附件上传。 |

## 为什么 `main.js` 不提交，但 Obsidian 又需要它？

这是初学者最容易困惑的地方。

```text
GitHub 开发仓库：src/main.ts + 构建配置
                         │
                         │ npm run build
                         ▼
测试 vault 的插件目录：main.js + manifest.json + styles.css
                         │
                         ▼
                     Obsidian 加载并运行
```

Obsidian 不认识 TypeScript，所以它需要 `main.js`；但 GitHub 保存 TypeScript 源码即可，因为 `main.js` 可以稳定地重新生成。这样你不会在修改源码后忘记同步修改生成文件，也不会产生难以阅读的提交记录。

将来发布给普通用户时，GitHub Release 才会提供三份可直接安装的文件：`main.js`、`manifest.json`、`styles.css`。

## 第三阶段：实际整理动作（先不执行）

1. 在 `obsidian_highlight` 中建立正式的插件项目结构。
2. 从当前测试插件中复制“要提交”的文件，而不是复制整个 vault。
3. 把 `manifest.json` 的 ID、名称和描述改成自己的插件信息。
4. 把测试 vault 中的插件文件夹改名为 `highlight-palette`，使其与 ID 相同。
5. 修改 `.gitignore`，确保 `node_modules/`、`main.js`、`.DS_Store`、个人设置等不会被加入 Git。
6. 删除或替换官方 sample 的骰子、示例弹窗、示例定时器和无关设置页。
7. 运行 `npm run build`，确认新项目仍能生成 `main.js`。
8. 在 Obsidian 中重新加载并测试颜色功能。

到这一步，我们还没有上传任何东西；只是让本机目录成为一个干净、可提交的项目。

## 第四阶段：第一次 Git 提交

Git 中最常见的三个动作：

```text
git add     选择这次要记录的文件
git commit  给这一组变化写一个“存档说明”
git push    把本地存档发送到 GitHub
```

第一次提交会类似于：

```text
提交说明：Initial Highlight Palette plugin
```

提交前必须检查：

```bash
git status
```

它会列出将要提交的文件。我们会逐项确认没有 `node_modules/`、`.obsidian/`、`data.json` 和个人笔记，才执行提交和 push。

## 你可以如何判断“这文件该不该上传”

问自己两个问题：

1. 别人在一台新电脑上下载仓库后，是否需要它来理解、编译或维护插件？需要，就提交。
2. 它是否是个人数据、笔记、电脑自动生成文件，或能被命令重新生成？是，就不提交。

## 现在的安全边界

在你确认之前，我们不会：

- 删除测试 vault 中的任何笔记；
- 推送任何内容到 GitHub；
- 改变官方仓库的内容；
- 将你的个人 Obsidian 配置或笔记上传到公开仓库。

下一步是先完成“正式项目目录整理”，然后把准备提交的文件列表展示给你检查。只有你确认列表后，才会执行第一次 `git add`、`git commit` 和 `git push`。

---

# 补充：使用现有 `obsidian_highlight` 文件夹作为正式源码仓库

前面的计划有一处需要明确：**你已经从 GitHub clone 下来的 `obsidian_highlight` 文件夹，就是正式项目所在的位置。我们应当直接使用它。**

不需要删除它，也不需要把整个 Git 仓库搬进 Obsidian vault。

```text
/Users/elinam/Desktop/agent_first/
├── obsidian_highlight/                 ← 你手动维护、Git 提交并 push 的正式源码
│   ├── src/
│   ├── manifest.json
│   ├── package.json
│   └── ...
│
└── ObsidianinTest/                     ← 只用来运行和测试插件的 vault
    └── .obsidian/plugins/highlight-palette/
        ├── main.js
        ├── manifest.json
        └── styles.css
```

可以这样理解：

- `obsidian_highlight` 是你的“工程文件夹”和 GitHub 项目。
- `ObsidianinTest` 是运行插件的“实验场”。
- 你在工程文件夹写代码、编译，再把三个运行文件放进测试 vault。

## 你亲自操作的第 1 步：复制项目骨架到 GitHub 仓库

这一阶段**不要**操作 Git，也不要上传。目标只是让 `obsidian_highlight` 变成一个完整的插件项目。

### 1. 为什么要复制这些文件？

现在能运行的颜色代码位于测试 vault 中的官方 sample plugin 文件夹；而 GitHub 仓库 `obsidian_highlight` 原本还是空项目。

我们复制的是“让别人能够理解、安装依赖并重新编译插件”的必要材料：

| 要复制的内容 | 为什么要复制 |
| --- | --- |
| `src/` | 这是人写的 TypeScript 源码。其中 `highlight.ts` 就是我们写的颜色功能；没有它，插件功能不存在。 |
| `manifest.json` | Obsidian 读取它来得知插件的 ID、名称、版本和描述。 |
| `package.json` | 告诉 npm 要安装哪些工具，以及 `npm run build` 应该做什么。 |
| `package-lock.json` | 记录依赖的准确版本；让你在另一台电脑上也能得到同样的构建环境。 |
| `tsconfig.json` | 告诉 TypeScript 如何检查和编译 `.ts` 源码。 |
| `esbuild.config.mjs` | 告诉 esbuild 如何把多个 TypeScript 文件打包成 Obsidian 要运行的 `main.js`。 |
| `styles.css` | 插件将来需要的自定义样式；即使目前很少，也保留项目骨架。 |
| `.gitignore` | 告诉 Git 自动忽略不该上传的本地文件。 |
| `versions.json` | 以后发布多个版本时，记录每个版本所需的最低 Obsidian 版本。 |
| `LICENSE` | 说明代码的使用许可；当前官方 sample 使用 0BSD，允许修改和再发布。 |

### 2. 用 Terminal 复制（实际采用的方法）

打开 Terminal 后，逐行运行：

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
```

```bash
cp -R /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/src .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/manifest.json .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/package.json .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/package-lock.json .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/tsconfig.json .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/esbuild.config.mjs .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/styles.css .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/.gitignore .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/versions.json .
```

```bash
cp /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/obsidian-sample-plugin/LICENSE .
```

这里的 `cp` 意思是 copy（复制），最后的 `.` 意思是“复制到当前目录”。`cp -R` 中的 `-R` 意思是递归复制，因此能复制整个 `src` 文件夹和其中的文件。

这些命令只会把列出的文件复制进仓库，不会删除来源文件，不会提交 Git，也不会上传 GitHub。

复制完成后，目标文件夹应看起来像：

```text
obsidian_highlight/
├── src/
│   ├── main.ts
│   ├── highlight.ts
│   └── settings.ts
├── manifest.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── esbuild.config.mjs
├── styles.css
├── .gitignore
├── versions.json
└── LICENSE
```

### 3. 不要复制这些东西

不要复制以下项目：

```text
.git/                  ← 这是官方 sample 的 Git 历史，不能带到你的仓库
node_modules/           ← 以后在目标文件夹运行 npm install 会重新生成
main.js                 ← 以后在目标文件夹运行 npm run build 会重新生成
AGENTS.md               ← 这是开发辅助说明，不是你的插件功能
README.md               ← 目前仍是官方 sample 的说明；我们下一步会自己写
.github/                ← 暂时不复制，等项目清理好再决定是否加入自动检查
```

也不要把整个 `.obsidian` 文件夹或任何笔记 `.md` 复制到 GitHub 仓库。

### 4. 完成后如何检查

回到终端，输入：

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
ls
```

你应该能看到 `src`、`manifest.json`、`package.json` 等文件。

此时请停下，**不要**运行 `git add`、`git commit` 或 `git push`。把 `ls` 的输出或截图发给我；我会带你做下一步：把官方 sample 名称改成你自己的插件身份。

## 你亲自操作的第 2 步：给插件自己的身份（下一步再做）

等第 1 步检查通过后，我们会改：

```text
manifest.json 中的 id：highlight-palette
manifest.json 中的 name：Highlight Palette
manifest.json 中的 description：简短说明你的插件做什么
```

注意：这一步尚未执行。修改 ID 后，测试 vault 中的插件文件夹也要改名为：

```text
/Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/highlight-palette
```

## 之后的路线图

你完成第 1 步后，我们按以下顺序继续：

1. 改插件 ID、名称与描述。
2. 清理官方骰子、弹窗、定时器等教学代码。
3. 在 `obsidian_highlight` 中执行 `npm install` 和 `npm run build`。
4. 将构建产物 `main.js`、`manifest.json`、`styles.css` 复制到测试 vault 的插件目录。
5. 在 Obsidian 重新加载并测试颜色功能。
6. 创建自己的 `README.md`。
7. 学习 `git status`，只检查文件，不提交。
8. 你确认文件列表后，才学习 `git add`、`git commit` 和 `git push`。

---

# 实际操作记录：第 2 步与第 3 步

这一部分记录我们实际采用的命令与原因。之后每完成一步，都在这里追加相同格式的记录。

## 第 2 步：将官方 sample 改为自己的插件身份

### 为什么要做

刚复制来的 `manifest.json` 仍写着 `Sample Plugin` 和 `sample-plugin`。它属于官方教学模板；你的插件需要自己的稳定 ID、显示名称和版本。

其中最重要的是 `id`：Obsidian 用它识别插件。发布后不要轻易改动它。

### 实际命令

进入源码仓库后：

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
```

编辑插件身份证：

```bash
nano manifest.json
```

将内容改成：

```json
{
  "id": "highlight-palette",
  "name": "Highlight Palette",
  "version": "0.1.0",
  "minAppVersion": "1.13.0",
  "description": "Apply colors to selected text.",
  "author": "elinam",
  "authorUrl": "https://github.com/momo060",
  "isDesktopOnly": false
}
```

编辑版本兼容性表：

```bash
nano versions.json
```

将内容改成：

```json
{
  "0.1.0": "1.13.0"
}
```

### nano 的保存方法

```text
Control + O  → 保存（write Out）
Enter        → 确认当前文件名
Control + X  → 退出 nano
```

### 如何检查

```bash
cat manifest.json
cat versions.json
```

你已完成这一步。终端中 `}%` 的 `%` 是 shell 提示符紧贴在文件末尾；它不是 JSON 内容，也不是错误。

## 第 3 步：移除官方教学功能（正在进行）

### 为什么要做

官方 sample 带有骰子图标、示例弹窗、示例文字替换、设置页和定时器。它们用于教学，但不是 Highlight Palette 的功能；保留它们会让插件行为混乱，也会让代码检查报 sample 相关错误。

我们只保留：选中一段文字后，应用预设高亮颜色的命令。

### 要执行的操作

编辑入口文件：

```bash
nano src/main.ts
```

删除所有旧内容，替换为：

```ts
import { Plugin } from 'obsidian';
import { registerHighlightCommands } from './highlight';

export default class HighlightPalettePlugin extends Plugin {
	onload() {
		registerHighlightCommands(this);
	}
}
```

保存并退出 nano 后，删除不再使用的 sample 设置文件：

```bash
rm src/settings.ts
```

`rm` 是删除命令；这里的目标是一个已经确认不再使用的特定源码文件 `src/settings.ts`，不会影响 vault 中的笔记。

### 预期结果

```bash
ls src
```

应该显示：

```text
highlight.ts
main.ts
```

第 3 步完成后，再进行构建验证；在验证通过前，不进行 Git 提交或 GitHub 上传。

### 实际完成结果

你运行了：

```bash
ls src
```

并得到：

```text
highlight.ts
main.ts
```

这证明 sample 的 `settings.ts` 已删除。你也用 `cat src/main.ts` 确认入口文件只保留 `registerHighlightCommands(this)`；第 3 步完成。

## 第 4 步：安装依赖并构建（下一步）

### 为什么要做

刚复制来的源码仓库还没有自己的 `node_modules/`。`node_modules/` 是 npm 下载到当前项目中的构建工具；它不会上传 GitHub，因为可由命令重新生成。

构建会读取 `src/main.ts` 和 `src/highlight.ts`，检查 TypeScript 代码，并生成 `main.js`。Obsidian 只能实际运行生成后的 `main.js`，不能直接运行 `.ts` 源码。

### 要执行的命令

确保终端位于项目目录：

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
```

安装项目依赖：

```bash
npm install
```

安装完成后，构建插件：

```bash
npm run build
```

最后检查构建产物是否存在：

```bash
ls -l main.js
```

### 预期结果与注意事项

- `npm install` 会创建 `node_modules/`；这是正常的，且 `.gitignore` 会阻止它被提交。
- `npm run build` 成功时应显示 TypeScript 和 esbuild 的构建过程，且不会出现 `error`。
- `ls -l main.js` 应显示一个文件大小大于 0 的 `main.js`。
- 此步骤只是本机安装和编译；仍然不会 Git 提交或上传 GitHub。

### 实际完成结果

你运行了：

```bash
npm install
npm run build
ls -l main.js
```

并成功生成了大小为 1413 bytes 的 `main.js`。这证明当前 `src/main.ts` 和 `src/highlight.ts` 可以通过 TypeScript 检查并被打包为 Obsidian 可运行的 JavaScript；第 4 步完成。

`npm install` 显示的 3 个高危依赖审计提示来自官方 sample 的依赖树。现在**不要**运行 `npm audit fix`：它会自动升级依赖，可能引入与教程不相关的变化。另一个 `esbuild` install-scripts 提示不影响本次构建，因为构建已成功。

## 第 5 步：同步 npm 项目名称和版本（下一步）

### 为什么要做

`manifest.json` 是 Obsidian 的插件身份证；`package.json` 是 npm 的项目身份证。我们已更新前者，但构建日志仍显示：

```text
obsidian-sample-plugin@1.0.0
```

这说明后者还是官方 sample 的名称和版本。虽然不影响当前功能，但会让 README、构建日志和未来发布信息混乱，因此需要同步成 `highlight-palette@0.1.0`。

### 要执行的操作

编辑 npm 配置：

```bash
nano package.json
```

只修改最上方这三项，其他 `scripts` 和 `devDependencies` 保持不变：

```json
"name": "highlight-palette",
"version": "0.1.0",
"description": "Apply colors to selected text.",
```

保存并退出 nano 后，更新锁文件中的对应记录：

```bash
npm install --package-lock-only
```

这个命令只更新 `package-lock.json` 的项目元数据；它不会重新下载 `node_modules/`，也不会上传任何内容。

### 如何检查

```bash
npm run build
```

构建日志开头应变成：

```text
> highlight-palette@0.1.0 build
```

第 5 步验证通过后，才把三个运行文件复制到测试 vault，并在 Obsidian 中测试新版本。

### 实际完成结果

你运行了：

```bash
npm install --package-lock-only
npm run build
```

构建日志显示：

```text
> highlight-palette@0.1.0 build
```

这证明 `package.json` 和 `package-lock.json` 已与 `manifest.json` 的 `0.1.0` 版本同步；第 5 步完成。

你曾输入 `> highlight-palette@0.1.0 build`，这是把“预期输出”误当成了终端命令，因此 zsh 显示 `command not found: build`。这没有修改任何文件，也不影响后面真正成功运行的 `npm run build`。

## 第 6 步：将构建产物部署到测试 vault（下一步）

### 为什么要做

你的正式源码和 Git 仓库位于：

```text
/Users/elinam/Desktop/agent_first/obsidian_highlight
```

但 Obsidian 只会从当前 vault 的下列位置加载社区插件：

```text
<vault>/.obsidian/plugins/<插件 ID>/
```

因此，构建后的三个运行文件必须复制到测试 vault。它们是：

```text
main.js        ← Obsidian 实际执行的插件程序
manifest.json  ← 插件 ID、名称、版本等身份证
styles.css     ← 插件的可选外观样式
```

不需要复制 `src/`、`node_modules/` 或 `package.json` 到 vault，因为 Obsidian 运行插件时不需要它们。

### 要执行的命令

先保证在正式源码仓库中：

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
```

创建与插件 ID 一致的测试插件目录：

```bash
mkdir -p /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/highlight-palette
```

`mkdir` 是创建文件夹；`-p` 表示“若文件夹已经存在，也不要报错”。这条命令不会删除旧的 `obsidian-sample-plugin` 文件夹；旧 sample 会暂时保留为备份。

复制三个运行文件：

```bash
cp main.js /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/highlight-palette/
```

```bash
cp manifest.json /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/highlight-palette/
```

```bash
cp styles.css /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/highlight-palette/
```

检查部署结果：

```bash
ls -l /Users/elinam/Desktop/agent_first/ObsidianinTest/.obsidian/plugins/highlight-palette
```

### 在 Obsidian 中验证

1. 完全退出 Obsidian（`⌘ + Q`），再重新打开 **ObsidianinTest** vault。因为我们新加入了一个新的插件 ID，完整重启最可靠。
2. 打开 **设置 → 第三方插件**。
3. 找到 **Highlight Palette** 并启用它。
4. 将旧的 **Sample Plugin** 关闭；不要删除它，它暂时是备份。
5. 在笔记中选中一段文字，用 `⌘ + P` 搜索 `Highlight selected text`，选择一种颜色。

第 6 步通过的标志：旧骰子图标不再出现，颜色命令仍然可用，且插件列表显示的是 Highlight Palette。

### 实际完成结果

你已在同一个测试 vault `ObsidianinTest` 中完成验证：

- 插件列表显示 **Highlight Palette**；
- 旧的骰子图标不再出现；
- 选中文字后，颜色命令仍能正常工作。

这证明正式源码仓库构建出的 `main.js` 已被正确复制到测试 vault，并由 Obsidian 加载；第 6 步完成。旧 `obsidian-sample-plugin` 目前只作为备份保留，不需要删除。

## 第 7 步：创建自己的 README（下一步）

### 为什么要做

README 是 GitHub 仓库首页最先显示的说明书。它告诉别人，也告诉未来的你：这个项目做什么、当前有什么功能、怎样安装和怎样开发。

目前没有复制官方 sample 的 README，因为它介绍的是官方教学插件，而不是你的 Highlight Palette。现在需要写一份自己的简短 README。

### 要执行的操作

在 `obsidian_highlight` 目录中创建并编辑 README：

```bash
nano README.md
```

粘贴以下内容：

```md
# Highlight Palette

Apply preset colors to selected text in Obsidian.

## Current features

- Highlight selected text in yellow, green, pink, blue, or purple.
- Works through commands in the Obsidian Command palette.

## Development

```bash
npm install
npm run build
```

To test the plugin, copy `main.js`, `manifest.json`, and `styles.css` to:

```text
<vault>/.obsidian/plugins/highlight-palette/
```

Then restart Obsidian and enable Highlight Palette under **Settings → Community plugins**.

## Status

This is an early learning project. Custom colors and a quicker color-selection interface are planned.
```

保存并退出 nano：

```text
Control + O → Enter → Control + X
```

### 如何检查

```bash
cat README.md
```

确认内容显示正常后，下一步才会学习 `git status`：它只列出当前有哪些文件尚未提交，不会修改或上传任何文件。

### 实际完成结果

你已创建 `README.md`，其中包含：项目名称、当前预设颜色功能、构建命令，以及把三个运行文件复制进 vault 插件目录的测试说明；第 7 步完成。

截图中 README 里的反引号和 `**Settings → Community plugins**` 是 Markdown 的正常原始写法。GitHub 会把它们渲染成代码块和粗体文字。

### 一个需要清理的意外文件

截图还显示一个名为：

```text
highlight-palette@0.1.0
```

的文件。它不是插件文件。原因是之前误把预期日志行 `> highlight-palette@0.1.0 build` 输入到 shell；开头的 `>` 在 shell 中表示“把输出写入文件”，因此创建了这个空文件。

在确认它确实是空文件后，可以精确删除它：

```bash
ls -l highlight-palette@0.1.0
rm highlight-palette@0.1.0
```

`rm` 只会删除这个准确名称的意外空文件，不会删除 `highlight-palette` 插件目录，也不会影响 vault 或笔记。

## 第 8 步：首次查看 Git 状态（下一步）

### 为什么要做

到目前为止，我们复制、编辑、安装和构建了很多文件，但还没有使用 Git 的“保存历史”功能。

`git status` 是一个安全的只读检查命令：它只列出哪些文件尚未被 Git 记录，不会修改文件、提交文件或上传 GitHub。

### 要执行的命令

先删除上面确认过的意外文件，然后运行：

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
git status --short
```

### 如何理解输出

- `?? 文件名`：Git 还不认识的新文件；这不代表错误。
- `M 文件名`：Git 已经认识这个文件，但它后来被修改了。
- 没有输出：没有尚未记录的更改。

我们预期会看到源码、配置、README 和计划文件等新项目文件；但不应该看到 `node_modules/`，因为 `.gitignore` 应把它忽略。

此步骤结束时仍然**不**执行 `git add`、`git commit` 或 `git push`。先看清 Git 将会看到什么，才决定哪些文件应进入第一次提交。

### 实际完成结果

你运行了：

```bash
git status --short
```

并看到全部条目前带有 `??`。这表示 Git 仓库目前还没有任何提交，因此 Git 还不认识这些新文件；它不是错误。

你没有看到 `node_modules/` 和 `main.js`，这证明 `.gitignore` 已经正常工作：它们存在于电脑上，但 Git 自动忽略它们；第 8 步完成。

## 第 9 步：让 Git 忽略本地教程与临时文件（下一步）

### 为什么要做

当前 `git status` 中还有两个不属于正式插件源码的项目：

```text
build_a_plugin.md  ← 下载的官方教程副本；本地阅读即可
tmp/               ← 临时学习文件夹，其中还有与项目无关的 .Rhistory
```

它们不需要出现在 GitHub 的插件项目中。把它们写进 `.gitignore` 后，文件仍会留在你的电脑上，但 Git 不再要求你决定是否提交它们。

注意：`plan/` 不在忽略名单中，因为这里保存的是你希望随项目保留的学习与操作计划。

### 要执行的操作

编辑忽略规则：

```bash
nano .gitignore
```

在文件**最后**追加以下两行：

```gitignore
# Local learning notes and temporary files
build_a_plugin.md
tmp/
```

保存并退出 nano：

```text
Control + O → Enter → Control + X
```

### 如何检查

再次运行：

```bash
git status --short
```

预期：`build_a_plugin.md` 和 `tmp/` 不再显示；其余源码、配置、README、LICENSE 和 `plan/` 仍会显示。

这一步只改变 Git 的忽略规则，不会删除文件，也不会提交或上传。

### 实际完成结果

你在 `.gitignore` 最后加入了：

```gitignore
# Local learning notes and temporary files
build_a_plugin.md
tmp/
```

再次执行 `git status --short` 后，`build_a_plugin.md` 与 `tmp/` 已不再显示。这证明 Git 会忽略它们，但文件仍保留在本机；第 9 步完成。

当前显示的文件全部属于我们确认过的正式项目内容：源码 `src/`、插件配置、构建配置、README、LICENSE 和 `plan/` 学习记录。

### 后续调整：保留学习说明，不上传 R 历史文件

之后你决定希望上传 `tmp/obsidian_guide.md` 中的学习说明，因此移除了 `.gitignore` 里的 `tmp/` 规则。这是合理的决定，但 `tmp/` 同时包含：

```text
tmp/obsidian_guide.md  ← 希望保留的学习说明
tmp/.Rhistory          ← R 工具产生的本地命令历史，不属于插件项目
```

你选择保留 `tmp/obsidian_guide.md` 并上传它，因此不移动该文件。只忽略无关的 R 本地命令历史。

编辑 `.gitignore`：

```bash
nano .gitignore
```

在最后加入：

```gitignore
# Local R command history
tmp/.Rhistory
```

保留原有的：

```gitignore
build_a_plugin.md
```

最后检查：

```bash
git status --short
```

预期：`tmp/.Rhistory` 不会显示，但 `tmp/obsidian_guide.md` 会作为 `tmp/` 显示在 Git 状态中。这样 GitHub 会保存这份学习说明，但不会上传 R 命令历史。

### 实际完成结果

你最终将 `obsidian_guide.md` 移入了：

```text
plan/obsidian_guide.md
```

并在 `.gitignore` 中保留：

```gitignore
tmp/.Rhistory
```

现在 `tmp/` 里只剩被忽略的 `.Rhistory`，因此 `git status --short` 不显示 `tmp/` 是正确的。学习说明位于 `plan/`，会随项目一起上传。

## 第 10 步：把已检查的项目文件放入暂存区（下一步）

### 什么是“暂存区”？

Git 可以把一次提交理解成给项目拍一张“历史快照”。但 Git 不会自动把所有文件放进快照；你需要先把本次想记录的文件放到一个准备区，叫作 **暂存区（staging area）**。

```text
工作目录（现在正在修改的文件）
          ↓ git add
暂存区（准备放进下一张快照的文件）
          ↓ git commit
本地 Git 历史（已经保存的快照）
          ↓ git push
GitHub（远程备份）
```

`git add` 的意思不是“上传 GitHub”，而是“选择这些文件放入下一次本地快照”。在我们已经检查过当前文件列表的前提下，使用 `git add .` 是安全的。

### 要执行的命令

```bash
cd /Users/elinam/Desktop/agent_first/obsidian_highlight
git add .
```

这里的 `.` 表示当前目录以及其中所有**未被 `.gitignore` 忽略**的文件。

### 如何检查

```bash
git status --short
```

预期每一行会从：

```text
?? README.md
```

变为：

```text
A  README.md
```

`A` 表示 Added（已加入暂存区）。注意 `A` 后通常有两个空格；Git 状态的第一个位置表示暂存区状态，第二个位置表示暂存之后又有没有额外修改。

本步骤仍然不会创建 commit，也不会上传 GitHub。看到暂存清单后，我们会再次检查它，才进行第一次 commit。
