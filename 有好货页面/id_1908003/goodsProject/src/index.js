import 'normalize.css';
import './assets/style.scss';

// 组件体系必备
import createComponent from './components/createComponent';
import Tab from './components/TabView';
import TabItem from './components/TabItem';

import tab1 from './tab1';
import tab2 from './tab2';
import tab3 from './tab3';

const initCatch = {
  commend: {
    init: false,
    ele: tab1,
  },
  funny: {
    init: false,
    ele: tab2,
  },
  brand: {
    init: false,
    ele: tab3,
  },
};

const tabChange = e => {
  if (initCatch[e].init) {
    return;
  }
  initCatch[e].ele.fetchData().then(() => {
    initCatch[e].init = true;
  });
};  

const app = document.getElementById('app');
const tab = (
  <Tab on-tabchange={tabChange}>
    <TabItem tab-title="推荐" tab-name="commend">
      {tab1.$el}
    </TabItem>
    <TabItem tab-title="有趣的店" tab-name="funny">
      {tab2.$el}
    </TabItem>
    <TabItem tab-title="品牌新店" tab-name="brand">
      {tab3.$el}
    </TabItem>
  </Tab>
);

initCatch.commend.ele.fetchData().then(() => {
  initCatch.commend.init = true;
});

tab.appendTo(app);
