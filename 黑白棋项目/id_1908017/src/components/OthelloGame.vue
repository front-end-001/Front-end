<template>
  <div>
    <Board :cells="animateBoard" :cellClick="cellClick"></Board>
    <p>比分 黑:{{ blackCount }},白:{{ whiteCount }}</p>
    <p>
      第{{ this.turns.length }}轮
      <span>{{ this.turns.length % 2 ? "黑" : "白" }}</span>
      <span v-show="curTurn.isPass">pass</span>
    </p>
    <p v-if="curTurn.isGameEnd">游戏结束</p>
    <p>
      <button @click="regret">悔棋</button>
    </p>
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
      diff: null,
      turns: [
        new OthelloTurn(
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
            /* eslint-enable prettier/prettier */
          ],
          1,
          false
        )
      ]
    };
  },
  computed: {
    curTurn() {
      return this.turns[this.turns.length - 1];
    },
    animateBoard() {
      let { board, color } = this.curTurn;
      const diff = this.diff;
      if (!diff) return board;
      board = board.slice();

      for (const pos of diff) {
        board[pos] = color;
      }
      return board;
    },
    blackCount() {
      return this.curTurn.board.filter(c => c === 1).length;
    },
    whiteCount() {
      return this.curTurn.board.filter(c => c === 2).length;
    }
  },
  watch: {
    ["curTurn"]: {
      immediate: true,
      handler(curTurn) {
        if (curTurn.isPass) {
          console.log("pass turn ", this.turns.length);
          setTimeout(
            () => this.turns.push(OthelloTurn.createFromMove(curTurn.moves[0])),
            3000
          );
        }
      }
    }
  },
  methods: {
    cellClick(i) {
      if (this.diff) return; //正在动画,不响应点击
      const move = this.curTurn.moves.find(({ pos }) => pos === i);
      if (move) {
        if (move.diff) {
          //落子吃子过程
          const [pos, eats] = move.diff;
          const vm = this;
          const diff = (vm.diff = [pos]); /**注意 diff 是否还响应式 */
          let i = 0;
          setTimeout(eatNext, 200);
          // eslint-disable-next-line no-inner-declarations
          function eatNext() {
            let hasAEat = false;
            for (const _eat of eats) {
              if (i in _eat) {
                diff.push(_eat[i]);
                hasAEat = true;
              }
            }
            if (hasAEat) {
              i++;
              setTimeout(eatNext, 200);
            } else {
              vm.diff = null;
              vm.turns.push(OthelloTurn.createFromMove(move));
            }
          }
        } else {
          //瞬间完成
          this.turns.push(OthelloTurn.createFromMove(move));
        }
      }
    },
    regret() {
      if (this.turns.length > 1) {
        this.turns.pop();
      }
    }
  }
};
</script>
