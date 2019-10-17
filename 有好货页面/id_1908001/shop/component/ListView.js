import { myCreate } from './../create'
import Div from './Div'

const PROPERTY_SYMBOL = Symbol("property")
const ATTRIBUTE_SYMBOL = Symbol("property")
const EVENT_SYMBOL = Symbol("property")
export default class ListView {
    constructor() {
        this[PROPERTY_SYMBOL] = Object.create(null)
        this[ATTRIBUTE_SYMBOL] = Object.create(null)
        this[EVENT_SYMBOL] = Object.create(null)
        this.init()
    }
    init () {
        this.container = document.createElement('div')
        this.render().appendTo(this.container)
    }
    appendTo (body) {
        body.appendChild(this.container)
    }
    appendChild(child){
        this.children.push(child)
        child.appendTo(this.container)
    }
    render () {
        const data = this[ATTRIBUTE_SYMBOL].data || []
        return <div>
            {
                data.map(d => {
                    return <div>{d.a}</div>
                })
            }
        </div>
    }
    get children(){
        return this[PROPERTY_SYMBOL].children || []
    }
    setAttribute (name, value) {
        if (name === 'style') {
            this.container.setAttribute('style', value)
            return
        }
        if (name === 'data') {
            this[ATTRIBUTE_SYMBOL][name] = value
            this.container.innerHTML = ''
            this.render().appendTo(this.container)
            return
        }
        return this[ATTRIBUTE_SYMBOL][name] = value
    }
    getAttribute (name) {
        return this[ATTRIBUTE_SYMBOL][name]
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
