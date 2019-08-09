<template>
  <div class="othello-container">
    <template v-if="!gameInstance">
      <div style="font-size: 14px;">请选择一个角色开始...</div>
      <div style="margin-top: 10px;">
        <button @click="chooseRole(1)">黑棋</button>
        <button @click="chooseRole(2)">白棋</button>
      </div>
    </template>
    <template v-else>
      <div class="othello-board">
        <template v-for="(item, row) in mapData">
          <div
            v-for="(subItem, colum) in item"
            :key="`cell-${row}-${colum}`"
            class="othello-cell"
            :class="getClassName(subItem)"
            @click="move(row, colum)" />
          <br :key="`breakline-${row}`">
        </template>
      </div>
      <div class="othello-tooltip">
        {{ tooltip }}
      </div>
      <div class="othello-control">
        <button @click="reStart" @disabled="block">重新开始</button>
        <button @click="moveBack" @disabled="block">悔棋</button>
      </div>
    </template>
  </div>
</template>

<script>
import OthelloGame from '../model/OthelloGame';

export default {
  name: 'OthelloGame',
  data() {
    return {
      gameInstance: null,
      mapData: [],
      tooltip: '',
      /** 当前是否被锁定, true-不可操作, false-非锁定, 可操作 */
      block: false,
    };
  },
  created() {
    // this.gameInstance = new OthelloGame();
    // this.update();
  },
  methods: {
    getClassName(val) {
      const nameMap = {
        '-1': 'boundary',
        '1': 'black',
        '2': 'white',
      };
      return nameMap[val] || '';
    },
    /**
     * 走棋
     * @param {number} x 行
     * @param {number} y 列
     */
    move(x, y) {
      if (this.block) {
        alert('当前不可操作, 请稍等...');
        return;
      }

      const result = this.gameInstance.move(x, y);
      if (typeof result === 'string') {
        alert(result);
        return;
      }
    },
    /**
     * 更新渲染
     */
    update(game) {
      this.mapData = game.getMap();
      this.tooltip = game.getTip();
      this.block = game.isBlock();
    },
    /**
     * 悔棋
     */
    moveBack() {
      this.gameInstance.moveBack();
    },
    /**
     * 重新开局
     */
    reStart() {
      // this.gameInstance.reStart();
      this.gameInstance = null;
    },
    /**
     * 玩具选择角色, 黑棋/白棋
     */
    chooseRole(roleVal) {
      this.gameInstance = new OthelloGame(roleVal, this.update);
      this.update(this.gameInstance);
    },
  },
};
</script>

<style lang="scss" scoped>
.othello {
  &-container {
    font-size: 0;
    padding: 20px;
    text-align: center;
  }

  &-tooltip {
    font-size: 14px;
    margin-top: 16px;
  }

  &-control {
    margin-top: 16px;
  }

  &-board {
    text-align: center;
  }

  &-cell {
    width: 30px;
    height: 30px;
    background-color: #ccc;
    display: inline-block;
    margin: 1px;
  }

  &-cell::after {
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin: 2px;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
  }

  &-cell.white::after {
    content: ' ';
    background-color: white;
  }

  &-cell.black::after {
    content: ' ';
    background-color: black;
  }
}

.show-boundary .chess .boundary {
  background-color: aquamarine;
}
</style>
