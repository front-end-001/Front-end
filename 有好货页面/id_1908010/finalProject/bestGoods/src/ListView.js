import Component from './BaseComponent.js'
import "./ListView.scss"
import {create} from '../lib/create'
import Div from './Div.js'
import RecmmendItem from './items/RecommendItem'
import Fragment from './Fragment.js'
import Divider from './widgets/Divider.js'

export default class ListView extends Component {
    constructor(config) {
        super(config)
        this.property.children = []
        this.didCreate()
    }

    didCreate() {
        let content = this.render();
        if (!content) return;
        content.appendTo(this.root)
    }

    render(){
        let data = this.property["data"]
        if (!data) return;
        console.log(data)
        console.log(data["focusData"])
        console.log(data["mostFavourateShops"])
        console.log(data["recommendedShops"])
        return (
            <Fragment>
                {data["recommendedShops"].map(item => {
                    return (
                        <Fragment>
                            <RecmmendItem data={item} className="itemContainer"/>  
                            <Divider ></Divider>
                        </Fragment>
                    )}
                )}
            </Fragment>
        )
    }

    setAttribute(name, value){
        if (name == "style") {
            this.root.setAttribute('style', value)
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "" 
            this.render().appendTo(this.root)
        }
        return this.property[name] = value;
    }

    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute(name)
        }
        return this.property[name]
    }
}