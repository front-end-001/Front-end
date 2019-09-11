import Tab from './TabComponent/Tab';
import TabItem from './TabComponent/TabItem';
import TabContent from './TabComponent/TabContent';

// react 也差不多做了相同的事情
function myCreate(MyClass, attributes, ...children) {
  let object = new MyClass();
  for (let name in attributes) {
    object.setAttribute(name, attributes[name]);
  }
  for (let child of children) {
    object.appendChild(child);
  }
  return object;
}

let root = (
  <Tab class="tab-container">
    <TabItem class="tab-item" tab-title="推荐" style="background-color: lightblue;">
      <TabContent class="tab-content"></TabContent>
    </TabItem>
    <TabItem class="tab-item" tab-title="有趣的店" style="background-color: red;"></TabItem>
    <TabItem class="tab-item" tab-title="品牌新店" style="background-color: yellow;"></TabItem>
    <TabItem class="tab-item" tab-title="发现" style="background-color: purple;"></TabItem>
  </Tab>
);

root.appendTo(document.body);
