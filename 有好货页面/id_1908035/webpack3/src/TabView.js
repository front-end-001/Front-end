// import '../swiper_under/gesture'
// import '../swiper_under/ainimate'
import enableGesture from './gesture'
const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
export default class Tab{
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null) // 跟原型上自带的方法不发生冲突；
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.created()
        this[PROPERTY_SYMBOL].children = []
        this[PROPERTY_SYMBOL].headers = [];
    }
    appendTo(element){
        element.appendChild(this.root)
        this.mounted()
    }
    created(){
        this.root = document.createElement("div");
        this.root.style.height="100%"
        this.root.style.display = 'flex'
        this.root.style.flexDirection = 'column'
        this.headerContainer = document.createElement("div");
        this.headerContainer.style.height = "46px"
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.flex = 1
        this.contentContainer.style.overflow = "hidden";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);
        this[STATE_SYMBOL].position = 0
        this[STATE_SYMBOL].x = 0
        enableGesture(this.contentContainer);

        this.contentContainer.addEventListener("pan", event => {
            if(event.isVertical)
                return;
            for(let child of this.contentContainer.children) {
                console.log(child)
                child.style.transition = "ease 0s";
                child.style.transform = `translate(${event.dx + this[STATE_SYMBOL].x}px`;
            }
        })
        this.contentContainer.addEventListener("panend", event => {

            if(event.isVertical)
                return;
            let width = this.contentContainer.getBoundingClientRect().width;
            if(event.isFlick){
                if(event.dx > 0) {
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position - 1;
                }
                if(event.dx<0){
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position + 1;
                }
            }else{
                if(event.dx > width/2) {
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position - 1;
                }
                if(event.dx < -width/2) {
                    this[STATE_SYMBOL].position = this[STATE_SYMBOL].position + 1;
                }
            }
            
            if(this[STATE_SYMBOL].position>=this.contentContainer.children.length){
                this[STATE_SYMBOL].position = this.contentContainer.children.length -1
            }
            if(this[STATE_SYMBOL].position<=0){
                this[STATE_SYMBOL].position = 0
            }
            for(let child of this.contentContainer.children) {
                child.style.transform = `translate(${-this[STATE_SYMBOL].position *width}px)`;
            }
            this[STATE_SYMBOL].x = -this[STATE_SYMBOL].position * width;
            
        })
        
    }
    mounted(){
       
      
    }
    unmounted(){
        
    }
    update() {
        
    }
    appendChild(child){
        this.children.push(child);
        const n = this.children.length-1;
        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.style.display = "inline-block";
        header.style.margin = "10px 18px 0px"
        header.innerText = title;
        this.headerContainer.appendChild(header);
        header.addEventListener('click',event=>{
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.width = "100%";
                this.contentContainer.children[i].style.height = "100%";
                // this.contentContainer.children[i].style.display = "none";
                this.contentContainer.children[i].style.transform =`translateX(-${n*100}%)`
                this.contentContainer.children[i].style.transition = 'ease 0.5s'
            }
            // console.log(child.root.style)
            // child.style.display="inline-block"
        })
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
        }
    }
    get children(){
       return this[PROPERTY_SYMBOL].children
    }
    
    getAttribute(name){
        switch(name){
            case 'style':
            return this.root.getAttribute('style')
            break
            default:
            break
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name,value){
        switch(name){
            case 'style':
            this.root.setAttribute('style',value)
            
            break
            default:
            break
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    addEventListener(type,listener){
        if(!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener)
    }
    removeEventListener(type,listener){
        if(!this[EVENT_SYMBOL][type]) return
        this[EVENT_SYMBOL][type].delete(listener)
    }
    trigerEvent(type){
        for( let event of this[EVENT_SYMBOL][type])
        event.call(this)
    }
      
}