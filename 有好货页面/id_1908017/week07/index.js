import { h } from './js/component';
import { TabView } from './js/TabView';
import { ScrollView } from './js/ScrollView';
import { Text } from './js/Text';
import { ListView } from './js/ListView';
import { EventBus } from './js/EventBus';

const eventBus = new EventBus();
let trigged = false;
function onScrollEnd() {
  if (!trigged) {
    trigged = true;
    setTimeout(() => {
      debugger;
      this.setAttribute('end-text', 'no more');
      eventBus.trigger('scroll1End', [1, 2, 3, 4, 5, 6, 7, 8]);
    }, 1000);
  }
}
(<TabView >
  <ScrollView tab-title="推荐" end-text="加载更多" on-scrollEnd={onScrollEnd}>
    <Text>scroll1</Text>
    {eventBus.listen(<ListView data={[1, 2, 3, 4, 5]} template={item => <Text>{item * 2}</Text>}></ListView>, 'scroll1End', (ob, eventName, data) => ob.updateData(data))}
    <Text>some Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Text</Text>
  </ScrollView>
  <ScrollView tab-title="有趣的店">
    <Text>scroll2</Text>
    <Text>some Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Text</Text>
  </ScrollView>
  <ScrollView tab-title="品牌新店">
    <Text>scroll3</Text>
    <Text>some Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Textsome Text some Text some Text some Text some Text some Text</Text>
  </ScrollView>
</TabView>).mount(document.getElementById('app'));