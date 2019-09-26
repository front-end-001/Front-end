// 使用symbol私有唯一化
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Text {
	constructor(config) {
		this[ATTRIBUTE_SYMBOL] = Object.create(null); // 使用此方法创建空对象不会向上寻找原型链，比较干净
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this[PROPERTY_SYMBOL].children = [];
		this.text = config;
		this.created();
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
		if (name === 'style') {
			this.root.getAttribute('style');
		}
		return this[ATTRIBUTE_SYMBOL][name];
	}

	setAttribute(name, value) {
		if (name === 'style') {
			this.root.setAttribute('style', value);
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
			throw new Error('')
		}
		// 删除数组小技巧 配合 set 使用 add  delete
		this[EVENT_SYMBOL][type].delete(listener);
	}

	// 触发事件
	triggerEvent(type) {
		for (let event of this[EVENT_SYMBOL][type]) {
			event.call(this);
		}
	}

	appendTo(element) {
		element.appendChild(this.root);
		this.mounted();
	}

	// 生命周期
	created() {
		this.root = document.createElement('span');
		this.root.innerText = this.text;
		this[STATE_SYMBOL].h = 0;
	}

	mounted() {
	}

	unmounted() {
	}

	update() {
	}
}
