const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

class Carousel {
    constructor(config) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null); // attribute类型使用此类型创建
        this[PROPERTY_SYMBOL] = Object.create(null); // property类型使用此类型创建
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement('div');
        this.root.style.width = '300px';
        this.root.style.height = '300px';

        this[STATE_SYMBOL].h = 0;
        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
    }

    mounted() {
        this.root.addEventListener('click', () => {
            this[STATE_SYMBOL].h += 30;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        })
    }

    unmounted() {

    }

    updated() {

    }


    log() {
        console.log('width', this.width);
    }

    get width() {
        return this[PROPERTY_SYMBOL].width;
    }

    set width(value) {
        return this[PROPERTY_SYMBOL].width = value;
    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if (name === 'width') {
            this.width = value;
            this.triggerEvent('widthchange');
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

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