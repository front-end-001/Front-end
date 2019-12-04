预期的功能

- 通过设置`gettter`获取到state的订阅组件, `setter`来通知订阅组件进行更新
- 数组通过监听`length`属性来设置`setter`
- 为Component添加状态属性, 生命周期函数被动监听执行而不是主动触发