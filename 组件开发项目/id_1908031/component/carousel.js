import enableGesture from '../gesture/touch.js'
import {Timeline, DOMElementStyleNumberAnimation, cubicBezier} from '../animation/animations.js'

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');
const ease = cubicBezier(.25, .1, .25, 1);

export default class Carousel {
	constructor() {
		this[ATTRIBUTE_SYMBOL] = Object.create(null);
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this.created();
	}

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

	appendTo(element, data) {
		if (data) {
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
			element.appendChild(this.container);
			this.carouselData = data;
			this.mounted();
		} else {
			throw new Error('please enter data');
		}

	}

	created() {
		this.container = document.createElement('div');
		this.container.classList.add('carousel');
		enableGesture(this.container);
	}

	mounted() {
		let i = this.carouselData.length;
		for (let d of this.carouselData) {
			let e = document.createElement("img");
			e.src = d;
			this.container.appendChild(e);
			e.style.zIndex = i++;
			e.onclick = event =>
				console.log(d);
		}
		let tl = new Timeline;
		let children = Array.prototype.slice.call(this.container.children);
		let position = 0;
		let offsetTimeStart = 0;
		let nextPic = () => {
			let nextPosition = position + 1;

			nextPosition = nextPosition % children.length;
			let current = children[position],
				next = children[nextPosition];
			//把next摆到正确的位置
			//next.style.transition = "ease 0s";
			next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

			offsetTimeStart = Date.now();
			tl.addAnimation(new DOMElementStyleNumberAnimation(
				current,
				"transform",
				0, -500 * position,
				1000, -500 - 500 * position,
				(v) => `translateX(${v}px)`
			));
			tl.addAnimation(new DOMElementStyleNumberAnimation(
				next,
				"transform",
				0, 500 - 500 * nextPosition,
				1000, -500 * nextPosition,
				(v) => `translateX(${v}px)`
			));
			tl.restart();
			position = nextPosition;
			nextPicTimer = setTimeout(nextPic, this.interval);
		};
		let nextPicTimer = setTimeout(nextPic, this.interval);
		let offset = 0;
		this.container.addEventListener("mousedown", event => {
			tl.pause();
			let currentTime = Date.now();
			if (currentTime - offsetTimeStart < 1000) {
				offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
				console.log(offset);
			} else {
				offset = 0;
			}
			clearTimeout(nextPicTimer);
		});
		this.container.addEventListener("pan", event => {
			// event.origin.preventDefault();
			event.preventDefault();
			let current = children[position];
			let nextPosition = (position + 1) % children.length;
			let next = children[nextPosition];
			let lastPosition = (children.length + position - 1) % children.length;
			let last = children[lastPosition];
			last.style.transition = "ease 0s";
			last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`;
			next.style.transition = "ease 0s";
			next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`;
			current.style.transition = "ease 0s";
			current.style.transform = `translate(${-500 * position + event.dx + offset}px)`
		});
		this.container.addEventListener("panend", event => {
			// event.origin.preventDefault();
			event.preventDefault();
			let isLeft;
			if (event.isFlick) {
				if (event.vx > 0) {
					position--;
					isLeft = true;
				}

				if (event.vx < 0) {
					position++;
					isLeft = false;
				}

			} else {
				if (event.dx > 250) {
					position--;
					isLeft = true;
				} else if (event.dx < -250) {
					position++;
					isLeft = false;
				} else if (event.dx > 0) {
					isLeft = false;
				} else {
					isLeft = true;
				}
			}
			position = (children.length + position) % children.length;
			let current = children[position];
			let nextPosition = (position + 1) % children.length;
			let next = children[nextPosition];
			let lastPosition = (children.length + position - 1) % children.length;
			let last = children[lastPosition];
			if (!isLeft) {
				last.style.transition = "";
			} else {
				last.style.transition = "ease 0s";
			}
			last.style.transform = `translate(${-500 - 500 * lastPosition}px)`;
			if (isLeft) {
				next.style.transition = "";
			} else {
				next.style.transition = "ease 0s";
			}
			next.style.transform = `translate(${500 - 500 * nextPosition}px)`;
			current.style.transition = "";
			current.style.transform = `translate(${-500 * position}px)`
		});
		this.container.addEventListener("mousedown", event => event.preventDefault());
	}
}
