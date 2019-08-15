<template functional>
  <div class="board">
    <div
      v-for="(type, i) of props.cells"
      :key="i"
      class="cell"
      :class="{ 1: 'cell-black', 2: 'cell-white' }[type]"
      @click="props.cellClick && props.cellClick(i)"
    ></div>
  </div>
</template>
<style scoped>
.board {
  width: 400px;
  height: 400px;
  margin: 20px auto;
}
.cell {
  float: left;
  height: 50px;
  width: 50px;
  background-color: darkgreen;
  position: relative;
  box-sizing: border-box;
  border: 1px solid white;
}
.cell-black::after,
.cell-white::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  height: 70%;
  margin: auto;
  border-radius: 50%;
  background: white;
  box-shadow: white 0 0 3px;
}
.cell-black::after {
  background-color: black;
  box-shadow: black 0 0 3px;
}
</style>
