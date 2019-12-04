import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';
import Img from './Img.js';
import Text from './TextView.js';
import { create } from '../lib/create.js';
import NewShopViewCss from './css/NewShopView.scss?classname=new-shop';
import Div from './Div.js';
import A from './A.js';
import guanzhu from './images/guanzhu.png'

let styleElement = document.createElement('style');
styleElement.innerHTML = NewShopViewCss;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class NewShopView extends Component {
  constructor(config) {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this[PROPERTY_SYMBOL].root.classList.add('new-shop');
    this.render().appendTo(this[PROPERTY_SYMBOL].root);
  }
  render() {
    let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    return (
      <Div class="list">
        {
          data.map(shop => {
            return (
              <Div class="shop">
                <Div class="shop-header">
                  <Img class="logo" src={shop.logo}></Img>
                  <Div class="statistics">
                    <Img src={guanzhu}></Img>
                    <span>该店已被{(shop.count / 10000).toFixed(1)}万人关注啦</span>
                  </Div>
                </Div>
                <Div class="shop-info">
                  <Div>
                    <Div class="shop-title">{shop.title}</Div>
                    <Div class="shop-tag">{shop.tag}</Div>
                  </Div>
                  <A class="shop-link" href={shop.link}>进店&nbsp;></A>
                </Div>
                <Div class="shop-product">
                  <Div>
                    <Img src={shop.img01}></Img>
                  </Div>
                  <Div>
                    <Img src={shop.img02}></Img>
                  </Div>
                </Div>
              </Div>
            )
          })
        }
      </Div>
    )
  }
  setAttribute(name, value) {
    if (name == 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    // console.log(name, value);
    if (name == 'data') {
      this[ATTRIBUTE_SYMBOL][name] = value;

      this[PROPERTY_SYMBOL].root.innerHTML = '';
      this.render().appendTo(this[PROPERTY_SYMBOL].root);

      return value;
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
}