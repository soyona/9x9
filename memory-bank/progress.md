# 任务进度看板 (progress.md)

## 🚀 开发进度清单

### 项目基础
- [x] 项目 V1.0 目录架构初始化。
- [x] 初始化 `package.json` 与基础依赖配置。
- [x] 建立 Next.js App Router、TypeScript、Tailwind CSS 与 ESLint 配置。
- [x] 接入 Framer Motion 与 Zustand。
- [x] 按照 `dataModels.md` 实现 `src/types` 强类型镜像。

### 概念认知模块
- [x] 落地 `ConceptVisualizer` 组件。
- [x] 渲染 3 × 4 精细圆点阵列。
- [x] 展示 `4 + 4 + 4 = 12` 重复加法表达。
- [x] 展示 `3 × 4 = 12` 乘法表达。
- [x] 实现圆点聚拢与贝塞尔缓动。
- [x] 支持减少动态效果系统设置。
- [x] V1.2.0 改为直接订阅当前矩阵选中格，按 `R` 行 × `C` 列动态展示点阵与公式。
- [x] V1.2.0 按选中格展示 `加法算式：{C} + ... = {R*C}` 与 `乘法算式：{C} × {R} = {R*C}`。
- [x] 评论修复：概念图示增加每行虚线分组效果，强化重复加数分组。
- [x] 评论修复：加法算式改为标准等式，移除 `({R}个)` parenthetical 说明。
- [x] 本轮引入 `VisualTheme` 图腾生态，按选中坐标确定性切换 Circle、Square、Mars、Minecraft、iPhone/iPad、Earth/Cosmos、Fruit 图形。
- [x] 本轮为对角线坐标增加金色光环和主题差异化核心色，左侧图形可直观看出平方数与非平方数差异。
- [x] 本轮收紧图腾阵列间距、分组 padding 和主题图标尺寸，使 10×10 图形集合更紧凑地填充概念画布。
- [x] 本轮完成公式结果因果留空：加法算式、乘法算式和读作文本在当前格未答对前显示 `___`，仅当对应 `MatrixCell.isCorrect` 为 true 后展示真实乘积。
- [x] 本轮完成 32-bit Apple Style 3D 图腾升级：几何图形使用多层渐变、top-left 高光、内阴影和 drop-shadow；Mars、Earth/Cosmos、Fruit 使用 radialGradient SVG；对角线金色光环升级为金属倒角戒环。
- [x] 2026-07-07 精修：移除公式区“几行 × 几列”描述，公式父容器 `flex-shrink: 0`，加法算式单行不换行并通过横向微滚动/遮罩处理溢出。
- [x] 2026-07-07 精修：将未答结果从文本 `___` 替换为 48×24 inline 呼吸胶囊槽位。
- [x] 2026-07-07 精修：虚线分组框按列数自动挤压，`C <= 3` 使用 `p-1 m-0.5`，`C > 3` 使用 `p-2 m-1`。
- [x] 2026-07-07 精修：Minecraft 图腾升级为 top/front/right 三面块体；Mars/Earth/Fruit 使用 `fx="30%" fy="30%" r="70%"` radialGradient 强化球面高光。
- [x] 2026-07-07 V1.2.0 Layout Decoupling：`ConceptVisualizer` 根容器改为 `grid grid-rows-[1fr_auto] h-full overflow-hidden`，图形展示区与公式/结果面板物理分离。
- [x] 2026-07-07 V1.2.0 Auto-Spacing：新增 `isSparse` 稀疏模式，`R<=3 && C<=3` 时居中聚合、图腾放大到约 1.5x、分组框使用 `p-1 gap-1.5` 紧凑包裹。
- [x] 2026-07-07 V1.2.0 Rigid Layout Protection：`ConceptVisualizer` 根容器改为严格 `flex flex-col h-full min-h-0 overflow-hidden`，中间图形槽使用 `flex-1 min-h-0 overflow-y-auto`，底部公式/结果面板使用 `flex-shrink-0 mt-auto`，永久移除旧 `max-h-[58vh]` 与 `.formula-panel` 裁剪路径。
- [x] V1.2.5 彻底消除 ConceptVisualizer 内部滚动条，通过 Dynamic Scale Caliper 实现多分辨率视口 100% 完整收容。
- [x] V1.2.5 修复行=列时图腾与边框的物理像素重叠，改为内聚式高亮。
- [x] V1.2.5 升级为高保真拟物化 3D 水果与晶莹宝石生态（Apple、Orange、Diamond、Golden Star）。
- [x] V1.2.5 优化 Zustand 响应，实现受控输入在 onChange 阶段的即时因果数据打通（无须失焦）。
- [x] V1.2.5 为图形区域加装毛玻璃反馈层，接入 3D 阵列的 Correct Bounce 与 Wrong Shake 动画特效。
- [x] 2026-07-07 运行时修复：为 `ConceptVisualizer` 的反馈光层与图形视口使用不同 key 前缀，消除 React duplicate key 警告。
- [x] 2026-07-07 运行时修复：将 correct bounce 从 spring 三段 keyframes 改为两段 spring + reverse repeat，消除 Motion `spring-two-frames` 报错。
- [x] 2026-07-07 评论修复：将 `ConceptVisualizer` 底部公式区改为固定高度 `.formula-stable-panel`，移除 layout/y 位移动画，消除切换行列时的公式区抖动。
- [x] 2026-07-07 评论修复：公式区三行内容使用固定 grid rows、收紧 gap/line-height，并将 panel 高度提升到 `clamp(118px, 16dvh, 142px)`，避免第三行被裁切。
- [x] 2026-07-07 评论修复：10×10 加法公式行移除省略号路径，使用 dense 字号与 `.formula-list p.formula-addition` 覆盖 `text-overflow: clip` / `white-space: normal`，完整显示重复加法。

