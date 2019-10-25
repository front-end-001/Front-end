import Component from '../BaseComponent.js'
import "./RecommendItem.scss"
import {arrow_right, shop} from "../../lib/icons"
import {create} from '../../lib/create'

export default class RecommendItem extends Component {
    constructor(config){
        super(config)
        this.didCreate()
        
    }

    didCreate() {
        let content = this.render()
        if (!content) return;
        content.appendTo(this.root)
    } 

    render() {
        let data = this.property["data"] || ""
        if (!data) return null;
        console.log(data)
        let {name, promotion, icon, items} = data;
        console.log(icon)
        let header = (
            <div className="itemHeaderContainer">
                <div className="left">
                    <div className="itemLogo"></div>
                    <div>
                        <div className="itemName">{name}</div>
                        <div className="itemType">天猫</div>
                    </div>
                </div>
                <div className="itemEntry"><span className="entryName">进店</span><img src={`${arrow_right}`}></img></div>
            </div>
        );

        let title = (
            <div>
                <div><img src={`${shop}`}></img></div>
                <span className="itemPromotion">好店君：该店已被1.3万人关注，快来关注吧!</span>
            </div>
        )

        let content = (
            <div className="itemContent">
                <div className="cImg cFirst"><img src={items[0].image}></img></div>
                <div className="cImg"><img src={items[1].image}></img></div>
                <div className="cImg"><img src={items[1].image}></img></div>
            </div>
        );

        let footer = (
            <div className="itemFooter"><span>相似好店<img src={`${arrow_right}`}></img></span></div>
        );

        return (
            <div className="itemContainer">
                {header}
                {title}
                {content}
                {footer}
            </div>
        )
    }

    setAttribute(name, value) {
        if (name == "style") {
            this.root.setAttribute('style', value)
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "";
            this.render().appendTo(this.root)
        }
        return this.property[name] = value;
    }

    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute(name)
        }
        return this.property[name];
    }
}