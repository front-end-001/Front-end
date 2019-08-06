const [BLACK, WHITE, BLANK] = [1, 2, null];
let map = [
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE],
    [WHITE, WHITE, null, BLACK, WHITE, null, WHITE, BLACK]
];

function step([x, y], deltaX, deltaY) {
    return [x - deltaX, y - deltaY];
}

const right = (x, y) => step([x, y], 1, 0);
const left = (x, y) => step([x, y], -1, 0);
const down = (x, y) => step([x, y], 0, 1);
const up = (x, y) => step([x, y], 0, -1);
const rightUp = (x, y) => step([x, y], 1, -1);
const leftDown = (x, y) => step([x, y], -1, 1);
const rightDown = (x, y) => step([x, y], 1, 1);
const leftUp = (x, y) => step([x, y], -1, -1);

const direction = [
    [left, right],
    [right, left],
    [up, down],
    [down, up],
    [leftDown, rightUp],
    [rightUp, leftDown],
    [leftUp, rightDown],
    [rightDown, leftUp]
];

// helper
const getValueByAxis = (x, y) => {
    return map[y][x];
};
const setValueByAxis = (x, y, value, myMap = map) => {
    myMap[y][x] = value;
};
const isInRange = (x, y) => {
    return x >= 0 && y >= 0 && x <= 7 && y <= 7;
};
const isAxisEqual = (x, y, rowIndex, colIndex) => x === colIndex && y === rowIndex;

let container = document.getElementById('board');
let isPass = false;
let userColor = BLACK;
// 按规则黑棋先走
render();

// 渲染当前用户
function renderUser() {
    const user = document.createElement('div');
    user.innerHTML = userColor === BLACK ? '黑子落棋' : '白子落棋';
    container.append(user);
}

function render() {
    container.innerHTML = '';
    renderUser(userColor);
    // pass
    function pass() {
        const canPut = map.some((row, rowIndex) => {
            return row.some((col, colIndex) => {
                let changeUser = false;
                const point = { x: colIndex, y: rowIndex };

                // 循环各个方向
                const move = direction.some(([go, back]) => {
                    let canmove = false;
                    // 吃子
                    let [x, y] = go(point.x, point.y);
                    while (isInRange(x, y)) {
                        const current = getValueByAxis(x, y);
                        if (current === userColor) {
                            break;
                        }
                        if (current === BLANK) {
                            canmove = false;
                            break;
                        }

                        canmove = true;
                        [x, y] = go(x, y);
                    }
                    if (!isInRange(x, y)) {
                        canmove = false;
                    }

                    // 变子
                    return canmove;
                });

                console.log(move);
                return move;
            });
        });
        return !canPut;
    }

    function put(x, y, colIndex, rowIndex, isPut = true) {
        let changeUser = false;
        const point = { x, y };

        // 循环各个方向
        direction.map(([go, back]) => {
            let canmove = false;
            // 吃子
            [x, y] = go(point.x, point.y);
            while (isInRange(x, y)) {
                const current = getValueByAxis(x, y);
                if (current === userColor) {
                    break;
                }
                if (current === BLANK) {
                    canmove = false;
                    break;
                }

                canmove = true;
                [x, y] = go(x, y);
            }
            if (!isInRange(x, y)) {
                canmove = false;
            }

            // 变子
            if (canmove) {
                [x, y] = back(x, y);
                while (!isAxisEqual(x, y, rowIndex, colIndex)) {
                    setValueByAxis(x, y, userColor);
                    [x, y] = back(x, y);
                }
                setValueByAxis(x, y, userColor);

                changeUser = true;
            }
        });

        // 换手
        if (isPut && changeUser) {
            userColor = 3 - userColor;
            render();
        }

        if (pass()) {
            isPass = true;
            userColor = 3 - userColor;
            render();
            if (pass()) {
                alert('Game over');
            }
            return;
        }
        isPass = false;
        return changeUser;
    }

    map.map((row, rowIndex) => {
        row.map((col, colIndex) => {
            let cell = document.createElement('div');
            container.appendChild(cell);
            cell.style = `
                        width: 30px; height: 30px; background-color: green;
                        display: inline-block; margin:0 1px 1px 0;
                        inline-height: 0;vertical-align: top
                        `;
            if (col === WHITE) {
                cell.className += 'white';
            }
            if (col === BLACK) {
                cell.className += 'black';
            }

            // 转换为(x,y) 坐标
            let x = colIndex;
            let y = rowIndex;
            // 获取当前颜色
            const color = getValueByAxis(x, y);
            const handle = put.bind(null, x, y, colIndex, rowIndex);
            // 空白处才可落子
            !color && cell.addEventListener('click', handle);
        });
        container.appendChild(document.createElement('br'));
    });
}

function calculateResult(myMap = map) {
    let white = 0;
    let black = 0;
    myMap.forEach(row => {
        row.forEach(col => {
            if (col === BLACK) {
                black++;
            } else if (col === WHITE) {
                white++;
            }
        });
    });
    return { white, black };
}

// 抽象 vs 实现

// 步骤
// 1. 画棋 board
// 2. 单方向落子/吃子
// 3. 多方向落子/吃子
// 4. pass 规则
// 5. 剩两空时的最优解
// 6. 3 空最优解
// 7. 转换成类

function move(mapCopy, { x, y }) {
    const { x: colIndex, y: rowIndex } = { x, y };
    let changeUser = false;
    const point = { x, y };

    // 循环各个方向
    direction.map(([go, back]) => {
        let canmove = false;
        // 吃子
        [x, y] = go(point.x, point.y);
        while (isInRange(x, y)) {
            const current = getValueByAxis(x, y);
            if (current === userColor) {
                break;
            }
            if (current === BLANK) {
                canmove = false;
                break;
            }

            canmove = true;
            [x, y] = go(x, y);
        }
        if (!isInRange(x, y)) {
            canmove = false;
        }

        // 变子
        if (canmove) {
            [x, y] = back(x, y);
            while (!isAxisEqual(x, y, rowIndex, colIndex)) {
                setValueByAxis(x, y, userColor, mapCopy);
                [x, y] = back(x, y);
            }
            setValueByAxis(x, y, userColor, mapCopy);

            changeUser = true;
        }
    });
    return mapCopy;
}

// checkLast2
function checkLast2() {
    let blanks = [];
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            col === BLANK && blanks.push({ x: colIndex, y: rowIndex });
        });
    });
    const initColor = userColor;
    const results = blanks.map(({ x, y }, index) => {
        // 尝试下子
        const mapCopy = map.map(row => [...row]);
        move(mapCopy, { x, y });
        userColor = 3 - userColor;
        move(mapCopy, blanks[+!index]);
        console.log(initColor, blanks[+!index], calculateResult(mapCopy));
        userColor = initColor;
        return calculateResult(mapCopy);
    });
    const result = results.reduce(
        (last, current, index) => {
            if (current.black > last.score) {
                return { score: current.black, location: blanks[index] };
            }
            return last;
        },
        { location: {}, score: 0 }
    );
    return result;
}

console.log(checkLast2());
