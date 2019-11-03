import { Tab, ScrollView, Carousel, ListView, Title } from '../components/index';
import { createElement } from '../babel/babelTransformToJSX';

const imageUrls = [
  '../imgs/carousel1.jpg',
  '../imgs/carousel2.jpg',
  '../imgs/carousel3.jpg',
  '../imgs/carousel4.jpg'
];

function loadMore() {
  setTimeout(() => {
    this.placeHolderText = '没有更多啦 *_* ！';
  }, 1000);
}

const data2 = [
  {
    title: '酒鬼一家0',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗0'
  },
  {
    title: '酒鬼一家1',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗1'
  },
  {
    title: '酒鬼一家2',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗2'
  },
  {
    title: '酒鬼一家3',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗3'
  },
  {
    title: '酒鬼一家4',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗4'
  },
  {
    title: '酒鬼一家5',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗5'
  },
  {
    title: '酒鬼一家6',
    icon: '../imgs/dailyShops/mipmap-hdpi/icon 极客时间.png',
    content: '老碳头和他的猫猫狗狗6'
  }
];

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
        <Title level="3" style="margin:1em 0">
          超多人收藏的店！
        </Title>

        <ListView
          // renderItem={item => {
          //   return <div>{item.title}</div>;
          // }}
          style="margin:0 4vw"
          data={data2}
        ></ListView>
      </ScrollView>
    </Tab.TabPane>
    <Tab.TabPane title={'有趣的店'}>2222</Tab.TabPane>
    <Tab.TabPane title={'品牌新店'}>3333</Tab.TabPane>
    <Tab.TabPane title={'发现'}>4444</Tab.TabPane>
  </Tab>
);
export default App;
