import { BaseComponent, ATTR_SYMBOL, h } from "../component";
import { Carousel } from "../component/Carousel";
import { ListView } from "../ListView";
import { Text } from '../Text';

export class RecommendationPage extends BaseComponent {
  /**
   * 数据接口
   */
  constructor() {
    super(...arguments);
    this[ATTR_SYMBOL].focusData = [];
    this[ATTR_SYMBOL].mostFavourateShops = [];
    this[ATTR_SYMBOL].recommendedShops = [];
  }
  setAttribute(name, val) {
    if (name === 'data') {
      const { focusData, mostFavourateShops, recommendedShops } = val;
      this[ATTR_SYMBOL].focusData = focusData;
      this[ATTR_SYMBOL].mostFavourateShops = mostFavourateShops;
      this[ATTR_SYMBOL].recommendedShops = recommendedShops;
      return val;
    }
    return super.setAttribute(name, val);
  }
  mounted() {
    this.render();
  }
  /**
   * render
   */
  render() {
    const { focusData, mostFavourateShops, recommendedShops } = this[ATTR_SYMBOL];

    for (let child of [
      <Carousel data={focusData} class={"carousel mb_1"} />,
      <h4 class="mb_067">超多人收藏的店!</h4>,
      <ListView data={mostFavourateShops} class={"two-shop mb_067"} template={(item) => shop1(item)}></ListView >,
      <ListView data={recommendedShops} class="shop-list" template={(item) => shop2(item)}></ListView >,
    ]) {
      this.appendChild(child);
    }
  }
}
function shop1({ name, icon, items }) {
  return (<div class="shop">
    <div class="shop-header">
      <img src={icon} alt="" class="logo" />
      <p>
        <a href="#">{name}</a><br />
        <span class="tag tag-tianmao"></span>
      </p>
    </div>
    <div class="imgs">
      {
        items.map(({ url, image }) =>
          <a href={url} ><img
            src={image}
            alt="" /></a>)
      }
    </div>
  </div>);
}
function shop2({ name, icon, fans, url, items }) {
  return (<div class="shop">
    <div class="shop-header">
      <img src={icon} alt="" class="logo" />
      <a class="btn btn-enterShop fr" href={url}>进店&nbsp;&gt;</a>
      <p>
        <a href={url}>{name}</a><br />
        <span class="tag tag-tianmao"></span>
      </p>
    </div>
    <div class="shop-desc mb_067"><span class="icon icon_goodShop"></span>&nbsp;好店君：该店已被{(fans / 10000).toFixed(1)}万人关注，快来关注吧！</div>
    <div class="shop-imgs">
      <a href={items[0].url}>
        <img
          src={items[0].image}
          alt="" class="shop-imgs-main" />
      </a>
      <div class="shop-imgs-two">
        {
          items.slice(1).map(({ url, image }) => <a href={url}>
            <img
              src={image}
              alt="" class="shop-imgs-main" />
          </a>)
        }
      </div>
    </div>
    <a href="#" class="more">相似好店 &gt;</a>
  </div>)
}