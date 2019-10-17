import { myCreate } from '../js/creat.js'

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class List {
    constructor() {
        this.ATTRIBUTE_SYMBOL = Object.create(null)
        this.PROPERTY_SYMBOL = Object.create(null)
        this.EVENT_SYMBOL = Object.create(null)
        this.STATE_SYMBOL = Object.create(null)
        this.created();
    }
    created() {
       this.root = document.createElement('div')
    
    }
    updated() {

    }
    mounted() {
       // this.render().appendTo(this.root)
    }
    render(){
        let data = this.ATTRIBUTE_SYMBOL['data'] || []
        //debugger;
        return  <div id='kkkkkkk'>
                {
                data.map(item=>(
                    
                    <div><span>{item.a}</span>{item.b}</div>
                    ))
                }
              </div>   
    }
    setPropoty(name, value) {
        return this.PROPERTY_SYMBOL[name] = value
    }
    getPropoty(name) {
        return this.PROPERTY_SYMBOL[name]
    }
    setAttribute(name, value) {
        if (name == 'style') {
            return this.root.setAttribute('style',value)
        }
        if (name == 'data') {
            this.ATTRIBUTE_SYMBOL[name] = value
            this.root.innerHTML = ''
            this.render().appendTo(this.root)
            return value
        }
        return this.ATTRIBUTE_SYMBOL[name] = value
    }
    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute('style')
        } 
        return this.ATTRIBUTE_SYMBOL[name]
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }
    appendChild(child) {
        child.appendTo(this.root);  
    }
}

