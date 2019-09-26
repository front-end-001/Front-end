const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


class Carousel {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //存attribute用Object.create(null)，与其他代码没有关系
        this[EVENT_SYMBOL] = Object.create(null); 
        this[STATE_SYMBOL] = Object.create(null);
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.root.style.width = this.width;
        this.root.style.height = this.height;
        this.root.style.outline = "1px solid blue";
        this.root.style.whiteSpace = "nowrap";
        this.root.style.overflow = "hidden";
        this.root.style.position = "relative";
        for (let d of this.imageUrls) {
            let e = document.createElement("img");
            e.style.width = "100%";
            e.style.height = "100%";
            e.style.display = "inline-block";
            e.src = d;
            this.root.appendChild(e);
        }
        this.children = Array.prototype.slice.call(this.root.children);

        let list = document.createElement("ul");
        list.style.position = "absolute";
        list.style.bottom = "30px";
        list.style.right = "64px";
        list.style.display = "flex";
        list.style.justifyContent = "space-between";
        list.style.alignItems = "center";
        list.style.width = this.children.length * 14 + (this.children.length - 1) * 15 + "px";
        this.root.appendChild(list);
        for(let i = 0; i < this.children.length; i++) {
            let e = document.createElement("div");
            e.style.width = "14px";
            e.style.height = "14px";
            e.style.borderRadius = "50%";
            e.style.backgroundColor = "white";
            e.style.opacity = "0.2";
            list.appendChild(e);
        }
        list.children[0].style.opacity = "1";

