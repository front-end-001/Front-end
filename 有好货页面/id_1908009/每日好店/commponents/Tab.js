import enable from '../js/gesture.js';
import animation from '../js/animation.js'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
let that = null
export default class Tab {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this[STATE_SYMBOL].key = 0
        this[STATE_SYMBOL].position = 0
        this.created();
        that = this
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.headerContainer = document.createElement("div");
        this.headerContainer.setAttribute('class','header')

        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "100%";

        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
     

        enable(this.contentContainer)

        this.root.addEventListener('touchmove',function(e){
            e.cancelBubble = true
            e.stopImmediatePropagation();
        },{ passive:false})
     
        this.contentContainer.addEventListener('pan', e => {
            //e.origin.preventDefault();
             if(e.isVertical) return;
          
            let width = this.contentContainer.getBoundingClientRect().width
            let dx = e.dx
            if (this[STATE_SYMBOL].position == 0 && e.dx > 0 || this[STATE_SYMBOL].position == this.contentContainer.children.length - 1 && e.dx < 0){
                dx = dx/2
            }
    
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0s';
                this.contentContainer.children[i].style.transform = `translateX(${ dx - width * this[STATE_SYMBOL].position}px)`
            }

        }) 

        this.contentContainer.addEventListener('panend', e => {
            if(e.isVertical) return;
            let width = this.contentContainer.getBoundingClientRect().width
            let isLeft;
            if(e.isFlick){
                if(e.dx > 0){
                    this[STATE_SYMBOL].position --
                    isLeft = true
                }
                if (e.dx < 0) {
                    this[STATE_SYMBOL].position++
                    isLeft = false
                }
            }else{
                if(e.dx > width/2){
                    this[STATE_SYMBOL].position--
                    isLeft = true
                }else if(e.dx < -width/2){
                    this[STATE_SYMBOL].position++
                    isLeft = false
                }else if(e.dx > 0){
                    isLeft = false;
                }else{
                    isLeft = true;
                }
            }
            if (this[STATE_SYMBOL].position < 0){
                this[STATE_SYMBOL].position = 0
            }
            if (this[STATE_SYMBOL].position >= this.contentContainer.children.length-1){
                this[STATE_SYMBOL].position = this.contentContainer.children.length - 1
            }
          
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0.5s';
                this.contentContainer.children[i].style.transform = `translateX(${-width * this[STATE_SYMBOL].position}px)`
            }
        })
      
       
    }
    mounted() {
        // let width = parseInt(this.contentContainer.parentElement.style.width.slice(0,-2))
      //  let width = this.contentContainer.getBoundingClientRect().width;
        
      
    }
   
    unmounted() {

    }
    update() {

    }
    appendChild(child) {
        this.children.push(child);
        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);
        
        let header = document.createElement("div");
        header.innerText = title;
        header.setAttribute('key', this[STATE_SYMBOL].key++)
        this.headerContainer.appendChild(header);

        child.appendTo(this.contentContainer);

        this.headerContainer.addEventListener('click', event => {
            if (!event.target.getAttribute('key'))return
            let idx = event.target.getAttribute('key')
            this[STATE_SYMBOL].position = idx
            for (let i of this.headerContainer.childNodes){
                i.setAttribute('class', '')
            }
           // this.headerContainer.childNodes.setAttribute('class','')
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.width = "100%";
                this.contentContainer.children[i].style.height = "100%";
                // this.contentContainer.children[i].style.display = "none";
             //   this.contentContainer.children[i].style.transition = 'ease 0.5s';
                let an = new animation
                an.addAnimation(
                    this.contentContainer.children[i],
                    "transform",
                    0,-100,
                    500, - idx * 100,
                    (v) => `translateX(${v}%)`
                )
                an.start()
               
               // this.contentContainer.children[i].style.transform = `translateX(${ - idx * 100}%)`
            }
            event.target.setAttribute('class', 'active')
            //this.contentContainer.children[idx].style.display='inline-block'
        })

        for (let i = 0; i < this.contentContainer.children.length; i++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "calc(100% - 2.8rem)";
            this.contentContainer.children[i].style.display = "inline-block";
            this.contentContainer.children[i].style.overflowY = "auto";
            this.contentContainer.children[i].style.whiteSpace='normal';
        }
   
    }
    get children() {
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name) {
        if (name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute("style", value);
        }
        if (name == "class") {
            this.root.setAttribute("class", value);
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    // addEventListener(type, listener) {
    //     if (!this[EVENT_SYMBOL][type])
    //         this[EVENT_SYMBOL][type] = new Set;
    //     this[EVENT_SYMBOL][type].add(listener);
    // }
    // removeEventListener(type, listener) {
    //     if (!this[EVENT_SYMBOL][type])
    //         return;
    //     this[EVENT_SYMBOL][type].delete(listener);
    // }
    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type])
            return;
        for (let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
   
}

