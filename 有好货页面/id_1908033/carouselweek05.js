const   PROPERTY_SYMBOL=Symbol('property');
const   ATTRIBUTE_SYMBOL=Symbol('attribute');
const   EVENT_SYMBOL=Symbol('event');
const   STATE_SYMBOL=Symbol('state')
class   Carousel{
    constructor(config){
        this[PROPERTY_SYMBOL]=Object.create(null)     
        this[ATTRIBUTE_SYMBOL]=Object.create(null)
        this[EVENT_SYMBOL]=Object.create(null)
        this[STATE_SYMBOL]=Object.create(null)
        // _开头的属性表示私有属性 但实际上该属性并不会因为以_开头就真的成为一个私有属性
        this._container = container;
        this._container.classList.add("carousel");

        // handler用于保存和时序相关的操作
        this.handler = null;
        this.data = null;

        this.created();

        // this.onWidthChange = null;
    }
    appendTo(element){
        element.appendChild(this.root);
        this.mounted()
    }
    // 本方法用于渲染组件本体
    render() {
        for (let d of this.data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }

        let children = Array.prototype.slice.call(this._container.children);

        let position = 0;
        let nextFrame = function () {
            let nextPosition = position + 1;
            nextPosition = nextPosition % children.length;

            let current = children[position],
                next = children[nextPosition];

            // 将next放到正确的位置上
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

            setTimeout(() => {
                // 把current挪出视口
                current.style.transition = "";
                current.style.transform = `translate(${-100 - 100 * position}%)`;

                console.log(position);

                // 把next挪进视口
                next.style.transition = "";
                next.style.transform = `translate(${-100 * nextPosition}%)`;

                position = nextPosition;
            }, 16);

            setTimeout(nextFrame, 3000);
        };

        let x = 0;

        enableGesture(this._container);

        this._container.addEventListener("pan", event => {
            //console.log("pan")
            if(event.isVertical)
                return;
            for(let child of children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${event.dx + x}px`;
            }
        })
        this._container.addEventListener("panend", event => {
            if(event.isVertical)
                return;
            if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
                if(event.dx > 0) {
                    position = position - 1;
                }
                if(event.dx < 0) {
                    position = position + 1;
                }
            } else {
                position = -(Math.round((x + event.dx) / 500));
            }
             
            position = Math.max(0, Math.min(position, children.length - 1));

            for(let child of children) {
                child.style.transition = "";
                child.style.transform = `translate(${-position * 500}px)`;
            }
            x = -position * 500;
        })

        this._container.addEventListener("mousedown", event => event.preventDefault());
        
    }

    created(){

        this.root=document.createElement("div");

    }
    mounted(){
       
    }
    unmounted(){

    }
    update(){

    }
    

    log(){
        console.log('width',this.width)
    }


    get width(){
        // this.property
        return  this[PROPERTY_SYMBOL].width
    }
    set width(value){
        return  this[PROPERTY_SYMBOL].width=value
    }

    get data(){
        // this.property
        return  this[PROPERTY_SYMBOL].data
    }
    set data(value){
        return  this[PROPERTY_SYMBOL].data=value
    }

    getAttribute(name){
        return  this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name,value){
        if(name==='width'){
            this.width=value;
            this.triggerEvent()
        }
        if(name=="data"){
            this.data=value;
        }
        return  this[ATTRIBUTE_SYMBOL][name]=value
    }
    addEventListener(type,listener){
            if(this[EVENT_SYMBOL][type]){
                this[EVENT_SYMBOL][type]=new Set
                this[EVENT_SYMBOL][type].add(listener) 
            }
    }
    removeEventListener(type,listener){
            if(!this[EVENT_SYMBOL][type]){
                return
            }
            this[EVENT_SYMBOL][type].delete(listener)
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type]){
            event.call(this);
        }
    }
}