// 黑白棋面向对象逻辑

class OthelloPattern {
    constructor(board) {
        this.board = board || [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]; 
    }

    move(x, y, color, checkOnly = false,) {
        let ox = x, oy = y;
        let canMove = false;

        if (this.board[x][y] != 0) 
            return false;

        let directions = [
            [-1, -1],//左上
            [-1,  0],//左
            [-1,  1],//左下
            [ 0,  1],//下
            [ 0, -1],//上
            [ 1,  1],//右下
            [ 1, -1],//右上
            [ 1,  0],//右
        ];

        for (let direction of directions) {
            let directionCanMove = false;
            let hasOpposite = false;

            x = ox;
            y = oy;

            while(true) { 
                x += direction[0];
                y += direction[1];
                if (x < 0 || x >= 8 || y < 0 || y >= 8) //判断越界
                    break;

                if (this.board[x][y] == 3 - color) { //遇到不同色
                    hasOpposite = true;
                }
                if (this.board[x][y] == color) { //遇到同色
                    if (hasOpposite) 
                        directionCanMove = true;
                    break;
                }
                if (this.board[x][y] == 0) { //遇到边界
                    break;
                }
            }
            if (directionCanMove && !checkOnly) {
                while(true) { //吃子
                    x -= direction[0];
                    y -= direction[1];
                    if (x == ox && y == oy) {
                        break;
                    }
                    this.board[x][y] = color;
                }
            }
            canMove = canMove || directionCanMove;
        }   

        if (canMove && !checkOnly) {
            this.board[ox][oy] = color;
            color = 3 - color;
            console.log("next color: ", color === 1 ? "黑" : "白");
        }
        return canMove;
    }        

    checkPass(color) {
        for(let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (this.move(x, y, color, true)) {
                    return false;
                }
            }
        }
        return true;
    }

    clone() {
        return new OthelloPattern(this.board.map(line => line.slice()));
    }

}

class OthelloGame {
    constructor() {
        this.patterns = [new OthelloPattern()];
        this.colors = [1];
    }

    get pattern() {
        return this.patterns[this.patterns.length - 1];
    }

    get color() {
        return this.colors[this.colors.length - 1];
    }

    move(x, y) {
        let pattern = this.pattern.clone();
        let color = this.color;

        if(pattern.move(x, y, color)) {
            color = 3 - color;
            if (pattern.checkPass(color)) {
                console.log("passed");
                color = 3 - color;
                if (pattern.checkPass(color)) {
                    //game over
                    pattern.showWin();
                }
            }
            this.patterns.push(pattern);
            this.colors.push(color);
            pattern.showCurrent();
        }
    }

    revert() {
        if (this.patterns.length > 1) {
            this.patterns.pop();
            this.colors.pop();
        }
    }
}

class OthelloView {
    constructor(game, container) {
        this.game = game;
        this.container = container;
    }

    render() {
        this.container.innerHTML = "";
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let element = document.createElement('div');
                element.style = "border:solid 1px white;width:50px;height:50px;background-color:darkgreen;display:inline-block;vertical-align:bottom";
                element.addEventListener('click', (event) => {
                    this.game.move(x, y);
                    this.show();
                });
                this.container.appendChild(element);
                if (this.game.pattern.board[x][y] == 1) {
                    let disc = document.createElement('div');
                    disc.style = "border-radius:20px;width:40px;height:40px;margin-top:5px;margin-left:5px;background-color:black;";
                    element.appendChild(disc);
                } else if (this.game.pattern.board[x][y] == 2) {
                    let disc = document.createElement('div');
                    disc.style = "border-radius:20px;width:40px;height:40px;margin-top:5px;margin-left:5px;background-color:white;";
                    element.appendChild(disc);
                } 
            }
            this.container.appendChild(document.createElement("br"));
        }
        let regret = document.createElement("button");
        regret.innerText = "悔棋";
        regret.addEventListener('click', (event) => {
            this.game.revert();
            this.show();
        });
        this.container.appendChild(regret);
    }
}


