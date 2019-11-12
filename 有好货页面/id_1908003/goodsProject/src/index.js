// import 'normalize.css';
import './assets/style.scss';
// import './views/test';

// 组件体系必备
import createComponent from './components/createComponent';
import Tab from './components/TabView';
import TabItem from './components/TabItem';
import ScrollView from './components/ScrollView';
import ListView from './components/ListView';

fetch('/static/data/commendTab.json').then(res => res.json()).then((data) => {
  const indexHtml = (<Tab>
    <TabItem tab-title="推荐" tab-name="commend">
      <ScrollView>
        <div data-list="轮播图数据">轮播图</div>
        <div data-list="轮播图数据">双图推荐</div>
        <ListView list-data="123">
          我是 推荐<br />
        </ListView>
      </ScrollView>
    </TabItem>
    <TabItem tab-title="有趣的店" tab-name="funny">
      <ScrollView>
        <ListView list-data="123">
          我是 有趣的店<br />
        </ListView>
      </ScrollView>
    </TabItem>
    <TabItem tab-title="品牌新店" tab-name="brand">
      <ScrollView>
        <ListView list-data="123">
          我是 品牌新店<br />
        </ListView>
      </ScrollView>
    </TabItem>
  </Tab>);
  console.log(data);
  const app = document.getElementById('app');
  indexHtml.appendTo(app);
});
