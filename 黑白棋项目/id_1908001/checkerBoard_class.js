class view {
    constructor (board) {
        this.game = new game()
        this.board = board
    }
    render () {
        this.board.innerHTML = ''
        for (let i = 0; i < this.game.map.length; i++) {
            for (let j = 0; j < this.game.map[i].length; j++) {
                const grid = document.createElement("div")
                grid.style = `vertical-align: middle; width: 30px;height: 30px;background-color: bisque;border: black 1px solid;display: inline-block;`
                grid.addEventListener("click", event => {
                    this.game.move(i, j)
                    this.render()
                })
                if (this.game.map[i][j] > 0) {
                    let pieces = document.createElement("div")
                    pieces.style = `border-radius: 13px; background-color:${this.game.map[i][j] === 2 ? 'black' : 'white'}; margin: 2px; width: 26px; height: 26px`
                    grid.appendChild(pieces)
                }
                board.appendChild(grid)
            }
        }
    }
}
class game {
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
        this.color = 2
    }
    checkPass () {
        for (let z = 0; z < 8; z++) {
            for (let p = 0; p < 8; p++) {
                if (this.moveOne(z, p, false)) {
                    return false
                }
            }
        }
        return true
    }
    move (i, j) {
        const nextColor = () => {
            this.color = 3 - this.color
        }
        const moveSuccess = this.moveOne(i, j, true)
        if (moveSuccess) {
            nextColor()
            const isMove = this.checkPass()
            if (isMove) {
                nextColor()
                if (this.checkPass()) {
                    console.log('----game over----')
                }
            }
        }
    }
    moveOne (i, j, isMove) {
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
                if (this.map[y][x] === 3 - this.color) {
                    canMove = true
                } else if (this.map[y][x] === 0) {
                    canMove = false
                    break
                } else if (this.map[y][x] === this.color) {
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
                    this.map[y][x] = this.color
                    if (x === j && y === i) {
                        break
                    }
                }
            }
        }
        return moveSuccess
    }
}
const oneView = new view(document.getElementById("board"))
oneView.render()


