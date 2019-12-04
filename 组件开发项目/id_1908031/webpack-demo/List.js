import {create} from './tools/create.js';
import Div from './Div.js';
import css from './ListView.css';

// 使用symbol私有唯一化
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListView {
	constructor() {
		this[ATTRIBUTE_SYMBOL] = Object.create(null); // 使用此方法创建空对象不会向上寻找原型链，比较干净
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this[PROPERTY_SYMBOL].children = [];
		this.created();
	}

	get style() {
		return this.root.style;
	}

	get children() {
		return this[PROPERTY_SYMBOL].children;
	}

	appendChild(child) {
		this.children.push(child);
		child.appendTo(this.root);
		this.root.appendChild(this.placeHolder);
	}

	render() {
		let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
		return <div>
			{
				data.map(item => {
					<div><span>{item.a}</span><span>{item.v}</span></div>
				})
			}
		</div>;
	}

	// attribute 方式
	getAttribute(name) {
		if (name === 'style') {
			this.root.getAttribute('style');
		}
		return this[ATTRIBUTE_SYMBOL][name];
	}

	setAttribute(name, value) {
		if (name === 'style') {
			this.root.setAttribute('style', value);
		}
		if (name === 'data') {
			this[ATTRIBUTE_SYMBOL][name] = value;
			this.root.innerHTML = '';
			this.render().appendTo(this.root);

			return value;
		}
		return this[ATTRIBUTE_SYMBOL][name] = value;
	}

	// 添加事件
	addEventListener(type, listener) {
		if (!this[EVENT_SYMBOL][type]) {
			this[EVENT_SYMBOL][type] = new Set;
		}
		this[EVENT_SYMBOL][type].add(listener);
	}

	// 移除事件
	removeEventListener(type, listener) {
		if (!this[EVENT_SYMBOL][type]) {
			throw new Error('type error')
		}
		// 删除数组小技巧 配合 set 使用 add  delete
		this[EVENT_SYMBOL][type].delete(listener);
	}

	// 触发事件
	triggerEvent(type, ...args) {
		if (!this[EVENT_SYMBOL][type]) {
			return;
		}
		for (let event of this[EVENT_SYMBOL][type]) {
			event.call(this, ...args);
		}
	}

	appendTo(element) {
		element.appendChild(this.root);
		this.mounted();
	}

	// 生命周期
	created() {
		this.root = document.createElement('div');
		this.root.classList.add('list-view');
		// jsx 的组件定义
		// 添加到DOM树中
		this.render().appendTo(this.root);

	}

	mounted() {
	}

	unmounted() {
	}

	update() {
	}
}
