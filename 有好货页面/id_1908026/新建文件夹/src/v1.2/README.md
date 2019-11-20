1. 劫持轮播之后，pan 有一个近 10px 的延迟卡顿，因为 10px 以内的移动判断为 tap
2. 劫持轮播之后松开手指后，轮播归位的动画，添加 css 会导致正常轮播的 ease 冲突
3. 劫持轮播之后松开手指后，pan 或者是 tap 事件之后恢复轮播
4. 每次轮播之前的第一帧会出现 animations 是下次轮播的 animations，但是 startTime 仍然是上一次轮播的 startTime
