import { Component, PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL } from './componentClass.js';

import { create } from './tools/create.js';

export default class FavoriteView extends Component {
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
		// debugger;
		return (
			<div style="width: calc(100% - 22px);
        padding: 12px;
        box-sizing: border-box;
        border-radius:6px;
        background:#fff;">
				<div style="display: flex;
          align-items: center;
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
				</div>
				<div style="display:flex;justify-content:space-between;">
					<img src={item.img01} style="width:calc(50% - 9px);"></img>
					<img src={item.img02} style="width:calc(50% - 9px);"></img>
				</div>
			</div>
		);
	}
	setAttribute(name, value) {
		if (name === 'style') {
			this[PROPERTY_SYMBOL].root.setAttribute('style', value);
		}
		// console.log(name, value);
		if (name === 'data') {
			this[ATTRIBUTE_SYMBOL][name] = value;

			this[PROPERTY_SYMBOL].root.innerHTML = '';
			this.render().appendTo(this[PROPERTY_SYMBOL].root);

			return value;
		}
		return (this[ATTRIBUTE_SYMBOL][name] = value);
	}
}
