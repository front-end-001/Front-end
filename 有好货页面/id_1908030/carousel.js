import Timeline, { DomElementStyleNumberAnimation } from "./animation.js";
import { enableGesture } from "./gesture.js"

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Carousel {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        
        this.created();
    }

    toHTML(){
        
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.className = "carousel";
    }
    mounted(){
        this.render();
    }
    unmounted(){

    }
    update(){

    }
    render() {
        let imgs = this[ATTRIBUTE_SYMBOL]["imgs"] || [];
        let i = imgs.length;
        if (i == 0) {
            return;
        }
        for (let d of imgs) {
            let e = document.createElement("img");
            e.src = d;
            e.style.width = "100%";
            e.style.height = "100%";
            this.root.appendChild(e);
            e.style.zIndex = i++;
        }
        var tl = new Timeline;
        let children = Array.prototype.slice.call(this.root.children);
        let position = 0;
        let offsetTimeStart = 0
        let nextPic = ()=>{
            let nextPosition = position + 1;

            nextPosition = nextPosition % children.length;

            let current = children[position],
                next = children[nextPosition];
            
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`

            offsetTimeStart = Date.now();

            tl.addAnimation(new DomElementStyleNumberAnimation(
                current,
                "transform",
                0, - 1000 * position,
                2000, - 1000 - 1000 * position,
                (v) => `translateX(${v}px)`
            ));
            tl.addAnimation(new DomElementStyleNumberAnimation(
                next,
                "transform",
                0, 1000 - 1000 * nextPosition,
                2000, - 1000 * nextPosition,
                (v) => `translateX(${v}px)`
            ));
            tl.restart();

            position = nextPosition;

            nextPicTimer = setTimeout(nextPic, 3000);
        }
        let nextPicTimer = setTimeout(nextPic,3000);

        let offset = 0;
        this.root.addEventListener("mousedown", event => {
            event.preventDefault();
            //startTransform = - position * 1000;
            tl.pause();

            let currentTime = Date.now();
            if(currentTime - offsetTimeStart < 1000) {
                offset = 1000 - ease((currentTime - offsetTimeStart) / 1000) * 1000;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(nextPicTimer);
        });
        this.root.addEventListener("pan", event => {
            // event.origin.preventDefault();
            event.preventDefault();
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-1000 - 1000 * lastPosition + event.dx + offset}px)`

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${1000 - 1000 * nextPosition  + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${- 1000 * position + event.dx + offset}px)`
        });
        this.root.addEventListener("panend", event => {
            // event.origin.preventDefault();
            event.preventDefault();
            let isLeft;
            if(event.isFlick) {
                if(event.vx > 0) {
                    position --;
                    isLeft = true;
                }

                if(event.vx < 0) {
                    position ++;
                    isLeft = false;
                }

            } else {
                if(event.dx > 250) {
                    position --
                    isLeft = true;
                } else if(event.dx < -250) {
                    position ++
                    isLeft = false;
                } else if(event.dx > 0) {
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

            if(!isLeft){
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-1000 - 1000 * lastPosition}px)`

            if(isLeft){
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${1000 - 1000 * nextPosition}px)`

            current.style.transition = "";
            current.style.transform = `translate(${- 1000 * position}px)`

        });

        enableGesture(this.root);

        let x = 0;
        this.root.addEventListener("pan", event => {
            for (let e of children) {
                e.style.transition ="ease 0s";
                e.style.transform = `translateX(${x + event.dx}px)`
            }
        });
        this.root.addEventListener("panend", event => {
            if (event.isVertical) {
                return;
            }
            if (event.isFilck) {
                if (event.dx > 0) {
                    position = position - 1;
                } else {
                    position = position + 1;
                }
            } else {
                position = - Math.round((x + event.dx) / 1000);
            }
            
            position = Math.max(0, Math.min(children.length - 1, position));
            for (let e of children) {
                e.style.transition = "";
                e.style.transform = `translate(${- 100 * position}%)`
            }
            x = - 1000 * position;
        });
    }
    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        console.log("property change");
        return this[PROPERTY_SYMBOL].width = value;
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "width") {
            this.width = value;
            console.log("attibute change");
        }
        if(name == "style") {
            this.root.style = value;
        }
        if(name == "imgs") {
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = "";
            this.render();
            return;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}