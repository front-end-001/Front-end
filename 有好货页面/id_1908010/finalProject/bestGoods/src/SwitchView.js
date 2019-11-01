import Component from './BaseComponent'
import "./SwitchView.scss"
import {create} from '../lib/create'
import Fragment from './Fragment.js'

export default class SwitchView extends Component {
    constructor(props) {
        super(props)
        this.property.children = [];
        this.didCreate()
    }

    didCreate() {
        this.render().appendTo(this.root)
    }
    render() {
        return (
            <Fragment>
                <div style="display: inline-block;">全部</div>
                <div style="display: inline-block;">小惊喜</div>
                <div style="display: inline-block;">想不到</div>
            </Fragment>
        )
    }
    setAttribute(name, value) {
        if (name == "className") {
            return this.root.className = value;
        }
        return this.property[name]=value; 
    }

    getAttribute(name) {
        if(name == "className"){
            return this.root.className
        }
        return this.property[name];
    }
}