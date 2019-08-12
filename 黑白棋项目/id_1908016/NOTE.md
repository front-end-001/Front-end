学习笔记
## PART1. 问题背景及边界
Q1. **问题背景**:为什么使用黑白棋项目作为练习素材?

A1. 大部分前端开发人员没有做过太复杂的逻辑,而是小型交互的网页

Q2. **问题边界**:

从功能的角度上来看:

- step1. 实现棋盘(包括如何描述棋盘上的落子情况)
- step2. 实现**1**个方向上的吃子
- step3. 实现**8**个方向上的吃子
- step4. 实现**PASS与结束游戏**的判定

从代码组织的角度上来看:

- 在上述步骤完成后,以**OOP**的角度重新审视这段**POP**的代码,并重新组织代码.

## PART2. 实现

### 2.1 实现棋盘

代码见 01-drawChessboard.html

思路分析:

Q1: 采用何种形式描述棋盘?

A1: 实际上此处使用一维数组或者二维数组都是可以的.

① 如果使用一维数组(当然这个数组中有64个元素代表棋盘上的64个格子),则使用**同余**(两个整数a、b,若它们除以整数m所得的余数相等,则称a与b对于模m同余或a同余于b模m.)的方式来判定每个格子在棋盘上所在的位置.

② 如果使用二维数组,则如同代码中实现的逻辑一样,直接去看代码就可以了.

Q2: 如何描述棋子?

A2: 实际上这个问题的本质是:如何定义数组中的元素以便表示每个格子中当前的状态(没有棋子、有黑子、有白子)?此处我们定义:

- **0**表示该格子中没有棋子
- **1**表示该格子中有黑子
- **2**表示该格子中有白子

Q3: 残留问题:可以使用纯CSS实现样式?

A3: //TODO:如何实现?

### 2.2 实现1个方向上的吃子
此处我们以落子处水平向左方向上为例. 代码见 02-oneDirectionCapture.html

Q1: 如何拆解"吃子"这个功能?

A1: 吃子在概念上等同于在某个格子上可以落子.所以拆解步骤应该为:

- step1. 定义落子操作(也就是click事件)时需要执行的callback
- step2. 检测待落子处左侧相邻处是否有敌方棋子.如果有,则存在落子的可能性;否则必然无法落子.
- step3. 检测落子处水平向左方向上是否存在我方棋子.如果有,则说明至少吃到了1颗敌方棋子,也就意味着待落子处可以落子;否则无法吃子,也就意味着无法落子了.
- step4. 可以落子,就意味着从落子处开始,直到水平向左方向上遇到的第1个我方棋子中间所有的敌方棋子全部吃掉.
- step5. 成功落子,就意味着需要交换执子颜色.

Tips:--x和x--如果在需要赋值的场景下是有区别的.

```javascript
var a = 1;
b = a++;
console.log('a='a + '  ' + 'b='b); //  a = 2 , b = 1

var a = 1;
b = ++a;
console.log('a=' + a + '   ' +'b=' + b)//a = 2 b=2
```

不过在我们的代码中,必须使用--x,而不能使用x--.因为x--不能为左值,--x可以为左值.

Tips:let和var的区别

let的作用域为代码块.var的作用域为函数.也就是说如果在render()中使用关键字var来定义x y,会导致click事件调用callback函数时,在callback中获取x y的值为render()运行结束后的结果,也就是x=8且y=8.

### 2.3 实现8个方向上的吃子

代码见 03-allDirectionCapture.html

这个功能的难点在于:

1. 如何定义方向?
2. 如何在每个方向上确认能否吃子(可吃子和可落子实际上是相同的概念)?

所以在POP的场景下,我们还是按步骤的来回答这些问题.

Q1: 如何定义方向?

A1: 实际上这个问题当我们确定如何描述棋盘时,就已经是比较明确的答案了.无论我们使用何种方式(一维数组或二维数组)来描述棋盘,棋盘在概念上对于我们来讲都像是一个二维坐标系.在二维坐标系中描述"方向",比较好的做法是采用矢量的概念.

- step1. 定义方向的变量:

```javascript
// 使用对象数组表示每个方向(左上、左、左下、上、下、右上、右、右下)上的矢量
let directions = [
    {x:-1, y:-1},
    {x:-1, y:0},
    {x:-1, y:1},
    {x:0, y:-1},
    {x:0, y:1},
    {x:1, y:-1},
    {x:1, y:0},
    {x:1, y:1},
];
```

