学习笔记

# 需求信息
#### 轮播图需求 owner
> 1、窗口按照一定顺序，自动依次展示某张图片等长时间；

> 2、鼠标浮动时，固定图片；待移出后再次循环播放；

> 3、左右各设置按钮 prev 、 next 代表上一张与下一张 点击prev展示上一张图片，点击next展示下一张图片；

> 4、提供点选某一张图片按钮，当点击此按钮时跳转至当前按钮所链接的图片；

> 5、图片轮播时，当前图片所链接的按钮样式高亮展示

### 手淘轮播组件行为
> 1、5秒轮播图
> 2、点击跳转
> 3、拖动滑动
> 4、按边界展示图片
> 
> 
> 
> 

###### 调试禁止缩放：document.addEventListener("touchstart", event => event.preventDefault(), {passive:false});
手势：
tap 点  pan 拖动 flick 快速拖动 press 长按

### 动画

https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API https://developer.mozilla.org/zh-CN/docs/Web/API/Animation
https://developer.mozilla.org/en-US/docs/Web/API/Animation
贝塞尔曲线 https://cubic-bezier.com/
