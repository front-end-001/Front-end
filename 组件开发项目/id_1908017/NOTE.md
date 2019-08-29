## 学习笔记
### 需求分析
### 业务描述
### 手势
#### 代码实现
- 分层
  - 产生事件，执行业务代码
    - 分层
      - 1 native:mouse,touch
      - 2 start,move,end,cancel;
      - 3 2plus:firstMove,timeChange
      - 4 手势实现
    - 各层关系
      - n层封装n-1层
      - n层只知道n-1层接口
#### 代码风格
- 前提/或要点
  - 明白各手势功能:能测试
- isFlag风格:isPan,isTap
  - 围绕isFlag 来实现对应手势代码 

- 内聚/解耦各手势:事件
  - isFlag风格代码修改: 调用改为 事件监听与发送
  - setTimeout 交由第2层


### 问题
- animation
  - tl的时间点与帧一一对应，无副作用
    - 是否必要