import Component from './BaseComponent'
import './ScrollView.scss'

export default class ScrollView extends Component {
    constructor(config){
        super(config)
        this.property.children = []
        this.didCreate()
    }

    didCreate(){

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