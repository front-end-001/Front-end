
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tab {
    constructor() {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {

    }
    updated() {

    }
    mounted() {

    }
    setPropoty(name, value) {
        return this[_PROPERTY_SYMBOL][name] = value
    }
    getPropoty(name) {
        return this[_PROPERTY_SYMBOL][name]
    }
    setAttribute(name, value) {
        return this[_ATTRIBUTE_SYMBOL][name] = value
    }
    getAttribute(name) {
        return this[_ATTRIBUTE_SYMBOL][name]
    }

    appendTo(dom) {

    }
}

