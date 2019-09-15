// import enableGesture from '../component';
const PROPERTY_SYMBOL = Symbol('property');
const ATTRTiBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export class Carousel {
    constructor(container, imgUrls) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRTiBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.imgUrls = imgUrls;
        this.created();
        this.appendTo(container);
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    render() {
        for(let imgSrc of this.imgUrls) {
            let img = document.createElement('img');
            img.src = imgSrc;
            this.root.appendChild(img);
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.display = 'inline-block';
        }
        let children = Array.prototype.slice.call(this.root.children);
        let position = 0;
        let nextFram = () => {
            let nextPosition = position + 1;
            nextPosition = nextPosition % children.length;
            let current = children[position],
                next = children[nextPosition];
            // 将next移到正确位置
            next.style.transition = '';
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;
            // 延时一帧执行，以便next移到正确位置
            setTimeout(() => {
                // 将current移出视口
                current.style.transition = 'ease .5s';
                current.style.transform = `translate(${-100 * (position + 1)}%)`;
                // 将next移入视口
                next.style.transition = 'ease .5s';
                next.style.transform = `translate(${-100 * nextPosition}%)`;
                position = nextPosition;
            }, 16)
            this._handler = setTimeout(nextFram, 3000);
        }
        this._handler = setTimeout(nextFram, 3000);

        enableGesture(this.root);

        let transformX = -500 * position; // 
        this.root.addEventListener('pan', event => {
            if (event.isVertical) {
                return;
            }
            for (let child of children) {
                child.style.transition = '';
                child.style.transform = `translate(${transformX + event.dx}px)`;
            }
        });

        this.root.addEventListener('panend', event => {
            console.log(event)
            if (event.isFlick) {
                event.dx > 0 ? position-- : position++;
            } else {
                // 四舍五入回弹效果
                position = -Math.round((transformX + event.dx) / 500);
            }
            // 控制边界元素回弹
            position = Math.max(0, Math.min(position, children.length - 1));
            transformX = -500 * position;
            for (let child of children) {
                child.style.transition = 'ease .5s';
                child.style.transform = `translate(${transformX}px)`;
            }
        });
    }
    // lifecyle
    created() {
        this.root = document.createElement('div');
        this.root.style.width = '500px';
        this.root.style.height = '300px';
        this.root.style.margin= '0 auto';
        this.root.style.whiteSpace = 'nowrap';
        this.root.style.overflow = 'hidden';
        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 80%)`;
    }
    mounted() {
        // this.root.addEventListener('click', () => {
        //     this[STATE_SYMBOL].h += 20;
        //     this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 80%)`;
        // })
        this.render();
    }
    unmounted() {

    }
    update() {

    }
    // methods
    log() {
        console.log('width', this.width);
    }
    // properties
    get width() {
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value) {
        return this[PROPERTY_SYMBOL].width = value;
    }
    get imgUrls() {
        return this[PROPERTY_SYMBOL].imgUrls;
    }
    set imgUrls(value) {
        return this[PROPERTY_SYMBOL].imgUrls = value;
    }
    // attributes
    getAttribute(name) {
        return this[ATTRTiBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name === 'width') {
            this.width = value;
            this.triggerEvent('widthChange');
        }
        if (name === 'imgUrls') {
            this.imgUrls = value;
        }
        return this[ATTRTiBUTE_SYMBOL][name] = value;
    }
    // event
    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }
}

function enableGesture(main) {
    let start = (point, context) => {
        console.log('start');
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event('press');
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500);

        context.startTime = Date.now();
    }
    let move = (point, context) => {
        console.log('move');
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {

            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
            } else {
                context.isPress = false;
                let e = new Event('presscancel');
                main.dispatchEvent(e);
            }

            context.isTap = false;

            if (!context.isPan) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }
                let e = new Event('panstart');
                main.dispatchEvent(e);
                e.startX = context.startX;
                e.startY = context.startY;
                context.isPan = true;
            }
        }
        if (context.isPan) {
            let e = new Event('pan');
            e.dx = dx;
            e.dy = dy;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
    }
    let end = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY;

        let speed = Math.sqrt((dx * dx + dy * dy)) / (Date.now() - context.startTime);
        if (context.isPan && speed > 0.3) {
            context.isFlick = true;
            let e = new Event('flick');
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        } else {
            context.isFlick = false;
        }

        if(context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
        }
        if (context.isTap) {
            let e = new Event('tap');
            main.dispatchEvent(e);
        }
        if (context.isPan) {
            let e = new Event('panend');
            e.dx = point.clientX - context.startX;
            e.dy = point.clientY - context.startY;
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event('pressend');
            main.dispatchEvent(e);
        }
        console.log('end');
    }
    let cancel = (point, context) => {
        if (context.isPan) {
            let e = new Event('pancancel');
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event('presscancel');
            main.dispatchEvent(e);
        }
    }
    
    let contexts = Object.create(null);
    let mouseSymbol = Symbol('mouse');
    let mousedown = event => {
        event.preventDefault();
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }
    let mousemove = event => {
        event.preventDefault();
        move(event, contexts[mouseSymbol]);
    }
    let mouseup = event => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }
    main.addEventListener('mousedown', mousedown);

    let touchstart = event => {
        event.preventDefault();
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }
    let touchmove = event => {
        event.preventDefault();
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    }
    let touchend = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    let touchcancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    main.addEventListener('touchstart', touchstart);
    main.addEventListener('touchmove', touchmove);
    main.addEventListener('touchend', touchend);
    main.addEventListener('touchcancel', touchcancel);
}