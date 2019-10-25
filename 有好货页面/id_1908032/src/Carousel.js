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

    get data(){
        return this.getAttribute('data') || [];
    }

    get width(){
        return this[PROPERTY_SYMBOL].width || 500;
    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value){
        if(name === 'data'){
            this[ATTRIBUTE_SYMBOL][name] = value
            this.render();
        }
        if(name === 'width'){
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
        let width = this.width;
        this.root.style.width = `${width}px`;

        if(this.data.length === 0)
            return;
        // 插入轮播图片
        for(let slider of this.data){
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

function enableGesture(main){
    let contexts = Object.create(null);

    let start = (pointer, context) => {
        // console.log('start', pointer, context, pointer.clientX, pointer.clientY)
        context.startX = pointer.clientX;
        context.startY = pointer.clientY;
        context.startTime = Date.now();

        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event('pressstart', { bubbles: true });
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)
    }

    let move = (pointer, context) => {
        // console.log('move', context, pointer.clientX, pointer.clientY);
        let dx = pointer.clientX - context.startX, dy = pointer.clientY - context.startY;
        
        if(dx * dx + dy * dy > 100){
            if(context.pressHandler !== null){
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
                context.isPress = false;
            } else if(context.isPress){
                context.isPress = false;
                let e = new Event('presscancle', { bubbles: true });
                main.dispatchEvent(e);
            }

            context.isTap = false;

            if(context.isPan == false){
                if(Math.abs(dx) > Math.abs(dy)){
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }
                let e = new Event('panstart', { bubbles: true });
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e);
                context.isPan = true;
            }

            if(context.isPan){
                let e = new Event('pan', { bubbles: true });
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                main.dispatchEvent(e);
            }

        }



    }

    let end = (pointer, context) => {
        // console.log('end', pointer.clientX, pointer.clientY);
        if(context.pressHandler!== null){
            clearTimeout(context.pressHandler);
        }
        if(context.isPress){
            let e = new Event('pressend', { bubbles: true });
            main.dispatchEvent(e);
        }
        
        if(context.isTap){
            let e = new Event('tap', { bubbles: true });
            main.dispatchEvent(e);
        }

        let dx = pointer.clientX - context.startX,  dy = pointer.clientY - context.startY;
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
        // console.log(v);
        if(context.isPan && v > 0.3){
            context.isFlick = true;
            let e = new Event('flick', { bubbles: true });
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);

        } else {
            context.isFlick = false;
        }

        if(context.isPan){
            let e = new Event('panend', { bubbles: true });
            e.dx = dx;
            e.dy = dy;
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }

    }

    let mouseSymbol = Symbol('mouse');
    
    let mousedown = event => {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }

    let mousemove = event => {
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = event => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
    }

    let touchstart = event => {
        for(let touch of event.changedTouches){
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }

    let touchmove = event => {
        for(let touch of event.changedTouches){
            move(touch, contexts[touch.identifier]);
        }
    }

    let touchend = event => {
        for(let touch of event.changedTouches){
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    main.addEventListener('mousedown', mousedown);
    main.addEventListener('touchstart', touchstart);
    main.addEventListener('touchmove', touchmove);
    main.addEventListener('touchend', touchend);

    // document.addEventListener('panstart', e => console.log('panstart'))
    // document.addEventListener('pan', e => console.log('pan'))
    // document.addEventListener('panend', e => console.log('panend'))
    document.addEventListener('pressstart', e => console.log('pressstart'))
    document.addEventListener('pressend', e => console.log('pressend'))
    document.addEventListener('presscancle', e => console.log('presscancle'))
}