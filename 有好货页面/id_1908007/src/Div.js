import Component from './BaseComponent'
import './Div.scss'

export default class Div extends Component {
    constructor(config){
        super(config)
        this.property.children = []
        this.Create()
    }

    Create(){

    } 

    Mounted(){
        
    }

    appendChild(child) {
        child.appendTo(this.root);
    }
}