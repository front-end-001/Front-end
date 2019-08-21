学习笔记
轮播组件开发
1）分析一个轮播组件的需求功能：
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
2）准备数据和布局。
3）当前张，和下一章的布局规则，每次只挪动两张，不会对性能产生影响。
4）制作动画滚动规则。
5）增加手势事件，控制轮播功能。

小知识（tansition = '', 默认用样式表里面的内容）


手势库 抹平事件差异
1）分别注册 鼠标事件和触摸事件。mousedown, mousemove, mouseup, touchstart, touchmove, touchend, touchcancel
2）抽象公共方法 start,move,end;
3) 使用context来传递point，抹平clientX，clientY。
4）用事件机制，对外暴露事件，tap， pan, 抹平 按下，和 移动。
5）扩充事件 flick panend，panstart，pancancel, pressstart， pressend，presscancel等。

小知识（chrome 在调试模式下 touch和mouse都触发）;