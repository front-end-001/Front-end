import { h, Component } from './base';
import ListView from './components/list-view';
import ListItem from './components/list-item';

import './index.scss';
const app = (
  <div class="listview">
    <header></header>
    <p>这是标题</p>

    <ListView data={[9999, 88888]}>
      <ListItem>列表外的插槽</ListItem>
      <ListItem>列表外的插槽</ListItem>
      <p>测试一下插槽</p>
      <img src="http://pic44.nipic.com/20140723/18505720_094503373000_2.jpg" alt="" />
      <ListItem>列表外的插槽</ListItem>
    </ListView>
  </div>
);

console.log(app);

window.render = (c, parentNode) => {
  c.appendTo(parentNode);
};
window.render(app, document.body);
