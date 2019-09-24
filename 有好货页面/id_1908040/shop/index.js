import TabView from './components/TabView.js';
import ScrollView from './components/ScrollView.js';
import TextView from './components/TextView.js';
import CarouselView from './components/CarouselView.js'

// jsx的实现原理
function create(Class, attributes, ...children) {
  let object = new Class();
  for (let name in attributes) {
    if (name.match(/^on-([\s\S]+)$/)) {
      console.log('scrollToBottom', RegExp.$1);
      object.addEventListener(RegExp.$1, attributes[name]);
    } else {
      // attribute
      object.setAttribute(name, attributes[name]);
    }
  }
  for (let child of children) {
    if (typeof child === 'string') {
      object.appendChild(new TextView(child));
    } else {
      object.appendChild(child);
    }
  }
  return object;
}

// 下拉加载更多
function loadMore() {
  console.log(111);
  console.log('load more');
  setTimeout(() => {
    this.setAttribute('placeHolderText', '没有更多啦!');
  }, 2000);
}

let imageUrls = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
  ];

let c = (
  <TabView style="width:100%;height:100%;">
    <ScrollView
      tab-title="推荐"
      on-scrollToBottom={loadMore}
      placeHolderText="加载更多"
      style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:lightblue;font-size:50px;"
    >
        <CarouselView
            data={imageUrls}
            style="width:350px;height:180px;white-space:nowrap;overflow:hidden;">
       </CarouselView> 
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
        推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐
    </ScrollView>
    <ScrollView
      tab-title="有趣的店"
      on-scrollToBottom={loadMore}
      style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:lightgreen;font-size:50px;"
    >
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
        有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店有趣的店
    </ScrollView>
    <ScrollView
      tab-title="品牌新店"
      on-scrollToBottom={loadMore}
      style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:red;font-size:50px;"
    >
        品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店
        品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店
        品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店
        品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店
        品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店
        品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店品牌新店

    </ScrollView>
  </TabView>
);

c.appendTo(document.body);