Q2: 如何在每个方向上确认能否吃子?

A2:

- step2. 检测对于每个方向而言待落子处是否可以落子

```javascript
for (let direction of directions) {
                // 标识是否可以落子的状态位 初始化为false
                let canMove = false;

                // x y表示在每个方向上的位移情况
                let [x, y] = [j, i];

                // 检测对于每个方向而言待落子处能否落子
                // Tips:如果while的条件比较复杂 可以在while的条件表达式中写一个死循环
                // 之后再在while代码块中使用条件判断+break的方式跳出死循环 这样可提升代码可读性
                while (true) {
                    // 在每个方向上位移了1次的结果
                    x += direction.x;
                    y += direction.y;

                    // 越界(即检测的位置是否不在棋盘范围内)则必然不能落子 继续检测下一个方向
                    if (x < 0 || x >=8 || y < 0 || y >= 8) {
                        canMove = false;
                        break;
                    }

                    // 在该方向位移1次后为敌方子力 则继续下一次while循环以便找到在该方向上
                    // 距离待落子处最近的我方子力 该子力的存在使得最后一次while循环结束后 canMove不变(依旧为true)
                    // 而x y的值表示在该方向上距离待落子处最近的我方子力所在位置
                    if(board[y][x] === 3 - color) {
                        canMove = true;
                    }
                    // 在该方向上位移1次(或多次)后为我方子力 则继续检测下一个方向
                    else if(board[y][x] === color) {
                        // 注意这个代码块上是不需要切换状态位(canMove)的状态的
                        // 因为它随着while循环次数的不同而有着不同的意义
                        // 1次while循环就跳出:待落子处在该方向上位移1次为我方子力 无法吃子 即无法落子 此时canMove为false
                        // 多次while循环后从该代码块跳出:待落子处在该方向上位移多次后存在我方子力 可以吃子 则此时canMove为true
                        // 且x y的值描述了在该方向上距离待落子处最近的我方子力的位置
                        break;
                    }
                    // 在该方向上位移1次(或多次)后没有棋子(任何一方的棋子) 则说明虽然待落子处在该方向上
                    // 位移1次可能为敌方子力 但位移到最后一次发现没有棋子了 换言之就是在这个方向上没有我方棋子 全部是敌方棋子
                    // 即对于该方向而言待落子处不能落子 需要将canMove置为false
                    else if (board[y][x] === 0) {
                        canMove = false;
                        break;
                    }
                }
            }
```

- step3. 如果可以落子则吃子.

```javascript
// 如果能够落子 则吃子
if(canMove) {
    // 将表示是否成功落子的状态位置为true
    moveSuccess = true;

    // 由于获取到x y坐标的顺序是从待落子处沿某方向直至寻找到第一颗我方子力 因此吃子只需要逆该方向
    // 从第一颗我方子力到待落子处全部置为我方子力颜色即可
    while(true) {
        x -= direction.x;
        y -= direction.y;
        board[y][x] = color;

        // 到了待落子处 跳出循环
        if(x == j && y == i) {
            break;
        }
    }
}
```

### 2.4 实现PASS与结束游戏的判定

概念:

① PASS: 当一方落子后,导致另一方无法落子的情况,则该场景对于无法落子的一方称为PASS.

② 结束游戏: 当一方PASS后,落子权让渡给另一方.若此时持有落子权的一方也无法落子,则此时判定为游戏结束.

那么根据这两个概念的先后顺序可知,我们拆解这个功能的顺序应该为:

- step1. 实现判断PASS的功能

实际上这个步骤已经在上文的move()函数中实现了,只是它还不够灵活.PASS的规则实质上在描述的内容为:∀格子∈棋盘,对于该格子∃当前执子者均不可落子,则当前执子者PASS.逆向思维即:∃可落子的格子∈棋盘,则当前执子者没有被PASS.从这个逆向思维来看,move()函数已经实现了这个功能.但之所以说它还不够灵活,是因为move()函数不仅检测能否落子而且在可落子的前提条件下会吃子.所以我们需要改造一下move()函数,使它具有"检测"的功能.改造后的move()函数代码如下:

