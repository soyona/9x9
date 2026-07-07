# Active Context

## 当前状态
- 2026-07-07 本轮 10×10 加法公式完整显示修复已完成：`ConceptVisualizer` 为大行列公式追加 dense 渲染状态，移除加法公式行上的 Tailwind `whitespace-nowrap`/`font-mono` 约束，改由 `.formula-list p.formula-addition` 显式覆盖 `text-overflow: clip` 与 `white-space: normal`，避免 10×10 重复加法出现省略号。
- 本轮验证：`npm run lint && npm run build` 一次通过；fresh `next start -p 3001` Browser QA 切换 10×10 后，加法公式文本完整为 `加法算式：10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 =`，computed `textOverflow=clip`、`whiteSpace=normal`、`additionFitsPanel=true`、`scrollHealth=true`，相关 console 日志为空。临时 3001 server 已停止。
- 2026-07-07 本轮公式区域抖动修复已完成：`ConceptVisualizer` 底部公式区从 `layout` motion 包裹与 `y` 位移动画改为固定高度 `.formula-stable-panel`，只保留 0.16s opacity 过渡，避免切换行列时公式面板自身产生位置抖动。
- 本轮公式区尺寸已稳定：`.formula-stable-panel` 固定为 `height: clamp(118px, 16dvh, 142px)`、`flex-shrink: 0`、内部三行公式使用固定 grid rows 与收紧 line-height/gap，确保 3 行内容完整可见且不挤压页面。
- 本轮验证：`npm run lint && npm run build` 一次通过；fresh `next start -p 3001` Browser QA 测量 3×4、10×1、2×2 切换时公式区 rect 均为 `top=572,left=68.48,width=352.68,height=118`，`listFitsPanel=true`，`scrollHealth=true`，duplicate-key/spring/Uncaught Error 相关 console 日志为空。临时 3001 server 已停止。
- 2026-07-07 本轮 V1.2.5 运行时报错修复已完成：`ConceptVisualizer` 中反馈光层与图形视口的 sibling key 已从同一个裸 `lastEffect.id` 改为 `feedback-${id}` / `viewport-${id}`，消除 React `Encountered two children with the same key` 警告。
- 本轮 Framer Motion spring 报错已修复：正确动画不再使用 spring 驱动三段 keyframes `y: [0, -12, 0]`，改为 `y: [0, -12]` + `repeat: 1` + `repeatType: "reverse"`，保留上弹回落视觉，同时符合 Motion 12 的 spring keyframe 限制。
- 本轮验证：`npm run lint && npm run build` 一次通过，`git diff --check` 通过。Browser DOM snapshot 仍触发环境已知 `incrementalAriaSnapshot is not a function`，已改用 direct DOM evaluate + screenshot + console log 检查。
- 本轮运行时 QA：现有 3000 dev server 对 `ConceptVisualizer` 报错路径已无 duplicate-key/spring 相关 console 日志，但该 dev server 仍服务旧 store bundle；使用 freshly built `next start -p 3001` 验证 patched runtime，输入 3×4=12 后单元格 `readOnly: true`、得分 `10`、公式显示 `12`，且相关 console 日志为空。临时 3001 server 已停止。
- 2026-07-07 本轮 Spec-Driven Solo V1.2.5 已完成：`ConceptVisualizer` 引入 Dynamic Scale Caliper，按当前选中格的行列数切换 `h-7 w-7/gap-1/p-1 m-0.5`、`h-9 w-9/gap-1.5/p-1.5 m-1`、`h-14 w-14/gap-3/p-3 m-2` 三档密度；中间图形视口已改为 `w-full flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden`，彻底移除内部纵向滚动条路径。
- 本轮 3D 图腾引擎已重写为四类高保真拟物资产：非对角线按乘积确定性轮换 3D Glossy Apple、3D Juicy Orange、3D Crystal Diamond；`row === col` 专属渲染 3D Golden Star，使用内部分面高光与 `filter="url(#drop-shadow)"`，不再使用任何外扩金色戒环，避免对角线图腾互相重叠。
- 本轮 Zustand 即时判定已落地：`setCellValue(row, col, value)` 在 `onChange` 阶段用 `Number.parseInt(value, 10) === row * col` 即时设置 `isCorrect/isSubmitted`、加分并发出 `answer-correct`；`submitSelectedCell()` 保持错误答案的 blur/Enter 判定边界，并通过 `isSubmitted` 幂等防重复。
- 本轮反馈层已接入 `lastEffect`：`ConceptVisualizer` 对 `answer-correct` 执行 `y: [0, -12, 0]` spring bounce 和绿色柔光闪烁，对 `answer-incorrect` 执行 `x: [0, -6, 6, -6, 6, 0]` shake 和红色柔光闪烁；`TrainingMatrix` 通过同一 `answer-correct` 事件即时播放正确音效。
- 本轮静态校验：第 1 次 `npm run lint && npm run build` 因 React `set-state-in-effect` 规则阻断；已改为使用 Zustand `lastEffect` 作为动画触发源。第 2 次 `npm run lint && npm run build` 通过，连续失败计数为 0。静态检查确认 `ConceptVisualizer` 不再包含 `overflow-y-auto`。
- 2026-07-07 本轮 Spec-Driven Solo V1.2.0 Rigid Layout Protection 已完成：`ConceptVisualizer` 根舞台改为 `w-full h-full flex flex-col p-6 overflow-hidden min-h-0 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100`，彻底废除旧 `.concept-stage` grid/vh 结构对根容器的控制。
- 中间 3D 图形画布槽已改为单一 `flex-1 min-h-0 w-full overflow-y-auto py-4 flex flex-col justify-center items-center` 容器，不再使用 `max-h-[58vh]` 或旧 grid 子包装；底部公式与结果区已改为 `w-full flex-shrink-0 pt-4 border-t border-slate-100 mt-auto bg-white/50` 刚性容器，内部不再挂载旧 `.formula-panel` 的 `max-height`/`overflow:hidden` 裁剪规则。
- 本轮静态校验：`npm run lint && npm run build` 一次通过，连续失败计数为 0。本轮需人类验收：在矩阵中切换焦点到 10x1 与 2x2，观察 10行图形仅在中间槽内部滚动且公式不被挤压，2x2 稀疏图形不被压扁且底部文字完整可见。
- 2026-07-07 本轮 Spec-Driven Solo V1.2.0 Layout Decoupling & Auto-Spacing Engine 已完成：`ConceptVisualizer` 根舞台改为 `grid grid-rows-[1fr_auto] h-full overflow-hidden`，图形展示区独立包裹为 `max-h-[58vh] overflow-y-auto min-h-0` 的上层滚动槽，公式面板固定在第二行并继续 `flex-shrink-0`，避免 10 行图形挤压公式区。
- 本轮已引入稀疏布局模式：`isSparse = selectedCell.row <= 3 && selectedCell.col <= 3`，稀疏时图形容器追加 `place-content-center gap-y-6 flex-1 justify-center`，单个图腾尺寸提升到约 36-40px，分组框使用 `p-1 gap-1.5`/`.is-sparse` 紧凑包裹，减少 2×2、3×3 的空骨架感。
- 本轮静态校验：`npm run lint && npm run build` 一次通过，连续失败计数为 0。浏览器 QA 使用 `http://127.0.0.1:3000/` 验证页面标题、无 console error/warn、`.concept-stage` computed `display: grid`、公式面板 `flex-shrink: 0`、图形槽 `overflow-y: auto`、页面高度锁定；本轮浏览器会话未能让矩阵选中态从初始 `3×4` 切换到 `2×2`，因此稀疏 2×2 的真实交互视觉仍需人类近距验收。
- 本轮需人类验收：重点检查 10行1列或 10行少列时公式/结果面板是否 100% 可见且图形区内部滚动稳定；检查 2×2、3×3 稀疏模式是否居中、放大、边框紧凑且视觉高级。
- 2026-07-07 本轮布局死锁与 3D 质感精修已完成：`ConceptVisualizer` 已移除“几行 × 几列”描述，公式面板强制 `flex-shrink: 0`，加法算式单行 `nowrap` 并用横向微滚动/遮罩收容；未答结果已替换为 48×24 的呼吸胶囊槽位。
- 本轮虚线分组框已按列数自动收紧：`C <= 3` 时使用 `p-1 m-0.5` 紧贴图腾，`C > 3` 时使用 `p-2 m-1`，避免少列图形出现空旷边框。
- 本轮 3D 材质升级已完成：Minecraft 图腾改为 top/front/right 三面嵌套块体并加入内高光与实体投影；Mars/Earth/Fruit SVG radialGradient 使用 `fx="30%" fy="30%" r="70%"` 形成左上高光球面；Circle 与对角线矩阵轨道增加更强的浮雕阴影。
- `TrainingMatrix` 对角线与正确对角线状态已叠加白色上/左边、高对比 amber 下/右边和 `2px 3px 6px rgba(180,120,20,0.4)` 投影，形成 raised metallic track 视觉。
- 本轮静态校验：`npm run lint` 通过，`npm run build` 通过，连续失败计数为 0。浏览器 QA 使用既有 `http://127.0.0.1:3000/` 服务完成直接 computed-style 检查；`domSnapshot()` 触发已知 `incrementalAriaSnapshot is not a function`，一次 Browser keypress 交互尝试超时后停止继续重试。
- 本轮需人类近距验收：重点检查 10行1-5列公式区是否不被挤压、加法算式是否只横向收容不竖向折行、Minecraft/Apple/Sphere 3D 材质是否达到 Apple 式高保真，以及对角线正确格是否像浮起的金属轨道。
- Spec-Driven Solo (V1.2.0) 高集成重构已完成：页面改为 `100dvh` 死锁布局，`body` 固定 `height: 100dvh; overflow: hidden;`，页头收敛为 64px 级别，`.page-shell` 以 `flex: 1; min-height: 0;` 填满剩余视口。
- 首页已改为双列响应式矩阵：桌面端 `.page-shell` 为 12 栏网格，左侧 5 栏承载 `ConceptVisualizer`，右侧 7 栏承载 `TrainingMatrix`；移动端在同一视口内上下分区，不产生页面级滚动。
- `ConceptVisualizer` 已直接订阅 `useGameStore(state => state.selectedCell)`，按当前选中格动态渲染图腾阵列、加法算式与乘法读法；例如选中 4行5列时显示 `5 + 5 + 5 + 5 = 20` 与 `5 × 4 = 20`。
- 评论修复已完成：概念图示为每一行重复加数组增加低饱和蓝色虚线分组框；加法算式已改为标准等式，不再显示 `({R}个)`；矩阵滚动区域内部增加显式内边距与 1px 圆角内框，避免 10×10 网格边框在容器边缘被视觉遮挡。
- 本次 V1.2.0 布局优化已完成：桌面端 `.page-shell` 改为左侧 5 栏 `ConceptVisualizer`、右侧 7 栏 `TrainingMatrix`，概念点阵使用按当前行列数计算的 `clamp()` 圆点尺寸，减少上下空白并避免 7×7 以上点阵撑开容器。
- 平方数规律高亮已完成：`TrainingMatrix` 在 `row === col` 且未选中、未提交、未锁定时添加 `is-diagonal`，使用低饱和 mint 背景；选中、行列聚焦、正确、错误与锁定状态保持原优先级。
- 开放式练习模式已完成：`submitSelectedCell()` 不再发出 `level-complete`，填满最后一个格子不会暂停倒计时；`TrainingMatrix` 已移除关卡完成粒子、奖励卡与自动进入下一关链路。
- `TrainingMatrix` 已移除旧 `section-heading`、`difficulty-bar` 与独立 `answer-panel` 表单；每个可编辑矩阵格内嵌受控原生数字输入，聚焦即选中单元格，输入变化写入 `setCellValue(row, col, value)`，`Enter` 或失焦立即触发 `submitSelectedCell()`。
- `submitSelectedCell()` 已增加已提交格的幂等保护，避免 `Enter` 后接 `blur` 重复播放音效、重复发出效果事件或重复判定。
- 本轮沙盒扩展已完成：`createMatrixCells()` 初始化 100 个全部可交互单元格，初始难度改为 `level_10x10`，旧关卡锁只保留类型兼容，不再阻塞任何坐标输入。
- 本轮键盘导航已完成：每个矩阵原生输入支持 `ArrowUp` / `ArrowDown` / `ArrowLeft` / `ArrowRight` 在 1-10 行列范围内移动焦点；正确单元格改为 `readOnly` 而非 `disabled`，点击或键盘回访仍会更新 `selectedCell` 并同步左侧概念图。
- 本轮平方数状态已完成：普通正确格使用 soft-green，`row === col` 且正确的格子使用 soft-gold、金色内框与加粗数字，与未提交对角线 mint 高亮形成优先级分层。
- 本轮图腾生态已完成：`ConceptVisualizer` 引入 `VisualTheme` 池，按 `(row * col) % themes.length` 在 Circle、Square、Mars、Minecraft、iPhone/iPad、Earth/Cosmos、Fruit 图形间确定性切换；对角线坐标统一显示金色光环和主题内差异化配色。
- 本轮 V1.2.0 视觉与因果升级已完成：`ConceptVisualizer` 基于当前 `selectedCell` 读取完整 `cells` 单元格状态，只有当 `activeCell.isCorrect` 为 true 时才展示加法结果、乘法结果和读法结果；未答对前统一显示带下划线的 `___` 引导占位。
- 本轮 3D 图腾升级已完成：Circle、Square、Minecraft、iPhone/iPad 等几何图形增加 top-left 高光、渐变体积、内阴影和 drop-shadow；Mars、Earth/Cosmos、Fruit 改为带 radialGradient 的分层 SVG；对角线金色光环升级为带 conic-gradient 金属倒角的 3D 戒环。
- 最近一次校验结果：`npm run lint` 通过且无 warning，`npm run build` 通过；本轮未启动浏览器 QA，需人类继续进行 Sandbox 多键布局验证。
- 2026-07-07 校验结果：`npm run lint && npm run build` 一次通过；本轮未启动浏览器 QA，需人类继续进行 3D 保真度检查与答案因果闭环检查。
- 根目录 `next.config.mjs` 已为局域网开发来源 `192.168.1.2` 和 `localhost` 增加 `allowedDevOrigins` 顶层配置；开发服务在第 1 次 `npm run dev` 启动成功。
- 已验证带 `Origin: http://192.168.1.2` 的 Next.js 内部静态资源请求返回 HTTP 200；浏览器点击暂停倒计时后按钮切换为继续状态且计时停止，控制台无应用错误或警告。
- Spec-Driven Solo (V1.1.0) 的 M2 奖励体验增量已完成，`memory-bank/` 已同步到当前代码事实。
- 项目已从空目录骨架升级为可运行的 Next.js App Router 应用。
- 当前核心用户路径已贯通：理解重复加法 → 切换乘法表达 → 选择难度 → 定位矩阵交点 → 输入答案 → 判定并计分。
- 最近一次校验结果：`npm run lint` 通过，`npm run build` 通过；浏览器完成 3×3 全关卡交互、奖励卡、下一关重置、1280px 桌面与 390px 窄屏验证。
- 熔断状态：未触发；受控命令连续失败计数为 0。
- 本地已有 Next dev server 运行在 `http://localhost:3000`；本次另启 `npm run dev` 时被 Next.js 判定同仓库已有开发服务并退出，浏览器 QA 改用既有 3000 服务完成。运行时 Watchpack 仍可能报出环境级 `EMFILE: too many open files, watch` 监听器告警，不影响本次 lint、build 或浏览器交互结果。

