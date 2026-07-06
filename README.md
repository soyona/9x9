# 🧩 9x9 MathGrid (九九乘法数阵) - V1.0.0-MVP

> **基于前端全栈单兵工程规范 [Spec-Driven Solo (V1.2.0)](https://github.com/soyona/spec-driven-solo) 倾力打造的标杆实战项目。**
> 这是一个专门面向低年级儿童设计的 Apple 质感、全自适应乘法矩阵认知与闯关训练应用。全流程严格遵循“改码前先改图纸”的宪法约束，实现 100% 零瞎猜、零死锁的高确定性演进。

---

## 🚀 规范 V1.2.0 核心价值证明 (Case Study Value)

作为继 **[Hanzi Connect](https://github.com/soyona/hanzi-connect)** 之后的又一工业级实战样本，本项目完整验证了规范 **V1.2.0 版本** 针对智能体“状态漂移”与“网络边界二义性”提出的双向锁死机制：

1. **🔒 EST 物理交付卡点（No Log, No Done）**：在 M2 声光效果与关卡链路的敏捷腾挪中，智能体曾试图跳过记忆轨直接交付代码。项目通过 `.clinerules` 强行拦截，必须将物理更新 `memory-bank/activeContext.md` 与 `progress.md` 作为最终 Act 动作，彻底解决了智能体长对话下的马尔可夫认知退化。
2. **🌐 运行时网络边界审计（Runtime Auditing）**：针对 Next.js 应用在局域网（`192.168.1.2`）多端真机联调时，因热更新（HMR）安全策略导致的点击响应失效，项目前置在 `techContext.md` 中立项审计，通过顶层 `allowedDevOrigins` 配置锁死网络边界，抹平了“静态编译完美”与“用户运行时物理表现”的隐式死锁。

---

## 🎨 产品核心特性与交互宪法

本项目在视觉、动效及状态机架构上，严密对齐了 Apple 风格的极简留白与平滑微动效设计：

* **🧠 概念认知模块 (`ConceptVisualizer`)**：通过 Framer Motion 实现 3行×4列 共12个精细圆点的物理聚拢与贝塞尔缓动，平滑推导 `4 + 4 + 4 = 12` 重复加法向 `3 × 4 = 12` 乘法表达的代际跨越，完美兼容 `prefers-reduced-motion` 减弱动态效果系统设置。
* **⚡ Apple 质感声光奖励系统 (`TrainingMatrix`)**：梯度解锁 3×3、6×6、9×9、10×10 四大难度矩阵。当关卡 100% 正确时，触发非线性重力粒子烟花与 Backdrop Blur 毛玻璃结算卡片。
* **🎵 原生 Web Audio 纯净实时合成**：摒弃任何外部巨型音频资产依赖，通过 Web Audio API 懒初始化共享 `AudioContext`，使用正弦波（Sine Wave）与指数级增益衰减（Gain Decay），纯代码实时合成答题正确的升调双音与通关渐进琶音。
* **📱 390px 窄屏动态视口自适应**：全局强锁定 `flex` 与网格收敛布局，提供语义化 `gridcell` 可访问性，在移动端横向无溢出包裹，多端真机交互体验无滚动条死锁。

---

## 📂 三轨制工程架构盘点

项目物理拓扑完全遵循 Spec-Driven 三轨职责隔离：

```text
9x9/
├── 📄 .clinerules / .codexrules    # ⚖️ 【最高铁律】常驻行为紧箍咒（含 3次报错编译熔断线）
├── 📂 product-assets/              # 🎨 【资产轨】人类初始 PRD 与产品多端响应式视觉蓝图
├── 📂 memory-bank/                 # 🧠 【记忆轨】V1.2.0 持久化大脑与运行环境边界控制中心
│   ├── 📄 techContext.md           # [🔒 已审计] 锁死 192.168.1.2 局域网开发安全源
│   └── 📄 dataModels.md            # 锁死 DifficultyTier, GameSettings, MatrixCell 强类型契约
└── 📂 src/                         # 🛠️ 【源码轨】Zustand 状态机与 Web Audio 纯代码物理落地
    ├── 📂 store/gameStore.ts       # 负责原子化难度切换、倒计时恢复及 mathgrid:effect 外部订阅
    └── 📂 utils/audio.ts           # 共享 AudioContext 原生低延迟波形合成器

```

---

## 🛠️ 技术栈与工程指标

* **核心框架**：Next.js 15 (App Router) + TypeScript 5 + Tailwind CSS v4
* **状态管理**：Zustand (全状态原子化原子重置机制)
* **动画系统**：Framer Motion (贝塞尔曲线与低饱和粒子)
* **工程指标**：
* `npm run lint` $\rightarrow$ **0 Errors / 0 Warnings**
* `npm run build` $\rightarrow$ **100% 静态预渲染 (Static Prerendered) 一次性通过**
* 本地配置轨已完全拦截 `.next/`、`out/` 与 `next-env.d.ts`，历史 commit 保持几百 KB 极致纯净度。



---

## 🚀 开发者 3 秒本地真机联调

如果你要在本地运行或让你的 AI 智能体介入该项目，请遵循以下标准 SOP：

1. **依赖克隆与安装**：
```bash
git clone git@github.com:soyona/9x9.git
cd 9x9
npm install

```


2. **运行局域网多端开发服务**：
```bash
npm run dev

```

3. **AI 智能体介入守则**：
直接使用 VS Code 打开根目录。由于根目录配置了 V1.2.0 的 `.clinerules`，你的 Cline / Codex 在读取本 `README.md` 和 `memory-bank/` 后，将自动继承无脑高频试错熔断机制。任何重构动作前，请提醒智能体首先更新 `memory-bank/activeContext.md`。
