import { enableGesture } from './gesture';
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
        this[ATTRIBUTE_SYMBOL].data = config||[];
        this[PROPERTY_SYMBOL].children = [];
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this[PROPERTY_SYMBOL].width=703;
        this.root.style= "height: 342px;border-radius:25px;white-space: nowrap;overflow: hidden;margin:0 auto";
        this.root.style.width=this[PROPERTY_SYMBOL].width+'px';
        this.mounted();
    }
    appendChild(child){
        this.children.push(child);
        child.root.style='width: 100%;height: 100%;display: inline-block;transition: ease 0.5s';
        child.root.src = child.src
        this.root.appendChild(child.root)
    }
    created(){
        this.root = document.createElement("div");
        
        
        console.log(this);
        
        // let img = document.createElement('img');
        // img.src=
    }
    mounted(){ //？@nyc
        enableGesture(this.root);
        let position = 0;
        let startTransform;
        let nextFrame = () => {
            let nextPosition = position + 1;
            nextPosition = nextPosition % this.children.length;
            let current = this.children[position];
            let next = this.children[nextPosition];

            //快速把next挪到正确的位置
            next.root.style.transition = "ease 0s";
            next.root.style.transform = `translate(${100 - 100 * nextPosition}%)`;

            setTimeout(() => {
                //current挪出视口
                current.root.style.transition = '';
                current.root.style.transform = `translate(${-100 - 100 * position}%)`
                //next挪进视口
                next.root.style.transition = '';
                next.root.style.transform = `translate(${- 100 * nextPosition}%)`
                position = nextPosition;
            }, 16)
            setTimeout(nextFrame, 3000);
        }
        setTimeout(nextFrame, 3000);
        let startX = 0;
        this.root.addEventListener('mousedown', e => {
            e.preventDefault();
        })
        this.root.addEventListener('panstart', event => {
            console.log('panstart')
            startX = event.startX;
            startTransform = -position * this.width;
        })
        this.root.addEventListener("pan", (event) => {
            console.log('pan', startTransform + event.dx + startX);
            for (let child of this.children) {
                child.root.style.transition = "ease 0s";
                child.root.style.transform = `translateX(${startTransform + event.dx}px)`;
            }
            //  main.style.transform = `translateX(${event.dx + startX}px)`
        });
        this.root.addEventListener("panned", event => {
            if(event.isFlick){
                console.log('flick')
                if(event.dx>0){
                    position = position-1;
                }
                if(event.dx<0){
                    position = position+1;
                }
            }
            
            position = Math.max(0, Math.min(position, this.children.length - 1));
            for (let child of this.children) {
                child.root.style.transition = "";
                child.root.style.transform = `translate(${- position * this.width}px)`;
            }
        })
    }

    unmounted(){

    }
    update(){

    }
    get children(){
        return this[PROPERTY_SYMBOL].children;
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