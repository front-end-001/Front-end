let othello_board = document.getElementById("othello_board")


// 可以理解为Model,  eat 和 checkIsPass 可以理解为 Model 的 method
class OthelloPattern {
    constructor(board) {
        this.board = board || [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    eat(i, j, color, isTest) {
        let directions = [{
                x: -1,
                y: 0
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 0,
                y: -1
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            },
            {
                x: 1,
                y: -1
            },
            {
                x: -1,
                y: 1
            },
            {
                x: -1,
                y: -1
            },
        ];

        let moveSuccess = false; // 如果这里不加重新初始化moveSuccess, 在判断 CheckIsPass的时候，调用eat时这个值一定为true,

        for (let direction of directions) {
            let canmove = false;
            let [x, y] = [j, i]; // j 是从左往右的 横座标(x)， i是从上往下的纵座标(y)

            while (true) {
                x += direction.x;
                y += direction.y;

                if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                    canmove = false;
                    return moveSuccess || canmove; // 这里不能直接 return false, 因为要判断 之前的其他方向的moveSuccess
                }

                if (this.board[y][x] === 3 - color) { // 遇到另外的颜色
                    canmove = true;
                } else if (this.board[y][x] == color) { // 遇到自己，跳出
                    break;
                } else if (this.board[y][x] == 0) { // 遇到没有棋子，不能move
                    canmove = false;
                    break;
                }
            }

            if (x < 0) {
                canmove = false;
            }

            moveSuccess = moveSuccess || canmove; // moveSuccess 是只要8个方向有一个能canmove，就为真,
            // 返回给外部使用,canmove 只管一个方向，下一次就初始化 

            if (canmove) {
                moveSuccess = true
                if (!isTest) {
                    while (true) {
                        x -= direction.x;
                        y -= direction.y;
                        this.board[y][x] = color;
                        if (x === j && y === i) {
                            break;
                        }
                    }
                }
            }
        }
        return moveSuccess;
    }

    checkIsPass(color) {
        console.log("check color: " + color);
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (this.eat(i, j, color, true)) {
                    console.log("not pass x,y", j, i);
                    return false;
                }
            }
        }

        console.log("cannot eat, return true, is pass");
        return true;
    }

    clone() {
        return new OthelloPattern(this.board.map(line => line.slice())); // 也可以使用 [...line], es6扩展
        // 参考 https://www.html.cn/archives/10024
        // https://juejin.im/entry/58217da92f301e005c2de257
    }

}


// 实现业务逻辑的封装，类似controller
// 由于需要悔棋，那每一步的数据都要保存到js的数组中
class OthelloGame {
    constructor() {
        this.patterns = [new OthelloPattern()];
        this.colors = [1];
    }

    get pattern() {
        return this.patterns[this.patterns.length - 1]; // 返回最后一个值，即最新的局面 
    }

    get color() {
        return this.colors[this.colors.length - 1]; // 返回最后一个棋局应该落子的颜色 
    }

    eat(i, j) {
        let pattern = this.pattern.clone(); // 第一个就是构造函数中patterns的第一个实例 的 clone，拷贝了board数组
        let color = this.color; // 同上，确定当前的颜色
        if (pattern.eat(i, j, color, false)) {
            color = 3 - color;
            console.log("next color: ", color);
            if (pattern.checkIsPass(color)) {
                console.log(color + " : is pass");
                color = 3 - color;
                console.log("check again!");
                console.log("current color: " + color);
                if (pattern.checkIsPass(color)) {
                    alert("Game Over!");
                }
            }

            this.patterns.push(pattern); // 这个参数pattern中的board已经被move修改过了，成了当前的棋局
            this.colors.push(color); // 这个是经过3-color的以后，反转的颜色，表示下一步的颜色，衔接上了get color，为一下次准备
            return true;
        }
    }

    // 悔棋
    revert() {
        if (this.patterns.length > 1) {
            this.patterns.pop();
            this.colors.pop();
        }else {
            console.log("revert to init layout!")
        }
    }
}

class OthelloView {
    constructor(container, game) {
        this.container = othello_board;
        this.game = game;
    }

    renderBoard() {

        this.container.innerHTML = '';

        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                let box = document.createElement("div");
                box.classList.add("classBox")
                this.container.appendChild(box)
                box.addEventListener("click", event => {
                    if (this.game.pattern.board[i][j] != 0) {
                        return;
                    }

                    console.log("click color: ", this.game.color);
                    this.game.eat(i, j);

                    this.renderBoard();
                });

                if (this.game.pattern.board[i][j] === 1) {
                    let disc = document.createElement("div");
                    disc.classList.add("classWhiteDisc")
                    box.appendChild(disc)
                }

                if (this.game.pattern.board[i][j] === 2) {
                    let disc = document.createElement("div");
                    disc.classList.add("classBlackDisc")
                    box.appendChild(disc)
                }
            }

            let brElem = document.createElement("br");
            this.container.appendChild(brElem)
        }

        let regretBtn = document.createElement("button");
        regretBtn.innerText="悔棋";
        regretBtn.addEventListener("click", event => {
            this.game.revert();
            this.renderBoard();
        });

        this.container.appendChild(regretBtn);
    }

}

new OthelloView(othello_board, new OthelloGame()).renderBoard();
