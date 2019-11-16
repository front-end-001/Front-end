/**
 * 推荐 tab
 */
import createComponent from './components/createComponent';
import ScrollView from './components/ScrollView';
import ListView from './components/ListView';
import Carousel from './components/Carousel';
import ImageEle from './components/ImageEle';
import './assets/tab1.scss';

let carousel;
let towPic;
let listView;
let listItemFuc = data => {
  return (
    <div class="card1-container" style="">
      <div class="card1-header">
        <div class="title">
          <ImageEle class="title-icon" src={data.shop_icon}></ImageEle>
          <div class="title-content">
            <div class="title-content_title">{data.shop_title}</div>
            <div>
              <div class="title-content_label">{data.shop_type}</div>
            </div>
          </div>
          <div class="title-btn">进店 &gt;</div>
        </div>
        <div class="desc">
          <ImageEle
            class="desc-img"
            src="/static/image/icon_shop.png"
          ></ImageEle>
          <div class="desc-content">{data.desc}</div>
        </div>
      </div>
      <div class="card1-content">
        <div class="left-colum">
          <ImageEle
            class="image-ele"
            src={data.goods[0].goods_thumb}
          ></ImageEle>
        </div>
        <div style="flex: 1;"></div>
        <div class="right-colum">
          <ImageEle
            class="image-ele"
            src={data.goods[1].goods_thumb}
          ></ImageEle>
          <ImageEle
            class="image-ele"
            src={data.goods[2].goods_thumb}
          ></ImageEle>
        </div>
      </div>
      <div class="card1-footer">
        {data.labels.map(label => (
          <div class="card1-footer-label">{label}</div>
        ))}

        <div style="flex: 1;"></div>
        <div class="card1-footer-btn">相似好店 &gt;</div>
      </div>
    </div>
  );
};

let hasInit = false;
const onScrollBottom = async () => {
  if (!hasInit) return;
  const data = await fetch('/static/data/commendList.json').then(res =>
    res.json()
  );
  console.log(data);
  listView.pushData(data.list);
};

const tabContent = <ScrollView on-bottom={onScrollBottom}></ScrollView>;

// 获取数据
async function fetchData() {
  const data = await fetch('/static/data/commendTab.json').then(res =>
    res.json()
  );

  tabContent.removeChild(carousel);
  tabContent.removeChild(towPic);
  tabContent.removeChild(listView);

  carousel = (
    <Carousel
      style="width: 93.6vw; height: 45vw; margin: 5vw auto;"
      listData={data.carousel}
    />
  );
  towPic = <div></div>;

  listView = <ListView listData={data.commendList} listFuc={listItemFuc}></ListView>;

  tabContent.appendChild([carousel, towPic, listView]);
  hasInit = true;
}

export default {
  $el: tabContent,
  fetchData,
};
