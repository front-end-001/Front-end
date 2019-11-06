const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

class Carousel {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.width = config.width;
        this.height = config.height;
        this.data = config.data;
        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        this.root.style.width = this.width;
        this.root.style.height = this.height;
        for (let d of this.data) {
            let element = document.createElement("img");
            element.src = d;
            this.root.appendChild(element);
        }
    }

    mounted() {
        this._addAnimation();
        this._addGesture();
    }

    get width() {
        return this[PROPERTY_SYMBOL].width;
    }

    set width(value) {
        return this[PROPERTY_SYMBOL].width = value;
    }

    get height() {
        return this[PROPERTY_SYMBOL].height;
    }

    set height(value) {
        return this[PROPERTY_SYMBOL].height = value;
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if (name === "width") {
            this.width = value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }

    _addAnimation() {
        this.tl = new Timeline;

        this.children = Array.prototype.slice.call(this.root.children);
        this.position = 0;
        this.offsetTimeStart = 0
        this.nextPic = () => {
            this.nextPosition = this.position + 1;

            this.nextPosition = this.nextPosition % this.children.length;

            let current = this.children[this.position],
                next = this.children[this.nextPosition];
            //把next摆到正确的位置
            //next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * this.nextPosition}%)`

            this.offsetTimeStart = Date.now();

            this.tl.addAnimation(new DOMElementStyleNumberAnimation(
                current,
                "transform",
                0, -500 * this.position,
                1000, -500 - 500 * this.position,
                (v) => `translateX(${v}px)`
            ));
            this.tl.addAnimation(new DOMElementStyleNumberAnimation(
                next,
                "transform",
                0, 500 - 500 * this.nextPosition,
                1000, -500 * this.nextPosition,
                (v) => `translateX(${v}px)`
            ));
            this.tl.restart();

            this.position = this.nextPosition;

            this.nextPicTimer = setTimeout(this.nextPic, 3000);
        }
        this.nextPicTimer = setTimeout(this.nextPic, 3000);
    }

    _addGesture() {
        this.offset = 0;

        this.root.addEventListener("mousedown", event => {
            this.tl.pause();

            let currentTime = Date.now();
            if (currentTime - this.offsetTimeStart < 1000) {
                this.offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
            } else {
                this.offset = 0;
            }

            clearTimeout(this.nextPicTimer);
        });

        this.root.addEventListener("pan", event => {
            event.origin.preventDefault();
            let current = this.children[this.position];

            let nextPosition = (this.position + 1) % this.children.length;
            let next = this.children[nextPosition];
            let lastPosition = (this.children.length + position - 1) % this.children.length;
            let last = this.children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition  + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${- 500 * position + event.dx + offset}px)`
        });

        this.root.addEventListener("panend", event => {
            event.origin.preventDefault();
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
                    position--
                    isLeft = true;
                } else if (event.dx < -250) {
                    position++
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }
            position = (this.children.length + position) % this.children.length;

            let current = this.children[position];
            let nextPosition = (position + 1) % this.children.length;
            let next = children[nextPosition];
            let lastPosition = (this.children.length + position - 1) % this.children.length;
            let last = this.children[lastPosition];

            if (!isLeft) {
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`

            if (isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`

            current.style.transition = "";
            current.style.transform = `translate(${- 500 * position}px)`
        });
        this.root.addEventListener("mousedown", event => event.preventDefault());
    }
}