```javascript
/**
 * 本函数用于检测给定位置是否可以落子并返回判定结果 如可以落子则返回true 否则返回false
 * 在可以落子的情况下本函数将完成吃子的功能
 * @method move
 * @param {int} i 待落子处的垂直坐标
 * @param {int} j 待落子处的水平坐标
 * @param {boolean} checkOnly 描述move()函数是否需要吃子的状态位
 * @returns {boolean} moveSuccess 标识是否成功落子的状态位 如成功落子则将所有方向上可以吃的敌方棋子都吃掉
 * */
function move(i, j, checkOnly) {
    // 标识是否成功落子的状态位 初始化为false
    let moveSuccess = false;
    // 待落子处有棋子 则必然无法落子
    if(board[i][j] > 0) {
        return moveSuccess;
    }

    // 使用对象数组表示每个方向(左上、左、左下、上、下、右上、右、右下)上的矢量
    let directions = [
        {x:-1, y:-1},
        {x:-1, y:0},
        {x:-1, y:1},
        {x:0, y:-1},
        {x:0, y:1},
        {x:1, y:-1},
        {x:1, y:0},
        {x:1, y:1},
    ];

    for (let direction of directions) {
        // 标识是否可以落子的状态位 初始化为false
        let canMove = false;

        // x y表示在每个方向上的位移情况
        let [x, y] = [j, i];

        // 检测对于每个方向而言待落子处能否落子
        // Tips:如果while的条件比较复杂 可以在while的条件表达式中写一个死循环
        // 之后再在while代码块中使用条件判断+break的方式跳出死循环 这样可提升代码可读性
        while (true) {
            // 在每个方向上位移了1次的结果
            x += direction.x;
            y += direction.y;

            // 越界(即检测的位置是否不在棋盘范围内)则必然不能落子 继续检测下一个方向
            if (x < 0 || x >=8 || y < 0 || y >= 8) {
                canMove = false;
                break;
            }

            // 在该方向位移1次后为敌方子力 则继续下一次while循环以便找到在该方向上
            // 距离待落子处最近的我方子力 该子力的存在使得最后一次while循环结束后 canMove不变(依旧为true)
            // 而x y的值表示在该方向上距离待落子处最近的我方子力所在位置
            if(board[y][x] === 3 - color) {
                canMove = true;
            }
            // 在该方向上位移1次(或多次)后为我方子力 则继续检测下一个方向
            else if(board[y][x] === color) {
                // 注意这个代码块上是不需要切换状态位(canMove)的状态的
                // 因为它随着while循环次数的不同而有着不同的意义
                // 1次while循环就跳出:待落子处在该方向上位移1次为我方子力 无法吃子 即无法落子 此时canMove为false
                // 多次while循环后从该代码块跳出:待落子处在该方向上位移多次后存在我方子力 可以吃子 则此时canMove为true
                // 且x y的值描述了在该方向上距离待落子处最近的我方子力的位置
                break;
            }
            // 在该方向上位移1次(或多次)后没有棋子(任何一方的棋子) 则说明虽然待落子处在该方向上
            // 位移1次可能为敌方子力 但位移到最后一次发现没有棋子了 换言之就是在这个方向上没有我方棋子 全部是敌方棋子
            // 即对于该方向而言待落子处不能落子 需要将canMove置为false
            else if (board[y][x] === 0) {
                canMove = false;
                break;
            }
        }

        // 如果能够落子 则吃子
        if(canMove && !checkOnly) {
            // 将表示是否成功落子的状态位置为true
            moveSuccess = true;

            // 由于获取到x y坐标的顺序是从待落子处沿某方向直至寻找到第一颗我方子力 因此吃子只需要逆该方向
            // 从第一颗我方子力到待落子处全部置为我方子力颜色即可
            while(true) {
                x -= direction.x;
                y -= direction.y;
                board[y][x] = color;

                // 到了待落子处 跳出循环
                if(x == j && y == i) {
                    break;
                }
            }
        }
        moveSuccess = canMove || moveSuccess;
    }
    return moveSuccess;
}
```

从改造结果可以看到,我们只是新增加了一个用于描述是否需要吃子的状态位而已.此时我们就可以根据move()函数的检测结果来判定对于当前执子者而言是否需要PASS了.所以此时我们要处理的问题是:设计一个函数用于检测是否所有格子对于当前执子者而言均不可落子.

```javascript
/**
 * 本函数用于检测棋盘上每个格子对于当前执子者而言是否可落子.如存在可落子的格子返回false(表示未被PASS),否则返回true
 * @method checkPass
 * @return {boolean} false:当前执子者没被PASS true:当前执子者被PASS了
 * */
function checkPass() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(move(i, j, true)) {
                return false;
            }
        }
    }
    return true;
}
```

- step2. 如果被PASS则让渡落子权给对方.

