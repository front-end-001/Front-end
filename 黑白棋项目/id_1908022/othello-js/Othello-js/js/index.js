/*
var map = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];
let container = document.createElement("div");
document.getElementsByTagName("body")[0].appendChild(container);
for(let i = 0; i < map.length; i++){
    for(let j = 0 ;j < map[i].length ; j++){
        let cell = document.createElement("div");
        cell.style = "vertical-align: middle;width: 30px;height: 30px;margin:1px;background: dark-green;float: left;"
        container.appendChild(cell);
    }
}
*/

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 1, 0, 0, 0, 0],
    [0, 1, 2, 2, 0, 0 ,0, 0],
    [0, 2, 0, 1, 2, 0, 0, 0],
    [1, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 1, 1]
]
let color = 1;
function checkPass(){
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(move(i,j,true))
                return false;
        }
    }
    return true;
}

function move(i,j,checkOnly){
    if( map[i][j] > 0 ){
        return;
    }
    let moveSuccess = false;
    let directions = [
        {x:0, y:1},
        {x:0, y:-1},
        {x:1, y:0},
        {x:1, y:-1},
        {x:1, y:1},
        {x:-1, y:0},
        {x:-1, y:-1},
        {x:-1, y:1}
    ]

    for(let direction of directions){
        let canmove = false;
        let [x,y] = [j, i];
        while(true){
            x = x + direction.x;
            y = y + direction.y;
            if(x < 0 || x >= 8 || y < 0 || y >= 8){
                canmove = false;
                break;
            }

            if(map[y][x] == 3 - color) {
                canmove = true;
            } else if(map[y][x] == color) {
                break;
            } else if(map[y][x] == 0) {
                canmove = false;
                break;
            }
        }
        moveSuccess = moveSuccess || canmove;
        while(canmove && !checkOnly) {
            x -= direction.x;
            y -= direction.y;
            map[y][x] = color;
            if(x == j && y == i){
                break;
            }

        }

    }

    return moveSuccess;

}

let container = document.getElementById("board");
render();
function render(){
    container.innerHTML = '';
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let cell = document.createElement("div");
            container.appendChild(cell);
            cell.style = `vertical-align:middle;width:30px;margin:1px;
            height:30px;background-color:darkgreen;
            display:inline-block`;
            cell.addEventListener("click", event => {
                if(move(i,j,false)){
                    color = 3 - color;
                    if(checkPass()){
                        console.log('pass')
                        color = 3 - color;
                        if(checkPass()){
                            console.log("gameover")
                        }
                    }
                }
                render();

                /*{
                    let [x, y] = [j, i];

                    while( --x >= 0) {
                        if(map[y][x] == 2) {
                            canmove = true;
                        } else if(map[y][x] == 1) {
                            break
                        } else if(map[y][x] == 0) {
                            canmove = false;
                            break;
                        }
                    }

                    if(x < 0)
                        canmove = false;

                    while(canmove && ++x <= j) {
                        map[y][x] = 1;
                    }
                    render();
                }
                {
                    let [x, y] = [j, i];
                    while( ++x <= 7) {
                        if(map[y][x] == 2) {
                            canmove = true;
                        } else if(map[y][x] == 1) {
                            break
                        } else if(map[y][x] == 0) {
                            canmove = false;
                            break;
                        }
                    }

                    if(x > 7)
                        canmove = false;

                    while(canmove && --x >= j) {
                        map[y][x] = 1;
                    }
                    render();
                }

                {
                    let [x, y] = [j, i];
                    while (--y >= 0) {
                        if (map[y][x] == 2) {
                            canmove = true;
                        } else if (map[y][x] == 1) {
                            break;
                        } else if (map[y][x] == 0) {
                            canmove = false;
                            break;
                        }
                    }
                    if (y < 0) {
                        canmove = false;
                    }
                    while (canmove && ++y <= i) {
                        map[y][x] = 1;
                    }
                    render();
                }

                {
                    let [x, y] = [j, i];
                    while( ++y <= 7) {
                        if(map[y][x] == 2) {
                            canmove = true;
                        } else if(map[y][x] == 1) {
                            break
                        } else if(map[y][x] == 0) {
                            canmove = false;
                            break;
                        }
                    }

                    if(x > 7)
                        canmove = false;

                    while(canmove && --y >= i) {
                        map[y][x] = 1;
                    }
                    render();
                }*/

            })
            if(map[i][j]==1){
                let disc = document.createElement("div");
                disc.style = `margin:2px;border-radius:13px;
                width:26px;height:26px;background-color:black`;
                cell.appendChild(disc);
            }
            if(map[i][j]==2){
                let disc = document.createElement("div");
                disc.style = `margin:2px;border-radius:13px;
                width:26px;height:26px;background-color:white`
                cell.appendChild(disc);
            }
        }
        container.appendChild(document.createElement("br"));
    }
}
