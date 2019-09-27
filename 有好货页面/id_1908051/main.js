import Component from './component.js';

class Tab extends Component {
    constructor() {
        super();
    }
    get labels() {
        return this[PROPER_SYMBOL].labels;
    }
    set labels(value) {
        return this[PROPER_SYMBOL].labels = value;
    }
}