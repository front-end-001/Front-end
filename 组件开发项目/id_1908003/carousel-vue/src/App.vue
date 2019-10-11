<template>
  <div id="app">
    <carousel />
  </div>
</template>

<script>
import Carousel from './components/Carousel';

export default {
  name: 'app',
  components: {
    Carousel,
  },
};
</script>

<style type="scss">
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
}
</style>
