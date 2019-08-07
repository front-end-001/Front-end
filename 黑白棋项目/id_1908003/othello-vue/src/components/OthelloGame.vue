<template>
  <div>
    <h1>{{ msg }}</h1>
    <div @click="count++">{{ count }}</div>
  </div>
</template>

<script>
// import { deepClone } from '@/assets/js/utils.js';

export default {
  name: 'OthelloGame',
  data() {
    return {
      count: 0,
      msg: 'Othello Games',
    };
  },
};
</script>

<style scoped>

</style>
