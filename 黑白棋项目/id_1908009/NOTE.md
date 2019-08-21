学习笔记

绘制：
    1/棋盘
        依照棋盘数据结构
        0（一维数组）
        1（二维数组）
            每个小格子表示一个坐标
            br转行，
            vertical-align对齐

    2/棋子
    :after  /  div

逻辑:
    1/方向判断
        for循环判断8个方向，可以用向量方式表示方向
        map=[
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1]
        ]
        while(true)循环
        x += map[i][0]
        y += map[i][1]
        直到遇到相同颜色棋子or没棋子break; canmove = false
        颜色：  color = 3 - color 判断非同色进入下一个步骤 canmove = true

    2/翻转
        判断canmove为true
        while(true)
        x -= map[i][0]
        y -= map[i][1]
        当x,y等于原始坐标时break;

    3/pass情况
        棋子是否还有剩余可走路径
        提取Move方法增加checkonly参数 (checkonly参数的作用是为true时跳过翻转的过程和改变整个棋盘)
        循环判断坐标内每一个点的8个方向上是否有可落子
        两次false 则Game over

    4/悔棋
        存储每一步的棋子和棋盘到堆栈
        点击悔棋按钮出栈
        
封装
mvc思想

小技巧：while(true) + break; 可以尝试处理较复杂的循环问题
