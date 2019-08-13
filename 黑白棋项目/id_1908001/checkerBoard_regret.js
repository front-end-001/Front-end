class view {
    constructor (board) {
        this.game = new game()
        this.board = board
    }
    render () {
        this.board.innerHTML = ''
        const map = this.game.pattern.map
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const grid = document.createElement("div")
                grid.style = `vertical-align: middle; width: 30px;height: 30px;background-color: bisque;border: black 1px solid;display: inline-block;`
                grid.addEventListener("click", event => {
                    this.game.move(i, j)
                    this.render()
                })
                if (map[i][j] > 0) {
                    let pieces = document.createElement("div")
                    pieces.style = `border-radius: 13px; background-color:${map[i][j] === 2 ? 'black' : 'white'}; margin: 2px; width: 26px; height: 26px`
                    grid.appendChild(pieces)
                }
                this.board.appendChild(grid)
            }
        }
        let regret = document.createElement('button')
        regret.innerText = "悔棋"
        regret.addEventListener('click', event => {
            this.game.regret()
            this.render()
        })
        this.board.appendChild(regret)
    }
}
class pattern {
    constructor (map) {
        this.map = map || [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0],
            [0, 0, 1, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.directions = [
            {x: -1, y: -1},
            {x: -1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: 1, y: 1}
        ]
    }
    checkPass (color) {
        for (let z = 0; z < 8; z++) {
            for (let p = 0; p < 8; p++) {
                if (this.moveOneStep(z, p, color, false)) {
                    return false
                }
            }
        }
        return true
    }
    moveOneStep (i, j, color, isMove) {
        if (this.map[i][j] > 0) {
            return false
        }
        let moveSuccess = false
        for (const direction of this.directions) {
            let canMove = false
            let [ x, y ] = [j, i]
            while(true) {
                x += direction.x
                y += direction.y
                if (x < 0 || x >=8 || y < 0 || y >= 8) {
                    canMove = false
                    break
                }
                if (this.map[y][x] === 3 - color) {
                    canMove = true
                } else if (this.map[y][x] === 0) {
                    canMove = false
                    break
                } else if (this.map[y][x] === color) {
                    break
                }
            }
            if (canMove) {
                moveSuccess = true
            }
            if (canMove && isMove) {
                while (true) {
                    x -= direction.x
                    y -= direction.y
                    this.map[y][x] = color
                    if (x === j && y === i) {
                        break
                    }
                }
            }
        }
        return moveSuccess
    }
    clone(){
        return new pattern(this.map.map(line => line.slice()));
    }
}
class game {
    constructor() {
        this.patterns = [new pattern()]
        this.colors = [2]
    }
    get pattern(){
        return this.patterns[this.patterns.length - 1]
    }
    get color(){
        return this.colors[this.colors.length - 1]
    }
    move (i, j) {
        const pattern = this.pattern.clone()
        let color = this.color
        const moveSuccess = pattern.moveOneStep(i, j, color, true)
        if (moveSuccess) {
            color = 3 - color
            if (pattern.checkPass(color)) {
                color = 3 - color
                if (pattern.checkPass(color)) {
                    console.log('----game over----')
                }
            }
            this.patterns.push(pattern)
            this.colors.push(color)
        }
    }
    regret () {
        if(this.patterns.length > 1) {
            this.patterns.pop()
            this.colors.pop()
        }
    }
}
const oneView = new view(document.getElementById("board"))
oneView.render()


