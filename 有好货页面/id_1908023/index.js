import './TabComponent/style.less';

import Tab from './TabComponent/Tab';
import TabItem from './TabComponent/TabItem';
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
  <Tab class='tab-container'>
    <TabItem class="tab-item" tab-title="推荐" style="background-color: lightblue;white-space: wrap;">
      <TabContent class="tab-content">
        <Text>推荐</Text>
      </TabContent>
    </TabItem>
    <TabItem class="tab-item" tab-title="有趣的店" style="background-color: red;">
      <TabContent class="tab-content">
      <Text>有趣的店</Text>
      </TabContent>
    </TabItem>
    <TabItem class="tab-item" tab-title="品牌新店" style="background-color: yellow;">
      <TabContent class="tab-content">
      <Text>品牌新店</Text>
      </TabContent>
    </TabItem>
    <TabItem class="tab-item" tab-title="发现" style="background-color: purple;">
      <TabContent class="tab-content">
      <Text>发现</Text>
      </TabContent>
    </TabItem>
  </Tab>
);

root.appendTo(document.body);
