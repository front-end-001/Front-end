<template>
  <div class="clsRecommendItem">
    <div class="itemContainer" v-for="(item,o) in recommendShops" v-bind:key="o">
      <div class="itemHeaderContainer" >
        <div class="left">
          <div class="itemLogo">
            <img :src=item.icon width="52" height="52" class="icon" />
          </div>
          <div class="itemTitle">
            <div class="itemName">{{item.name}}</div>
            <div style="margin-top:8px;"><span class="itemType">天猫</span></div>
          </div>
        </div>
        <div class="itemEntry">
          <span class="entryName">进店</span>
          <img src='../../assets/icons/arrow_right.svg' width="14" height="28" class="arrow_right" />
        </div>
      </div>
      <div class="titleContainer">
        <div class="shop"><img src="../../assets/icons/shop.svg" width="14" height="14" /></div>
        <div class="itemPromotion">好店君：该店已被1.3万人关注，快来关注吧!</div>
      </div>
      <div class="itemContent">
        <div class="left">
          <!-- {{item.items}} -->
          <img class="rounded" :src=item.items[0].image width="100%" height="100%" />
        </div>
        <div class="right">
          <img class="rounded rightTop" :src=item.items[1].image  width="100%" height="48%" />
          <img class="rounded" :src=item.items[2].image  width="100%" height="48%" />
        </div>
      </div>
      <div class="itemFooter">
        <span class="footerName">相似好店</span>
        <img src="../../assets/icons/arrow_right_gray.svg" width="14" height="26" />
      </div>
    </div>
    <div class="divider">
    </div>
  </div>
</template>
<script>
export default {
  name: 'recommendItem',
  data () {
    return {
      recommendShops: [
        {
          name: '极客时间旗舰店',
          promotion: '科技风 行业优质',
          fans: '20241111',
          icon: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/shop_logo3.jpg',
          level: '5',
          url: 'https://time.geekbang.org/column/intro/100023201',
          items: [
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/big1.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/5.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/6.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            }
          ]
        },
        {
          name: '极客大学旗舰店',
          promotion: '科技风 行业优质',
          fans: '20241111',
          icon: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/shop_logo4.jpg',
          level: '5',
          url: 'https://time.geekbang.org/column/intro/100023201',
          items: [
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/big2.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/7.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/8.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            }
          ]
        },
        {
          name: 'infoQ官方旗舰店',
          promotion: '科技风 行业优质',
          fans: '20241111',
          icon: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/shop_logo5.jpg',
          level: '5',
          url: 'https://time.geekbang.org/column/intro/100023201',
          items: [
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/big3.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/9.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            },
            {
              image: 'https://static001.geekbang.org/univer/classes/js_dev/static/recommendation/10.jpg',
              url: 'https://time.geekbang.org/column/intro/100023201'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
  @import 'recommendItem.scss';

  .divider {
      background: rgba(238, 238, 238, 1.00);
      width: 100%;
      height: 16px;
  }
</style>
