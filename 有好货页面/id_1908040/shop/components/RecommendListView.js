import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';
import { create } from '../lib/create.js';

import RecommendListViewCss from './RecommendListView.css';

// debugger;
// import只会被加载一次，单例的，所以不用加标志位防止重复加载
// 保证只加载一次，style也只加载一起
// if (!window.LIST_VIEW_STYLE_ELEMENT) {
  // 不能用link标签，不支持src属性
  // 用webpack的loader来解决
  // 方案一：scoped style
  let styleElement = document.createElement('style');
  // 不能用link标签，不支持src属性
  // 用webpack的loader来解决
  styleElement.innerHTML = RecommendListViewCss;

  // this[PROPERTY_SYMBOL].styleElement.scoped = true;
  // styleElement.setAttribute('scoped', '');
  // 这里也可以加个防御，head有可能取不到
  document.getElementsByTagName('head')[0].appendChild(styleElement);
  // 标志位
  // window.LIST_VIEW_STYLE_ELEMENT = true;
// }

export default class ListView extends Component {
  constructor(config) {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');

    // 添加list-view class
    this[PROPERTY_SYMBOL].root.classList.add('recommend-listView');

    // <div></div>  jsx会传string给create
    this.render().appendTo(this[PROPERTY_SYMBOL].root);

    // 方案一：scoped style
    // this[PROPERTY_SYMBOL].styleElement = document.createElement('style');
    // render之后再添加样式文件，最终会添加到该组件结束标签之前
    // this.addStyle();
    // console.log(RecommendListViewCss);
  }
  addStyle() {
    // 不能用link标签，不支持src属性
    // 用webpack的loader来解决
    // 方案一：scoped style
    this[PROPERTY_SYMBOL].styleElement = document.createElement('style');
    // 不能用link标签，不支持src属性
    // 用webpack的loader来解决
    this[PROPERTY_SYMBOL].styleElement.innerHTML = RecommendListViewCss;
    // this[PROPERTY_SYMBOL].styleElement.scoped = true;
    this[PROPERTY_SYMBOL].styleElement.setAttribute('scoped', true);
    this[PROPERTY_SYMBOL].root.appendChild(this[PROPERTY_SYMBOL].styleElement);
  }
  render() {
    let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    console.log(data);
    return (
      <div style="padding: 0 11px;">
        {data.map(item => {
          return (
            <div  class="list">
              <div style="display: flex;
                align-items: center;
                position: relative;
                margin-bottom:9px;">
                  <img style="width:26px;height:26px;margin-right:5px;" src={item.logo}></img>
                  <div style="display:flex;flex-direction:column;">
                    <div style="font-size:12px;">{item.title}</div>
                    <div style="width:22px;
                    padding: 2px;
                    font-size:9px;
                    color:white;
                    background:#EE0507;
                    border-radius:10px;
                    text-align:center;">{item.tag}</div>
                  </div>
                  <div style="position:absolute;right:10px;padding:6px 11px;border-radius:12px;font-size:13px;background:#FEC900;color:#fff;">进店&nbsp;></div>
                </div>
                <div class="x" style="margin-bottom:10px;
                  padding:8px;
                  border-radius:5px;
                  font-size:12px;
                  color:#333;
                  background:#eee;">好店君：该店已被{(item.count / 10000).toFixed(1)}万人关注，快来关注吧！</div>
                <div style="display:flex;justify-content:space-between;">
                  <img src={item.img01} style="width:calc(66% - 9px);"></img>
                  <div style="width:calc(33% - 9px);">
                    <img style="width:100%;" src={item.img02}></img>
                    <img style="width:100%;" src={item.img03}></img>
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
