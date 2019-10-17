// 使用symbol私有唯一化
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class ScrollView {
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
		this.placeHolder = document.createElement('div');
		this.placeHolder.innerText = '加载更多';
		this.placeHolder.style.backgroundColor = 'lightgreen';
		// todo 技巧 -- 永远向最底部添加元素
		this.root.appendChild(this.placeHolder);

		/*// 底层能滑，外层不能滑
		this.root.addEventListener('touchmove',function(e){
			e.cancelBubble = true;
			e.stopImmediatePropagation();
		}, {passive: false});*/
		let triggered = false;
		this.root.addEventListener('scroll', event => {
			let clientRect = this.root.getBoundingClientRect();
			let placeHolderRect = this.root.getBoundingClientRect();
			// 判断滚动到底部
			if(clientRect.bottom < placeHolderRect.top){
				this.triggerEvent('scrollToBottom');
				triggered = true;
			}

			/*if (this.root.scrollHeight - this.root.scrollTop <= clientRect.height) {
				this.triggerEvent('scrollToBottom');
			}*/
		});
		this[STATE_SYMBOL].h = 0;
	}

	mounted() {
	}

	unmounted() {
	}

	update() {
	}
}
