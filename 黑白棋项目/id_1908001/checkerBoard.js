const map2 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 1, 2, 2]
]
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 1, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]
const board = document.getElementById("board")
let color = 2
const directions = [
    {x: -1, y: -1},
    {x: -1, y: 0},
    {x: -1, y: 1},
    {x: 0, y: -1},
    {x: 0, y: 1},
    {x: 1, y: -1},
    {x: 1, y: 0},
    {x: 1, y: 1}
]
const checkPass = () => {
    for (let z = 0; z < 8; z++) {
        for (let p = 0; p < 8; p++) {
            if (move(z, p, false)) {
                return false
            }
        }
    }
    return true
}
const move = (i, j, isMove) => {
    if (map[i][j] > 0) {
        return false
    }
    let moveSuccess = false
    for (const direction of directions) {
        let canMove = false
        let [ x, y ] = [j, i]

        while(true) {
            x += direction.x
            y += direction.y
            if (x < 0 || x >=8 || y < 0 || y >= 8) {
                canMove = false
                break
            }
            if (map[y][x] === 3 - color) {
                canMove = true
            } else if (map[y][x] === 0) {
                canMove = false
                break
            } else if (map[y][x] === color) {
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
                map[y][x] = color
                if (x === j && y === i) {
                    break
                }
            }
        }
    }
    return moveSuccess
}
const render = () => {
    board.innerHTML = ''
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const grid = document.createElement("div")
            grid.style = "vertical-align: middle;\n" +
                "    width: 30px;\n" +
                "    height: 30px;\n" +
                "    background-color: bisque;\n" +
                "    border: black 1px solid;\n" +
                "    display: inline-block;"
            grid.addEventListener("click", event => {
                const moveSuccess = move(i, j, true)
                if (moveSuccess) {
                    color = 3 - color
                    const isMove = checkPass()
                    if (isMove) {
                        color = 3 - color
                        if (checkPass()) {
                            console.log('----over----')
                        }
                    }
                }
                render()
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
render()

