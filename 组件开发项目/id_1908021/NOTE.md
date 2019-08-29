# 组件开发
## Week-01 轮播组件
### 轮播组件需求清单
P0：
1. 轮播需求
	1.1 展示一个序列的图片
  1.2 每隔？秒通过动画，切换到下一张图片
  	1.2.1 P2：选择合适的时间和动画形式
  1.3 P1：循环播放
  1.4 P1：展示指示器
  1.5 P1：展示文字标题
2. 点击需求
	2.1 点击图片，跳转到链接
  2.2 P1：点击文字标题
P1：
3. 手势/鼠标操作轮播
	3.1 拖拽图片，跟随手指/鼠标移动
  3.2 停止拖拽，播放动画弹到最近的一张图
  	3.2.1 注意边界
4. 鼠标悬停展示左右操作按钮
	4.1 鼠标悬停，展示向左翻页和向右翻页按钮
  	4.1.1 P2：第一张图没有向左按钮，最后一张图没有向右按钮
  4.2 点击向左按钮向前播放，点击向右按钮向后播放

  ## Week-02 轮播组件手势基础
  - [TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches)
    - changedTouches: [Touch[]](https://developer.mozilla.org/en-US/docs/Web/API/Touch)
      -  Touch.identifier: 触碰操作的触发源标记。哪个手指 or pen or...
      -  Touch.clientX/clinetY
      -  Touch.target
   - TouchEvent的监听与MouseEvent的区别
     - MouseEvent事件(mouseup, mousemove)绑定在某元素上，超过元素范围则不会触发
     - TouchEvent事件(touchend, touchmove)，哪怕触点移出元素范围也会触发