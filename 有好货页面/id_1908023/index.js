import './TabComponent/style.less';

import TabView from './TabComponent/TabView';
import ScrollView from './TabComponent/ScrollView';
import TabContent from './TabComponent/TabContent';
import Text from './Components/Text';

// react 也差不多做了相同的事情
function myCreate(Component, attributes, ...children) {
  let cmp = new Component();
  for (let name in attributes) {
    cmp.setAttribute(name, attributes[name]);
  }
  for (let child of children) {
    if (typeof child === 'string') {
      cmp.appendChild(new Text(child));
    } else {
      cmp.appendChild(child);
    }
  }
  return cmp;
}

let root = (
  <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
    推荐
    </ScrollView>
    <ScrollView class="tab-item" tab-title="有趣的店" style="background-color: red;">
    有趣的店
    </ScrollView>
    <ScrollView class="tab-item" tab-title="品牌新店" style="background-color: yellow;">
    品牌新店
    </ScrollView>
    <ScrollView class="tab-item" tab-title="发现" style="background-color: purple;">
    发现
    </ScrollView>
  </TabView>
);

root.appendTo(document.body);