本质上这一步要解决的问题是:何时判断PASS?

判断PASS的逻辑我们已经写好了.但何时调用呢?判断PASS的时序应该为:

**我方落子->检测当前棋盘对于对方是否PASS->是:不让渡落子权;否:让渡落子权.**

更进一步的,我认为检测PASS的本质是:双方争夺落子权.因此我们需要修改render()函数中调用move()函数时的实参列表,并在之后调用checkPass()函数检测对手是否被PASS.

```javascript
/**
 * @method 本函数用于渲染棋盘并判断是否PASS 此处的渲染棋盘指的是:初始化时渲染 或 当某一方成功落子后渲染
 * @return {void}
 * */
function render() {
    // TODO:innerHTML和innerText的区别?
    container.innerHTML = "";
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            // 创建棋盘上的格子
            let element = document.createElement("div");

            // 落子后水平向左方向吃子
            // 监听盒子的点击事件 此处第2个参数为callback 该callback无论是否定义参数,都将含有一个默认参数event
            element.addEventListener("click", (event) => {
                // 如果成功落子 则让渡落子权给对手
                if(move(y, x, false)) {
                    color = 3 - color;
                    // 如果换手后对方无法落子 再将落子权让渡回来
                    if (checkPass()) {
                        color = 3 - color;
                    }
                }

                // 重新渲染棋盘
                render();
            });

            element.style = "vertical-align:bottom; border:1px solid white; width:50px; height:50px; background-color:darkgreen; display:inline-block;";
            container.appendChild(element);

            // 根据board判定当前格子中棋子的颜色 如果有棋子则向该格子中再添加一个div
            if(board[y][x] === 1) {
                let disc = document.createElement("div");
                disc.style = "margin-top:5px; margin-left:5px; border-radius:20px; width:40px; height:40px; background-color:black;";
                element.appendChild(disc);
            }

            if(board[y][x] === 2) {
                let disc = document.createElement("div");
                disc.style = "margin-top:5px; margin-left:5px; border-radius:20px; width:40px; height:40px; background-color:white;";
                element.appendChild(disc);
            }
        }

        // 1行创建完毕后要换行 否则就成了64个格子横向排列了
        container.appendChild(document.createElement("br"));
    }
}
```

- step3. 判断对方是否PASS.如PASS则游戏结束;否则继续游戏.

程序如果运行到这个场景下,则说明**此时我方已经试图让渡落子权但失败了**.因此判定游戏是否结束的逻辑应该添加在我方重新获得落子权之后.此处只是向callback函数中添加了几行逻辑,就不再重新展示全部render()函数了.

```javascript
element.addEventListener("click", (event) => {
    // 如果成功落子 则让渡落子权给对手
    if(move(y, x, false)) {
        color = 3 - color;
        // 如果换手后对方无法落子 再将落子权让渡回来
        if (checkPass()) {
            color = 3 - color;
            if(checkPass()) {
                alert("GG");
            }
        }
    }
```

至此,从实现功能的角度上看,我们已经实现了黑白棋的全部规则了.但是从代码组织的角度上来审视这段代码,我们认为它并不够好.

- 缺点1: 代码复用性不足.一个比较容易指出的缺点就是:如果我想在当前页面上同时下2盘黑白棋,那么这段程序就无法支撑了.
- 缺点2: 内聚性不够.同样是一个比较容易指出的缺点就是:move()函数既在做检测的功能,又在做吃子的功能.是否应该存在一些代码用于管理这个用于检测的开关?

因此我们很自然地引出了下一个话题:使用OOP的方式封装这段代码.说句通俗一点的话就是:把代码放到该放的位置上去.

## PART3. 以OOP的方式封装代码
### 3.1 视图层与逻辑层分离

很自然地我们从函数的命名(render、move、checkPass)上就可以看到,render()函数负责渲染视图;而move()函数负责维护表示棋盘当前状态的二维数组(即board);checkPass()函数用于检测是否可以落子.所以比较直观的拆分就是:**视图与逻辑分离**

#### 3.1.1 用于处理UI相关任务的类--OthelloView

此处我们的任务非常明确:拆分视图与逻辑.因此很自然地做法是将render()函数放到处理UI相关任务的类OthelloView中.

