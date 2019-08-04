let othello_board = document.getElementById("othello_board")

/*
 * let board = [
 *     [0,0,0,0,0,0,0,0],
 *     [0,0,0,0,0,0,0,0],
 *     [1,0,0,0,0,0,0,0],
 *     [0,2,0,1,2,0,0,0],
 *     [0,0,2,2,1,0,0,0],
 *     [1,2,2,0,2,0,0,0],
 *     [0,0,2,2,2,2,0,0],
 *     [0,1,0,1,0,0,1,0],
 * ];
 * 
 */
let board = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,1,2,1,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];



let color = 1;
let moveSuccess = false;

let isPass = false
let passCount = 0;

let directions = [
        {x:-1,y:0},
        {x:1,y:0},
        {x:0,y:-1},
        {x:0,y:1},
        {x:1,y:1},
        {x:1,y:-1},
        {x:-1,y:1},
        {x:-1,y:-1},
];

function initBoard()  {
    othello_board.innerHTML='';
    for (let i=0; i<=7; i++) {
        for (let j=0; j<=7; j++) {
            let box = document.createElement("div");
            //box.style = "width:30px;height:30px;background-color:green;display:inline-block"
            box.classList.add("classBox")
            othello_board.appendChild(box)

            box.addEventListener("click", event => {
                //console.log(x,y)
                // 1. 如果有子, 直接跳出
                if (board[i][j] != 0) {
                    return;
                }

                for(let direction of directions) {
                    eatDisc(i,j,direction,false);
                }

                console.log("click color: ", color);

                initBoard();

                console.log("moveSuccess : ", moveSuccess);

                if (moveSuccess) { // 无效点击 不反转
                    color = 3 - color;
                    console.log("next color: ", color);
                    if (checkIsPass()) {
                        console.log(color + " : is pass");
                        color = 3 - color;
                        console.log("check again!");
                        console.log("current color: " + color);
                        if (checkIsPass()) {
                            alert("Game Over!");
                        }
                    }
                }

                moveSuccess = false;
            });

        if (board[i][j] === 1) {
            let disc = document.createElement("div");
            disc.classList.add("classWhiteDisc")
            box.appendChild(disc)
        }

        if (board[i][j] === 2) {
            let disc = document.createElement("div");
            disc.classList.add("classBlackDisc")
            box.appendChild(disc)
        }
    }

        let brElem= document.createElement("br");
        othello_board.appendChild(brElem)
        
    }
}

function eatDisc(i, j, direction, isTest) {
    let canmove = false;
    let [x, y] = [j, i]; // j 是从左往右的 横座标(x)， i是从上往下的纵座标(y)


    while(true) {
        x += direction.x;
        y += direction.y;

        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            canmove = false;
            return false;
        }

        if (board[y][x] === 3 - color) { // 遇到另外的颜色
            canmove = true;
        } else if(board[y][x] == color) { // 遇到自己，跳出
            break;
        } else if(board[y][x] == 0) { // 遇到没有棋子，不能move
            canmove = false;
            break;  
        }
    }

    if (x < 0) {
        canmove = false;
    }
    
    if (canmove) {
        moveSuccess = true
        if (!isTest ) {
            while(true) {
                x -= direction.x;
                y -= direction.y;
                board[y][x] = color;
                if (x === j && y === i)    {
                    break;
                }
            }
        }
    } 

    return canmove;
}


function checkIsPass() {
    console.log("check color: " + color);
    for (let i=0; i<=7; i++) {
        for (let j=0; j<=7; j++) {
                for (let direction of directions) {
                    if (eatDisc(i, j, direction, true)) {
                        console.log("not pass x,y", j, i);
                        return false;
                    }
                }
        }
    }

    console.log("cannot eat, return true, is pass")
    return true
}

initBoard();


