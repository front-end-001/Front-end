import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';
import Img from './Img.js';
import Text from './TextView.js';
import { create } from '../lib/create.js';
import InterestingListViewCss from './InterestingListView.scss?classname=interesting-listview';

let styleElement = document.createElement('style');
styleElement.innerHTML = InterestingListViewCss;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class InterestingListView extends Component {
  constructor(config) {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this[PROPERTY_SYMBOL].root.classList.add('interesting-listview');
    this.render().appendTo(this[PROPERTY_SYMBOL].root);
  }
  render() {
    let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    return (
      <div style="padding: 0 11px;">
        {data.map(item => {
          return (
            <div class="shop-box">
              <div class="shop">
                <div class="shop-main">
                  <Img class="main-img" src={item.img01}></Img>
                  <div class="shop-info">
                    <div></div>
                    <div>{item.title}</div>
                  </div>
                </div>
                <div class="shop-sub">
                  <Img style="width:100%;" src={item.img02}></Img>
                  <Img style="width:100%;" src={item.img03}></Img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
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