```javascript
/**
 * @classdesc 本类用于负责处理UI相关的任务
 * @desc 本类的构造函数中需传递2个参数: 用于装载棋盘的容器DOM和用于处理棋局的game类的实例
 * */
class OthelloView {
    constructor(container, game) {
        this.container = container;
        this.game = game;
    }

    /**
     * 本方法用于根据数据模型(即二维数组中每个元素的值)来渲染视图
     * @method
     * @return {void}
     * */
    render() {
        this.container.innerHTML= '';
        for (let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let cell = document.createElement("div");
                this.container.appendChild(cell);
                cell.style = `vertical-align:middle;width:30px;margin:1px;
    height:30px;background-color:darkgreen;
    display:inline-block`;
                cell.addEventListener("click", (event) => {
                    if (this.game.move(i, j, false)) {
                        this.game.color = 3 - this.game.color;
                        if(this.game.checkPass()) {
                            console.log("pass");
                            this.game.color = 3 - this.game.color;
                            if(this.game.checkPass()) {
                                alert("GG");
                            }
                        }
                    }
                    this.render();
                });

                if(this.game.map[i][j] > 0) {
                    let disc = document.createElement("div");
                    disc.style = `margin:2px;border-radius:13px;
        width:26px;height:26px;background-color:${this.game.map[i][j] == 1 ? 'black' : 'white'}`;
                    cell.appendChild(disc);
                }
            }
            this.container.appendChild(document.createElement("br"));
        }
    }
}
```

#### 3.1.2 用于处理逻辑任务并维护棋盘当前状态的类--OthelloGame类

之后剩余的checkPass()函数和move()函数都是在处理逻辑并维护二维数组当前状态的,因此也该将它们放到处理逻辑任务的类OthelloGame中.

```javascript
/**
 * @classdesc 本类用于处理黑白棋逻辑并维护描述棋盘当前状态的数据
 * @desc 初始化棋盘以及优先落子者的执子颜色
 * */
class OthelloGame {
    constructor() {
        this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        this.color = 1;
    }

    /**
     * 本函数用于检测棋盘上每个格子对于当前执子者而言是否可落子.如存在可落子的格子返回false(表示未被PASS),否则返回true
     * @method checkPass
     * @return {boolean} false:当前执子者没被PASS true:当前执子者被PASS了
     * */
    checkPass() {
        for (let i = 0; i < 8; i++) {
            for( let j = 0; j < 8; j++) {
                if(this.move(i, j, true)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 本函数用于检测给定位置是否可以落子并返回判定结果 如可以落子则返回true 否则返回false
     * 在可以落子的情况下本函数将完成吃子的功能
     * @method move
     * @param {int} i 待落子处的垂直坐标
     * @param {int} j 待落子处的水平坐标
     * @param {boolean} checkOnly 描述move()函数是否需要吃子的状态位
     * @returns {boolean} moveSuccess 标识是否成功落子的状态位 如成功落子则将所有方向上可以吃的敌方棋子都吃掉
     * */
    move(i, j, checkOnly) {
        let moveSuccess = false;

        if(this.map[i][j] > 0) {
            return moveSuccess;
        }

        let directions = [
            {x:-1, y:-1},
            {x:-1, y:0},
            {x:-1, y:1},
            {x:0, y:-1},
            {x:0, y:1},
            {x:1, y:-1},
            {x:1, y:0},
            {x:1, y:1}
        ];


        for (let direction of directions) {
            let canMove = false;
            let [x, y] = [j, i];

            while (true) {
                x += direction.x;
                y += direction.y;

                if(x < 0 || x >= 8 || y < 0 || y >= 8) {
                    canMove = false;
                    break;
                }

                if(this.map[y][x] === 3 - this.color) {
                    canMove = true;
                } else if (this.map[y][x] === this.color) {
                    break;
                } else if (this.map[y][x] === 0) {
                    canMove = false;
                    break;
                }
            }

            moveSuccess = moveSuccess || canMove;

            if(canMove && !checkOnly) {
                while(true) {
                    x -= direction.x;
                    y -= direction.y;

                    this.map[y][x] = this.color;
                    if(x === j && y === i) {
                        break;
                    }
                }
            }
        }
        return moveSuccess;
    }
}
```

### 3.2 逻辑层中的分离

一个很直白的问题:如上文的代码组织足够好了吗?很明显答案是不够的.根据单一职责原则(SRP:Single Responsibility Principle):导致一个类造成修改的原因应该只有1个.那么我们再来看看OthelloGame类的类描述:本类用于处理黑白棋逻辑并维护描述棋盘当前状态的数据.这个类做了两件事:处理逻辑和维护状态.因此,OthelloGame类应该再拆分.拆分成2个类:一个用于维护棋盘当前状态,另一个用来控制棋盘当前状态.

