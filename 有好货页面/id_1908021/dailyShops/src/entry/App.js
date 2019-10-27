import { Tab, ScrollView, Carousel, ListView, Title, Shop } from '../components/index';
import { createElement } from '../babel/babelTransformToJSX';
import { responseData } from '../data';

function loadMore() {
  setTimeout(() => {
    this.placeHolderText = '没有更多啦 *_* ！';
  }, 1000);
}

const data = responseData;

const imageUrls = responseData.focusData.map(value => value.image);

const App = (
  <Tab className="tab-root">
    <Tab.TabPane title={'推荐'}>
      <ScrollView
        placeHolderText={'加载更多'}
        on-scrollToBottom={loadMore}
        style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px"
      >
        {
          //Carousel 不写width属性会导致动画失效。因为动画原理是translateX
        }
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
            return <Shop style={'width:calc(50vw - 11vw)'} config={shopConifg}></Shop>;
          }}
          style="margin:0 2vw"
          data={responseData.mostFavourateShops}
        ></ListView>
        <ListView
          renderItem={shopConifg => {
            return <Shop isRecommend={true} config={shopConifg}></Shop>;
          }}
          style="margin:0 2vw"
          data={responseData.recommendedShops}
        ></ListView>
      </ScrollView>
    </Tab.TabPane>
    <Tab.TabPane title={'有趣的店'}>2222</Tab.TabPane>
    <Tab.TabPane title={'品牌新店'}>3333</Tab.TabPane>
    <Tab.TabPane title={'发现'}>4444</Tab.TabPane>
  </Tab>
);
export default App;
