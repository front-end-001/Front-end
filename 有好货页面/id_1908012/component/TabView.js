const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import {enableGesture} from "./gesture.js"

export default class TabView {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.style.display = "flex";
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";
        this.headerContainer.style.height = "76px";
        this.headerContainer.style.paddingTop='10px'
        this.headerContainer.style.background ='#9E48ff'
        this.headerContainer.color='#fff'
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this[STATE_SYMBOL].h = 0;//？@nyc

        // enableGesture(this.contentContainer);

        // this[STATE_SYMBOL].position = 0;

        // this.root.addEventListener("touchmove",function(e){ 
        //     e.cancelBubble = true;
        //     e.stopImmediatePropagation();
        // }, {
        //     passive:false
        // });

        // this.contentContainer.addEventListener("pan", event => {
        //     if(event.isVertical)
        //         return;

        //     event.origin.preventDefault();

        //     let width = this.contentContainer.getBoundingClientRect().width;

        //     let dx = event.dx;

        //     //console.log(dx);

        //     if(this[STATE_SYMBOL].position == 0 && event.dx > 0)
        //         dx = dx / 2

        //     if(this[STATE_SYMBOL].position == this.contentContainer.children.length - 1 && event.dx < 0)
        //         dx = dx / 2

        //     for(let i = 0; i < this.contentContainer.children.length; i ++) {
        //         this.contentContainer.children[i].style.transition = "transform ease 0s";
        //         this.contentContainer.children[i].style.transform = `translateX(${ dx - width * this[STATE_SYMBOL].position}px)`;
        //     }
        // });
        // this.contentContainer.addEventListener("panend", event => {
        //     if(event.isVertical)
        //         return;
        //     event.origin.preventDefault();
        //     let width = this.contentContainer.getBoundingClientRect().width;

        //     let isLeft;
        //     if(event.isFlick) {
        //         if(event.vx > 0) {
        //             this[STATE_SYMBOL].position --;
        //             isLeft = true;
        //         }
                
        //         if(event.vx < 0) {
        //             this[STATE_SYMBOL].position ++;
        //             isLeft = false;
        //         }
                    
        //     } else {
        //         if(event.dx > width/2) {
        //             this[STATE_SYMBOL].position --
        //             isLeft = true;
        //         } else if(event.dx < -width/2) {
        //             this[STATE_SYMBOL].position ++
        //             isLeft = false;
        //         } else if(event.dx > 0) {
        //             isLeft = false;
        //         } else {
        //             isLeft = true;
        //         }
        //     }
        //     //position = (children.length + position) % children.length;


        //     if(this[STATE_SYMBOL].position < 0)
        //         this[STATE_SYMBOL].position = 0;
        //     if(this[STATE_SYMBOL].position >= this.contentContainer.children.length)
        //         this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
            
        //     for(let i = 0; i < this.contentContainer.children.length; i ++) {
        //         this.contentContainer.children[i].style.transition = "transform ease 0.5s";
        //         this.contentContainer.children[i].style.transform = `translateX(${ - width * this[STATE_SYMBOL].position}px)`;
        //     }

        // });
    
    }
    mounted(){
        
    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        let n = this.children.length-1;
        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.color='#fff'
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "32px";
        header.style.lineHeight='60px'
        header.style.margin='0 26px'
        header.style.fontWeight='300'
        if(n===0){
            header.style.fontWeight='500';
            header.style.borderBottom='3px solid #fff'
        }
        this.headerContainer.appendChild(header);

        header.addEventListener('click',event=>{
            for(let i = 0; i<this.contentContainer.children.length;i++){
                this.contentContainer.children[i].style.width='100%';
                this.contentContainer.children[i].style.height='100%';
                this.contentContainer.children[i].style.transition='ease 0.5s';
                this.contentContainer.children[i].style.transform=`translateX(${ -n * 100}%)`;
            }
            for(let child of this.headerContainer.children){
                child.style.fontWeight='300'
                child.style.borderBottom=''
            }
            header.style.fontWeight='500';
            header.style.borderBottom='3px solid #fff'
        })
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
        }

    }
    
    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
        }

        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    //？ nyc 
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