import { Tab, ScrollView, Carousel } from '../components/index';
import createElement from '../babel/babelTransformToJSX';

const imageUrls = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
];

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
        style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:white;white-space:normal;font-size:50px"
      >
        <Carousel
          height={480}
          width={800}
          duration={3000}
          autoPlay={true}
          imageUrls={imageUrls}
          style="border-radius:20px;margin-top:20px"
        ></Carousel>
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
        qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqq
      </ScrollView>
    </Tab.TabPane>
    <Tab.TabPane title={'有趣的店'}>2222</Tab.TabPane>
    <Tab.TabPane title={'品牌新店'}>3333</Tab.TabPane>
    <Tab.TabPane title={'发现'}>4444</Tab.TabPane>
  </Tab>
);
export default App;