另一个问题:控制落子权的代码放在OthelloView类这样一个用于渲染视图的类中,是否有问题?

因此我们首先解决的问题是:分离棋盘的维护与控制职责.

#### 3.2.1 用于处理与局面落子后状态相关任务的类--OthelloPattern

用一句很简单的话概括就是:落子之后棋盘的状态是一件事,而落子之后落子权的归属是另外一件事.棋盘的状态不依赖于落子权的归属,因此应该用一个单独的类来描述落子后棋盘的状态.

```javascript
/**
 * @classdesc 本类用于处理与局面落子后状态相关的任务 (譬如:棋盘的初始化 落子规则 PASS规则)
 * @desc 初始化棋盘以及优先落子者的执子颜色
 * */
class OthelloPattern {
    constructor() {
        this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        this.color = 1;
     }

    /**
     * 本函数用于检测给定位置对于给定棋子颜色而言是否可以落子并返回判定结果 如可以落子则返回true 否则返回false
     * 在可以落子的情况下本函数将根据状态位设置来决定是否完成吃子的功能
     * @method
     * @param {int} i 待落子处的垂直坐标
     * @param {int} j 待落子处的水平坐标
     * @param {int} color 当前执子者的执子颜色
     * @param {boolean} checkOnly 描述move()函数是否需要吃子的状态位
     * @return {boolean} moveSuccess 标识是否成功落子的状态位 如成功落子则将所有方向上可以吃的敌方棋子都吃掉
     * */
    move(i, j, color, checkOnly) {
        let moveSuccess = false;

        if(this.map[i][j] > 0) {
            return moveSuccess;
        }

        let directions = [
            {x:-1, y:-1},
            {x:-1, y:0},
            {x:-1, y:1},
            {x:0, y:-1},
            {x:0, y:1},
            {x:1, y:-1},
            {x:1, y:0},
            {x:1, y:1}
        ];


        for (let direction of directions) {
            let canMove = false;
            let [x, y] = [j, i];

            while (true) {
                x += direction.x;
                y += direction.y;

                if(x < 0 || x >= 8 || y < 0 || y >= 8) {
                    canMove = false;
                    break;
                }

                if(this.map[y][x] === 3 - color) {
                    canMove = true;
                } else if (this.map[y][x] === color) {
                    break;
                } else if (this.map[y][x] === 0) {
                    canMove = false;
                    break;
                }
            }

            moveSuccess = moveSuccess || canMove;

            if(canMove && !checkOnly) {
                while(true) {
                    x -= direction.x;
                    y -= direction.y;

                    this.map[y][x] = color;
                    if(x === j && y === i) {
                        break;
                    }
                }
            }
        }
        return moveSuccess;
    }

    /**
     * 本函数用于检测棋盘上每个格子对于当前执子者而言是否可落子.如存在可落子的格子返回false(表示未被PASS),否则返回true
     * @method checkPass
     * @param {int} color 当前执子者所执棋子的颜色
     * @return {boolean} false:当前执子者没被PASS true:当前执子者被PASS了
     * */
    checkPass(color) {
        for (let i = 0; i < 8; i++) {
            for( let j = 0; j < 8; j++) {
                if(this.move(i, j,color, true)) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

可以看到OthelloPattern类中的属性与方法几乎与上文的OthelloGame类相同.只是相比于原来的OthelloGame类而言,不再维护当前执子者的落子权了.换言之就是不再维护棋局的当前状态,而是只定义处理棋局的逻辑了.

#### 3.2.2 控制棋盘当前状态的类--OthelloGame

那么很自然的一个问题是:落子权由哪个类来处理最为恰当? 如果说双方博弈的话,那么OthelloPattern类维护的是棋盘状态,而OthelloGame类维护的是执子者的状态.

```javascript
/**
 * @classdesc 本类用于控制棋盘当前状态 (譬如:控制落子后棋盘的状态 落子后落子权的让渡)
 * @desc 初始化棋盘维护类OthelloPattern的实例和优先落子者的执子颜色
 * */
class OthelloGame {
    constructor() {
        this.pattern = new OthelloPattern();
        this.color = 1;
    }

