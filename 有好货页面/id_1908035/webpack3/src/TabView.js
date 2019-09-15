// import '../swiper_under/gesture'
// import '../swiper_under/ainimate'
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
        this[STATE_SYMBOL].h = 0;
    }
    mounted(){
       
      
    }
    unmounted(){
        
    }
    update() {
        
    }
    appendChild(child){
        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.style.display = "inline-block";
        header.style.margin = "10px 18px 0px"
        header.innerText = title;
        this.headerContainer.appendChild(header);
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