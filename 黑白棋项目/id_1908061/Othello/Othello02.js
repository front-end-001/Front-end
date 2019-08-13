 // 棋盘 NO UI
 class checkerboard {
    constructor(){
        this.board=[    //直观形象地棋盘
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,2,0],
            [0,0,0,0,0,0,2,2],
            [0,0,0,0,0,2,2,2]
        ];
    }
    move(x,y,color,checkOnly=false){
        let ox=x,oy=y;
        let eat=false;  //初始化，能否吃子
        let directions=[  //抽象的8个方向
                [-1,1],
                [-1,0],
                [-1,-1],
                [0,1],
                [0,0],
                [0,-1],
                [1,1],
                [1,0],
                [1,-1]
            ];
        if(this.board[y][x]!==0){
            return false;
            //不能点已经放子的地方
        }
        for(let dir of directions){  //循环，8个方向能否吃子
            let x=ox,y=oy;
            let hasOpposite=false;  //初始化，是否有对立棋子
            let dirEat=false;  //初始化，某个方向能否吃子
            while(true){
                x+=dir[0];  //各个方向走一走  
                y+=dir[1];
                if(x<0 || x>=8 || y<0 || y>=8){  //超出边界如何处理
                    break;
                }
                if(this.board[y][x]===3-color){  //遇到对立棋子
                    hasOpposite=true;
                }
                if(this.board[y][x]===color){  //遇到同色棋子
                    if(hasOpposite){  //二者之间有对立棋子
                        dirEat=true;  //某个方向可吃子
                    }
                    break;
                }
                if(this.board[y][x]===0){  //走到空白处
                    break;
                }
            }
            if(dirEat && !checkOnly){ //某个方向可吃子
                while(true){
                    x-=dir[0];
                    y-=dir[1];
                    if(x===ox && y===oy){  //往回吃子时，不要吃到自己的原始位置
                        break;
                    }
                    this.board[y][x]=color;  //回头把经过的对立棋子都变成自己的颜色
                }
            }
            eat= eat || dirEat;  //整体而言能否吃子，如果某个方向可吃子，那就可以，否则选择默认参数---不可吃子
        }

        if(eat && !checkOnly){  
            this.board[oy][ox]=color;  //改变自己原始位置的颜色
            color=3-color;  //我吃完了，轮到你了
        }
        return eat;
    }
}

class game{
    constructor(){
        this.pattern=new checkerboard();
        this.color=1;
    }
    checkPass(){
        for(let y=0;y<8;y++){
            for(let x=0;x<8;x++){
                if(this.pattern.move(x,y,this.color,true)){ 
                    return false;
                }
            }
        }
        return true;
    }
    move(x,y){
        this.pattern.move(x,y,this.color);
        this.color=3-this.color;
        if(this.checkPass()){
            this.color=3-this.color;  
            if(this.checkPass()){  
                console.log('Game Over!');
            }
        }
    }
}