    /**
     * 本函数用于检测是否可以落子 并根据落子结果维护落子权的归属
     * @method
     * @param {int} i 待落子处的垂直坐标
     * @param {int} j 待落子处的水平坐标
     * @return {boolean}
     * */
    move(i, j) {
        if(this.pattern.move(i, j, this.color, false)) {
            this.color = 3 - this.color;
            if(this.pattern.checkPass(this.color)) {
                this.color = 3 - this.color;
                if(this.pattern.checkPass(this.color)) {
                    alert("GG");
                }
            }
            return true;
        }
    }
}
```

答案是OthelloGame类.可以看到在该类的move()方法中来处理落子权的归属.

#### 3.2.3 不应处理落子权的类--OthelloView

进而对OthelloView类造成的影响就是:不再处理落子权的让渡.

```javascript
/**
 * @classdesc 本类用于负责处理UI相关的任务
 * @desc 本类的构造函数中需传递2个参数: 用于装载棋盘的容器DOM和用于处理棋局的game类的实例
 * */
class OthelloView {
    constructor(container, game) {
        this.container = container;
        this.game = game;
    }

    /**
     * 本方法用于根据数据模型(即二维数组中每个元素的值)来渲染视图
     * @method
     * @return {void}
     * */
    render() {
        this.container.innerHTML= '';
        for (let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let cell = document.createElement("div");
                this.container.appendChild(cell);
                cell.style = `vertical-align:middle;width:30px;margin:1px;
    height:30px;background-color:darkgreen;
    display:inline-block`;
                cell.addEventListener("click", (event) => {
                    this.game.move(i, j);
                    this.render();
                });

                if(this.game.pattern.map[i][j] > 0) {
                    let disc = document.createElement("div");
                    disc.style = `margin:2px;border-radius:13px;
        width:26px;height:26px;background-color:${this.game.pattern.map[i][j] == 1 ? 'black' : 'white'}`;
                    cell.appendChild(disc);
                }
            }
            this.container.appendChild(document.createElement("br"));
        }
    }
}
```

## PART4. 额外的功能--悔棋

### 4.1 功能分析

想要实现悔棋的功能,就需要记录棋盘和落子权的变化情况.更面向程序员的说法是:记log.有了log之后要做的事情就简单了:从log中删除上一次落子的棋盘变化日志和落子权变化日志.即完成了悔棋功能的开发.

### 4.2 实现

根据上文中的描述,实际上已经规划好了实现的步骤:

- step1. 记录操作日志
- step2. 悔棋时从操作日志中删除上一次操作的记录

此处已经分析过设计思路,就不再以类为单位再次描述修改过程了.

```javascript
/**
 * @classdesc 本类用于负责处理UI相关的任务
 * @desc 本类的构造函数中需传递2个参数: 用于装载棋盘的容器DOM和用于处理棋局的game类的实例
 * */
class OthelloView {
    constructor(container, game) {
        this.container = container;
        this.game = game;
    }

    /**
     * 本方法用于根据数据模型(即二维数组中每个元素的值)来渲染视图并创建悔棋按钮
     * @method
     * @return {void}
     * */
    render() {
        this.container.innerHTML= '';
        for (let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let cell = document.createElement("div");
                this.container.appendChild(cell);
                cell.style = `vertical-align:middle;width:30px;margin:1px;
    height:30px;background-color:darkgreen;
    display:inline-block`;
                cell.addEventListener("click", (event) => {
                    this.game.move(i, j);
                    this.render();
                });

                if(this.game.pattern.map[i][j] > 0) {
                    let disc = document.createElement("div");
                    disc.style = `margin:2px;border-radius:13px;
        width:26px;height:26px;background-color:${this.game.pattern.map[i][j] == 1 ? 'black' : 'white'}`;
                    cell.appendChild(disc);
                }
            }
            this.container.appendChild(document.createElement("br"));
        }

        // 创建悔棋按钮
        let regret = document.createElement("button");
        regret.innerText = "悔棋";
        regret.addEventListener("click", (event) => {
            this.game.revert();
            this.render();
        });
        this.container.appendChild(regret);
    }
}

/**
 * @classdesc 本类用于处理与局面落子后状态相关的任务 (譬如:棋盘的初始化 落子规则 PASS规则)
 * @desc 初始化棋盘以及优先落子者的执子颜色
 * */
