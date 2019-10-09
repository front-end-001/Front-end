const PROTERTY_SYMBOL = Symbol('width');
const ATTRIBUTE_SYMBOL = Symbol('attrubute');
const STATE_SYMBOL = Symbol('state');
const EVENT_SYMBOL = Symbol('event');
class Carousel {
    constructor() {
        this[PROTERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    // lifecycle
    created() {
        this.root = document.createElement('div');
        this.root.style = 'width:300px;height:300px;background:yellow';
        this.root.style.width = '300px';
        this.root.style.height = '300px';
        this[STATE_SYMBOL].hue = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].hue}, 100%, 50%)`;
    }
    mounted(){
        // 如何用funcation this是div； 如果是箭头函数，则this和外面保持一致，为Carousel实例
        this.root.addEventListener('click', () => {
            // console.log(this)
            this[STATE_SYMBOL].hue += 60;
            console.log(this[STATE_SYMBOL].hue)
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].hue}, 100%, 50%)`;
        }) 
    }
    unmounted() {}
    updated() {}
    beforeDestroyed() {}

    desroyed() {}   // 无法实现

    // method
    log() {
        console.log('width:', this[PROTERTY_SYMBOL].width);
    }
    // property
    get width() {
        return this[PROTERTY_SYMBOL].width;
    }
    set width(value) {
        return this[PROTERTY_SYMBOL].width = value;
    }
    // attribute
    getAttribute(name) {
       this.log()
        return this[ATTRIBUTE_SYMBOL][name];
    }
    setAttribute(name, value) {
        if (name == 'width') {
            this[PROTERTY_SYMBOL].width = value + 1;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventLister(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return ;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            // event.call(this);
            event();
        }
    }
}

export default Carousel;
