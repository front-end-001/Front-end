import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';
import Img from './Img.js';
import { create } from '../lib/create.js';

export default class InterestingListView extends Component {
  constructor(config) {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this.render().appendTo(this[PROPERTY_SYMBOL].root);
  }
  render() {
    let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    let listShopStyle = {
      width: '100%',
      marginBottom: '12px',
      padding: '12px',
      boxSizing: 'border-box',
      borderRadius: '6px',
      background: '#fff'
    };
    return (
      <div style="padding: 0 11px;">
        {data.map(item => {
          return (
            <div style={listShopStyle}>
              <div style="display:flex;justify-content:space-between;">
                <div>
                  <Img src={item.img01} style="width:calc(66% - 9px);"></Img>
                  <div class="to-shop">进店&nbsp;></div>
                </div>
                <div style="width:calc(33% - 9px);">
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