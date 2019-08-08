<template>
  <div id="app">
    <othello-game />
  </div>
</template>

<script>
import OthelloGame from './components/OthelloGame.vue'

export default {
  name: 'app',
  components: {
    OthelloGame
  }
}
</script>

<style type="scss">
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
}
</style>
