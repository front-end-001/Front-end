// import '../swiper_under/gesture'
// import '../swiper_under/ainimate'
const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
export default class Div{
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null) // 跟原型上自带的方法不发生冲突；
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.created()
        this[PROPERTY_SYMBOL].children = []
    }
    appendTo(element){
        element.appendChild(this.root)
        this.mounted()
    }
    created(){
        this.root = document.createElement('div')
        this.loading = document.createElement('div')
       
        this.root.appendChild(this.loading)
        let triggered = true;

        this.root.addEventListener("scroll", event => {
            let clientRect = this.root.getBoundingClientRect();
            let LoadingRect = this.loading.getBoundingClientRect();
            //console.log(clientRect.bottom, )
            console.log(clientRect.bottom,LoadingRect.top)
            if(clientRect.bottom < LoadingRect.top) {
                if(triggered) {
                    console.log('22222223')
                    this.triggerEvent("scrolToBottom");
                    triggered = false;
                }
            }
        })
    }
    mounted(){
       
      
    }
    unmounted(){
        
    }
    update() {
        
    }
    appendChild(child){
        console.log(child)
    //    this.root.appendChild(child)
        this.children.push(child);
        child.appendTo(this.root);
    }
    get children(){
       return this[PROPERTY_SYMBOL].children
    }
    get style(){
        return this.root.style
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name,value){
        switch(name){
            case 'style':
            this.root.setAttribute('style',value)
            break
            case 'loadingText':
            this.loading.innerText = value
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