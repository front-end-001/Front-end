/**
 * 品牌新店 tab
 */
import createComponent from './components/createComponent';
import ScrollView from './components/ScrollView';
import ListView from './components/ListView';
import Carousel from './components/Carousel';
import Image from './components/ImageEle';

const tabContent = (
  <ScrollView>
    <ListView list-data="123">
      我是 品牌新店
      <br />
    </ListView>
  </ScrollView>
);

// 获取数据
async function fetchData() {
  const data = await fetch('/static/data/newShopList.json').then(res =>
    res.json()
  );
  console.log(data);
  // tabContent.removeChild(carousel);

  // tabContent.appendChild([carousel, towPic, listView]);
}

export default {
  $el: tabContent,
  fetchData,
};
