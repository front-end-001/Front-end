# 课上笔记

## 如何刷题

1. leetcode

2. 数学知识
  组合数学
  离散数学
  线性代数  图形学
  运筹学 线性规划算法
  群论

## 组件化起源

1. 自定义标签

```html
<div></div>
<my-div></my-div>
```

2. 组件化与规范
组件化不依赖于规范，web component有缺陷，难用，有解决不了的问题

3. 组件化核心目标 -- 课程目标是如何构建组件化体系，而不是选择组件化方案

  - 复用  作为一种被复用单元，被用在多处
  - 解耦  高内聚 低耦合，组件本身隔离了变化，组件开发者和业务开发者可以根据组件的约定各自独立开发和测试
  - 封装  组件屏蔽了内部的细节，组件的使用者可以只关心组件的属性、事件和方法，比如input框
  - 抽象  组件通过属性、事件和方法等基础设施提供了一种描述ui的统一模式，降低了使用者的学习的心智成本

  proerty  -- js
  attribute -- html

## 如何实现一个组件

放在函数里，react hooks
```js
let node = document.createElement('div);
document.getElementById('container').appendChild(node);

function MyComponent {
  let node = document.createElement('div);
  document.getElementById('container').appendChild(node);
}
```

1. 基本思路01
  仿js

```js
function MyComponent {
  this._root = document.createElement('div);
  this.appendTo = function(node) {
    // 不符合面向对象基本原则
    // 没有改自己的状态，改的是别人的状态
    node.appendChild(this._root);
  }
}
```

改进：
```js
function MyComponent {
  var _root = document.createElement('div);
  _root.prop1 = 'aa';
  _root.appendTo = function() {
    // ...
  }
  return _root;
}
document.getElementById('container').appendChild(new MyComponent());
```

2. 组件化的发展

早年
  outlook online
  js 星际争霸
  组件化方案 - 不注重程序员工作体验
jQuery时代
  jquery插件，通过选择器来实现
三大框架时代
  走向成熟，复用、解耦、封装、抽象，另外还有下面两个特点
    模板 -- 
    样式 -- CSS能力融入组件
  
  React -- 100%组件化方案
  Vue -- 组件化方案 + mvvm

3. Vue的组件化方案
   SFC单文件组件技术 -- vue独有的技术，结合webpack才能实现
   template里面会被编译为js，最后直接生成dom树。声明式语法

4. React的组件化方案
   jsx是js语法的扩展
   jsx技术处理模板 -- 看似是声明式的，其实是命令式
   jsx可以直接赋值给变量
   命令式方法比较强大
   jsx中的css的写法有限制

5. Angular的组件化方案
   decorator
   html、css也拆开
   selector
  
6. 三大框架组件化方案比较
  都实现了同一个层次的功能
  组件化方案有相似性
  React的不同：没有规定组件与数据之间是如何组织的（mvvm上）

7. 轮播组件
   排版布局
   动画
   拖拽
   淘宝首页轮播

8. 轮播需求整理

自己整理的：
   1. 自动播放 -- 定时切换
   2. 手动播放 -- 左、右箭头，圆点导航切换
   3. 可在同一页面复用
   4. 支持链接跳转

老师按照优先级整理的需求：
P0:
  1. 轮播需求
    1.1 展示一个序列的图片
    1.2 每隔 s 秒通过 m 动画，切换到下一张图片  几秒？什么动画？通常不会在需求中描述
      1.2.1 P2: 选择合适的时间和动画
    1.3 P1: 循环播放
    1.4 P1: 展示指示器
    1.5 P1: 展示标题
  2. 点击需求
    2.1 点击图片，跳转到链接
    2.2 P1: 点击文字标题，跳转到链接
P1:
  3. 手势/鼠标操作轮播
    3.1 拖拽图片，跟随手指移动
    3.2 停止拖拽，播放动画弹到最近的一张图
      3.2.1 保证不要超出范围 -- 注意边界
  4. 鼠标悬停展示左右按钮
     4.1 鼠标悬停展示向左和向右翻页按钮
      4.1.1 P2: 第一张图没有向左按钮，最后一张图没有向右按钮
     4.2 点击向左按钮向前播放，点击向右按钮向后播放

9. 轮播组件实战


[不带拖拽的轮播效果](https://yangtoude.github.io/front-end/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE/id_1908040/code/no-drag.html)

[拖拽的效果](https://yangtoude.github.io/front-end/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE/id_1908040/code/drag.html)

[Crousel使用手势库](https://yangtoude.github.io/front-end/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE/id_1908040/code/touch.html)

[动画入门--实现一个时间线](https://yangtoude.github.io/front-end/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE/id_1908040/code/timeline.html)

[轮播整合动画库--使用动画库实现轮播并适应拖拽](https://yangtoude.github.io/front-end/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE/id_1908040/code/carousel-with-animation.html)

[轮播组件改造](https://yangtoude.github.io/front-end/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E9%A1%B9%E7%9B%AE/id_1908040/code/carousel-component.html)


