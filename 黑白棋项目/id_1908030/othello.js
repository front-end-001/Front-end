class OthelloPattern {
    constructor(map) {
        this.map = map || [[0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,2,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]];
    }
    move(i, j, color, checkOnly) {
        if (this.map[i][j] > 0) {
            return;
        }
        let directions = [
            {x: -1, y: -1},
            {x: -1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: 1, y: 1}
        ];
        let moveSuccess = false;
        for (let dir of directions) {
            let canmove = false;
            let [x, y] = [j, i];
            while (true) {
                x += dir.x;
                y += dir.y;
                if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                    canmove = false;
                    break;
                }
                if (this.map[y][x] == 3 - color) {
                    canmove = true;
                } else if (this.map[y][x] == color) {
                    break;
                } else if (this.map[y][x] == 0) {
                    canmove = false;
                    break;
                }
            }
            moveSuccess = moveSuccess || canmove;
            if (canmove && !checkOnly) {
                moveSuccess = true;
                while(true) {
                    x -= dir.x;
                    y -= dir.y;
                    this.map[y][x] = color;
                    if (x == j && y == i) {
                        break;
                    }
                }
            }
        }
        return moveSuccess;
    }
    checkPass(color) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.move(i, j, color, true)) {
                    return false;
                }
            }
        }
        return true;
    }
    clone() {
        return new OthelloPattern(this.map.map((line => [...line])));
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
                console.log("pass!")
                color = 3 - color;
                if (pattern.checkPass(color)) {
                    alert("game over!")
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
    constructor(container, game) {
        this.container = container;
        this.game = game;
    }
    render() {
        this.container.innerHTML = "";
        for (let i = 0; i < this.game.pattern.map.length; i++) {
            if (i > 0) {
                this.container.appendChild(document.createElement("br"));
            }
            for (let j = 0; j < this.game.pattern.map[i].length; j++) {
                let cell = document.createElement("div");
                cell.className = `cell ${this.game.pattern.map[i][j] == 1 ? "black" : ""}${this.game.pattern.map[i][j] == 2 ? "white" : ""}`;
                cell.addEventListener("click", (event) => {
                    this.game.move(i, j);
                    this.render();
                });
                this.container.appendChild(cell);
            }
        }
        this.container.appendChild(document.createElement("br"));
        let regret = document.createElement("button");
        regret.innerText = "悔棋";
        regret.addEventListener("click", (event) => {
            this.game.revert();
            this.render();
        });
        this.container.appendChild(regret);


    }
}

new OthelloView(document.getElementById("container"), new OthelloGame()).render();
new OthelloView(document.getElementById("container1"), new OthelloGame()).render();
