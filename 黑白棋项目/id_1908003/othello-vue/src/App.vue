<template>
  <div id="app">
    <othello-game msg="Welcome to Your Vue.js App"/>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
