const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

class Carousel {
    constructor(config){
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.config = config;
        this.created();
    }

    created(){
        this.root = document.createElement('div')
        this.root.classList.add('container')
    }

    mounted(){
        
    }

    updated(){

    }

    get duration(){
        return this[PROPERTY_SYMBOL].duration || 3000;
    }

    set duration(value){
        return this[PROPERTY_SYMBOL].duration = value;
    }

    get width(){
        return this[PROPERTY_SYMBOL].width || 500;
    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }

    serAttribute(name, value){
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    getProperty(name){
        return this[PROPERTY_SYMBOL][name]
    }

    setProperty(name, value){
        this[PROPERTY_SYMBOL][name] = value;
        if(name === 'data'){
            this.render();
        }
        if(name === 'width'){
            this.render();
        }
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    render(){
        let width = this.width;
        this.root.style.width = `${width}px`;
        // 插入轮播图片
        for(let slider of this.getProperty('data')){
            let item = document.createElement('img');
            item.src = slider.url;
            item.classList.add('slider-item');
            this.root.appendChild(item);
        }

        let children = Array.prototype.slice.call(this.root.children);
        let position = 0;

        let x = 0;

        enableGesture(this.root);
    
        let nextFrame = () => {
            let nextPosition = position + 1;
            nextPosition = nextPosition % children.length;

            let current = children[position]; 
            let next = children[nextPosition];

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;
            setTimeout(() => {
                    current.style.transition = '';
                    current.style.transform = `translate(${-100 - 100 * position}%)`
                    
                    next.style.transition = '';
                    next.style.transform = `translate(${ - 100 * nextPosition }%)`;
                    position = nextPosition;
            }, 16);
            this.handler = setTimeout(nextFrame, this.duration);
        }

        this.handler = setTimeout(nextFrame, this.duration);

        this.root.addEventListener('pan', event => {
            clearTimeout(this.handler);
            // console.log(event);
            for(let child of children){
                child.style.transition = 'ease 0s';
                child.style.transform = `translateX(${event.dx + x}px)`;
            }
        })

        this.root.addEventListener('panend', event => {
            console.log(event);
            if(event.isVertical)
                return;
            if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
                if(event.dx > 0){
                    position = position - 1;
                }
                if(event.dx < 0){
                    position = position + 1;
                }
            } else {
                position = - (Math.round((x + event.dx) / this.width));
            }

            position = Math.max(0, Math.min(position, children.length - 1));

            for(let child of children){
                child.style.transition = "";
                child.style.transform = `translate(${-position * this.width}px)`;
            }

            x = -position * this.width;

            this.handler = setTimeout(nextFrame, this.duration);

        })

        this.root.addEventListener("mousedown", event => event.preventDefault());
    }

}

/** 
class Carousel {
    attributes: {
        boolean index
        number width
        number height
        string direction
        boolean autoPlay
        boolean loop
    }
    property: {
        number duration
        array imgs 
        
    }
    state: {
        number currIndex
    }
    methods: {
        swipeTo
    }
    lifecycle: {
        beforeChange
        afterChange
    }
}
*/