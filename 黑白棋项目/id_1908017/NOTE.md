## 思路
- OthelloTurn: 
    - 下棋过程 每步为1个Turn，每个Turn包含完整状态
    - 属性,不可修改
        - board: 棋盘及棋子状态
        - isGameEnd: 无空格或都双方都不能落子时游戏结束
        - isPass: 本轮不能落子
        - moves: 每个move 表示一种进入下一轮（Turn） 的方式
            - move字段:`{pos:落子位置,board:新Turn的棋盘及棋子状态}`
                - 当pos < 0 时,说明本轮不能落子, 根据此move 进入下一轮：棋盘不变,更换落子颜色
- 游戏过程描述 OthelloGame
    - 点击棋盘时
        - 根据当前格子位置 在Turn中查找有无对应Move
            - 有：根据对应move产生下一轮状态， 显示下一轮状态
            - 无：说明当前格子不能落子
    - 每进入一轮/Turn 时
        - 如果 curTurn.isPass(即轮空), 延时进入下一轮
        - 如果 curTurn.isGameEnd, 显示对应视图(比如alert('游戏结束'))

## 参考
- 借鉴 [图灵机](https://baike.baidu.com/item/%E5%9B%BE%E7%81%B5%E6%9C%BA): 状态，状态间变化