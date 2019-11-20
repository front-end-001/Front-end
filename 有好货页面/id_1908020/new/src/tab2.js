/**
 * 有趣的店 tab
 */
import createComponent from './components/createComponent';
import ScrollView from './components/ScrollView';
import ListView from './components/ListView';
import ImageEle from './components/ImageEle';
import './assets/tab2.scss';

const tabContent = <ScrollView></ScrollView>;

let listItemFuc = (data, index) => {
  if (index % 2 === 0) {
    return (
      <div class="card2-container odd">
        <div class="left-colum">
          <ImageEle class="image-ele" src={data[0].shop_thumb}></ImageEle>
        </div>
        <div style="flex: 1;"></div>
        <div class="right-colum">
          <ImageEle class="image-ele" src={data[1].shop_thumb}></ImageEle>
          <ImageEle class="image-ele" src={data[2].shop_thumb}></ImageEle>
        </div>
      </div>
    );
  }
  return (
    <div class="card2-container even">
      <div class="left-colum">
        <ImageEle class="image-ele" src={data[0].shop_thumb}></ImageEle>
        <ImageEle class="image-ele" src={data[1].shop_thumb}></ImageEle>
      </div>
      <div style="flex: 1;"></div>
      <div class="right-colum">
        <ImageEle class="image-ele" src={data[2].shop_thumb}></ImageEle>
      </div>
    </div>
  );
};
let topContent;
let listView;

// 获取数据
async function fetchData() {
  const data = await fetch('/static/data/funnyList1.json').then(res =>
    res.json()
  );
  console.log(data);

  tabContent.removeChild(topContent);
  tabContent.removeChild(listView);
  const clickAll = () => {
    btns.$el.classList.add('active-1');
    btns.$el.classList.remove('active-2');
    btns.$el.classList.remove('active-3');
  };
  const clickSuprise = () => {
    btns.$el.classList.remove('active-1');
    btns.$el.classList.add('active-2');
    btns.$el.classList.remove('active-3');
  };
  const clickThink = () => {
    btns.$el.classList.remove('active-1');
    btns.$el.classList.remove('active-2');
    btns.$el.classList.add('active-3');
  };
  const btns = (
    <div class="btns active-1">
      <div class="btn" on-click={clickAll}>
        全部
      </div>
      <div class="btn" on-click={clickSuprise}>
        小惊喜
      </div>
      <div class="btn" on-click={clickThink}>
        想不到
      </div>
    </div>
  );
  topContent = (
    <div class="tab-top">
      <div class="title">新奇好店都在这</div>
      {btns}
    </div>
  );
  listView = <ListView listData={data} listFuc={listItemFuc}></ListView>;

  tabContent.appendChild([topContent, listView]);
}

export default {
  $el: tabContent,
  fetchData
};
