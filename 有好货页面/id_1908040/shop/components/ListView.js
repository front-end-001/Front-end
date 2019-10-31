import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './Component.js';

// import img01 from './images/img-01.png';
// import Div from './Div.js';
import { create } from '../lib/create.js';

export default class ListView extends Component {
  constructor(config) {
    super();
    this.created();
  }
  created() {
    this[PROPERTY_SYMBOL].root = document.createElement('div');

    // <div></div>  jsx会传string给create
    // this.render().appendTo(this[PROPERTY_SYMBOL].root);
    this.appendTo(this[PROPERTY_SYMBOL].root);
  }
  render() {
    let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
    // debugger;
    // return <div><Div>Text</Div>abc<img src="./img-01.png" style="width:100px;height:100px;"></img></div>;
    return (
      <div>
        hello
        <img src={img01} style="width:100px;height:100px;"></img>
        {data.map(item => {
          return (
            <div>
              <span class="a">{item.a}</span>
              <span class="b">{item.b}</span>
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
