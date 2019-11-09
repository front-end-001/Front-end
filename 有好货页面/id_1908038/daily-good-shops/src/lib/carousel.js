//存储私有变量
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
const CONFIG_SYMBOL = Symbol("config");

class Carousel {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null); //比{} 纯净，不带原型prototype，与其他无关
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[CONFIG_SYMBOL] = config || Object.create(null);

        this.created();
    }
    //methods
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    animation() {
        let children = Array.prototype.slice.call(this.root.children);
        let position = 0;
        
        let nextPic = () => {
            let nextPosition = position + 1;

            nextPosition = nextPosition % children.length;

            let current = children[position],
                next = children[nextPosition];
            //把next摆到正确的位置
            //next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`

            this.offsetTimeStart = Date.now();

            this.tl.addAnimation(new DOMElementStyleNumberAnimation(
                current,
                "transform",
                0, -500 * position,
                1000, -500 - 500 * position,
                (v) => `translateX(${v}px)`
            ));
            this.tl.addAnimation(new DOMElementStyleNumberAnimation(
                next,
                "transform",
                0, 500 - 500 * nextPosition,
                1000, -500 * nextPosition,
                (v) => `translateX(${v}px)`
            ));
            this.tl.restart();

            position = nextPosition;
            this.nextPicTimer = setTimeout(nextPic, this[PROPERTY_SYMBOL].speed);
        }
        this.nextPicTimer = setTimeout(nextPic, this[PROPERTY_SYMBOL].speed);
    }
    createContainer() {
        this.root = document.createElement("div");
        this.root.id = "container";
        this.root.className = "carousel";
        this.root.style.width = this[CONFIG_SYMBOL].width || "100%";
        this.root.style.height = this[CONFIG_SYMBOL].height || "auto";
        let i = this[CONFIG_SYMBOL].data.length;
        for (let d of this[CONFIG_SYMBOL].data) {
            let e = document.createElement("img");
            e.src = d;
            this.root.appendChild(e);
            e.style.zIndex = i++;
            e.onclick = event =>
                console.log(d);
        }
    }
    handleCarousel() {
        let startTransform;

        let offset = 0;
        this.root.addEventListener("mousedown", event => {
            //startTransform = - position * 500;
            this.tl.pause();

            let currentTime = Date.now();
            if (currentTime - this.offsetTimeStart < 1000) {
                offset = 500 - ease((currentTime - this.offsetTimeStart) / 1000) * 500;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(this.nextPicTimer);
        });
        this.root.addEventListener("pan", event => {
            // event.origin.preventDefault();
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition  + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${- 500 * position + event.dx + offset}px)`
        });
        this.root.addEventListener("panend", event => {
            // event.origin.preventDefault();
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

                //position = (Math.round((position * 500 - event.dx) / 500));
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
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`

            if (isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`

            current.style.transition = "";
            current.style.transform = `translate(${- 500 * position}px)`

            /*
                        for(let child of children) {
                            child.style.transition = "";
                            child.style.transform = `translate(${ - position * 500}px)`;
                        }
            */
        });
        this.root.addEventListener("mousedown", event => event.preventDefault());
    }
    //lifecycle
    created() {
        this.createContainer();
    }
    mounted() {
        this.offsetTimeStart = 0;
        this.tl = new TimeLine();
        this.animation();
        this.handleCarousel();
    }
    unmounted() {

    }
    update() {

    }


    //log
    log() {
        console.log("width:", this.width);
    }
    //property 实现
    get width() {
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value) {
        return this[PROPERTY_SYMBOL].width = value;
    }
    get speed() {
        return this[PROPERTY_SYMBOL].speed;
    }
    set speed(value) {
        return this[PROPERTY_SYMBOL].speed = value;
    }
    //attribute
    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == "width") {
            this.width = value; //HTML单向同步
            this.triggerEvent("widthchange");
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    //event
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set();
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        //从数组里删除元素
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this); //es5
        }
    }
}