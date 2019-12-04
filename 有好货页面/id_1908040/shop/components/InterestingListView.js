import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';
import Img from './Img.js';
import Text from './TextView.js';
import { create } from '../lib/create.js';
import InterestingListViewCss from './css/InterestingListView.scss?classname=interesting-listview';
import diamond from './images/diamond.png'

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
    var list = (n) => {
      let res = [];
      for (let i = 0; i < n; i++) {
        res.push(<Img class="diamond" src={diamond}></Img>)
      }
      return res
    }
    return (
      <div style="padding: 0 11px;">
        <div class="top-header">
          <div class="top-intro">新奇好店都在这</div>
          <div class="top-tab">
            <div class="top-tab-item active">全部</div>
            <div class="top-tab-item">小惊喜</div>
            <div class="top-tab-item">想不到</div>
          </div>
        </div>
        {data.map(shop => {
          return (
            <div class="shop-box">
              <div class="shop">
                <div class="shop-main">
                  <Img class="main-img" src={shop[0].img}></Img>
                  <div class="shop-info">
                    <div>
                      {list(shop[0].diamond).map(diamond => {
                        return diamond
                      })}
                    </div>
                    <div>{shop[0].title}</div>
                  </div>
                  <a class="shop-link">进店&nbsp;></a>
                </div>
                <div class="shop-sub">
                  <div class="shop-sub-item">
                    <Img class="main-img" src={shop[1].img}></Img>
                    <div class="shop-info">
                      <div>
                        {list(shop[1].diamond).map(diamond => {
                          return diamond
                        })}
                      </div>
                      <div>{shop[1].title}</div>
                    </div>
                    <a class="shop-sub-link">></a>
                  </div>
                  <div class="shop-sub-item">
                    <Img class="main-img" src={shop[2].img}></Img>
                    <div class="shop-info">
                      <div>
                        {list(shop[2].diamond).map(diamond => {
                          return diamond
                        })}
                      </div>
                      <div>{shop[2].title}</div>
                    </div>
                    <a class="shop-sub-link">></a>
                  </div>
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