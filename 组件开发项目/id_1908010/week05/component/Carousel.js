import { enableGesture } from './Gesture.js';
import { cubicBezier } from './CubicBezier.js';
import { TimeLine } from './TimeLine.js';


const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state') 

export class CarouselView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null); 
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //如果要设计toString，这样不会去找原型链
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.config = config;
        this.didCreated();
    }

    appendTo(element) {
        element.appendChild(this.root)
    }

    //lifeCycle
    didCreated() {
        let {width, height, children} = this.config;
        this.root = document.createElement('div');
        this.width = width
        this.height = height;
        this.children = children;
        this.startX  = 0;
        this.position = 0;
        enableGesture(this.root)
        this.root.style.overflow = 'hidden';
        this.root.style.whiteSpace = 'nowrap';
        this.root.style.outline = 'solid 1px blue';


        let panmove = (event) => {
            if (event.isVertical) 
                return;
            event.preventDefault();//阻止默认的拖拽效果
            for (let child of this.children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${this.startX + event.dx}px)`; //复位
            }
        }
    
        let panend = (event) => {
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
                this.position = - Math.round((this.startX + event.dx) / 500);  // 取最近的整数
            }
    
            this.position = Math.max(0, Math.min(this.position, this.children.length - 1));//如果position 不取正值
    
            for (let child of this.children) {
                child.style.transition = "";
                child.style.transform = `translate(${-this.position * 500}px)`; //复位
            }
    
            this.startX  = -this.position * 500;
        }

        this.root.addEventListener('panmove', panmove);
        this.root.addEventListener('panend', panend);
        
    }

    didMount() {

    }

    didUnmount() {

    }

    didUpdate() {

    }

    // method
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }

    pause() {

    }

    resume() {

    }

    next() {

    }

    prev() {

    }

    // width height children duration autoplay easing 

    setAattribute(type, value) {
        switch(type) {
            case 'width':
                this.width = value
                break;
            case 'height': 
                this.height = value
                break;
            case 'children': 
                this.children = value;
                break;
            case 'duration': 
                this.duration = value;
                break;
            case 'autoplay':
                this.autoplay = value;
                break;
            case 'easing':
                this.easing = value;
                break;
        }
        return this[ATTRIBUTE_SYMBOL][type] = value
    }
    getAttribute(type) {
        return this[ATTRIBUTE_SYMBOL][type]
    }   

    set width(value) {
        this[PROPERTY_SYMBOL].width = value
        this.root.style.width = value;
    }

    get width() {
        return this[PROPERTY_SYMBOL].width
    }

    set height(value) {
        this[PROPERTY_SYMBOL].height = value
        this.root.style.height = value;
    }

    get height() {
        return this[PROPERTY_SYMBOL].height
    }

    set children(value) {
        this[PROPERTY_SYMBOL].children = value
        if (value && value.length > 0) {
            for (let child of value) { 
                this.root.appendChild(child);
            }
        }
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    set duration(value) {
        this[PROPERTY_SYMBOL].duration = value
    }

    get duration() {
        return this[PROPERTY_SYMBOL].duration;
    }

    set autoplay(value) {
        this[PROPERTY_SYMBOL].autoplay = value
    }

    get autoplay() {
        return this[PROPERTY_SYMBOL].autoplay;
    }

    set easing(value) {
        this[PROPERTY_SYMBOL].easing = value
    }

    get easing() {
        return this[PROPERTY_SYMBOL].easing;
    }

    set default(value) {
        this[PROPERTY_SYMBOL].default = value
    }

    get default() {
        return this[PROPERTY_SYMBOL].default
    }

    set startX(value) {
        this[PROPERTY_SYMBOL].startX = value
        // this.triggerEvent('panend');
    }

    get startX() {
        return this[PROPERTY_SYMBOL].startX;
    }

    set position(value) {
        this[PROPERTY_SYMBOL].position = value;
    }

    get position() {
        return this[PROPERTY_SYMBOL].position;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener)
    } 

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            throw new Error(`no such listener ${type}`)
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
}


