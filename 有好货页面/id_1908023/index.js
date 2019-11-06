// import './TabComponent/style.less';

import TabView from './TabComponent/TabView';
import ScrollView from './TabComponent/ScrollView';
// import TabContent from './TabComponent/TabContent';
// import Text from './Components/Text';
import ListView from './TabComponent/ListView';

import {create} from './create';

// react 也差不多做了相同的事情
// function myCreate(Component, attributes, ...children) {
//   let cmp = new Component();
//   for (let name in attributes) {
//     if (name.match(/^on-([\s\S]+)$/)) {
//       cmp.addEventListener(RegExp.$1, attributes[name]);
//     } else {
//       cmp.setAttribute(name, attributes[name]);
//     }
//   }
//   for (let child of children) {
//     if (typeof child === 'string') {
//       cmp.appendChild(new Text(child));
//     } else {
//       cmp.appendChild(child);
//     }
//   }
//   return cmp;
// }

function loadMore() {
  setTimeout(() => {
    this.setAttribute('placeHolderText', '没有更多！')
  }, 5000);
}

window.render = function (data, root) {
  let c = (
    <TabView style="width:100%;height:100%;">
      <ScrollView tab-title="推荐" placeHolderText="load more" on-scrollToButtom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
        <ListView data={data}></ListView>
      </ScrollView>
      <ScrollView class="tab-item" tab-title="有趣的店" style="background-color: red;font-size:50px">
      有趣的店页面
      </ScrollView>
      <ScrollView class="tab-item" tab-title="品牌新店" style="background-color: yellow;font-size:50px">
      品牌新店页面
      </ScrollView>
      <ScrollView class="tab-item" tab-title="发现" style="background-color: purple;font-size:50px">
      发现页面
      </ScrollView>
    </TabView>
  );
  // c = <ListView></ListView>
  c.appendTo(document.body);
}