## 已落地源码盘点

### 页面与样式
- `src/app/layout.tsx`
  - 定义根布局、中文页面语言及产品 Metadata。
- `src/app/page.tsx`
  - 集成品牌页头、`GameController`、`ConceptVisualizer` 与 `TrainingMatrix`。
  - 使用 `.concept-column` 与 `.training-column` 承载双列视口锁定布局。
- `src/app/globals.css`
  - 建立 Apple 风格设计令牌、响应式布局、矩阵状态样式、按钮和输入状态。
  - 覆盖桌面及移动端断点，并兼容 `prefers-reduced-motion`。
  - 增加低饱和粒子、Backdrop Blur 毛玻璃奖励卡片及移动端收敛样式。
  - 锁定 `100dvh` 页面、压缩页头和公式面板、强制矩阵格 `aspect-ratio: 1`，并通过内部 `.matrix-scroll` 承载小屏横向溢出。
  - 为 `.matrix-scroll` 增加内部留白，为 `.matrix-grid` 增加 1px 边框和圆角，保证 10×10 网格边界可见。

### 业务组件
- `src/components/ConceptVisualizer.tsx`
  - 直接订阅当前选中矩阵格，动态渲染 `R` 行 × `C` 列紧凑主题图腾阵列。
  - 定义 `VisualTheme` 主题池，按选中坐标确定性切换 Circle、Square、Mars、Minecraft、iPhone/iPad、Earth/Cosmos、Fruit 图形。
  - 对角线坐标为所有主题图形增加金色光环和差异化核心色，凸显平方数轨迹。
  - 动态展示标准加法算式 `加法算式：{C} + ... = {R*C}` 与 `乘法算式：{C} × {R} = {R*C}`。
  - 每一行重复加数组使用虚线圆角分组框，强化“相同加数重复出现”的视觉分组。
  - 使用 Framer Motion 完成点阵与公式淡入，容器填满左列高度。
