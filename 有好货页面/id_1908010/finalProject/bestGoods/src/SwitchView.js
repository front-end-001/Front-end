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
        let container = this.render();
        container.appendTo(this.root);
        this.property.children = container.children;
    }

    onSwitchChange(index){
        let item = this.property.children[index]
        item.setAttribute("className", "switchItem activeSwitch");
        for(let i=0; i<this.property.children.length; i++){
            if (index != i) {
                this.property.children[i].setAttribute("className", "switchItem");
            }
        }
    }

    render() {
        return (
            <div className="switchContainer">
                <div className="switchItem" on-click={this.onSwitchChange.bind(this, 0)}>全部</div>
                <div className="switchItem activeSwitch" on-click={this.onSwitchChange.bind(this, 1)}>小惊喜</div>
                <div className="switchItem" on-click={this.onSwitchChange.bind(this, 2)}>想不到</div>
            </div>
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