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
      <Carousel data={focusData} />,
      <ListView data={mostFavourateShops} template={({ name }) => new Text(name)}></ListView >,
      <ListView data={recommendedShops} template={({ name }) => new Text(name)}></ListView >,
    ]) {
      this.appendChild(child);
    }
  }
}