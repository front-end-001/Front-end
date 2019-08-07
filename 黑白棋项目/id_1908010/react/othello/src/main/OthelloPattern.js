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

        if (this.board[x][y] !== 0) 
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

                if (this.board[x][y] === 3 - color) { //遇到不同色
                    hasOpposite = true;
                }
                if (this.board[x][y] === color) { //遇到同色
                    if (hasOpposite) 
                        directionCanMove = true;
                    break;
                }
                if (this.board[x][y] === 0) { //遇到边界
                    break;
                }
            }
            if (directionCanMove && !checkOnly) {
                while(true) { //吃子
                    x -= direction[0];
                    y -= direction[1];
                    if (x === ox && y === oy) {
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

    showWin() {
        let temp = this.board.flat();
        let blackCount = temp.filter(a => a === 1).length;
        let whiteCount = temp.filter(a => a === 2).length;
        console.log(`game over, black:${blackCount}, white:${whiteCount}, ${blackCount > whiteCount ? "Black Win" : "White Win"}`);
    }

    showCurrent() {
        let temp = this.board.flat();
        let blackCount = temp.filter(a => a === 1).length;
        let whiteCount = temp.filter(a => a === 2).length;
        console.log("white: ", whiteCount, "\nblack: ", blackCount);
    }

    clone() {
        return new OthelloPattern(this.board.map(line => line.slice()));
    }

    spaces() {
        return this.board.flat().filter(item => item === 0).length;
    }
}
export default OthelloPattern;

