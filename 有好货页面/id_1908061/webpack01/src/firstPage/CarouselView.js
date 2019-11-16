import {gesture} from "../libs/gesture.js";
import {Timeline, DOMElementStyleNumberAnimation} from "../libs/animation.js";
import css from './CarouselView.css';

import Div from '../Div.js';
import {create} from '../create.js';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

let PROPERTY_SYMBOL = Symbol('property');
let ATTRIBUTE_SYMBOL = Symbol('attribute');
let EVENT_SYMBOL = Symbol('event');
let STATE_SYMBOL = Symbol('state');

export class CarouselView{
    constructor(){
       this[PROPERTY_SYMBOL] = Object.create(null);
       this[ATTRIBUTE_SYMBOL] = Object.create(null);
       this[EVENT_SYMBOL] = Object.create(null);
       this[STATE_SYMBOL] = Object.create(null);

       this[ATTRIBUTE_SYMBOL].width = 0;
       this[ATTRIBUTE_SYMBOL].tl = new Timeline();
       this[ATTRIBUTE_SYMBOL].position = 0;
       this[ATTRIBUTE_SYMBOL].offsetStartTime = 0;
       this[ATTRIBUTE_SYMBOL].offset = 0;
       
       this.created();
    }
    appendTo(element){
        element.appendChild(this.root);
        gesture(this.root); 
        this.mounted();
    }
    created(){
        this.root = document.createElement("div");
        this.root.classList.add('carousel-view');
    }
    mounted(){
        this.nextPic();

        this.root.addEventListener("touchmove", e => { 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });

        this.root.addEventListener("touchstart", event => {
            this[ATTRIBUTE_SYMBOL].tl.pause();
            clearTimeout(this[ATTRIBUTE_SYMBOL].nextPicTimer);
    
            let currentTime = Date.now();
            if(currentTime - this[ATTRIBUTE_SYMBOL].offsetStartTime < 1000) {
                this[ATTRIBUTE_SYMBOL].offset = this[ATTRIBUTE_SYMBOL].width - ease((currentTime - this[ATTRIBUTE_SYMBOL].offsetStartTime) / 1000) * this[ATTRIBUTE_SYMBOL].width;
            } else {
                this[ATTRIBUTE_SYMBOL].offset = 0;
            }
        });

        this.root.addEventListener("pan", event => {
            if (event.isVertical) return;
          
            let position = this[ATTRIBUTE_SYMBOL].position;
            let current = this[ATTRIBUTE_SYMBOL].children[position];

            let nextPosition = (position + 1) % this[ATTRIBUTE_SYMBOL].children.length;
            let next = this[ATTRIBUTE_SYMBOL].children[nextPosition];

            let prevPosition = (this[ATTRIBUTE_SYMBOL].children.length + position - 1) % this[ATTRIBUTE_SYMBOL].children.length;
            let prev= this[ATTRIBUTE_SYMBOL].children[prevPosition];
            
            prev.style.transition = "ease 0s";
            prev.style.transform = `translate(${-this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * prevPosition + event.dx + this[ATTRIBUTE_SYMBOL].offset}px)`;

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * nextPosition + event.dx + this[ATTRIBUTE_SYMBOL].offset}px)`;
    
            current.style.transition = "ease 0s";
            current.style.transform = `translate(${ - this[ATTRIBUTE_SYMBOL].width * position + event.dx + this[ATTRIBUTE_SYMBOL].offset}px)`;
        });

        this.root.addEventListener("panend", event => {
            if (event.isVertical) return;

            let isLeft;
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this[ATTRIBUTE_SYMBOL].position --;
                    isLeft = true;
                }
                if (event.dx < 0) {
                    this[ATTRIBUTE_SYMBOL].position ++;
                    isLeft = false;
                }
            } else {
                if (event.dx > this[ATTRIBUTE_SYMBOL].width/2) {
                    this[ATTRIBUTE_SYMBOL].position --;
                    isLeft = true;
                } else if (event.dx < - this[ATTRIBUTE_SYMBOL].width/2) {
                    this[ATTRIBUTE_SYMBOL].position ++;
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }
            this[ATTRIBUTE_SYMBOL].position = (this[ATTRIBUTE_SYMBOL].children.length + this[ATTRIBUTE_SYMBOL].position) % this[ATTRIBUTE_SYMBOL].children.length;
            
            let current = this[ATTRIBUTE_SYMBOL].children[this[ATTRIBUTE_SYMBOL].position];

            let nextPosition = (this[ATTRIBUTE_SYMBOL].position + 1) % this[ATTRIBUTE_SYMBOL].children.length;
            let next = this[ATTRIBUTE_SYMBOL].children[nextPosition];

            let prevPosition = (this[ATTRIBUTE_SYMBOL].children.length + this[ATTRIBUTE_SYMBOL].position - 1) % this[ATTRIBUTE_SYMBOL].children.length;
            let prev = this[ATTRIBUTE_SYMBOL].children[prevPosition];

            if (!isLeft) {
                prev.style.transition = "ease 0.5s";
            } else {
                prev.style.transition = "ease 0s";
            }
            prev.style.transform = `translate(${-this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * prevPosition}px)`;

            if (isLeft) {
                next.style.transition = "ease 0.5s";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * nextPosition}px)`;

            current.style.transition = "ease 0.5s";
            current.style.transform = `translate(${- this[ATTRIBUTE_SYMBOL].width * this[ATTRIBUTE_SYMBOL].position}px)`;
        
            this[ATTRIBUTE_SYMBOL].nextPicTimer = setTimeout(this.nextPic.bind(this), 3000);
        });

    }

    addImgs(val){
        for(let item of val) {
            let img = document.createElement("img");
            img.classList.add('img');
            img.src = item.image;
            this.root.appendChild(img);
        }
        this[ATTRIBUTE_SYMBOL].children = this.root.getElementsByTagName('img');
        this.addIndicator();
    }

    addIndicator(){
        this.indicator = document.createElement("div");
        this.indicator.classList.add('indicator');
        this.root.appendChild(this.indicator);

        for(let i = 0; i < this[ATTRIBUTE_SYMBOL].children.length; i++) {
            let circle = document.createElement("div");
            circle.classList.add('circle');
            this.indicator.appendChild(circle);
        }
        setInterval(()=>{
            for(let child of this.indicator.children){
                child.style.opacity = "0.3";
            }
            this.indicator.children[this[ATTRIBUTE_SYMBOL].position].style.opacity = '1'; 
        },500);  
    }
    
    nextPic(){
        this[ATTRIBUTE_SYMBOL].width = parseInt( window.getComputedStyle(this.root).getPropertyValue("width"));

        let nextPosition = this[ATTRIBUTE_SYMBOL].position + 1;
        nextPosition = nextPosition % this[ATTRIBUTE_SYMBOL].children.length;

        let current = this[ATTRIBUTE_SYMBOL].children[this[ATTRIBUTE_SYMBOL].position],
        next = this[ATTRIBUTE_SYMBOL].children[nextPosition];

        for(let child of this[ATTRIBUTE_SYMBOL].children) {                      
            child.style.zIndex = 0;
        }
        current.style.zIndex = 1;
        next.style.zIndex = 1;
        current.style.transition = "ease 0s"; 
        
        next.style.transition = "ease 0s";
        next.style.transform = `translate(${this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * nextPosition}px)`;

        this[ATTRIBUTE_SYMBOL].offsetTimeStart = Date.now();

        this[ATTRIBUTE_SYMBOL].tl.clearAnimtaion();

        this[ATTRIBUTE_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
            current,
            "transform",
            0, - this[ATTRIBUTE_SYMBOL].width * this[ATTRIBUTE_SYMBOL].position,
            1000, - this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * this[ATTRIBUTE_SYMBOL].position,
            (v) => `translateX(${v}px)`
        ));
        this[ATTRIBUTE_SYMBOL].tl.addAnimation(new DOMElementStyleNumberAnimation(
            next,
            "transform",
            0, this[ATTRIBUTE_SYMBOL].width - this[ATTRIBUTE_SYMBOL].width * nextPosition,
            1000, - this[ATTRIBUTE_SYMBOL].width * nextPosition,
            (v) => `translateX(${v}px)`
        ));
        this[ATTRIBUTE_SYMBOL].tl.restart();
        this[ATTRIBUTE_SYMBOL].position = nextPosition;
        this[ATTRIBUTE_SYMBOL].nextPicTimer = setTimeout(this.nextPic.bind(this), 3000);
    }

    get width() {
        return this[PROPERTY_SYMBOL].width;
    }

    set width(value) {
        this[PROPERTY_SYMBOL].width = value;
    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name,val){
        if (name == "data") {            
            this.addImgs(val);
        }
       return this[ATTRIBUTE_SYMBOL][name] = val;
    }
    addEventListener(type,listener){
       if(!this[EVENT_SYMBOL][type]){
           this[EVENT_SYMBOL][type] = new Set;
       }
       this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type,listener){
       if(!this[EVENT_SYMBOL][type]){
           return;
       }
       this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        if(!this[EVENT_SYMBOL][type]) return;
        for(let event of this[EVENT_SYMBOL][type]){
            event.call(this);
        }
    }
}
