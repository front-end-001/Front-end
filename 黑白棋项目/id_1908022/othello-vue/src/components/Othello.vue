<template>
  <div style="width: 100%;height: 500px;">
    <!--hello world -->
    <div class="box">
      <!-- <div class="grid"></div>
      <div class="grid"></div>-->
      <div class="grid"
           v-for="grid in grids"
           :key="grid.x * 8 + grid.y"
           :x="grid.x"
           :y="grid.y"
           :z="grid.z"
           :class="{gridHover: grid.isHover}"
           @mouseover="mouseHover(grid.x,grid.y)"
           @click="mouseClick(grid.x,grid.y)">

            <div class="circle"
                 v-if="grid.z"
                 :class="{white: grid.z == 1,black: grid.z == 2}">
            </div>

      </div>
    </div>
    <div class="buttons">
      <!-- <button >先手</button> -->
      <button @click="owner=1;AIGO()" :disabled="alreadyGo" >后手</button>
      <button @click="backOrGoStep(-1)">悔棋</button>
      <button @click="backOrGoStep(1)">撤销悔棋</button>
    </div>

  </div>
</template>

<script>
  var arr1 = [{"x":0,"y":0,"z":2,"isHover":false},{"x":0,"y":1,"z":2,"isHover":false},{"x":0,"y":2,"z":2,"isHover":false},{"x":0,"y":3,"z":1,"isHover":false},{"x":0,"y":4,"z":0,"isHover":false},{"x":0,"y":5,"z":0,"isHover":false},{"x":0,"y":6,"z":2,"isHover":false},{"x":0,"y":7,"z":2,"isHover":false},{"x":1,"y":0,"z":2,"isHover":false},{"x":1,"y":1,"z":2,"isHover":false},{"x":1,"y":2,"z":2,"isHover":false},{"x":1,"y":3,"z":2,"isHover":false},{"x":1,"y":4,"z":1,"isHover":false},{"x":1,"y":5,"z":1,"isHover":false},{"x":1,"y":6,"z":2,"isHover":false},{"x":1,"y":7,"z":2,"isHover":false},{"x":2,"y":0,"z":2,"isHover":false},{"x":2,"y":1,"z":1,"isHover":false},{"x":2,"y":2,"z":2,"isHover":false},{"x":2,"y":3,"z":1,"isHover":false},{"x":2,"y":4,"z":2,"isHover":false},{"x":2,"y":5,"z":2,"isHover":false},{"x":2,"y":6,"z":1,"isHover":false},{"x":2,"y":7,"z":2,"isHover":false},{"x":3,"y":0,"z":2,"isHover":false},{"x":3,"y":1,"z":2,"isHover":false},{"x":3,"y":2,"z":1,"isHover":false},{"x":3,"y":3,"z":2,"isHover":false},{"x":3,"y":4,"z":2,"isHover":false},{"x":3,"y":5,"z":1,"isHover":false},{"x":3,"y":6,"z":2,"isHover":false},{"x":3,"y":7,"z":2,"isHover":false},{"x":4,"y":0,"z":2,"isHover":false},{"x":4,"y":1,"z":2,"isHover":false},{"x":4,"y":2,"z":2,"isHover":false},{"x":4,"y":3,"z":2,"isHover":false},{"x":4,"y":4,"z":2,"isHover":false},{"x":4,"y":5,"z":2,"isHover":false},{"x":4,"y":6,"z":2,"isHover":false},{"x":4,"y":7,"z":2,"isHover":false},{"x":5,"y":0,"z":2,"isHover":false},{"x":5,"y":1,"z":2,"isHover":true},{"x":5,"y":2,"z":2,"isHover":false},{"x":5,"y":3,"z":2,"isHover":false},{"x":5,"y":4,"z":1,"isHover":false},{"x":5,"y":5,"z":1,"isHover":false},{"x":5,"y":6,"z":2,"isHover":false},{"x":5,"y":7,"z":2,"isHover":false},{"x":6,"y":0,"z":2,"isHover":false},{"x":6,"y":1,"z":2,"isHover":false},{"x":6,"y":2,"z":2,"isHover":false},{"x":6,"y":3,"z":2,"isHover":false},{"x":6,"y":4,"z":1,"isHover":false},{"x":6,"y":5,"z":1,"isHover":false},{"x":6,"y":6,"z":2,"isHover":false},{"x":6,"y":7,"z":2,"isHover":false},{"x":7,"y":0,"z":1,"isHover":false},{"x":7,"y":1,"z":2,"isHover":false},{"x":7,"y":2,"z":2,"isHover":false},{"x":7,"y":3,"z":2,"isHover":false},{"x":7,"y":4,"z":2,"isHover":false},{"x":7,"y":5,"z":2,"isHover":false},{"x":7,"y":6,"z":2,"isHover":false},{"x":7,"y":7,"z":2,"isHover":false}]
  var arr = [
          { x: 0, y: 0, z: 0, isHover: false },
          { x: 0, y: 1, z: 0, isHover: false },
          { x: 0, y: 2, z: 0, isHover: false },
          { x: 0, y: 3, z: 0, isHover: false },
          { x: 0, y: 4, z: 0, isHover: false },
          { x: 0, y: 5, z: 0, isHover: false },
          { x: 0, y: 6, z: 0, isHover: false },
          { x: 0, y: 7, z: 0, isHover: false },
          { x: 1, y: 0, z: 0, isHover: false },
          { x: 1, y: 1, z: 0, isHover: false },
          { x: 1, y: 2, z: 0, isHover: false },
          { x: 1, y: 3, z: 0, isHover: false },
          { x: 1, y: 4, z: 0, isHover: false },
          { x: 1, y: 5, z: 0, isHover: false },
          { x: 1, y: 6, z: 0, isHover: false },
          { x: 1, y: 7, z: 0, isHover: false },
          { x: 2, y: 0, z: 0, isHover: false },
          { x: 2, y: 1, z: 0, isHover: false },
          { x: 2, y: 2, z: 0, isHover: false },
          { x: 2, y: 3, z: 0, isHover: false },
          { x: 2, y: 4, z: 0, isHover: false },
          { x: 2, y: 5, z: 0, isHover: false },
          { x: 2, y: 6, z: 0, isHover: false },
          { x: 2, y: 7, z: 0, isHover: false },
          { x: 3, y: 0, z: 0, isHover: false },
          { x: 3, y: 1, z: 0, isHover: false },
          { x: 3, y: 2, z: 0, isHover: false },
          { x: 3, y: 3, z: 1, isHover: false },
          { x: 3, y: 4, z: 2, isHover: false },
          { x: 3, y: 5, z: 0, isHover: false },
          { x: 3, y: 6, z: 0, isHover: false },
          { x: 3, y: 7, z: 0, isHover: false },
          { x: 4, y: 0, z: 0, isHover: false },
          { x: 4, y: 1, z: 0, isHover: false },
          { x: 4, y: 2, z: 0, isHover: false },
          { x: 4, y: 3, z: 2, isHover: false },
          { x: 4, y: 4, z: 1, isHover: false },
          { x: 4, y: 5, z: 0, isHover: false },
          { x: 4, y: 6, z: 0, isHover: false },
          { x: 4, y: 7, z: 0, isHover: false },
          { x: 5, y: 0, z: 0, isHover: false },
          { x: 5, y: 1, z: 0, isHover: false },
          { x: 5, y: 2, z: 0, isHover: false },
          { x: 5, y: 3, z: 0, isHover: false },
          { x: 5, y: 4, z: 0, isHover: false },
          { x: 5, y: 5, z: 0, isHover: false },
          { x: 5, y: 6, z: 0, isHover: false },
          { x: 5, y: 7, z: 0, isHover: false },
          { x: 6, y: 0, z: 0, isHover: false },
          { x: 6, y: 1, z: 0, isHover: false },
          { x: 6, y: 2, z: 0, isHover: false },
          { x: 6, y: 3, z: 0, isHover: false },
          { x: 6, y: 4, z: 0, isHover: false },
          { x: 6, y: 5, z: 0, isHover: false },
          { x: 6, y: 6, z: 0, isHover: false },
          { x: 6, y: 7, z: 0, isHover: false },
          { x: 7, y: 0, z: 0, isHover: false },
          { x: 7, y: 1, z: 0, isHover: false },
          { x: 7, y: 2, z: 0, isHover: false },
          { x: 7, y: 3, z: 0, isHover: false },
          { x: 7, y: 4, z: 0, isHover: false },
          { x: 7, y: 5, z: 0, isHover: false },
          { x: 7, y: 6, z: 0, isHover: false },
          { x: 7, y: 7, z: 0, isHover: false }
        ];
  let initStepGrids = JSON.parse(JSON.stringify(arr));
  let stepArrs = [ JSON.parse(JSON.stringify(arr)) ];
  function checkPass(e){
    for(let i = 0; i < 8;i++){
      for(let j = 0; j < 8;j++){
        if(move(i,j,e,true)) {
          e.AICoordinate.x = i;
          e.AICoordinate.y = j;
          return false;
        }
      }
    }
    return true;
  }
  function go(m,n,global) {
      global.oppositeCanGo = false;
      global.alreadyGo = true;
      global.stepArrs.splice( global.step + 1 );
      global.stepArrs = JSON.parse(JSON.stringify(global.stepArrs));
      global.switchRecord.splice( global.step + 1 );
      if(move(m, n, global, false)){
        let grids = JSON.parse(JSON.stringify(global.grids));
        global.stepArrs.push(grids);
        global.step++;
        global.switch = 3 - global.switch;
        global.oppositeCanGo = true;
        if(checkPass(global)){
          global.switch = 3 - global.switch;
          global.oppositeCanGo = false;
          if(checkPass(global)){
            console.log("gameover");
            setTimeout(() => {
              resultAnnounce( 3 - global.grids );
            }, 100)
          }
        }
        global.switchRecord.push(global.switch);
      }

  }

  function move(m, n, e, isChecked) {
    if (e.grids[m * 8 + n].z > 0) return;
    e.checkedResult = false;

    let directions = [
      {x: -1,  y: -1},
      {x: -1,  y: 1},
      {x: -1,  y: 0},
      {x:  0,  y: -1},
      {x:  0,  y: 1},
      {x:  1,  y: -1},
      {x:  1,  y: 0},
      {x:  1,  y: 1},
    ];
    for(let direction of directions){
      let [x, y] = [m, n];
      e.canmove = false;
      while(true) {
        x += direction.x;
        y += direction.y;
        if(x < 0 || x >=8 || y < 0 || y >= 8){
          e.canmove = false;
          break;
        }
        if (e.grids[x * 8 + y].z == 3 - e.switch) {
          e.canmove = true;
        } else if (e.grids[x * 8 + y].z == e.switch) {
          break;
        } else if (e.grids[x * 8 + y].z == 0) {
          e.canmove = false;
          break;
        }
      }
      e.checkedResult = e.checkedResult || e.canmove;
      if (e.canmove && !isChecked) {
        while( true ) {
          x -= direction.x;
          y -= direction.y;
          e.grids[x * 8 + y].z = e.switch;
          if (x == m && y == n) {
            break;
          }
        }
      }
    }
    // if(e.checkedResult && !isChecked) e.switch = 3 - e.switch;
    return e.checkedResult;
  }
  // 比赛结束，宣布结果
  function resultAnnounce(grids){
    let m = 0,n = 0;
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        if(grids[i * 8 + j].z == 1) n++;
        if(grids[i * 8 + j].z == 2) m++;
      }

    }
    console.log("黑子：" + m);
    console.log("白子：" + n);
    if(m > n){
      alert('黑子胜,黑子：' + m + ',白子：' + n)
    }else{
      alert("白子胜,白子：" + n + ',黑子：' + m)
    }
  }

  export default {
    name: "Othello",
    props: {
      msg: String
    },
    data: function() {
      return {
        grids: arr,
        canmove: false,
        checkedResult: false,
        switch: 2,
        stepArrs: [initStepGrids],
        switchRecord: [2],
        step: 0,
        alreadyGo: false,
        AICoordinate: {x: 0,y: 0},
        oppositeCanGo: false,
        owner: 2
      };
    },
    methods: {
      mouseHover(m, n) {
        this.grids[m * 8 + n].isHover = false;
        if (move(m, n, this, true)) this.grids[m * 8 + n].isHover = true;
      },
      mouseClick(m, n) {
        if(!checkPass(this)){
          go(m,n,this);
          if( this.oppositeCanGo ){
            setTimeout(() => {
              this.AIGO();
            },500)
          }
        }else{
          this.switch = 3 - this.switch;
          this.AIGO();
        }

      },
      backOrGoStep(direction){
        while(true){
          this.step += direction;
          if(this.switchRecord[this.step] == this.owner){
            this.grids = this.stepArrs[this.step];
            this.switch = this.switchRecord[this.step];
            break;
          }
          // if(this.step == 0) this.alreadyGo = false;
          if(this.step < 0 || this.step > this.stepArrs.length - 1 ){
            this.step -= direction;
            this.step <= 1 ? alert('已经是最初的状态了') : alert('已经是最后的状态了');
            return;
          }
        }
      },
      AIGO() {
        if(!checkPass(this)){
          go(this.AICoordinate.x,this.AICoordinate.y,this,false);
          if(!this.oppositeCanGo) this.AIGO();
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    width: 266px;
    background: #fff;
    float: left;
  }
  .grid {
    width: 30px;
    height: 30px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    float: left;
    margin: 1px;
    background: darkgreen;
  }
  .circle {
    width: 26px;
    height: 26px;
    background: red;
    border-radius: 50%;
    margin: 2px;
  }
  .gridHover:hover {
    background: red;
  }
  .white {
    background: white;
  }
  .black {
    background: black;
  }
  button{
    float: left;
    margin: 10px;
    cursor: pointer;
    opacity: 1;
    color: #555353;
  }
  button:hover{
    /*opacity: .5;*/
    color: #000;
  }
  .buttons{
    width: 100px;
    float: left;
  }
</style>
