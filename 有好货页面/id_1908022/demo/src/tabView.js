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
        this.img = document.createElement("img");
        this.img.src = "https://gw.alicdn.com/tfs/TB1v2koHq6qK1RjSZFmXXX0PFXa-1500-416.png_790x10000.jpg_.webp";
        this.img.setAttribute('style', `
            display: flex;
            width: 100%;
            height: 120px;
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: -1;
        `);
        this.root.appendChild(this.img);
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement('div');
        this.contentContainer.style.flex = "1";
        this.contentContainer.style.whiteSpace = 'nowrap';
        this.contentContainer.style.overflow = 'hidden';
        this.headerContainer.style.height = "120px";
        this.headerContainer.style.color = "#fff";
        // this.headerContainer.style.fontWeight = "bold";
        this.headerContainer.style.position = "relative";
        this.silderBox = document.createElement('div');
        this.silderBox.setAttribute('style',`
            border: 0px solid black;
            position: absolute;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: vertical;
            flex-direction: column;
            align-content: flex-start;
            flex-shrink: 0;
            width: 50px;
            height: 10px;
            background-color: rgb(255, 255, 255);
            border-radius: 2.208px;
            left: 51px;
            bottom: 20px;
        `);
        this.headerContainer.appendChild(this.silderBox);
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });


        enableGesture(this.contentContainer);
        let children = this.contentContainer.children;
        let x = 0;
        let position = 0;
        this[STATE_SYMBOL].position = 0;
        let shouldMove = true;
        let contentContainerWidth = this.contentContainer.offsetWidth;
        // console.log(contentContainerWidth);

        /* this._carousel.addEventListener('panstart',event => {
            console.log('start',event);  
        }) */

        //监听滑动
        this.contentContainer.addEventListener('panmove',event => {
            if(event.isVertical) return;
            event.origin.preventDefault();
            let dX = event.dX;
            if(this[STATE_SYMBOL].position == 0 || this[STATE_SYMBOL].position == (children.length - 1))
                dX = dX / 2;
            x = this[STATE_SYMBOL].position * -this.contentContainer.offsetWidth;
            for(let child of children){
                child.style.transition = "transform ease 0s";
                child.style.transform = `translateX(${dX + x}px)`
            } 
        })

        //监听滑动结束
        this.contentContainer.addEventListener('panend',event => {
            if(event.isVertical) return;
            event.origin.preventDefault();

            if(event.isFlick){
                if(event.dX > 0){
                    this[STATE_SYMBOL].position -= 1;
                }else if(event.dX < 0){
                    this[STATE_SYMBOL].position += 1;
                }
            }else{
                x = this[STATE_SYMBOL].position * -this.contentContainer.offsetWidth;
                this[STATE_SYMBOL].position = -Math.round((event.dX + x) / this.contentContainer.offsetWidth);
            }
            
            this[STATE_SYMBOL].position = Math.max(0, Math.min(this[STATE_SYMBOL].position,children.length -1 ));
            for(let child of children){
                child.style.transition = "transform ease 0s";
                child.style.transform = `translateX(${this[STATE_SYMBOL].position * -this.contentContainer.offsetWidth}px)`;
            }
            let childrens = this.headerContainer.children;
            this.silderBox.style.left = (childrens[this[STATE_SYMBOL].position + 1].offsetLeft + childrens[this[STATE_SYMBOL].position + 1].clientWidth / 2 - this.silderBox.clientWidth / 2) + 'px';
            for(let item of childrens){
                item.style.fontWeight = "normal";
            }
            childrens[this[STATE_SYMBOL].position + 1].style.fontWeight = "bold";
        })

        //监听快滑手势
        /* this.contentContainer.addEventListener('flick',event => {
            if(event.isVertical) return;
            event.origin.preventDefault();
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
                child.style.transform = `translateX(${position * -this.contentContainer.offsetWidth}px)`;
            }
            
        }) */
        
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
        if(n === 0){
            header.style.fontWeight = "bold";
        }
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";
        header.innerText = title;

        this.headerContainer.appendChild(header);

        header.addEventListener('click', (e) => {
            for(let item of  this.contentContainer.children){
                item.style.transition = 'ease .5s';
                item.style.transform = `translateX(${- n * 100}%)`;
            }
            this.silderBox.style.left = (e.target.offsetLeft + e.target.clientWidth / 2 - this.silderBox.clientWidth / 2) + 'px'; 
            let childrens = this.headerContainer.children;
            for(let item of childrens){
                item.style.fontWeight = "normal";
            }
            e.target.style.fontWeight = "bold";
        })

        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = "inline-block";
        }
         

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