import TabView from './components/TabView.js';
import ScrollView from './components/ScrollView.js';
import TextView from './components/TextView.js';
import RecommendListView from './components/RecommendListView.js';
import InterestingListView from './components/InterestingListView.js';
import NewShopView from './components/NewShopView.js'

import CarouselView from './components/CarouselView.js';
import FavoriteView from './components/FavoriteView.js';
import Div from './components/Div.js';

// 测试是否只加载一次
// import RecommendItemView from './commpRecommendListView.js';

import {create} from './lib/create.js';


// 下拉加载更多
function loadMore() {
  setTimeout(() => {
    this.setAttribute('placeHolderText', '没有更多啦!');
  }, 2000);
}

window.render = function(data, root) {
  var c = (
    <Div style="width:100%;height:100%;overflow:hidden;">
      <Div style="height:21px;text-align:center;color:#fff;background:no-repeat center/contain url(./static/top-title.png);margin-top:53px;"></Div>
      <TabView style="width:100%;height:calc(100% - 74px);overflow:hidden;">
        <ScrollView
          tab-title="推荐"
          on-scrollToBottom={loadMore}
          placeHolderText="加载更多"
          style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px;"
        >
          <CarouselView
              data={data.carousels}
              style="width:350px;height:180px;margin:0 auto 23px;border-radius:10px;white-space:nowrap;overflow:hidden;">
          </CarouselView>
          <FavoriteView
            data={data.recommand.favorites}>
          </FavoriteView>
          <RecommendListView data={data.recommand.list}></RecommendListView>
        </ScrollView>
        <ScrollView
          tab-title="有趣的店"
          on-scrollToBottom={loadMore}
          style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px;"
        >
          <InterestingListView data={data.interesting.surprise}></InterestingListView>
        </ScrollView>
        <ScrollView
          tab-title="品牌新店"
          on-scrollToBottom={loadMore}
          style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px;"
        >
          <NewShopView data={data.newShop}></NewShopView>
        </ScrollView>
      </TabView>
    </Div>
  );

  c.appendTo(document.body);
}
