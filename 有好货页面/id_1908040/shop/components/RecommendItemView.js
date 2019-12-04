import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';

import { create } from '../lib/create.js';

export default class RecommendItemView extends Component {
  constructor() {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this.render().appendTo(this[PROPERTY_SYMBOL].root);
  }
  render() {
    let item = this[ATTRIBUTE_SYMBOL]['data'] || {};
    // console.log(item);
    // debugger;
    return (
      <div style="width: 100%;
      margin-bottom:12px;
      padding: 12px;
      box-sizing: border-box;
      border-radius:6px;
      background:#fff;">
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
        <div style="margin-bottom:10px;
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
  }
  setAttribute(name, value) {
    if (name == 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    console.log(name, value);
    if (name == 'data') {
      console.log(name, value);
      this[ATTRIBUTE_SYMBOL][name] = value;

      this[PROPERTY_SYMBOL].root.innerHTML = '';
      this.render().appendTo(this[PROPERTY_SYMBOL].root);

      return value;
    }
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
}