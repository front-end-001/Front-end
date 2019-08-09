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
                board.appendChild(grid)
            }
        }
    }
}
class pattern {
    constructor () {
        this.map = [
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
}
class game {
    constructor() {
        this.pattern = new pattern()
        this.color = 2
    }
    move (i, j) {
        const moveSuccess = this.pattern.moveOneStep(i, j, this.color, true)
        if (moveSuccess) {
            this.color = 3 - this.color
            const isPass = this.pattern.checkPass(this.color)
            if (isPass) {
                this.color = 3 - this.color
                if (this.pattern.checkPass()) {
                    console.log('----game over----')
                }
            }
        }
    }
}
const oneView = new view(document.getElementById("board"))
oneView.render()


