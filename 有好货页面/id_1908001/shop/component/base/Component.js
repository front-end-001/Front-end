import { myCreate } from '../../tool/create'
const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const EVENT_SYMBOL = Symbol("property")
const STATE_SYMBOL = Symbol("state")
export default class Component {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[STATE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this.init()
    }
    init () {
        this.container = document.createElement('div')
        this.render().appendTo(this.container)
        this.mounted()
    }
    appendTo (body) {
        body.appendChild(this.container)
    }
    appendChild(child){
        child.appendTo(this.container)
    }
    render () {
        return <div>
        </div>
    }
    mounted () {

    }
    getContainer () {
        return this.container
    }
    setProperty (name, value) {
        this[PROPERTY_SYMBOL][name] = value
    }
    getProperty (name) {
        return this[PROPERTY_SYMBOL][name]
    }
    setState (name, value) {
        this[STATE_SYMBOL][name] = value
    }
    getState (name) {
        return this[STATE_SYMBOL][name]
    }
    setAttribute (name, value) {
        if (name === 'style') {
            this.container.setAttribute('style', value)
            return
        }
        if (name === 'class') {
            this.container.classList.add(value)
            return
        }
        if (name === 'data') {
            this.container.innerHTML = ''
            this.render().appendTo(this.container)
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set
        this[EVENT_SYMBOL][type].add(listener)
        this.container.addEventListener(type, listener)
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return
        this[EVENT_SYMBOL][type].delete(listener)
        this.container.removeEventListener(type)
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this)
    }
}
