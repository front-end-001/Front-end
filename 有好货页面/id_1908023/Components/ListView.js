import { create } from '../create';
import Div from './Div';
import css from './ListView.less';
import "../cubicBezier"
import "../gesture2"
import Carousel from "../carousel-combin";
import "../style.css";

// 要认真写 symbol 的名字，跟注释差不多的作用
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');


// if (!window.LIST_VIEW_STYLE_ELEMENT) {
// let styleElement = document.createElement('style');
// styleElement.innerHTML = css;
// styleElement.setAttribute('scoped', '');
// document.getElementsByTagName('head')[0].appendChild(styleElement);
// window.LIST_VIEW_STYLE_ELEMENT = true;
// }


export default class ListView {
  // 属性要在 constructor 里面写
  constructor() {
    // 存 attribute 和 property 一定要用纯净的对象
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  appendChild(child) {
    this.children.push(child);
    child.appendTo(this.root);
    this.root.appendChild(this.placeHolder);
  }

  // 生命周期
  created() {
    this.root = document.createElement('div');
    this.root.className = "list-view";
    this.carousel = document.createElement('div');
    let data = [
      "../pics/pic2.png",
      "../pics/pic3.png",
    ];
    new Carousel(this.carousel, data).render();

    this.root.appendChild(this.carousel);

    // this.root.innerText = '112312312312'
    // let element = <Div><Div>text</Div>abc</Div>;
    // let element = <div><div>text</div>abc<img src='https://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super' /></div>;
    // element.appendTo(this.root);
    this.render().appendTo(this.root);
    // this.addStyle();

  }

  mounted() { }

  render() {
    return (
      <div class="list-view-container">
        <h5>超多人收藏的店！</h5>
        <div class="block-container">
          <div class="small-block">
            <div class="block-title-container">
              <div class="block-title-logo">
                <img src="../pics/small-logo1.png" />
              </div>
              <div class="block-title">
                <h6>极客时间旗舰店</h6>
                <div class="tm-tag-sm">天猫</div>
              </div>
            </div>
            <div class="block-content">
              <img class="quater-block-img" src="../pics/sm01.png" />
              <img class="quater-block-img" src="../pics/sm01.png" />
            </div>
          </div>
          <div class="small-block">
            <div class="block-title-container">
              <div class="block-title-logo">
                <img src="../pics/small-logo1.png" />
              </div>
              <div class="block-title">
                <h6>极客时间旗舰店</h6>
                <div class="tm-tag-sm">天猫</div>
              </div>
            </div>
            <div class="block-content">
              <img class="quater-block-img" src="../pics/sm01.png" />
              <img class="quater-block-img" src="../pics/sm01.png" />
            </div>
          </div>
        </div>
        <div class="block-container">
          <div class="normal-block">
            <div class="block-title-container">
              <div class="block-title-logo">
                <img src="../pics/small-logo1.png" />
              </div>
              <div class="block-title">
                <h6>极客时间旗舰店</h6>
                <div class="tm-tag-sm large">天猫</div>
              </div>
              <div class="title-enter">
                进店<img style="margin-left: 13px" src="../pics/right-enter.png" />
              </div>
            </div>
            <div class="block-message">
              <img style="" src="../pics/dianpu.png" />
              好店君：该店已被1.3万人关注，快来关注吧！
            </div>
            <div class="goods-pic-container">
              <div class="goods-big-pic">
                <img src="../pics/goods01.png" />
              </div>
              <div class="goods-small-pic">
                <img src="../pics/goods02.png" />
                <img src="../pics/goods03.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="block-container">
          <div class="normal-block">
            <div class="block-title-container">
              <div class="block-title-logo">
                <img src="../pics/small-logo1.png" />
              </div>
              <div class="block-title">
                <h6>极客时间旗舰店</h6>
                <div class="tm-tag-sm large">天猫</div>
              </div>
              <div class="title-enter">
                进店<img style="margin-left: 13px" src="../pics/right-enter.png" />
              </div>
            </div>
            <div class="block-message">
              <img style="" src="../pics/dianpu.png" />
              好店君：该店已被1.3万人关注，快来关注吧！
            </div>
            <div class="goods-pic-container">
              <div class="goods-big-pic">
                <img src="../pics/goods01.png" />
              </div>
              <div class="goods-small-pic">
                <img src="../pics/goods02.png" />
                <img src="../pics/goods03.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="block-container">
          <div class="normal-block">
            <div class="block-title-container">
              <div class="block-title-logo">
                <img src="../pics/small-logo1.png" />
              </div>
              <div class="block-title">
                <h6>极客时间旗舰店</h6>
                <div class="tm-tag-sm large">天猫</div>
              </div>
              <div class="title-enter">
                进店<img style="margin-left: 13px" src="../pics/right-enter.png" />
              </div>
            </div>
            <div class="block-message">
              <img style="" src="../pics/dianpu.png" />
              好店君：该店已被1.3万人关注，快来关注吧！
            </div>
            <div class="goods-pic-container">
              <div class="goods-big-pic">
                <img src="../pics/goods01.png" />
              </div>
              <div class="goods-small-pic">
                <img src="../pics/goods02.png" />
                <img src="../pics/goods03.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    // return <div><div>text</div>abc<img src='https://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super' /></div>;
    // let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    // return (
    //   <div>
    //     {
    //       data.map(item => (
    //         <div><span style={css.x}>{item.name}</span></div>
    //       ))
    //     }
    //   </div>
    // )
  }

  // addStyle() {
  //   this.styleElement = document.createElement('style');
  //   console.log(css);
  //   this.styleElement.innerHTML = css;
  //   this.styleElement.setAttribute('scoped', '');
  //   this.root.appendChild(this.styleElement);
  // }

  get style() {
    return this.root.style;
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttriute(name) {
    if (name === 'style') {
      return this.root.getAttribute('style');
    }
    // if (name === 'class') {
    //   return this.root.getAttribute('class');
    // }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name === 'style') {
      this.root.setAttribute('style', value);
    }
    // if (name === 'class') {
    //   this.root.setAttribute('class', value);
    // }
    if (name === 'data') {
      this[ATTRIBUTE_SYMBOL][name] = value;
      this.root.innerHTML = '';
      this.render().appendTo(this.root);
      // this.addStyle();
      return value;
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventLister(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      throw new Error('no such event')
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type, ...args) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type])
      event.call(this, ...args);
  }
}