import Tab from './component/tab';
import TabItem from './component/tab-item';

function h(Class, attributes, ...children){
  let object = new Class();
  object.root = document.createElement('div');
  for(let name in attributes) {
    object.property.name = attributes[name];
    if (name === 'style') {
      object.root.setAttribute('style', attributes[name]);
    }
    if (name === 'className') {
      object.root.className = attributes[name];
    }
  }

  for (let child of children ) {
    object.appendChild(child);
  }
  return object;
}

let c = <Tab className={'tab'}>
  <TabItem title="推荐" className={'tab-item active'}>推荐</TabItem>
  <TabItem className={'tab-item'} style={''}>有趣的店</TabItem>
  <TabItem className={'tab-item'}>品牌新店</TabItem>
</Tab>;

c.appendTo(document.body);
