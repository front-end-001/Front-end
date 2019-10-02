import { enableGesture } from './touch.js';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tabview {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].header = [];
        this[PROPERTY_SYMBOL].children = [];
        
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.display = "flex";
        this.root.style.flexDirection = "column";
        this.headerContainer = document.createElement("div");
        this.contextContainer = document.createElement('div');
        this.contextContainer.style.flex = "1";
        this.contextContainer.style.whiteSpace = 'nowrap';
        this.contextContainer.style.overflow = 'hidden';
        this.headerContainer.style.height = "93px";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contextContainer);


        enableGesture(this.contextContainer);
        let children = this.contextContainer.children;
        let x = 0;
        let position = 0;
        let shouldMove = true;
        let contextContainerWidth = this.contextContainer.offsetWidth;
        console.log(contextContainerWidth);

        /* this._carousel.addEventListener('panstart',event => {
            console.log('start',event);  
        }) */

        //监听滑动
        this.contextContainer.addEventListener('panmove',event => {
            if(event.isVertical) return;
            x = position * -this.contextContainer.offsetWidth;
            for(let child of children){
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${event.dX + x}px)`
            } 
        })

        //监听滑动结束
        this.contextContainer.addEventListener('panend',event => {
            if(event.isVertical) return;
            if(!shouldMove) return shouldMove = true;
            
            x = position * -this.contextContainer.offsetWidth;
            position = -Math.round((event.dX + x) / this.contextContainer.offsetWidth);
            position = Math.max(0, Math.min(position,children.length -1 ));
            for(let child of children){
                child.style.transition = "";
                child.style.transform = `translateX(${position * -this.contextContainer.offsetWidth}px)`;
            }
            
        })

        //监听快滑手势
        this.contextContainer.addEventListener('flick',event => {
            if(event.isVertical) return;

            shouldMove = false;

            if(event.dX > 0){
                position -= 1;
            }else if(event.dX < 0){
                position += 1;
            }
            position = Math.max(0, Math.min(position,children.length -1 ));
            // console.log(position);
            for(let child of children){
                child.style.transition = "";
            console.log(event.dX,contextContainerWidth);
                child.style.transform = `translateX(${position * -this.contextContainer.offsetWidth}px)`;
            }
            
        })
        
    }
    mounted(){
        
    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        let n = this.children.length;
        this.children.push(child);

        let title = child.getAttribute("tab-title") || '';
        this[PROPERTY_SYMBOL].header.push(title);

        let header = document.createElement('header');
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";
        header.innerText = title;

        this.headerContainer.appendChild(header);

        header.addEventListener('click', () => {
            for(let item of  this.contextContainer.children){
                item.style.transition = 'ease .5s';
                item.style.transform = `translateX(${- n * 100}%)`;
            }
        })

        child.appendTo(this.contextContainer);
         

    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    
    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        return this[PROPERTY_SYMBOL].width = value;
    }
    get urls(){
    	return this[PROPERTY_SYMBOL].urls;
    }
    set urls(value){
    	return this[PROPERTY_SYMBOL].urls = value;
    }



    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute('style',value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
            // this.width = value;
            // this.triggerEvent("widthchange");
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
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}