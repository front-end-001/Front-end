<template>
  <Board :cells="board" :cellClick="cellClick"></Board>
</template>

<script>
import Board from "./Board";
export default {
  components: {
    Board
  },
  data() {
    return {
      board: [
        /* eslint-disable prettier/prettier */
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 1, 0, 0, 0,
            0, 0, 0, 1, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
            ]
        };
    },
    methods:{
        cellClick(i){
            console.log('cellClick',i);
        }
    }
}
</script>

<style>

</style>
