<template>
  <div>
    <Board :cells="curTurn.board" :cellClick="cellClick"></Board>
    <p>比分 黑:{{ blackCount }},白:{{ whiteCount }}</p>
    <p>
      第{{ this.turns.length }}轮
      <span>{{ this.turns.length % 2 ? "黑" : "白" }}</span>
      <span v-show="curTurn.isPass">pass</span>
    </p>
    <p v-if="curTurn.isGameEnd">游戏结束</p>
    <p><button @click="regret">悔棋</button></p>
  </div>
</template>

<script>
import Board from "./Board";
import OthelloTurn from "../model/OthelloTurn";
export default {
  components: {
    Board
  },
  data() {
    return {
      turns: [
        new OthelloTurn(
          //   [
          //     /* eslint-disable prettier/prettier */
          //   ],
          [
            /* eslint-disable prettier/prettier */

              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 2, 1, 0, 0, 0,
              0, 0, 0, 1, 2, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0

            //   0, 0, 0, 0, 0, 0, 0, 1,
            //   0, 0, 0, 0, 0, 0, 1, 0,
            //   0, 0, 0, 0, 2, 1, 2, 0, 
            //   0, 0, 0, 2, 1, 2, 2, 2, 
            //   0, 0, 0, 1, 2, 1, 2, 2, 
            //   0, 0, 1, 2, 2, 2, 2, 2, 
            //   2, 1, 1, 1, 1, 1, 1, 2, 
            //   0, 2, 2, 2, 2, 2, 2, 2,

            //测试pass
              // 0, 0, 0, 0, 0, 0, 0, 0,
              // 0, 0, 0, 0, 0, 0, 0, 0,
              // 0, 0, 0, 0, 0, 0, 0, 0,
              // 0, 0, 0, 0, 0, 0, 0, 0,
              // 0, 0, 0, 0, 0, 0, 0, 0,
              // 0, 0, 0, 0, 0, 0, 0, 0,
              // 0, 0, 0, 0, 0, 0, 0, 1,
              // 0, 0, 0, 0, 0, 0, 1, 2
            ],
          1, false)
        ] };
    },
    computed:{
        curTurn(){
            return this.turns[this.turns.length-1];
        },
        blackCount(){
            return this.curTurn.board.filter(c=>c===1).length;
        },
        whiteCount(){
            return this.curTurn.board.filter(c=>c===2).length;
        }
    },
    watch:{
        ['curTurn']:{
            immediate:true,
         handler(curTurn){
            if(curTurn.isPass){
                console.log('pass turn ',this.turns.length);
                setTimeout(()=>this.turns.push( OthelloTurn.createFromMove(curTurn.moves[0])),3000);
            }
        }
        }
    },
    methods:{
        cellClick(i){
            const move = this.curTurn.moves.find(({pos})=>pos===i);
            if(move){
                this.turns.push( OthelloTurn.createFromMove(move));
            }
        },
        regret(){
          if(this.turns.length>1){
            this.turns.pop();
          }
        }

    }
}
</script>
 
