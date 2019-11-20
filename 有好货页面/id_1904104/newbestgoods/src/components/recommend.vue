<template>
  <div class="recommendContainer">
      <headCarousel>
      </headCarousel>
      <recommendCollect>
      </recommendCollect>
      <recommendItem>
      </recommendItem>
  </div>
</template>

<script>
import headCarousel from './recommend/headCarousel'
import recommendCollect from './recommend/recommendCollect'
import recommendItem from './recommend/recommendItem'
export default {
  name: 'recommend',
  components: {
    headCarousel,
    recommendCollect,
    recommendItem
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.recommendContainer {
  background-color:#eee;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
