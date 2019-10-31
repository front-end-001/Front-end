import TabView from './component/tab-view';
import ScrollView from './component/scroll-view';
import {h} from './lib/h'

let c = <TabView className={'tab-container'}>
  <ScrollView title="推荐">推荐</ScrollView>
  <ScrollView title="有趣的店">有趣的店</ScrollView>
  <ScrollView title="品牌新店">品牌新店</ScrollView>
  <ScrollView title="发现">发现</ScrollView>
</TabView>;

c.appendTo(document.body);