### 矩阵练习模块
- [x] 落地 `TrainingMatrix` 组件。
- [x] 参照 `matrix-reference.png` 建立乘法矩阵网格。
- [x] 实现行列交叉高亮与当前交点聚焦。
- [x] 实现 3×3、6×6、9×9、10×10 梯度解锁。
- [x] 实现答案输入、提交、正确/错误状态与继续练习。
- [x] 使用 `MatrixCell` 强类型生成并维护全部矩阵单元格。
- [x] V1.2.0 移除独立答案面板，改为每个可编辑矩阵格内嵌受控原生数字输入。
- [x] V1.2.0 实现格内输入 `onChange` 调用 `setCellValue(row, col, value)`，`onBlur` 或 `Enter` 立即触发 `submitSelectedCell()`。
- [x] V1.2.0 保持矩阵格严格正方形 `aspect-ratio: 1`，并在移动端将横向溢出限制在矩阵滚动容器内部。
- [x] 评论修复：矩阵滚动容器增加内边距，矩阵网格增加 1px 圆角内框，避免 10×10 区域边框视觉丢失。
- [x] 本轮彻底放开 10×10 沙盒，100 个矩阵输入从初始化起全部可交互，不再显示锁定格线。
- [x] 本轮实现原生输入四向方向键导航，`ArrowUp` / `ArrowDown` / `ArrowLeft` / `ArrowRight` 在 1-10 行列范围内移动焦点。
- [x] 本轮将正确格从 `disabled` 改为 `readOnly`，正确答案仍不可编辑，但点击或键盘回访会继续更新 `selectedCell`。
- [x] 本轮区分正确状态颜色：普通正确为 soft-green，对角线正确为 soft-gold、金色边框和加粗数字。
- [x] 2026-07-07 精修：对角线与正确对角线格增加白色上/左边、amber 下/右边和强投影，形成 raised metallic floating track 视觉。

### 状态与控制模块
- [x] 落地 Zustand `GameController` 状态机。
- [x] 实现难度状态、当前格状态与矩阵重建。
- [x] 实现 5 分钟倒计时及暂停/继续控制。
- [x] 实现正确答案计分与 `+10` 反馈。
- [x] 预留 `mathgrid:effect` 声音与特效事件钩子。
- [x] 为格内输入提交流增加已提交状态幂等保护，避免 `Enter` 与 `blur` 重复触发同一格判定。
- [x] 本轮初始状态改为 `level_10x10`，并在 `setCellValue()` 中保护已正确格，避免回访时清除正确状态。
- [x] 使用原生 Web Audio API 接入正确答题升调双音与通关琶音，无第三方音频资产。
- [x] 增加 `level-complete` 强类型事件和 100% 正确关卡完成判定。
- [x] 难度切换时原子重置倒计时、计时状态、得分、矩阵值与格线锁定状态。
- [x] 增加用户声音开关与偏好持久化。
- [x] 落地低饱和重力粒子和 Backdrop Blur 毛玻璃奖励卡片。
- [x] 打通 3×3 → 6×6 → 9×9 → 10×10 下一关链路及 10×10 重练入口。
- [x] 增加连击机制和更完整的关卡统计。
- [x] 移除 level-complete 强类型关卡触发判定，关闭自动冻结矩阵与奖励弹窗（转向自由探索）[cite: 7]。

