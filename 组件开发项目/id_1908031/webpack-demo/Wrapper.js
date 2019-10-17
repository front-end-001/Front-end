// 使用symbol私有唯一化
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Wrapper {
	constructor(type) {
		this[ATTRIBUTE_SYMBOL] = Object.create(null); // 使用此方法创建空对象不会向上寻找原型链，比较干净
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this[PROPERTY_SYMBOL].children = [];
		this.root = document.createElement(type);
	}

	get children() {
		return this[PROPERTY_SYMBOL].children;
	}

	appendChild(child) {
		this.children.push(child);
		child.appendTo(this.root);
	}

	// attribute 方式
	getAttribute(name) {
		return this.root.getAttribute(name);
	}

	setAttribute(name, value) {
		this.root.setAttribute(name, value);
	}

	// 添加事件
	addEventListener(type, listener) {
		this.root.addEventListener(...arguments);
	}

	// 移除事件
	removeEventListener(type, listener) {
		this.root.removeEventListener(...arguments);
	}

	appendTo(element) {
		element.appendChild(this.root);
	}
}
