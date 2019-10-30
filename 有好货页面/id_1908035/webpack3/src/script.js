import Carousel from './component'
import TabView from './TabView'
import Div from './Div'
import ScrollView from './scrollView'
import Text from './text'
import { myCreate } from './myCreate'
function loadMore () {
  console.log('loading')
  setTimeout(() => {
    this.setAttribute("loadingText", "没有更多啦！");
  }, 3000
  )
}
const ImgsUrl = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]
// var c = <Carousel width="300"ImgsUrl={ImgsUrl}autoPlay="true">
// </Carousel>
var c = <TabView>
  <ScrollView tab-title="推荐" style="background:#8bc34a;overflow-y:scroll" on-scrollBottom="loadMore" loadingText="下拉加载更多">
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
    <Div>推荐</Div>
  </ScrollView>
  <ScrollView tab-title="有趣的店" style="background:#03a9f4"><Div>有趣的店</Div></ScrollView>
  <ScrollView tab-title="品牌新店" style="background:pink"><Div>品牌新店</Div></ScrollView>
</TabView>
c.appendTo(document.body);
