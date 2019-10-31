import { Tab, ScrollView, Carousel, ListView, Title, Shop } from '../components/index';
import { createElement } from '../babel/babelTransformToJSX';
import { responseData } from '../res/data';
import { responseData as responseData3 } from '../res/data3';

function fansTrans(fans) {
  if (!fans) return '0';
  if (fans < 10000) {
    return fans.toString();
  }

  return `${(fans / 10000).toFixed(1)}万`;
}

function loadMore() {
  setTimeout(() => {
    this.placeHolderText = '没有更多啦 *_* ！';
  }, 1000);
}

const data1 = responseData;
const data3 = responseData3;

const imageUrls = responseData.focusData.map(value => value.image);

const App = (
  <Tab className="tab-root">
        <Tab.TabPane title={'推荐'}>
      <ScrollView
        placeHolderText={'加载更多'}
        on-scrollToBottom={loadMore}
        style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px"
      >
        <Carousel
          height={480}
          width={908}
          duration={3000}
          autoPlay={true}
          imageUrls={imageUrls}
          style="border-radius:20px;margin:0.2rem 0.333rem 0 0.333rem"
        ></Carousel>
        <Title level="3" style="margin:1em 1em">
          超多人收藏的店！
        </Title>
        <ListView
          direction="row"
          renderItem={shopConifg => {
            return (
              <Shop
                style={'width:calc(50vw - 11vw)'}
                titlePosition="out"
                titleDirection="row"
                titleLevel="5"
                showTianMaoIcon={true}
                config={shopConifg}
              ></Shop>
            );
          }}
          style="margin:0 2vw"
          data={responseData.mostFavourateShops}
        ></ListView>
        <ListView
          renderItem={shopConifg => {
            return (
              <Shop
                isRecommend={true}
                showTianMaoIcon={true}
                config={shopConifg}
                renderTips={fans => {
                  return (
                    <div class="shop_fans">
                      <img src="../imgs/dailyShops/mipmap-hdpi/icon 好店君.png"></img>
                      <span>
                        好店君：该店已被{fansTrans(fans)}
                        人关注，快来关注吧！
                      </span>
                    </div>
                  );
                }}
                renderEnterBtn={fans => {
                  return <div class="enterBtnYellow">进店 ></div>;
                }}
              ></Shop>
            );
          }}
          style="margin:0 2vw"
          showTianMaoIcon={true}
          data={responseData.recommendedShops}
        ></ListView>
      </ScrollView>
    </Tab.TabPane>
    <Tab.TabPane title={'品牌新店'}>
      <ScrollView
        placeHolderText={'加载更多'}
        on-scrollToBottom={loadMore}
        style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px"
      >
        <ListView
          renderItem={shopConifg => {
            return (
              <Shop
                titlePosition="out"
                titleDirection="col"
                titleLevel="4"
                showPromotion={true}
                config={shopConifg}
                renderFans={fans => {
                  return (
                    <div class="fansTag">
                      <img src="../imgs/dailyShops/mipmap-hdpi/品牌新店_07.png"></img>
                      <span style="margin-left:0.5em;">{`该店已被${fansTrans(fans)}人关注啦`}</span>
                    </div>
                  );
                }}
                renderEnterBtn={fans => {
                  return <div class="enterBtn">进店 ></div>;
                }}
                style="color:white"
              ></Shop>
            );
          }}
          itemStyle="gradientBgListItem"
          style="margin:0 2vw"
          data={data3.newShops}
        ></ListView>
      </ScrollView>
    </Tab.TabPane>

    <Tab.TabPane title={'有趣的店'}>2222</Tab.TabPane>
    <Tab.TabPane title={'发现'}>4444</Tab.TabPane>
  </Tab>
);
export default App;
