# System Patterns

## 组件解耦架构
1. **`ConceptVisualizer` (概念认知模块)**
   - 职责：展示物品（如圆点/苹果）的行列阵列，动态渲染 `X 行 Y 列`。
   - 动效：点击“转化为乘法”时，圆点按行进行平滑的位移聚拢，并在底部优雅浮现 `Y + Y + ... = X × Y` 的公式演变。
2. **`TrainingMatrix` (九九网格棋盘)**
   - 职责：参照 `product-assets/images/matrix-reference.png` 动态渲染格线。
   - 交互：行列交叉高亮聚焦，在对应坐标交叉空白处填写对应结果。
3. **`GameController` (控制与奖励中枢)**
   - 职责：负责难易度切换（3x3, 6x6, 9x9, 10x10 由易到难）、倒计时器、声音效果触发及 Apple 风格的奖励卡片弹出。