- `src/components/TrainingMatrix.tsx`
  - 渲染完整 10 × 10 乘法矩阵和行列标题。
  - 完整 10×10 从初始化起全部可交互，不再通过难度锁定格线。
  - 支持选中交点、行列交叉高亮、格内数字输入、失焦/回车判定和正确/错误状态。
  - 支持原生输入上的二维方向键焦点导航，移动范围严格限制在 1-10 行列。
  - 正确单元格保持可聚焦 `readOnly` 状态，回访仍触发 `selectedCell` 联动。
  - 将普通正确判定直接联动 Web Audio 升调双音；关卡完成链路已从当前开放式练习中移除。
  - 使用语义化 `grid`、`rowheader`、`columnheader` 与 `gridcell` 提供基础可访问性。
- `src/components/GameController.tsx`
  - 展示并控制倒计时暂停/继续。
  - 展示得分及正确答案的 `+10` 动效反馈。

### 奖励体验源码
- `src/utils/audio.ts`
  - 使用浏览器原生 Web Audio API 懒初始化共享 `AudioContext`。
  - 通过 Sine Wave 与指数 Gain 衰减实时合成普通答对音效；`playLevelComplete()` 仍保留为未接线工具函数，不再由矩阵练习链路触发。

### 强类型、数据与状态
- `src/types/index.ts`
  - 已逐字段镜像 `DifficultyTier`、`GameSettings` 和 `MatrixCell` 契约。
  - `GameEffectType` 已移除 `level-complete`，当前仅保留答题、难度切换与计时结束事件。
