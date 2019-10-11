// 使用symbol私有唯一化
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Carousel {
	constructor() {
		this[ATTRIBUTE_SYMBOL] = Object.create(null); // 使用此方法创建空对象不会向上寻找原型链，比较干净
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this.created();
	}

	// 暴露出的属性 使用getter setter property
	get width() {
		return this[PROPERTY_SYMBOL].width;
	}

	set width(value) {
		return this[PROPERTY_SYMBOL].width = value;
	}

	// method
	log() {
		console.log('width:', this.width);
	}

	// attribute 方式
	getAttribute(name) {
		return this[ATTRIBUTE_SYMBOL][name];
	}

	setAttribute(name, value) {
		if (name === 'width') {
			this.width = value;
		}
		return this[ATTRIBUTE_SYMBOL].name = value;
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

	appendTo(element){
		element.appendChild(this.root);
		this.mounted();
	}

	// 生命周期
	created() {
		this.root = document.createElement('div');
		this.root.style.width = '300px';
		this.root.style.height = '300px';
		this[STATE_SYMBOL].h = 0;
		this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 70%)`;
	}

	mounted() {
		this.root.addEventListener('click', ()=> {
			this[STATE_SYMBOL].h += 30;
			this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 100%, 70%)`;
		})
	}

	unmounted() {
	}

	update(){}
}