class OthelloPattern {
    constructor(map) {
        this.map = map || [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        this.color = 1;
     }

    /**
     * 本方法用于检测给定位置对于给定棋子颜色而言是否可以落子并返回判定结果 如可以落子则返回true 否则返回false
     * 在可以落子的情况下本函数将根据状态位设置来决定是否完成吃子的功能
     * @method
     * @param {int} i 待落子处的垂直坐标
     * @param {int} j 待落子处的水平坐标
     * @param {int} color 当前执子者的执子颜色
     * @param {boolean} checkOnly 描述move()函数是否需要吃子的状态位
     * @return {boolean} moveSuccess 标识是否成功落子的状态位 如成功落子则将所有方向上可以吃的敌方棋子都吃掉
     * */
    move(i, j, color, checkOnly) {
        let moveSuccess = false;

        if(this.map[i][j] > 0) {
            return moveSuccess;
        }

        let directions = [
            {x:-1, y:-1},
            {x:-1, y:0},
            {x:-1, y:1},
            {x:0, y:-1},
            {x:0, y:1},
            {x:1, y:-1},
            {x:1, y:0},
            {x:1, y:1}
        ];

        for (let direction of directions) {
            let canMove = false;
            let [x, y] = [j, i];

            while (true) {
                x += direction.x;
                y += direction.y;

                if(x < 0 || x >= 8 || y < 0 || y >= 8) {
                    canMove = false;
                    break;
                }

                if(this.map[y][x] === 3 - color) {
                    canMove = true;
                } else if (this.map[y][x] === color) {
                    break;
                } else if (this.map[y][x] === 0) {
                    canMove = false;
                    break;
                }
            }

            moveSuccess = moveSuccess || canMove;

            if(canMove && !checkOnly) {
                while(true) {
                    x -= direction.x;
                    y -= direction.y;

                    this.map[y][x] = color;
                    if(x === j && y === i) {
                        break;
                    }
                }
            }
        }
        return moveSuccess;
    }

    /**
     * 本方法用于检测棋盘上每个格子对于当前执子者而言是否可落子.如存在可落子的格子返回false(表示未被PASS),否则返回true
     * @method
     * @param {int} color 当前执子者所执棋子的颜色
     * @return {boolean} false:当前执子者没被PASS true:当前执子者被PASS了
     * */
    checkPass(color) {
        for (let i = 0; i < 8; i++) {
            for( let j = 0; j < 8; j++) {
                if(this.move(i, j,color, true)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 本方法用于返回一个新的OthelloPattern的实例
     * @method
     * @return {OthelloPattern}
     * */
    clone() {
        // TODO: line => line.slice()啥意思 = = 
        return new OthelloPattern(this.map.map(line => line.slice()));
    }
}

/**
 * @classdesc 本类用于控制棋盘当前状态 (譬如:控制落子后棋盘的状态 落子后落子权的让渡)
 * @desc 初始化棋盘维护类OthelloPattern的实例和优先落子者的执子颜色
 * */
class OthelloGame {
    constructor() {
        this.patterns = [new OthelloPattern()];
        this.colors = [1];
    }

    /**
     * 返回最后一次落子后棋盘状态的触发器
     * @method
     * @return {OthelloPattern}
     * */
    get pattern() {
        return this.patterns[this.patterns.length - 1];
    }

    /**
     * 返回最后一次落子后落子权归属的触发器
     * @method
     * @return {int}
     * */
    get color() {
        return this.colors[this.colors.length - 1];
    }

    /**
     * 本方法用于检测是否可以落子 并根据落子结果维护落子权的归属 之后将棋盘情况及落子权归属情况记录至本类的成员属性中
     * @method
     * @param {int} i 待落子处的垂直坐标
     * @param {int} j 待落子处的水平坐标
     * @return {boolean}
     * */
    move(i, j) {
        // JS的拷贝是深拷贝 也就是复制一份副本 副本与原本指向不同的地址
        // 也就是说此处的含义为:复制最后一次棋盘的情况 并根据落子情况修改副本 然后记录修改后的棋盘状态
        // 当然这里的clone()方法是自己实现的
        let pattern = this.pattern.clone();
        let color = this.color;
        if(pattern.move(i, j, color, false)) {
            color = 3 - color;
            if(pattern.checkPass(color)) {
                color = 3 - color;
                if(pattern.checkPass(color)) {
                    alert("GG");
                }
            }

            // 记录本次操作的棋盘状态和落子权归属日志
            this.patterns.push(pattern);
            this.colors.push(color);
            return true;
        }
    }

    /**
     * 本方法用于从本类的成员属性patterns和colors中删除最后一个元素 以便实现悔棋功能
     * @method
     * @return {void}
     * */
    revert() {
        if(this.patterns.length > 1) {
            this.patterns.pop();
            this.colors.pop();
        }
    }
}
```

完结撒花.
