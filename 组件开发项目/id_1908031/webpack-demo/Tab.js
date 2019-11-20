import {enableGesture} from './tools/gesture.js'
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
		// 保存位置
		let n = this.children.length;
		this.children.push(child);
		// 选择title
		let title = child.getAttribute('tab-title') || '';
		this[PROPERTY_SYMBOL].header.push(title);
		// 创建一个header元素，并添加到container中
		let header = document.createElement('div');
		header.innerText = title;
		header.style.display = 'inline-block';
		header.style.height = '93px';
		header.style.fontFamily = 'PingFang SC';
		header.style.fontSize = '46px';
		header.style.margin = '20px 35px 0 35px';
		header.style.marginRight = '10px';
		// title绑定点击事件
		header.addEventListener('click', event => {
			this[STATE_SYMBOL].position = n;
			for (let i = 0; i < this.contentContainer.children.length; i++) {
				this.contentContainer.children[i].style.transition = 'ease 0.5s';
				this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`;
			}
		});

		this.headerContainer.appendChild(header);

		child.appendTo(this.contentContainer);
		// 强制给每个children添加样式
		for (let i = 0; i < this.contentContainer.children.length; i++) {
			this.contentContainer.children[i].style.width = "100%";
			this.contentContainer.children[i].style.height = "100%";
			this.contentContainer.children[i].style.height = "100%";
			/* verticalAlign属性在使用transform时候加上 */
			this.contentContainer.children[i].style.verticalAlign = "top";
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
		// 手势库
		enableGesture(this.contentContainer);
		// 记录位置
		this[STATE_SYMBOL].position = 0;
		// 底层能滑，外层不能滑 mobile
		this.root.addEventListener('touchmove',function(e){
			e.cancelBubble = true;
			e.stopImmediatePropagation();
		}, {passive: false});

		this.contentContainer.addEventListener("pan", event => {
			// 竖直直接return；
			if(event.isVertical){
				return;
			}

			event.origin.preventDefault();
			let dx = event.dx;
			let width = this.contentContainer.getBoundingClientRect().width;
			// 边界拖拽判断
			if (this[STATE_SYMBOL].position === 0 && event.dx > 0) {
				dx = dx / 2;
			}
			if (this[STATE_SYMBOL].position === this.contentContainer.children.length - 1 && event.dx < 0) {
				dx = dx / 2;
			}

			for (let i = 0; i < this.contentContainer.children.length; i++) {
				this.contentContainer.children[i].style.transition = 'transform ease 0s';
				this.contentContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position}px)`;
			}

		});
		this.contentContainer.addEventListener("panend", event => {
			event.origin.preventDefault();

			let width = this.contentContainer.getBoundingClientRect().width;

			let isLeft;
			if (event.isFlick) {
				if (event.vx > 0) {
					this[STATE_SYMBOL].position--;
					isLeft = true;
				}

				if (event.vx < 0) {
					this[STATE_SYMBOL].position++;
					isLeft = false;
				}
			} else {
				if (event.dx > width / 2) {
					this[STATE_SYMBOL].position--;
					isLeft = true;
				} else if (event.dx < -width / 2) {
					this[STATE_SYMBOL].position++;
					isLeft = false;
				} else if (event.dx > 0) {
					isLeft = false;
				} else {
					isLeft = true;
				}
			}
			// 循环取整
			if (this[STATE_SYMBOL].position < 0) {
				this[STATE_SYMBOL].position = 0;
			}
			if (this[STATE_SYMBOL].position >= this.contentContainer.children.length) {
				this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
			}

			for (let i = 0; i < this.contentContainer.children.length; i++) {
				this.contentContainer.children[i].style.transition = 'transform ease 0.5s';
				this.contentContainer.children[i].style.transform = `translateX(${-width * this[STATE_SYMBOL].position}px)`;
			}
		});
	}

	mounted() {
	}

	unmounted() {
	}

	update() {
	}
}
