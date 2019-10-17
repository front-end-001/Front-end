import {enableGesture} from "./gesture.js"

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = []; //children需要初始化
        this[PROPERTY_SYMBOL].headers = []; // tab切换的文字

        this.created();// 创建的时候被调用

    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    created() {
        this.root = document.createElement("div");
        this.root.style.display = "flex";
        this.headerContainer = document.createElement("div");

        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";
        this.headerContainer.style.height = "93px"

        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        enableGesture(this.contentContainer);
        // console.log("panty");
        this[STATE_SYMBOL].position = 0;
        this.root.addEventListener( // 6、避免单指缩放
          "touchmove",
          function(e) {
            if (e.touches.length == 1) {
              e.cancelBubble = true;;
              e.stopImmediatePropagation();
            }
          },
          { passive: false }
        );

        this.contentContainer.addEventListener("pan", event => {
          if (event.isVertical) {
            return;
          }
          console.log("pan");
          let dx = event.dx;
          if(this[STATE_SYMBOL].position == 0 && event.dx > 0) {
               dx = dx / 2
          }
          if(this[STATE_SYMBOL].position == this.contentContainer.children.length -1  && event.dx < 0) {
            dx = dx / 2

       }

          let width = this.contentContainer.getBoundingClientRect().width;

          for(let i = 0;i< this.contentContainer.children.length;i++) {
            this.contentContainer.children[i].style.transition = "transform ease 0s";
            this.contentContainer.children[i].style.transform = `translateX(${dx - width *  this[STATE_SYMBOL].position}px)`;
        }
        });
        this.contentContainer.addEventListener("panend", event => {
          if (event.isVertical) {
            return;
          }
          let width = this.contentContainer.getBoundingClientRect().width;
          let isLeft;
          if (event.isFick && Math.abs(event.dx) > Math.abs(event.dy)) {
            if (event.dx > 0) {
                this[STATE_SYMBOL].position--;
              isLeft = true;
            }
            if (event.dx < 0) {
                this[STATE_SYMBOL].position++;
              isLeft = false;
            }
          } else {
            if (event.dx > width/2) {
                this[STATE_SYMBOL].position--;
              isLeft = true;
            } else if (event.dx < -width/2) {
                this[STATE_SYMBOL].position++;
              isLeft = false;
            } else if (event.dx > 0) {
              isLeft = false;
            } else {
              isLeft = true;
            }
          }
          //position = (children.length + position) % children.length;
         
           if(this[STATE_SYMBOL].position < 0) {
            this[STATE_SYMBOL].position = 0;
           }
           if(this[STATE_SYMBOL].position >= this.contentContainer.children.length){
            this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
           }
           for(let i = 0;i< this.contentContainer.children.length;i++) {
            this.contentContainer.children[i].style.transition = "transform ease 0.5s";
            this.contentContainer.children[i].style.transform = `translateX(${- width *  this[STATE_SYMBOL].position}px)`;
        }
        });
        

    }

    mounted() {
         
    }
    unmounted() {

    }
    update() {

    }
    appendChild(child) {
        let n = this.children.length;

        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
   
        this[PROPERTY_SYMBOL].headers.push(title);


        let header = document.createElement("div");
        header.innerHTML = title;
        header.style.display = "inline-block" 
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC";
        header.style.fontSize = "23px";
        header.style.margin = "10px 18px 0 18px";

        this.headerContainer.appendChild(header);
         header.addEventListener("click", event => {
            //  console.log(n)
             this[STATE_SYMBOL].position = n;
            for(let i = 0;i< this.contentContainer.children.length;i++) {
                this.contentContainer.children[i].style.width = "100%";
                this.contentContainer.children[i].style.height = "100%";
                this.contentContainer.children[i].style.transition = "ease 0.5s";
                this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`;
            }
            // for(let i = 0;i< this.contentContainer.children.length;i++) {
            //     this.contentContainer.children[i].style.width = "100%";
            //     this.contentContainer.children[i].style.height = "100%";
            //     this.contentContainer.children[i].style.display = "none";
            // }
            child.style.display = "inline-block";

            // child.setAttribute("style","width:100%;height:100%;display:inline-block");
         })
        child.appendTo(this.contentContainer); // 添加过后需要 mount
      

        for(let i = 0;i< this.contentContainer.children.length;i++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = "inline-block";
            
        }
    }

    get children() {
       return this[PROPERTY_SYMBOL].children 
    }
    // set children(value) { // children 不能设置
    //     // console.log("property");
    //     return this[PROPERTY_SYMBOL].children = value; // return 使得和等号的语义相同
        
    // }
    getAttribute(name) {
        if(name == "style"){
            this.root.getAttribute('style');
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if(name == "style"){
            this.root.setAttribute('style',value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type]){
            this[EVENT_SYMBOL][type] = new Set;
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type]){
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) { // 触发事件
        if(!this[EVENT_SYMBOL][type]){
           return;
        }
        for (let event of this[EVENT_SYMBOL][type]){
            event.call(this);
        }
    }


}