学习笔记

### P0:

1. 轮播需求 <br />
   1.1 展示一个序列的图片<br />
   1.2 每隔？秒通过动画，切换到下一张图片<br />
   1.2.1 P2:选择合适的时间和动画形式<br />
   1.3 P1:循环播放<br />
   1.4 P1:展示指示器<br />
   1.5 P1:展示文字标题<br />
2. 点击需求 <br />
   2.1 点击图片，跳转到链接<br />
   2.2 P1:点击文字标题<br />

### P1：

3. 手势/鼠标操作轮播 <br />
   3.1 拖拽图片，跟随手指/鼠标移动<br />
   3.2 停止拖拽，播放动画弹到最近的一张图<br />
   3.2.1 注意边界<br />
4. 鼠标悬停展示左右操作按钮<br />
   4.1 鼠标悬停，展示向左翻页和向右翻页按钮<br />
   4.1.1 P2:第一张图没有向左按钮，最后一张图没有向右按钮<br />
   4.2 点击向左按钮向前播放，点击向右按钮向后播放

## 手势库思路

1. 先把移动端与 PC 端相关事件抹平
2. 增加 tap panstart pan panend 事件
3. 增加 flick 事件（在 end 有 pan 事件时根据速度来判断）
4. 增加水平和垂直方向判断（在 panstart 时根据 dx,dy 判断）
5. 增加 pressstart,pressend,pressend 事件

## 动画库

1. 设计 timeline 开始、添加/删除动画、开始、暂停、速率等功能，先实现开始及添加动画
2. 设计 动画类 tick 设置动画属性
3. 增加动画效果 cubicBezier
4. 实现 pause/resume 功能 增加 timeline 三种状态 inited started paused pause 只有在 started 状态可以执行，resume 只有在 paused 状态可以执行 start 只有在非 startd 状态时执行
5. timeline start 定时器使用 raf
6. 实现 速率 rate 正负
7. 实现颜色渐变动画类
8. 把轮播手势改为前一张、下一张和当前三张位置
9. 轮播使用 animation.js 动画 animation.js 增加 restart
