// 使用symbol私有唯一化

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');
// 全局contexts  解决 多根手指的问题
// 凡是用hash表的都用Object.create
const contexts = Object.create(null);
const mouseSymbol = Symbol('mouse'); // 鼠标只有1个

class Carousel {
	constructor() {
		this[ATTRIBUTE_SYMBOL] = Object.create(null); // 使用此方法创建空对象不会向上寻找原型链，比较干净
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this.created();
	}

	// 暴露出的属性 使用getter setter property
	// 是否显示前后翻页
	get arrow() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set arrow(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 是否显示面板按钮
	get dots() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set dots(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 是否循环播放
	get loop() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set loop(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 是否允许拖动
	get drag() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set drag(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 时间间隔
	get interval() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set interval(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 是否显示前后翻页
	get directive() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set directive(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 速率
	get speed() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set speed(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 是否自动切换
	get autoplay() {
		return this[PROPERTY_SYMBOL].arrow;
	}

	set autoplay(value) {
		return this[PROPERTY_SYMBOL].arrow = value;
	}

	// 轮播数据
	get carouselData() {
		return this[PROPERTY_SYMBOL].carouselData;
	}

	set carouselData(value) {
		return this[PROPERTY_SYMBOL].carouselData = value;
	}

	// method
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
		element.appendChild(this.container);
		this.mounted();
	}

	// 生命周期
	created() {
		if (!this.carouselData) {
			this.carouselData = [
				"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
				"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
				"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
				"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
			];
		}
		if (!this.arrow) {
			this.arrow = true;
		}
		if (!this.dots) {
			this.dots = true;
		}
		if (!this.loop) {
			this.loop = true;
		}
		if (!this.drag) {
			this.drag = true;
		}
		if (!this.interval) {
			this.interval = 3000;
		}
		if (!this.directive) {
			this.directive = 'left';
		}
		if (!this.speed) {
			this.speed = 1;
		}
		if (!this.autoplay) {
			this.autoplay = true;
		}

		this.container = document.createElement('div');
		this.container.classList.add('carousel');
		for (let prop of this.carouselData) {
			let img = document.createElement('img');
			img.src = prop;
			this.container.appendChild(img);
		}
		// 获取图片数量
		this.children = Array.prototype.slice.call(this.container.children);
		this.position = 0;
		// 保存当前位置，计算下一张位置
		let nextPic = () => {
			let nextPosition = this.position + 1;
			nextPosition = nextPosition % this.children.length;

			let current = this.children[this.position],
				next = this.children[nextPosition];

			next.style.transition = 'ease 0s';
			next.style.transform = `translate(${100 - 100 * nextPosition}%)`;
			// 设置位置
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					current.style.transition = '';
					current.style.transform = `translate(${-100 - 100 * this.position}%)`;

					next.style.transition = '';
					next.style.transform = `translate(${-100 * nextPosition}%)`;

					this.position = nextPosition;
				})

			});
			// 3秒执行
			setTimeout(nextPic, this.interval);
		};
		this.x = 0;
	}

	mounted() {
		// 监听相关手势 --- pan
		this.container.addEventListener('pan',event => {
			// 竖直移动则跳出pan手势
			if(event.isVertical){
				return;
			}
			for(let child of this.children){
				child.style.transition = 'ease 0s';
				child.style.transform = `translateX(${event.dx + this.x}px)`;
			}
		});
		// pan结束
		this.container.addEventListener('panend', event => {
			if(event.isVertical){
				return;
			}
			// 快速滑动
			if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
				if(event.dx > 0) {
					this.position = this.position - 1;
				}
				if(event.dx < 0) {
					this.position = this.position + 1;
				}
			} else {
				this.position = -(Math.round((this.x + event.dx) / 500));
			}
			this.position = Math.max(0, Math.min(this.position, this.children.length - 1));

			for(let child of this.children){
				child.style.transition = '';
				child.style.transform = `translate(${-this.position * 500}px)`;
				this.x = -this.position * 500;
			}
		});

		this.container.addEventListener('mousedown', event => event.preventDefault());
		// clientX 相对于视口，不会轻易变动
		this.container.addEventListener('mousedown', this.mousedown);

		// clientX 相对于视口，不会轻易变动
		this.container.addEventListener('touchstart', this.touchstart);
		this.container.addEventListener('touchmove', this.touchmove);
		this.container.addEventListener('touchend', this.touchend);
		this.container.addEventListener('touchcancel', this.touchcancel);
	}

	update(){}

	start = (point, context) =>{
		// console.log('start');
		context.startX = point.clientX;
		context.startY = point.clientY;
		context.startTime = Date.now();
		context.isTap = true;
		context.isPan = false;
		context.isPress = false;
		// 长按，手移动开变成pan
		context.pressHandler = setTimeout(() => {
			context.isPress = true;
			context.isTap = false;
			let e = new Event('pressstart');
			this.container.dispatchEvent(e);
			context.pressHandler = null;
		}, 500);
	}

	move = (point, context) =>{
		let dx = point.clientX - context.startX; // x轴位移
		let dy = point.clientY - context.startY; // y轴位移

		// 如果水平移动距离大于图片一半宽度时，则停止移动
		if (Math.abs(dx) > this.container.clientWidth / 2)
			return;

		// 如果x、y移动距离之和大于100，则就不是tap而是pan
		if (dx * dx + dy * dy > 100) {
			if (context.pressHandler !== null) {
				// 如果pressHandler存在，则将其清除
				clearTimeout(context.pressHandler);
				context.pressHandler = null;
				context.isPress = false;
			} else if (context.isPress) {
				let e = new Event('presscancel');
				this.container.dispatchEvent(e);
			}

			context.isTap = false;

			if (context.isPan === false) {
				if (Math.abs(dx) > Math.abs(dy)) {
					context.isVertical = false;
					context.isHorizontal = true;
				} else {
					context.isVertical = true;
					context.isHorizontal = false;
				}
				// 注册panstart事件
				let e = new Event('panstart');
				e.startX = context.startX;
				e.startY = context.startY;
				this.container.dispatchEvent(e);
				context.isPan = true;
			}
		}

		if (context.isPan) {
			// 注册pan事件
			let e = new Event('pan');
			e.dx = dx;
			e.dy = dy;
			e.isHorizontal = context.isHorizontal;
			e.isVertical = context.isVertical;
			this.container.dispatchEvent(e);
		}
	}

	end = (point, context) =>{
		if (context.pressHandler !== null) {
			clearTimeout(context.pressHandler);
		}
		// console.log('end');
		if (context.isPress) {
			let e = new Event('pressend');
			this.container.dispatchEvent(e);
		}
		if (context.isTap) {
			let e = new Event('tap');
			this.container.dispatchEvent(e);
		}
		let dx = point.clientX - context.startX;
		let dy = point.clientY - context.startY;
		let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
		// console.log(v);
		if (context.isPan && v > 0.3) {
			context.isFlick = true;
			let e = new Event('flick');
			e.dx = dx;
			e.dy = dy;
			this.container.dispatchEvent(e);
		} else {
			context.isFlick = false;
		}

		if (context.isPan) {
			let e = new Event('panend');
			e.dx = dx;
			e.dy = dy;
			e.isHorizontal = context.isHorizontal;
			e.isVertical = context.isVertical;
			e.isFlick = context.isFlick;
			this.container.dispatchEvent(e);
		}
	}

	cancel = (point, context) =>{
		if (context.isPan) {
			let e = new Event('pancancel');
			this.container.dispatchEvent(e);
		}
		if (context.isPress) {
			let e = new Event('presscancel');
			this.container.dispatchEvent(e);
		}
		if (context.pressHandler !== null) {
			// touchcancel时如果，pressHandler不为null
			// 则说明当前不是pan状态, 触发pancancel事件
			// 并清除pressHandler
			let e = new Event('pancancel');
			this.container.dispatchEvent(e);
			clearTimeout(context.pressHandler);
		}
	}

	mousedown = (event) => {
		document.addEventListener('mousemove', this.mousemove);
		document.addEventListener('mouseup', this.mouseup);
		contexts[mouseSymbol] = Object.create(null);
		this.start(event, contexts[mouseSymbol]);
	};

	mousemove = (event) => {
		this.move(event, contexts[mouseSymbol]);
	};

	mouseup = (event) =>  {
		document.removeEventListener('mousemove', () =>this.mousemove);
		document.removeEventListener('mouseup', () =>this.mouseup);
		this.end(event, contexts[mouseSymbol]);
		delete contexts[mouseSymbol];
	};



	touchstart = (event) => {
		// TouchEvent.changedTouches
		// 一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，
		// 状态发生了改变的触点的 Touch 对象。 https://developer.mozilla.org/zh-CN/docs/Web/API/Touch
		for (let touch of event.changedTouches) {
			// Touch.identifier
			// 此 Touch 对象的唯一标识符. 一次触摸动作(我们指的是手指的触摸)在平面上移动的整个过程中, 该标识符不变.
			// 可以根据它来判断跟踪的是否是同一次触摸过程. 只读属性.
			contexts[touch.indentifier] = Object.create(null);
			this.start(touch, contexts[touch.indentifier]);
		}
	}

	touchmove = (event) => {
		for (let touch of event.changedTouches) {
			this.move(touch, contexts[touch.indentifier]);
		}
	}

	// 注意touchcancel和touchend的区别
	touchend = (event) => {
		for (let touch of event.changedTouches) {
			this.end(touch, contexts[touch.indentifier]);
			delete contexts[touch.indentifier]; // 防止contexts中的对象积累过多
		}
	}

	touchcancel = (event) => {
		for (let touch of event.changedTouches) {
			this.cancel(touch, contexts[touch.indentifier]);
			delete contexts[touch.identifier];
		}
	}
}
