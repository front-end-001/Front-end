import enableGesture from '../gesture';
import './Carousel.scss';

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Carousel {
    constructor(config){
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.config = config;
        this.created();
    }

    created(){
        this.root = document.createElement('div');
        this.root.style.overflow = 'hidden';
        this.root.style.whiteSpace = 'nowrap';
        this.root.classList.add('carousel');
        enableGesture(this.root);
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

    get data(){
        return this.getAttribute('data') || [];
    }

    get width(){
        return this[PROPERTY_SYMBOL].width || this.root.getBoundingClientRect().width;
    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value){
        if(name === 'data'){
            this[ATTRIBUTE_SYMBOL][name] = value
            this.render();
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    getProperty(name){
        return this[PROPERTY_SYMBOL][name]
    }

    setProperty(name, value){
        this[PROPERTY_SYMBOL][name] = value;
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    render(){
        this.root.innerHTML = '';
        // let width = this.width;
        // this.root.style.width = typeof width == 'number' ? `${width}px` : width;

        if(this.data.length === 0) return;
        // 插入轮播图片
        for(let slider of this.data){
            let item = document.createElement('img');
            item.src = slider;
            item.style.width = '100%';
            item.style.height = 200;
            item.style.display = 'inline-block';
            item.style.transition = 'ease 0.5s';
            item.classList.add('slide-item');
            this.root.appendChild(item);
        }

        let children = Array.prototype.slice.call(this.root.children);
        let position = 0;

        let x = 0;
    
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

        this.root.addEventListener('touchmove', event => event.stopPropagation());

        this.root.addEventListener('pan', event => {
            event.stopPropagation();
            clearTimeout(this.handler);
            // console.log(event);
            for(let child of children){
                child.style.transition = 'ease 0s';
                child.style.transform = `translateX(${event.dx + x}px)`;
            }
        })

        this.root.addEventListener('panend', event => {
            event.stopPropagation();
            // event.cancelBubble = true;
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
