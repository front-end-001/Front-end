
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


/* props
* data
* width
* height
* dots
* easing
* autoplay
* effect
* easing
* */


// state



// attribute


/** config
 *
 *
 * */

/** Event
 *  beforeChange 切换前回调
 *  afterChange 切换后回调
 * */

/** methods
 * next()
 * prev()
 * goTo(slideNumber, dontAnimate)
 * */




class Component {
    constructor(config) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
    }
    created(config) {
        throw new Error('should be inherited');
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    mounted(){
        this.root.addEventListener("click", () => {
            this[STATE_SYMBOL].h += 60;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        })
    }
    unmounted(){

    }
    update(){

    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        return this[PROPERTY_SYMBOL].width = value;
    }
    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "width") {
            this.width = value;
            this.triggerEvent("widthchange");
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}

class Carousel extends Component {
    constructor(container, config) {
        super();
        this._container = container;
        this._container.classList.add('carousel');
        this._timer = null;
        this.data = null;
        const { data } = config;
        this.create(data);
        this.mount(container);
    }
    create(data) {
        this[PROPERTY_SYMBOL].children = [];
        for (let src of data) {
            const item = document.createElement('img');
            item.src = src;
            this[PROPERTY_SYMBOL].children.append(item);
        }
    }
    mounted(container) {
        this[PROPERTY_SYMBOL].children.forEach(child => {
            container.appendChild(child);
        });
    }
    render() {
        // 将子元素转化为普通数组
        const children = this[PROPERTY_SYMBOL].children;

        /** 当前轮播位置 */
        let position = 0;

        const nextFrame = () => {
            /** 下一轮播位置 */
            let nextPosition = position + 1;
            nextPosition = nextPosition % children.length;

            /** 当前轮播元素 */
            const current = children[position];
            /** 下一轮播元素 */
            const next = children[nextPosition];

            next.style.transition = 'ease 0s';
            next.style.transform = `translate(${ -nextPosition * 100 + 100 }%)`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    current.style.transform = `translate(${ -100 - 100 * position }%)`;
                    next.style.transition = '';
                    next.style.transform = `translate(${ -nextPosition * 100 }%)`;
                    position = nextPosition;
                });
            });

            this._timer = setTimeout(nextFrame, 3000);
        };

        // 注释则不进行自动轮播
        // this._timer = setTimeout(nextFrame, 3000);

        /** 鼠标最初位置 */
        let startX;
        /** 水平位移 */
        let disX;
        /** 轮播宽度 */
        const width = this._container.offsetWidth;

        const start = (event) => {
            event.preventDefault();
            startX = event.clientX;
            disX = 0;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', end);
        };

        const move = (event) => {
            event.preventDefault();
            disX = event.clientX - startX;
            for (let child of children) {
                child.style.transition = 'ease 0s';
                child.style.transform = `translate(${-position * width + disX}px)`;
            }
        };

        const end = () => {
            position = -Math.round((-position * width + disX) / width);
            position = Math.max(0, Math.min(position, children.length - 1));
            for (let child of children) {
                child.style.transition = '';
                child.style.transform = `translate(${-position * width}px)`;
            }
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', move);
        };

        // 注释此行禁止原始拖动代码
        // this._container.addEventListener('mousedown', start);

        enableGesture(this._container);


        this._container.addEventListener('pan', (event) => {
            disX = event.clientX - startX;
            for (let child of children) {
                child.style.transition = 'ease 0s';
                child.style.transform = `translate(${-position * width + event.dx}px)`;
            }
        });

        this._container.addEventListener('flick', (event) => {
            if (event.dx < 0) {
                position += 1;
            } else {
                position -= 1;
            }
            position = Math.max(0, Math.min(position, children.length - 1));
            for (let child of children) {
                child.style.transition = '';
                child.style.transform = `translate(${-position * width}px)`;
            }
        });


        this._container.addEventListener('panend', (event) => {
            if (event.isFlick) return;
            console.log('panend');

            position = -Math.round((-position * width + event.dx) / width);
            position = Math.max(0, Math.min(position, children.length - 1));
            for (let child of children) {
                child.style.transition = '';
                child.style.transform = `translate(${-position * width}px)`;
            }
        });

        this._container.addEventListener('mousedown', (event) => {
            event.preventDefault();
        });
    }
}


const carousel = new Carousel(document.getElementById('container'));
