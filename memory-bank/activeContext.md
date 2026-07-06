# Active Context

## 当前状态
- 根目录 `next.config.mjs` 已为局域网开发来源 `192.168.1.2` 和 `localhost` 增加 `allowedDevOrigins` 顶层配置；开发服务在第 1 次 `npm run dev` 启动成功。
- 已验证带 `Origin: http://192.168.1.2` 的 Next.js 内部静态资源请求返回 HTTP 200；浏览器点击暂停倒计时后按钮切换为继续状态且计时停止，控制台无应用错误或警告。
- Spec-Driven Solo (V1.1.0) 的 M2 奖励体验增量已完成，`memory-bank/` 已同步到当前代码事实。
- 项目已从空目录骨架升级为可运行的 Next.js App Router 应用。
- 当前核心用户路径已贯通：理解重复加法 → 切换乘法表达 → 选择难度 → 定位矩阵交点 → 输入答案 → 判定并计分。
- 最近一次校验结果：`npm run lint` 通过，`npm run build` 通过；浏览器完成 3×3 全关卡交互、奖励卡、下一关重置、1280px 桌面与 390px 窄屏验证。
- 熔断状态：未触发；受控命令连续失败计数为 0。
- 本地开发服务可正常返回页面；运行时 Watchpack 仍报出环境级 `EMFILE: too many open files, watch` 监听器告警，不影响本次 lint、局域网资源请求或浏览器交互结果。

## 已落地源码盘点

### 页面与样式
- `src/app/layout.tsx`
  - 定义根布局、中文页面语言及产品 Metadata。
- `src/app/page.tsx`
  - 集成品牌页头、`GameController`、`ConceptVisualizer` 与 `TrainingMatrix`。
- `src/app/globals.css`
  - 建立 Apple 风格设计令牌、响应式布局、矩阵状态样式、按钮和输入状态。
  - 覆盖桌面及移动端断点，并兼容 `prefers-reduced-motion`。
  - 增加低饱和粒子、Backdrop Blur 毛玻璃奖励卡片及移动端收敛样式。

### 业务组件
- `src/components/ConceptVisualizer.tsx`
  - 渲染 3 行 × 4 列、共 12 个精细圆点。
  - 在 `4 + 4 + 4 = 12` 与 `3 × 4 = 12` 之间切换。
  - 使用 Framer Motion 完成圆点分组、贝塞尔缓动轨迹与公式淡入。
- `src/components/TrainingMatrix.tsx`
  - 渲染完整 10 × 10 乘法矩阵和行列标题。
  - 支持 3×3、6×6、9×9、10×10 难度切换及锁定格线。
  - 支持选中交点、行列交叉高亮、数字输入、正确/错误判定和继续练习。
  - 将判定结果直接联动 Web Audio；普通正确答案播放升调双音，关卡完成播放渐进琶音。
  - 关卡 100% 正确后触发重力粒子、延迟淡入奖励卡，并支持进入下一难度或重练 10×10。
  - 使用语义化 `grid`、`rowheader`、`columnheader` 与 `gridcell` 提供基础可访问性。
- `src/components/GameController.tsx`
  - 展示并控制倒计时暂停/继续。
  - 展示得分及正确答案的 `+10` 动效反馈。

### 奖励体验源码
- `src/utils/audio.ts`
  - 使用浏览器原生 Web Audio API 懒初始化共享 `AudioContext`。
  - 通过 Sine Wave 与指数 Gain 衰减实时合成 `playCorrect()` 和 `playLevelComplete()`，不引入音频资源依赖。

### 强类型、数据与状态
- `src/types/index.ts`
  - 已逐字段镜像 `DifficultyTier`、`GameSettings` 和 `MatrixCell` 契约。
  - `GameEffectType` 已包含 `level-complete`，与 `GameEffect` 共同约束声音和奖励事件。
- `src/lib/matrix.ts`
  - 维护难度与矩阵尺寸映射。
  - 根据当前难度生成 100 个强类型 `MatrixCell`，并计算 `isReadOnly`。
- `src/store/gameStore.ts`
  - 使用 Zustand 管理难度、矩阵、当前交点、输入判定、得分和倒计时。
  - 判定最后一个正确格时发出 `level-complete` 并暂停计时。
  - 切换难度时以单次 Zustand 更新重建矩阵、重置锁定格线、分数、倒计时、计时运行态和效果状态。
  - 保留 `mathgrid:effect` 自定义事件供后续外部效果订阅。

## 当前架构完整度
- 核心前端架构：完整。
  - App Router 页面层：已完成。
  - 业务组件层：已完成。
  - Zustand 状态层：已完成。
  - 强类型契约与矩阵数据层：已完成。
  - Tailwind/CSS 视觉系统与 Framer Motion 动画层：已完成。
- MVP 核心交互闭环：完整。
- 尚未完成的增强项：
  - 用户声音开关、系统静音偏好与音频可用性提示。
  - 连击机制和更完整的关卡统计。
  - 自动化单元测试、组件测试及端到端测试。
  - 持久化学习记录和服务端数据能力。

## 下一步聚焦
1. 为原生声音适配器增加用户声音开关与偏好持久化。
2. 增加 Zustand 状态机与矩阵判定的自动化测试。
3. 补齐超时、重新开始和连击流程。
4. 在引入持久化前先冻结学习记录的数据契约。

## SOP 状态
- [x] SOP 阶段 1：资产归档。
- [x] SOP 阶段 2：图纸精炼并落盘 `memory-bank/`。
- [x] SOP 阶段 3：源码落地 `src/`。
- [ ] SOP 阶段 4：增强功能、自动化测试与发布准备（奖励体验已完成，测试与发布待推进）。
