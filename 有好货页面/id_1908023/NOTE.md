学习笔记

缓存
304
manifest 缓存 比 304 缓存更强效，可以解决移动端因为网络波动的问题。
但是也很危险。

旁路，不影响主流程

防重放，防身份窃取

1、文字 tap 导航，可以切换类目
2、轮播图，图片统一向左轮播，可以用手势控制
3、超多人收藏的点，第一块区域智能展示两条前一天用户画像下收藏量最多店铺
4、前两条之后的其余排行店铺按照统一UI展示，
每个店铺要展示一条推荐语，
然后展示三张热卖宝贝的图片和链接，直接点击图片可以进入到宝贝详情，
如果店铺有设置标签，则需要展示出来，最多三条，
右下角展示一个相似好店的链接，点击后要进入到与该店相关的热门店铺列表，
店铺logo、标题部分，和推荐语部分的这一整块区域在点击后要进入到店铺页面，

有趣的店功能点：
1、每个店铺图片在上滑到页面中部的时候，要上浮展现出店铺的星级。
2、单双页面的展示UI要交替变化。


组件整理：
页面结构：
  导航 + 内容
  导航固定在顶部
  导航是一个组件

tab 组件
  内容滑动与 tab 关联
  内容区可以下拉刷新，上拉加载
  没有数据则展示：人家是有底线的啦

轮播组件

推荐页组件：
小店铺组件
大店铺组件

有趣的店组件：
基础小组件：
  大图
  小图
  功能点：是否展示店铺描述
单双组件
  由小组件组成

品牌新店
  店铺组件

分享组件

操作按钮
  功能直达


整个项目要以老师讲的组件思想为基础，要使用那个pligin来完成组件 jsx 的转换
组件要基于课堂上将的 component 为基础来建立

Tab 组件
Tab 容器类



组件是一个专门用于描述UI的对象。比如增加了 Attribute（特性，强调描述性，字符串）,config,lifecycle等。

标签其实是方便使用组件的一种方式，并不是说标签就是组件。
其本质都是 js 控制 dom。

https://github.com/wintercn/component-demo