### 页面与体验
- [x] 集成完整首页与核心用户流程。
- [x] 完成 Apple 风格留白、字体、色彩、边框与阴影系统。
- [x] 完成桌面端响应式布局。
- [x] 完成 390px 移动端响应式布局及矩阵横向滚动。
- [x] 完成基础键盘焦点和语义化可访问性。
- [x] V1.2.0 完成 `100dvh` 页面死锁：`body` 禁止页面级滚动，页头 64px 级别，`.page-shell` 填满剩余视口。
- [x] V1.2.0 完成桌面 12 栏双列布局：左侧 4 栏概念联动，右侧 8 栏矩阵训练。
- [x] 落地对角线（行=列）平方数规律的低饱和度 Apple 风格背景高亮[cite: 7]。
- [x] 调整左右双栏空间比为 5:7，收紧 10x10 矩阵的两边过度留白[cite: 6, 7]。
- [x] 重塑 ConceptVisualizer 布局，采用 clamp 弹性尺寸消除圆点区域的上下多余留白[cite: 6, 7]。

### 工程验证
- [x] 配置 Next.js `allowedDevOrigins`，允许 `192.168.1.2` 局域网开发资源请求；重启后验证内部静态资源 HTTP 200 和暂停按钮交互正常。
- [x] `npm run lint` 通过，0 errors。
- [x] `npm run build` 通过，完成静态预渲染。
- [x] 浏览器验证页面身份、非空渲染与控制台健康状态。
- [x] 浏览器验证概念切换、矩阵聚焦、答题计分和难度解锁。
- [x] 浏览器逐格完成 3×3 关卡，验证通关奖励卡与下一关按钮真实可见。
- [x] 浏览器验证进入 6×6 后倒计时恢复 `05:00`、36 格解锁、64 格锁定且填写状态清零。
- [x] 浏览器验证 1280px 桌面布局和 390px 窄屏断点，无页面级横向溢出，控制台无应用错误。
- [x] V1.2.0 `npm run lint` 通过，0 errors。
- [x] V1.2.0 `npm run build` 通过，完成静态预渲染。
- [x] V1.2.0 浏览器验证 1280×720 桌面默认视口：`document.documentElement.scrollHeight === window.innerHeight`，无页面级横向滚动，旧 `answer-panel` / `difficulty-bar` 不存在。
- [x] V1.2.0 浏览器验证格内输入：`3×4` 单元格输入 `12` 后回车提交，单元格进入 `is-correct`，输入禁用，得分从 0 变为 10。
- [x] V1.2.0 浏览器验证概念联动：聚焦 `4×5` 后显示 `5 + 5 + 5 + 5 = 20` 与 `5 × 4 = 20`。
- [x] V1.2.0 浏览器验证 390×844 移动视口：页面级横向/纵向滚动均为 false，矩阵横向溢出限制在 `.matrix-scroll` 内，控制台无应用错误或警告。
- [x] 评论修复后 `npm run lint` 通过，0 errors。
- [x] 评论修复后 `npm run build` 通过，完成静态预渲染。
- [x] 评论修复后浏览器验证：`加法算式：4 + 4 + 4 = 12` 不含括号，概念图示存在 3 个虚线分组，矩阵四边 1px 内框可检测，1280×720 视口无页面级横向/纵向滚动，控制台无应用错误。
- [x] 本轮布局与机制简化后 `npm run lint` 通过，0 errors。
- [x] 本轮布局与机制简化后 `npm run build` 通过，完成静态预渲染。
- [x] 本轮沙盒扩展与图腾生态后 `npm run lint` 通过，0 errors / 0 warnings。
- [x] 本轮沙盒扩展与图腾生态后 `npm run build` 通过，完成静态预渲染。
- [x] 2026-07-07 公式因果留空与 3D 图腾升级后 `npm run lint && npm run build` 一次通过。
- [x] 2026-07-07 布局死锁与 3D 精修后 `npm run lint` 一次通过。
- [x] 2026-07-07 布局死锁与 3D 精修后 `npm run build` 一次通过。
- [x] 2026-07-07 浏览器直接 computed-style 验证：页面无纵向滚动、公式父容器 `flex-shrink: 0`、加法算式 `white-space: nowrap` 且 `overflow-x: auto`/`overflow-y: hidden`、胶囊占位 48×24、对角线边框和投影样式生效。
- [x] 2026-07-07 Layout Decoupling & Auto-Spacing 后 `npm run lint && npm run build` 一次通过。
- [x] 2026-07-07 浏览器 computed-style 验证：页面标题为 `9×9 MathGrid`，console 无 error/warn，`.concept-stage` 为 grid，公式面板 `flex-shrink: 0`，图形槽 `overflow-y: auto`，页面高度锁定。
- [x] 2026-07-07 Rigid Layout Protection 后 `npm run lint && npm run build` 一次通过。
- [x] 2026-07-07 V1.2.5 Dynamic Scale Caliper 与 3D Skewomorphic Iconography 后 `npm run lint && npm run build` 第 2 次通过；第 1 次因 React `set-state-in-effect` lint 规则阻断，已改为 Zustand `lastEffect` 派生动画触发。
- [x] 2026-07-07 V1.2.5 静态 no-scroll 检查：`ConceptVisualizer` 不再包含 `overflow-y-auto`，中间图形视口为 `w-full flex-1 min-h-0 flex flex-col justify-center items-center overflow-hidden`。
- [x] 2026-07-07 duplicate-key / spring runtime 修复后 `npm run lint && npm run build` 一次通过，`git diff --check` 通过。
- [x] 2026-07-07 Browser 运行时验证：freshly built `next start -p 3001` 下输入 `3×4=12` 后单元格 `readOnly: true`、得分为 `10`、公式结果显示 `12`、页面高度锁定，duplicate-key / spring 相关 console 日志为空；临时 3001 server 已停止。
- [x] 2026-07-07 公式区域抖动修复后 `npm run lint && npm run build` 一次通过。
- [x] 2026-07-07 Browser 公式区稳定性验证：fresh `next start -p 3001` 下切换 3×4、10×1、2×2，公式区 rect 均保持 `top=572,left=68.48,width=352.68,height=118`，内部三行 `listFitsPanel=true`，页面 `scrollHealth=true`，相关 console 日志为空；临时 3001 server 已停止。
- [x] 2026-07-07 10×10 加法公式完整显示修复后 `npm run lint && npm run build` 一次通过。
- [x] 2026-07-07 Browser 10×10 公式验证：fresh `next start -p 3001` 下加法公式完整显示，无省略号，computed `textOverflow=clip`、`whiteSpace=normal`、`additionFitsPanel=true`、页面 `scrollHealth=true`，相关 console 日志为空；临时 3001 server 已停止。
- [ ] 需人类执行刚性边界验收：切换矩阵焦点到 10x1 与 2x2，确认 10行图形不挤压公式区、2x2 图形不被压扁、底部公式与结果胶囊完整可见。
- [ ] 需人类执行稀疏 2×2/3×3 美学验收：确认图腾实际放大、居中聚合、虚线分组框紧凑且无空骨架感。
- [ ] 需人类执行 10-row overflow stability 验收：确认 10行1列、10行3列、10行5列下公式/结果面板完整可见，图形区仅内部滚动。
- [ ] 需人类执行 10行1-5列容器挤压检查：确认公式区不消失，加法等式不竖向折行，仅通过横向微滚动或遮罩收容。
- [ ] 需人类执行近距 3D 材质审计：确认 Minecraft 三面块体、Apple/Fruit 球面高光、Mars/Earth 球面 puffiness 和对角线金属浮轨符合 Apple 风格预期。
- [ ] 需人类执行 3D 保真度检查：确认 Circle/Square/Minecraft/iPhone/Mars/Earth/Fruit 的立体光影、投影和对角线金属光环符合视觉预期。
- [ ] 需人类执行答案因果闭环检查：未答对当前格时三处结果均为 `___`，答对后加法、乘法和读作结果同步显示真实数值。
- [ ] 本轮仍需人类执行 Sandbox 多键布局验证，重点检查四向方向键、边界不越界、正确格回访联动、对角线正确金色状态和图腾密度。
- [ ] 后续处理本地开发环境 Watchpack `EMFILE` 文件监听器上限告警（不阻塞生产构建）。
- [ ] 增加单元测试与组件测试。
- [ ] 增加端到端测试和持续集成。
- [ ] 完成部署与生产环境验收。

## 系统架构完整度
- 核心前端分层：100%。
  - 页面层、业务组件层、状态层、强类型数据层、动画层与响应式样式层均已建立并完成集成。
- MVP 核心业务闭环：100%。
  - 概念理解、矩阵练习、答案判定、难度控制、倒计时和计分均可运行。
- 增强体验与工程化：进行中。
  - 原生声音与奖励结算已完成；声音开关、连击、自动化测试、持久化和部署尚未完成。

## 当前里程碑
**M2：Apple 质感矩阵练习与开放式连续练习链路已完成。下一里程碑为 M3：多屏视觉审计、自动化测试与发布准备。**
