<template>
  <div class="favSection">
    <div class="favTitle">超多人收藏的店</div>
    <div class="favContainer">
      <div class="favItem" v-for="(item,o) in collectList" :key="o" :value="item" >
         <div class="favItemHeader">
            <div class="favItemLogo">
              <img :src=item.icon width="26" height="26" class="icon" />
            </div>
            <div class="itemTitle">
              <div class="itemName">{{item.name}}</div>
              <div style="margin-top:4px;"><span class="itemType">天猫</span></div>
            </div>
          </div>
          <div class="favContent">
            <img :src=item.items[0].image width="66" height="66" class="rounded" />
            <img :src=item.items[1].image width="66" height="66" class="rounded" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commendCollect',
  data () {
    return {
      collectList: [
        {
          name: '极客时间旗舰店',
          promotion: '科技风 行业优质',
          fans: '20241111',
          icon: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/shop_logo1.jpg',
          level: '5',
          url: 'https://time.geekbang.org/column/intro/100023201',
          items: [
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/1.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/2.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            }
          ]
        },
        {
          name: '乔丹旗舰店',
          promotion: '科技风 行业优质',
          fans: '20241111',
          icon: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/shop_logo2.jpg',
          level: '5',
          url: 'https://time.geekbang.org/column/intro/100023201',
          items: [
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/3.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/4.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
@import 'FavoriteItem.scss';
</style>
