<template>
  <div class="othello-container">
    <div class="othello-container-board">
      <template v-for="(item, row) in mapData">
        <div
          v-for="(subItem, colum) in item"
          :key="`cell-${row}-${colum}`"
          class="othello-container-cell"
          :class="getClassName(subItem)"
          @click="move(row, colum)" />
        <br :key="`breakline-${row}`">
      </template>
    </div>
  </div>
</template>

<script>
// import { deepClone } from '@/assets/js/utils.js';
import OthelloGame from '../model/OthelloGame';

export default {
  name: 'OthelloGame',
  data() {
    return {
      mapData: [],
    };
  },
  created() {
    this.gameInstance = new OthelloGame();
    this.update();
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
    move(x, y) {
      const result = this.gameInstance.move(x, y);
      if (typeof result === 'string') {
        alert(result);
        return;
      }
      this.update();
    },
    update() {
      this.mapData = this.gameInstance.getMap();
    },
  },
};
</script>

<style lang="scss" scoped>
.othello-container {
  font-size: 0;
  margin-top: 30px;

  &-tooltip {
    text-align: center;
    margin-top: 16px;
  }

  &-control {
    text-align: center;
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