- `src/lib/matrix.ts`
  - 维护难度与矩阵尺寸映射。
  - 生成 100 个强类型 `MatrixCell`，当前全部 `isReadOnly: false`，保证完整 10×10 沙盒从初始化起可输入。
- `src/store/gameStore.ts`
  - 使用 Zustand 管理难度、矩阵、当前交点、输入判定、得分和倒计时。
  - 初始难度为 `level_10x10`，`setCellValue()` 对已正确格保持只读防护，避免回访时清除正确状态。
  - 判定最后一个正确格时保持连续练习状态，不再发出通关事件或暂停计时。
  - 已提交格重复提交会直接返回 `null`，保障格内输入的失焦/回车双事件不会重复计分或重复触发效果。
  - 切换难度时以单次 Zustand 更新重建矩阵、分数、倒计时、计时运行态和效果状态；当前矩阵仍保持 100 格全部可交互。
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
1. 废除 ConceptVisualizer 的内部 overflow-y-auto 滚动条，引入 Dynamic Scale Caliper 机制，根据行列数动态微调图腾尺寸与间距，确保 10x10 内的点阵在单屏 100% 完整可见，禁止出现上下滚动条。
2. 彻底移除引起行列相等时图形重叠的外扩金色戒环，将对角线高亮内聚在图腾内部，消除物理像素碰撞。
3. 全面重构图腾渲染引擎，抛弃生硬抽象的旧材质，换用高保真拟物化 3D 资产：3D 红富士苹果、3D 饱满多汁橙、3D 晶莹蓝宝石以及对角线专属的 3D 鎏金能量星。
4. 优化 Zustand 提交流程，在 onChange 触发时完成实时的数学因果判定。只要输入的数值正确，无须失去焦点即可立刻在公式面板展现结果。
5. 注入 Framer Motion 视觉反馈层：即时答对触发整体向上弹性跳跃（Bounce）与绿光闪烁；输错触发整体左右晃动（Shake）与红光警示。

## SOP 状态
- [x] SOP 阶段 1：资产归档。
- [x] SOP 阶段 2：图纸精炼并落盘 `memory-bank/`。
- [x] SOP 阶段 3：源码落地 `src/`。
- [ ] SOP 阶段 4：增强功能、自动化测试与发布准备（奖励体验已完成，测试与发布待推进）。
