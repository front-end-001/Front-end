import Component from './component/component.js';

export class Tab extends Component {
    constructor() {
        super();
    }
    get labels() {
        return this[PROPER_SYMBOL].labels;
    }
    set labels(value) {
        return this[PROPER_SYMBOL].labels = value;
    }
    setAttribute(name, value) {
        if (name === 'labels') {
            this.labels = value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
}