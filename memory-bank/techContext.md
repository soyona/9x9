# 技术栈与依赖约束 (techContext.md)
# Technical Context

## 技术栈选型 (PC Web)
- **核心框架**：Next.js 14+ (App Router) / React / TypeScript (强类型保障)
- **样式方案**：Tailwind CSS (实现 Apple 官网极简质感)
- **动画引擎**：Framer Motion (负责加法聚拢变乘法的平滑动效)
- **状态管理**：Zustand (本地轻量级状态机，控制关卡、倒计时与得分)

## 编译与校验指令 (异常熔断判定基准)
- 开发环境: `npm run dev`
- 静态检查: `npm run lint`
- 本地构建: `npm run build`
> *注：后续本地智能体在终端运行编译或 Lint 命令连续失败超过 3 次，必须立刻触发最高铁律熔断挂起。*

## 局域网开发环境适配
- 当前 Next.js 版本为 `16.2.10`，`allowedDevOrigins` 按该版本正式配置结构放置在 `next.config.mjs` 顶层。
- 开发服务器显式允许来自 `192.168.1.2` 和 `localhost` 的开发资源请求，配置变更后必须重启 `npm run dev` 才会生效。
- 此放行仅用于开发模式的局域网调试，不扩展生产环境跨域策略。
- 2026-07-06 验证：开发服务首次重启成功；携带 `Origin: http://192.168.1.2` 的 `/_next/static` 资源请求返回 HTTP 200，本地暂停/继续点击交互正常，`npm run lint` 通过。
