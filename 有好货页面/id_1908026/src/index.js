import { h, Component } from './base';
import 'normalize.css';

import { Tab } from './components';
import './index.scss';
import RecommendView from './pages/recommend';
import FunShopView from './pages/fun-shop';
import NewShopView from './pages/new-shop';
import FindView from './pages/find';

const app = (
  <div className="good-shop">
    <img
      src="http://gw.alicdn.com/tfs/TB1v2koHq6qK1RjSZFmXXX0PFXa-1500-416.png_790x10000.jpg_.webp"
      style="width: 100%;height: 45px;position: fixed;top: 0px;left: 0px;z-index: 9998"
      alt="tab背景"
    />
    <Tab>
      <RecommendView title="推荐" />
      <FunShopView title="有趣的店" />
      <NewShopView title="品牌新店" />
      {/*<FindView title="发现" />*/}
    </Tab>
  </div>
);

console.log(app);

window.render = (c, parentNode) => {
  c.appendTo(parentNode);
};
window.render(app, document.body);
