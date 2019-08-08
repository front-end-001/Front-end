<template>
  <div class="othello-container">
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
      <button @click="moveBack">回退</button>
      <button @click="reStart">重新开始</button>
    </div>
  </div>
</template>

<script>
import OthelloGame from '../model/OthelloGame';

export default {
  name: 'OthelloGame',
  data() {
    return {
      mapData: [],
      tooltip: '',
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
      this.tooltip = this.gameInstance.getTip();
    },
    moveBack() {
      this.gameInstance.moveBack();
      this.update();
    },
    reStart() {
      this.gameInstance.reStart();
      this.update();
    },
  },
};
</script>

<style lang="scss" scoped>
.othello {
  &-container {
    font-size: 0;
    padding: 20px;
  }

  &-tooltip {
    font-size: 14px;
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
