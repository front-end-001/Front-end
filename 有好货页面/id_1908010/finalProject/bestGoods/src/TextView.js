import Component from './BaseComponent'
import './TextView.scss'

export default class TextView extends Component {
    constructor(config){
        super(config)
        this.text = config || "";

        this.didCreate()
    }

    didCreate(){
        this.root = document.createElement('span')
        this.root.classList += "content"
        this.root.innerText = this.text;
    }

    setAttribute(name, value) {
        if (name == 'className') {
            this.root.className = value
        }
        return this.attrs[name] = value
    }

    getAttribute(name) {
        if(name == 'className'){
            return this.root.className
        } 
        return this.attrs[name]
    }
}