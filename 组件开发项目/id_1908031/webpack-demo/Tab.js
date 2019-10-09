// 使用symbol私有唯一化
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class TabView {
	constructor() {
		this[ATTRIBUTE_SYMBOL] = Object.create(null); // 使用此方法创建空对象不会向上寻找原型链，比较干净
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this[PROPERTY_SYMBOL].header = [];
		this[PROPERTY_SYMBOL].children = [];
		this.created();
	}

	get children() {
		return this[PROPERTY_SYMBOL].children;
	}

	appendChild(child) {
		this.children.push(child);
		// 选择title
		let title = child.getAttribute('tab-title') || '';
		let active = child.getAttribute('active') || false;
		this[PROPERTY_SYMBOL].header.push(title);
		// 创建一个header元素，并添加到container中
		let header = document.createElement('div');
		let activeSign = document.createElement('div');
		header.innerText = title;
		header.style.display = 'inline-block';
		header.style.height = '93px';
		header.style.fontFamily = 'PingFang SC';
		header.style.fontSize = '46px';
		header.style.margin = '20px 35px 0 35px';
		header.style.marginRight = '10px';
		activeSign.style.width = '20px';
		activeSign.style.height = '5px';
		activeSign.style.margin = '0 auto';
		activeSign.style.borderRadius = '4px';
		if (active) {
			activeSign.style.backgroundColor = '#aaa';
		} else {
			activeSign.style.backgroundColor = '#fff';
		}
		this.headerContainer.appendChild(header);
		header.appendChild(activeSign);

		child.appendTo(this.contentContainer);
		// 强制给每个children添加样式
		for (let i = 0; i < this.contentContainer.children.length; i++) {
			this.contentContainer.children[i].style.width = "100%";
			this.contentContainer.children[i].style.height = "100%";
			this.contentContainer.children[i].style.display = "inline-block";
		}

	}

	// attribute 方式
	getAttribute(name) {
		if (name === "style") {
			return this.root.getAttribute("style");
		}
		return this[ATTRIBUTE_SYMBOL][name];
	}

	setAttribute(name, value) {
		if (name === 'style') {
			this.root.setAttribute("style", value);
			this.root.style.display = 'flex';
			this.root.style.flexDirection = 'column';
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

	appendTo(element) {
		element.appendChild(this.root);
		this.mounted();
	}

	// 生命周期
	created() {
		this.root = document.createElement('div');
		this.root.style.display = 'flex';
		this.headerContainer = document.createElement('div');
		this.contentContainer = document.createElement('div');
		this.contentContainer.style.whiteSpace = 'nowrap';
		this.contentContainer.style.overflow = 'hidden';
		this.contentContainer.style.height = '100%';
		this.contentContainer.style.flex = '1';
		this.headerContainer.style.height = '93px';
		this.root.appendChild(this.headerContainer);
		this.root.appendChild(this.contentContainer);
	}

	mounted() {
	}

	unmounted() {
	}

	update() {
	}
}