        this.position = 0;
        this.tl = new Timeline;
        this.offsetStartTime = 0;
        this.nextPic = () => {
            let nextPosition = this.position + 1;
            nextPosition = nextPosition % this.children.length;

            let current = this.children[this.position],
                next = this.children[nextPosition];
            // 将next放到正确的位置上
            // next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

            this.offsetStartTime = Date.now();
            this.tl.addAnimation(new DOMElementStyleNumberAnimation(
                current,
                "transform",
                0, - 500 * this.position,
                500, -500 - 500 * this.position,
                (v) => `translateX(${v}px)`
            ));
            this.tl.addAnimation(new DOMElementStyleNumberAnimation(
                next,
                "transform",
                0, 500 -500 * nextPosition,
                500, -500 * nextPosition,
                (v) => `translateX(${v}px)`
            ));
            for(let child of list.children) {
                child.style.opacity = "0.2";
            }
            list.children[this.position].style.opacity = "1";

            this.position = nextPosition;
            this.tl.restart();
            // setTimeout(() => {
            //     // 把current挪出视口
            //     current.style.transition = "ease 0.5s";
            //     current.style.transform = `translate(${-100 - 100 * position}%)`;
            //     console.log(position);
            //     // 把next挪进视口
            //     next.style.transition = "ease 0.5s";
            //     next.style.transform = `translate(${-100 * nextPosition}%)`;
                
                
                // position = nextPosition;
            // }, 16);
            this.nextPicTimer = setTimeout(this.nextPic, 2000);
        };
        this.nextPicTimer = setTimeout(this.nextPic, 2000);
    }
    mounted() {
        let x = 0;
        let offset = 0;
        enableGesture(this.root);
        this.root.addEventListener("touchstart", event => {
            clearTimeout(this.nextPicTimer)
            this.tl.pause();
        })
        this.root.addEventListener("mousedown", event => {
            this.tl.pause();
            let currentTime = Date.now();
            if(currentTime - this.offsetStartTime < 1000 ) {
                offset = (500 - ease((currentTime - this.offsetStartTime) / 1000) * 500);
            } else {
                offset = 0;
            }
            clearTimeout(this.nextPicTimer)
        })
        this.root.addEventListener("mouseup", event => {
            this.nextPicTimer = setTimeout(this.nextPic, 2000);
        })
        this.root.addEventListener("pan", event => {
            //console.log("pan")
            if (event.isVertical)
                return;
            for (let child of this.children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${event.dx + x}px)`;
            }
            
            let current = this.children[this.position];
            let next = this.children[(this.children.length + this.position + 1) % this.children.length];
            let nextPosition = (this.children.length + this.position + 1) % this.children.length;
            let prev = this.children[(this.children.length + this.position - 1) % this.children.length];
            let prevPosition = (this.children.length + this.position - 1) % this.children.length;
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset }px)`;
            prev.style.transition = "ease 0s";
            prev.style.transform = `translate(${-500 - 500 * prevPosition+ event.dx + offset }px)`;
            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-500 * this.position+ event.dx + offset}px)`;
        })
        this.root.addEventListener("panend", event => {
            if (event.isVertical)
                return;
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.position = this.position - 1;
                }
                if (event.dx < 0) {
                    this.position = this.position + 1;
                }
            } else {
                this.position = (Math.round((this.position * 500 - event.dx) / 500));
            }
            this.position = (this.children.length + this.position) % this.children.length;
            let current = this.children[this.position];
            let next = this.children[(this.children.length + this.position + 1) % this.children.length];
            let nextPosition = (this.children.length + this.position + 1) % this.children.length;
            let prev = this.children[(this.children.length + this.position - 1) % this.children.length];
            let prevPosition = (this.children.length + this.position - 1) % this.children.length;
            next.style.transition = "";
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`;
            prev.style.transition = "";
            prev.style.transform = `translate(${-500 - 500 * prevPosition}px)`;
            current.style.transition = "";
            current.style.transform = `translate(${-500 * this.position}px)`;
            for (let child of this.children) {
                child.style.transition = "";
                child.style.transform = `translate(${-this.position * 500}px)`;
            }
            x = -this.position * 500;
        })
        this.root.addEventListener("mousedown", event => event.preventDefault());
    }
    unmounted() {

    }
    update() {

    }

    log() {
        console.log("width: ", this.width);
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
    get speed() {
        return this[PROPERTY_SYMBOL].speed;
    }
    set speed(value) {
        return this[PROPERTY_SYMBOL].speed = value;
    }
    get imageUrls() {
        return this[PROPERTY_SYMBOL].imageUrls;
    }
    set imageUrls(value) {
        return this[PROPERTY_SYMBOL].imageUrls = value;
    }
    get autoPlay() {
        return this[PROPERTY_SYMBOL].autoPlay;
    }
    set autoPlay(value) {
        return this[PROPERTY_SYMBOL].autoPlay = value;
    }
    get direction() {
        return this[PROPERTY_SYMBOL].direction;
    }
    set direction(value) {
        return this[PROPERTY_SYMBOL].direction = value;
    }
    get loop() {
        return this[PROPERTY_SYMBOL].loop;
    }
    set loop(value) {
        return this[PROPERTY_SYMBOL].loop = value;
    }
    get indicator() {
        return this[PROPERTY_SYMBOL].indicator;
    }
    set indicator(value) {
        return this[PROPERTY_SYMBOL].indicator = value;
    }
    get init() {
        return this[PROPERTY_SYMBOL].init;
    }
    set init(value) {
        return this[PROPERTY_SYMBOL].init = value;
    }
    get duration() {
        return this[PROPERTY_SYMBOL].duration;
    }
    set duration(value) {
        return this[PROPERTY_SYMBOL].duration = value;
    }


    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if(name == "width") {
            this.width = value;
            this.triggerEvent("widthchange");
        }
        if(name == "height") {
            this.height = value;
            this.triggerEvent("heightchange");
        }
        if(name == "speed") {
            this.speed = value;
            this.triggerEvent("speedchange");
        }
        if(name == "imageUrls") {
            this.imageUrls = value;
            this.triggerEvent("imageUrlschange");
        }
        if(name == "autoPlay") {
            this.autoPlay = value;
            this.triggerEvent("autoPlaychange");
        }
        if(name == "direction") {
            this.direction = value;
            this.triggerEvent("directionchange");
        }
        if(name == "loop") {
            this.loop = value;
            this.triggerEvent("loopchange");
        }
        if(name == "init") {
            this.init = value;
            this.triggerEvent("initchange");
        }
        if(name == "duration") {
            this.duration = value;
            this.triggerEvent("durationchange");
        }

        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    
    addEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type]  = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if(!this[EVENT_SYMBOL][type]) {
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        if(!this[EVENT_SYMBOL][type]) 
            return;
        for(let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }
}