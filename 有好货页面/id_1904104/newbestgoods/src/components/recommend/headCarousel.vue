<template>
  <div>
    <el-carousel  width="343px" height="167px">
      <el-carousel-item v-for="(item,o) in focusData" :key="o" :value="item">
        <img :src="item.image" width="100%" height="100%">
        <h3 class="small">{{ item.url }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import {getCarouselList} from './api'
export default {
  name: 'headCarousel',
  components: {
  },
  data () {
    return {
      focusData: [
        {
          image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner1.jpg',
          url: 'https://time.geekbang.org/column/intro/100023201'
        },
        {
          image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner2.jpg',
          url: 'https://time.geekbang.org/column/intro/100023201'
        },
        {
          image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/banner3.jpg',
          url: 'https://time.geekbang.org/column/intro/100023201'
        }
      ]
    }
  },
  created () {
    // this.loadData()
  },
  methods: {
    loadData () {
      getCarouselList().then(res => {
        console.log('res:' + res)
      })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
