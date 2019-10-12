import 'normalize.css';
import './assets/style.css';
// import './views/test';
import Tab from './components/TabView';
import createComponent from './components/createComponent';
import TabItem from './components/TabItem';
import ScrollView from './components/ScrollView';

const indexHtml = (<Tab>
  <div>测试</div>
  <TabItem tab-title="有趣的店">
    <ScrollView>
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    我是 TabItem1<br />
    </ScrollView>
  </TabItem>
  <TabItem tab-title="每日推荐">我是 TabItem2</TabItem>
</Tab>);

const app = document.getElementById('app');
indexHtml.appendTo(app);
