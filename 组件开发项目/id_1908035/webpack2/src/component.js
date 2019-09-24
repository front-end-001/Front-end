// import '../swiper_under/gesture'
// import '../swiper_under/ainimate'
const PROPERTY_SYMBOL = Symbol('property')
const ATTRIBUTE_SYMBOL = Symbol('attribute')
const EVENT_SYMBOL = Symbol('event')
const STATE_SYMBOL = Symbol('state')
export default class Carousel{
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null) // 跟原型上自带的方法不发生冲突；
        this[EVENT_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this.created()
    }
    appendChilden(element){
        element.appendChild(this.root)
        this.mounted()
    }
    created(){
        this.root = document.createElement('div')
        this.root.className= 'carousel'
        this.root.style.overflow = 'hidden'
        this.root.style.whiteSpace = 'nowrap'
        this.root.style.outline = '1px solid blue'
    }
    mounted(){
        const ImgsUrl = this.ImgsUrl || []
        for (let img of ImgsUrl) {
            let e = document.createElement("img");
            e.src = img;
            e.style.width="100%"
            this.root.appendChild(e)
        }
        let children = Array.prototype.slice.call(this.root.children);
        let position = 0;
        let nextFrame =  () => {
            let nextPosition = position + 1;
            if(!this.loop&&nextPosition>3) return
            nextPosition = nextPosition % children.length;
            let current = children[position],
                next = children[nextPosition];

            // 将next放到正确的位置上
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

            setTimeout(() => {
                // 把current挪出视口
                current.style.transition = "ease 0.5s";
                current.style.transform = `translate(${-100 - 100 * position}%)`;
                // 把next挪进视口
                next.style.transition = "ease 0.5s";
                next.style.transform = `translate(${-100 * nextPosition}%)`;

                position = nextPosition;
            }, 16);
            setTimeout(nextFrame, this.duration);    
    }
    if(this.autoPlay){
        setTimeout(()=>{nextFrame()},this.duration)        
    }
    enableGesture(this.root);
    let x =0
    this.root.addEventListener("pan", event => {
        //console.log("pan")
        if(event.isVertical)
            return;
        for(let child of children) {
            child.style.transition = "ease 0s";
            child.style.transform = `translated(${event.dx + x}px`;
        }
    })
    this.root.addEventListener("panend", event => {
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
        position = position%children.length
        // position = Math.max(0, Math.min(position, children.length - 1));
        console.log(position)
        if(position===0){
            for(let child of children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translate(${-(position-1) * 500}px)`;
            }
            children[children.length-1].style.transition = "ease 0s";
            children[children.length-1].style.transform = `translate(${-position * 500}px)`;
            setTimeout(()=>{
                for(let child of children) {
                    child.style.transition = "ease 0.5s";
                    child.style.transform = `translate(${-position * 500}px)`;
                } 
            },16)
        }else{
            for(let child of children) {
                child.style.transition = "ease 0.5s";
                child.style.transform = `translate(${-position * 500}px)`;
            }
        }
        
        x = -position * 500;
    })

}
    unmounted(){
        
    }
    update() {
        
    }
    get width(){
       return this[PROPERTY_SYMBOL].width
    }
    set width(value){
        this.root.style.width=value+'px'
        return this[PROPERTY_SYMBOL].width = value
    }
    get autoPlay(){
        return this[PROPERTY_SYMBOL].autoPlay 
    }
    set autoPlay(value){
        return this[PROPERTY_SYMBOL].autoPlay = value
    }
    get duration(){
        return this[PROPERTY_SYMBOL].duration || 3000
    }
    set duration(value){
        return this[PROPERTY_SYMBOL].duration = value
    }
    get ImgsUrl(){
        return this[PROPERTY_SYMBOL].ImgsUrl
     }
     set ImgsUrl(value){
         return this[PROPERTY_SYMBOL].ImgsUrl = value
     }
     get loop(){
        return this[PROPERTY_SYMBOL].loop
     }
     set loop(value){
         return this[PROPERTY_SYMBOL].loop = value
     }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name,value){
        switch(name){
            case 'ImgsUrl':
            this.ImgsUrl = value
            break
            case 'width':
            this.width = value
            break
            case 'autoPlay':
            this.autoPlay = value
            break
            case 'duration':
            this.duration = value
            break
            case 'loop':
            this.loop = value
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