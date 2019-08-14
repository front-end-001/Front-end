window.onload = function() {
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
                [0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }
        checkPass(color) {
            console.log(`check ${this.color === 2 ? '黑色' : '白色'}`)
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.move(i, j, color, true))
                        return false;
                }
            }
            return true;
        }
        move(i, j, color, checkOnly) {
            if (this.map[i][j] > 0) {
                return;
            }
            let directions = [
                {x: -1, y: -1},
                {x: -1, y: 0},
                {x: -1, y: 1},
                {x: 0, y: 1},
                {x: 1, y: 1},
                {x: 1, y: 0},
                {x: 1, y: -1},
                {x: 0, y: -1}
            ]
            let moveSucess = false;
            for (let direction of directions) {
                let canMove = false;
                let [x, y] = [j, i];
                while (true) {
                    x += direction.x;
                    y += direction.y;
                    if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                        canMove = false;
                        break;
                    }
                    if (this.map[y][x] === 3 - color) {
                        canMove = true;
                    } else if (this.map[y][x] === color) {
                        break;
                    } else if (this.map[y][x] === 0) {
                        canMove = false;
                        break;
                    }
                }
                moveSucess = moveSucess || canMove;
                if (canMove && !checkOnly) {
                    while(true) {
                        x -= direction.x;
                        y -= direction.y;
                        this.map[y][x] = color;
                        if (x === j && y === i)
                            break;
                    }
                }
            }
            return moveSucess;
        }
        clone(){
            return new OthelloPattern(this.map.map(line => line.slice()));
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
        move(i, j) {
            let pattern = this.pattern.clone();
            let color = this.color;
            if (pattern.move(i, j, color, false)) {
                color = 3 - color;
                if (pattern.checkPass(color)) {
                    console.log('pass');
                    color = 3 - color;
                    if(pattern.checkPass(color)) {
                        alert('game over');
                    }
                }
                this.patterns.push(pattern);
                this.colors.push(color);
                return true;
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
            console.log(`当前玩家：${this.game.color === 2 ? '黑' : '白'}`);
            this.container.innerHTML = '';
            for (let i = 0; i < 8; i++) {
                let row = document.createElement('ul');
                row.classList.add('row');
                this.container.appendChild(row);
                for (let j = 0; j < 8; j++) {
                    let col = document.createElement('li');
                    col.classList.add('col');
                    col.addEventListener('click', event => {
                        this.game.move(i, j);
                        this.render();
                    })
                    if (this.game.pattern.map[i][j] > 0) {
                        let className = this.game.pattern.map[i][j] === 1 ? 'white' : 'black';
                        col.classList.add(className);
                    }
                    row.appendChild(col);
                }
            }
            let regret = document.createElement('button');
            regret.innerHTML = '悔棋';
            regret.addEventListener('click', event => {
                this.game.revert();
                this.render();
            })
            this.container.appendChild(regret);
        }

    }
    new OthelloView(new OthelloGame(),
    document.getElementById('checkerboard')).render();
}