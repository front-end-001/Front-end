class Pattern {
    constructor(board, color) {
        this.board = board || [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.color = color || 2;
    }

    // 检查是否有地方落子
    checkBoard() {
        this.canDropDiscCheck = false;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.board[y][x] == 0) {
                    this.move(y, x, true);
                }
            }
        }
        return this.canDropDiscCheck;
    }

    move(y, x, checkBoard = false) {
        let directions = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, 1],
                [0, -1],
                [1, -1],
                [1, 0],
                [1, 1]
            ],
            ox = x,
            oy = y;

        for (let direction of directions) {
            let moveX = direction[0],
                moveY = direction[1],
                hasOpposite = false,
                directionCanChange = false;

            while (true) {
                // 每个direction 初始化点击的x, y
                if (!hasOpposite) {
                    x = ox;
                    y = oy;
                }
                x += moveX;
                y += moveY;

                // 检查边界
                if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                    break;
                }
                if (this.board[y][x] === 3 - this.color) {
                    hasOpposite = true;
                }
                // 与落子的颜色相同， 前面又有不同的 可以落子
                if (this.board[y][x] === this.color) {
                    if (hasOpposite) {
                        directionCanChange = true;
                        // 只是检查棋盘
                        if (checkBoard) {
                            this.canDropDiscCheck = true;
                        }

                        // 可以落子改变Board
                        else {
                            this.canDropDisc = true;
                        }
                    }
                    break;
                }
                // 碰到没有黑白的跳出
                if (this.board[y][x] === 0) {
                    break;
                }
            }

            // 不是checkboard、 不是检查AI的时候，改变board数据
            if (directionCanChange && !checkBoard && this.canDropDisc) {
                while (true) {
                    x -= moveX;
                    y -= moveY;
                    this.board[y][x] = this.color;
                    if (x == ox && y === oy) break;
                }
            }
        }
    }

    clone() {
        return new Pattern(this.board.map(line => line.slice()), this.color);
    }

    _computeWhiteAndBlackNumber() {
        let blackNum = 0,
            whiteNum = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.board[y][x] == 2) {
                    blackNum++;
                } else if (this.board[y][x] == 1) {
                    whiteNum++;
                }
            }
        }

        return {
            blackNum,
            whiteNum
        };
    }
}
