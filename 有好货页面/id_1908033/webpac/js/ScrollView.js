const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ScrollView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = []; //children需要初始化

        this.created();// 创建的时候被调用

    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    created() {
        this.root = document.createElement("div");
        this.placeHolder = document.createElement("div");
        // this.placeHolder.innerText = "加载更多...";
        this.placeHolder.style.backgroundColor = "lightgreen"
        this.root.appendChild(this.placeHolder)


        let triggerd = false;
        this.root.addEventListener("scroll", event =>{
            let clientRect = this.root.getBoundingClientRect();
            let placeHolderRect = this.placeHolder.getBoundingClientRect();
            if(clientRect.bottom < placeHolderRect.top) {
                if(!triggerd) {// 老师这里写的是  triggerd 
                    this.triggerEvent('scrollToBottom');
                    triggerd = true;
                }
               
            }
            // console.log(this.root.scrollHeight,clientRect.height,this.root.scrollTop)
            /*if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height) {
               this.triggerEvent('scrollToBottom','a')//添加事件判断到底
                console.log("到底了")
            }*/

        })
        this[STATE_SYMBOL].h = 0;
    }

    mounted() {
         
    }
    unmounted() {

    }
    update() {

    }

    get style() {
        return this.root.style
    }
    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root); // 添加过后需要 mount
        this.root.appendChild(this.placeHolder)
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
           
        }
        if(name == "placeHolderText"){
           this.placeHolder.innerText = value
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
    triggerEvent(type,...args) { // 触发事件
        if(!this[EVENT_SYMBOL][type]){
           return;
        }
        for (let event of this[EVENT_SYMBOL][type]){
            event.call(this,...args);
        }
    }


}