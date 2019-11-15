const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
import { enableGesture } from './gesture.js';

import { DOMElementStyleVectorAnimation, DOMElementStyleAnimation, Timeline } from './animation';

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
        // this.contentContainer.style.background = "url('image/background1.png') no-repeat center -50%";
        // this.contentContainer.style.backgroundSize="300% 50%";
        this.contentContainer.style.backgroundColor = "#eee;";

        // background-image: url(../image/background1.png);
        // background-repeat: no-repeat;
        // background-origin: border-box;
        // background-size: 300% 50%;
        // background-position: center -50%;

        // this.contentContainer.style.flex = "1";
        this.headerContainer.style.height = "93px";
        this.headerContainer.style.background = "url('image/background1.jpg') no-repeat center 50%";
        this.headerContainer.style.backgroundSize="200% 200%";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        // this[STATE_SYMBOL].h = 0;


        enableGesture(this.contentContainer);

        this.root.addEventListener("touchmove",function(e){ 
            // console.log(e);
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });

        this[STATE_SYMBOL].position = 0;
        // let x = 0;
        let offset = 0;

        // this.contentContainer.addEventListener("mousedown", event => {
        //     this.tl.pause();
        //     clearTimeout(this._nextPocTimer);
        // })
        
        this.contentContainer.addEventListener('pan', event=>{
            if(event.isVertical){
                return
            }


            event.preventDefault();

            let width = this.contentContainer.getBoundingClientRect().width;

            let dx = event.dx;
            if(this[STATE_SYMBOL].position == 0 && event.dx > 0){
                dx = dx / 2;
            }
            if(this[STATE_SYMBOL].position == this.contentContainer.children.length -1 ){
                dx = dx /2;
            }

            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0s";
                this.contentContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position}px)`;
            }
            
        });
        
        this.contentContainer.addEventListener("panend", event => {
            console.log('panend')

            let isLeft;
            let width = this.contentContainer.getBoundingClientRect().width;

            if(event.isVertical){
                return 
            }
            if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
                if(event.dx > 0) {
                    this[STATE_SYMBOL].position --;
                    isLeft = true;
                }
                    
                if(event.dx < 0) {
                    this[STATE_SYMBOL].position ++;
                    isLeft = false;
                }
            }else{
                if(event.dx > width/2) {
                    this[STATE_SYMBOL].position --
                    isLeft = true;
                } else if(event.dx < -width/2) {
                    this[STATE_SYMBOL].position ++
                    isLeft = false;
                } else if(event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }
            
            if(this[STATE_SYMBOL].position < 0){
                this[STATE_SYMBOL].position = 0;
            }
            if(this[STATE_SYMBOL].position  >=  this.contentContainer.children.length){
                this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;

                
            }
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s";
                this.contentContainer.children[i].style.transform = `translateX(${-width * (this[STATE_SYMBOL].position)}px)`;

                if(i === this[STATE_SYMBOL].position){
                    this.headerContainer.children[i].style.borderBottom = "4px solid rgba(255,255,255,1)";
                }else{
                    this.headerContainer.children[i].style.borderBottom = "none";
                }
            }


        });

        // this._container.addEventListener("mousedown", event => event.preventDefault());


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

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "50px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "32px";
        header.style.margin = "20px 35px 0 35px";
        header.style.color = "rgba(255,255,255,1)";
        this.headerContainer.appendChild(header);

        // let timeline = new Timeline();

        header.addEventListener("click", event=>{
            this[STATE_SYMBOL].position = n;
            this.contentContainer.children[n].style.color = "red";

            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                // this.contentContainer.children[i].style.width = "100%";
                // this.contentContainer.children[i].style.height = "100%";
                // this.contentContainer.children[i].style.display = "none";
                this.contentContainer.children[i].style.transition = "ease 0.3s";
                this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`;

                if(i === n){
                    this.headerContainer.children[i].style.borderBottom = "4px solid rgba(255,255,255,1)";
                }else{
                    this.headerContainer.children[i].style.borderBottom = "none";
                }
                // timeline.addAnimation(new DOMElementStyleAnimation(
                //     this.contentContainer.children[i],
                //     "transform",
                //     0, -(n - 1) * 100,
                //     500, -n * 100,
                //     (v) => `translateX(${v}%)`
                // ));
            }
            // timeline.restart();
            // child.style.display = "inline-block";
            // child.setAttribute("style", "display: inline-block");
            // console.log('ddd');
        })

        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
            this.contentContainer.children[i].style.verticalAlign = "top";
        }
        this.headerContainer.children[0].style.borderBottom = "4px solid rgba(255,255,255,1)";

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
        if( name == "className"){
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.classList.add(value);
            return
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
        console.log(this, 'this');
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}