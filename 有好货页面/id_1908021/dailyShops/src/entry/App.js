import { Tab, ScrollView, Carousel } from '../components/index';
import createElement from '../babel/babelTransformToJSX';

const carouselConfig = {};

function loadMore() {
  setTimeout(() => {
    this.setAttribute('placeHolderText', '没有更多啦 *_* ！');
  }, 1000);
}

const App = (
  <Tab className="tab-root">
    <Tab.TabPane title={'推荐'}>
      <ScrollView
        placeHolderText={'加载更多'}
        on-scrollToBottom={loadMore}
        style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px"
      >
        <Carousel
          height={300}
          width={200}
          duration={1000}
          autoPlay={true}
          style="background-color:red"
        ></Carousel>
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq

      </ScrollView>
    </Tab.TabPane>
    <Tab.TabPane title={'有趣的店'}>2222</Tab.TabPane>
    <Tab.TabPane title={'品牌新店'}>3333</Tab.TabPane>
    <Tab.TabPane title={'发现'}>4444</Tab.TabPane>
  </Tab>
);
export default App;
