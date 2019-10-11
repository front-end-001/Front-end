import Component, { PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL } from './Component';

export default class Div extends Component {
    constructor() {
        super();
        this.create();
    }
    create() {
        this.root = document.createElement('div');
    }
    appendTo(element) {
        this.mount(element);
    }
    set src(val) {
        return this[PROPERTY_SYMBOL].src = val;
    }
    get src() {
        return this[PROPERTY_SYMBOL].src;
    }
    mount(element) {
        const content = document.createElement('img');
        content.src = this.src;
        element.appendChild(content);
    }
}
