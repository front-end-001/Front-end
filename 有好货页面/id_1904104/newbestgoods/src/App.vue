<template>
  <div id="app">
    <el-menu :default-active="activeIndex" :router="true" :unique-opened="true" mode="horizontal" class="el-menu-demo">
        <el-menu-item index="_1" route="/recommend">
            推荐
        </el-menu-item>
        <el-menu-item index="2" route="/fun">
            有趣的店
        </el-menu-item>
        <el-menu-item index="3" route="/newstore">
            品牌新店
        </el-menu-item>
        <el-menu-item index="4" route="/found">
            发现
        </el-menu-item>
    </el-menu>

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '_1'
    }
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
  margin-top: 0px;
}
body {
  background-color: #eee;
}
</style>
