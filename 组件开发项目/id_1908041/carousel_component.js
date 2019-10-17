const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("arrtibute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
class Carousel {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    created() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        this[STATE_SYMBOL].tl = new Timeline;
        this[STATE_SYMBOL].offsetStartTime = 0;
        this[STATE_SYMBOL].offset = 0;
        this[STATE_SYMBOL].children = [];
        this[STATE_SYMBOL].nextFrameTimer = null;
        this[PROPERTY_SYMBOL].speed = 1000;
        this[PROPERTY_SYMBOL].position = 0;


    }
    mounted() {
        this[PROPERTY_SYMBOL].width = this.root.getBoundingClientRect().width;
        enableGesture(this.root);
        this.root.addEventListener("touchstart", event => {
            event.preventDefault()
            this[STATE_SYMBOL].tl.pause();
            clearTimeout(this.nextFrameTimer);
            let offsetCurrentTime = Date.now()
            if (offsetCurrentTime - this.offsetStartTime < this.speed) {
                this.offset = this.width - ease((offsetCurrentTime - this.offsetStartTime) / this.speed) * this.width;
            } else {
                this.offset = 0;
            }
        });
        this.root.addEventListener("pan", event => {
            if (event.isVertical) return;
            let nextPosition = (this.position + 1) % this.children.length,
                previousPosition =
                (this.children.length + this.position - 1) % this.children.length;
            let next = this.children[nextPosition],
                current = this.children[this.position],
                previous = this.children[previousPosition];
            previous.style.transition = "ease 0s";
            previous.style.transform = `translate(${(-previousPosition - 1) *
                this.width +
                event.dx + this.offset}px)`;
            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-this.position * this.width +
                event.dx + this.offset}px)`;
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${(1 - nextPosition) * this.width +
                event.dx + this.offset}px)`;
        });
        this.root.addEventListener("panend", event => {

            if (event.isVertical) return;
            let isLeft;
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx + this.offset > 0) {
                    this.position--;
                    isLeft = true;
                }
                if (event.dx + this.offset < 0) {
                    this.position++;
                    isLeft = false;
                }
            } else {
                if (event.dx + this.offset >= this.width / 2) {
                    isLeft = true;
                    this.position--;
                } else if (event.dx + this.offset < -this.width / 2) {
                    isLeft = false;
                    this.position++
                } else if (event.dx + this.offset >= 0) {
                    isLeft = false;
                } else {
                    isLeft = true
                }
                //position = -Math.round((-position * width + event.dx) / width);
            }
            //position = Math.max(0, Math.min(position, children.length - 1));
            this.position = (this.children.length + this.position) % this.children.length;
            let nextPosition = (this.position + 1) % this.children.length,
                previousPosition =
                (this.children.length + this.position - 1) % this.children.length;
            let next = this.children[nextPosition],
                current = this.children[this.position],
                previous = this.children[previousPosition];
            if (!isLeft) {
                previous.style.transition = "";
            } else {
                previous.style.transition = "ease 0s";
            }
            previous.style.transform = `translate(${(-previousPosition - 1) *
                this.width}px)`;
            current.style.transition = "";
            current.style.transform = `translate(${-this.position * this.width}px)`;
            if (isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${(1 - nextPosition) * this.width}px)`;
            setTimeout(() => {
                this.tl.resume();
                this.nextFrameTimer = setTimeout(this.nextFrame, 2000);
            }, 500)

        });
        //阻止图片默认拖拽效果
        this.root.addEventListener("mousedown", event => {
                event.preventDefault()
                this.tl.pause();
                clearTimeout(this.nextFrameTimer);
            }

        );
    }
    update() {

    }
    unmounted() {

    }
    set autoplay(value) {
        if (value) {
            this.nextFrameTimer = setTimeout(this.nextFrame, 2000);
        } else {
            clearTimeout(this.nextFrameTimer)
        }
        this[PROPERTY_SYMBOL].autoplay = value;
    }
    get autoplay() {
        return this[PROPERTY_SYMBOL].autoplay;
    }
    set data(value) {
        this.children = []
        for (let d of value) {
            let div = document.createElement("div");
            let item = document.createElement("img");
            item.src = d;
            div.appendChild(item);
            this.root.appendChild(div);
            this.children.push(div)
        }
        return this[PROPERTY_SYMBOL].data = value;
    }
    get data() {
        return this[PROPERTY_SYMBOL].data;
    }
    set children(value) {
        this[STATE_SYMBOL].children = value;
    }
    get children() {
        return this[STATE_SYMBOL].children;
    }
    set position(value) {
        this[PROPERTY_SYMBOL].position = value
    }
    get position() {
        return this[PROPERTY_SYMBOL].position
    }
    set width(value) {
        return this[PROPERTY_SYMBOL].width = value
    }
    get width() {
        return this[PROPERTY_SYMBOL].width
    }
    set offset(value) {
        return this[STATE_SYMBOL].offset = value;
    }
    get offset() {
        return this[STATE_SYMBOL].offset;
    }
    set offsetStartTime(value) {
        this[STATE_SYMBOL].offsetStartTime = value;
    }
    get offsetStartTime() {
        return this[STATE_SYMBOL].offsetStartTime
    }
    set tl(value) {
        return this[STATE_SYMBOL].tl = value;
    }
    get tl() {
        return this[STATE_SYMBOL].tl;
    }
    set speed(value) {
        return this[PROPERTY_SYMBOL].speed = value;
    }
    get speed() {
        return this[PROPERTY_SYMBOL].speed
    }
    set nextFrameTimer(value) {
        return this[STATE_SYMBOL].nextFrameTimer = value;
    }
    get nextFrameTimer() {
        return this[STATE_SYMBOL].nextFrameTimer;
    }
    nextFrame = () => {
        let nextPosition = (this.position + 1) % this.children.length;
        let current = this.children[this.position],
            next = this.children[nextPosition];
        current.style.transition = "ease 0s";
        next.style.transition = "ease 0s";
        next.style.transform = `translate(${-nextPosition * this.width +
              this.width}px)`;
        this.offsetStartTime = Date.now();
        this.tl.addAnimation(
            new DOMElementStyleNumberAnimation(
                current,
                "transform",
                0,
                -this.width * this.position,
                this.speed,
                -this.width * this.position - this.width,
                v => `translateX(${v}px)`
            )
        );
        this.tl.addAnimation(
            new DOMElementStyleNumberAnimation(
                next,
                "transform",
                0,
                this.width - nextPosition * this.width,
                this.speed,
                -nextPosition * this.width,
                v => `translateX(${v}px)`
            )
        );

        this.tl.restart();
        this.position = nextPosition;
        this.nextFrameTimer = setTimeout(this.nextFrame, 2000);
    }
    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if(name == "autoplay"){
            this.autoplay = value;
        }
        if(name == "data"){
            this.data = value;
        }
        if(name == "position"){
            this.position = value;
        }
        if(name == "speed"){
            this.speed = value
        }
        if(name == "width"){
            this.width = width;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this)
        }
    }
}