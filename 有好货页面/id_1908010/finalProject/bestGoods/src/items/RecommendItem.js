import Component from '../BaseComponent.js'
import "./RecommendItem.scss"
import {create} from '../../lib/create'
import Fragment from '../Fragment.js'

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
        let {name, promotion, icon, items} = data;

        let header = (
            <div className="itemHeaderContainer">
                <div className="left">
                    <div className="itemLogo">
                        <img src={icon} width="52" height="52" className="icon"></img>    
                    </div>
                    <div className="itemTitle">
                        <div className="itemName">{name}</div>
                        <div style="margin-top:8px;"><span className="itemType">天猫</span></div>
                    </div>
                </div>
                <div className="itemEntry">
                    <span className="entryName">进店</span>
                    <img src='../res/icons/arrow_right.svg' width="14" height="28" className="arrow_right"></img>
                </div>
            </div>
        );

        let title = (
            <div className="titleContainer">
                <div className="shop"><img src="../res/icons/shop.svg" width="14" height="14"></img></div>
                <div className="itemPromotion">好店君：该店已被1.3万人关注，快来关注吧!</div>
            </div>
        )

        let content = (
            <div className="itemContent">
                <div className="left">
                    <img className="rounded" src={items[0].image} width="100%" height="100%"></img>
                </div>
                <div className="right">
                    <img className="rounded rightTop" src={items[1].image}  width="100%" height="48%"></img>
                    <img className="rounded" src={items[2].image}  width="100%" height="48%"></img>
                </div>
        </div>
        );

        let footer = (
            <div className="itemFooter">
                <span className="footerName">相似好店</span>
                <img src="../res/icons/arrow_right_gray.svg" width="14" height="26"></img>
            </div>
        );

        return (
            <Fragment>
                {header}
                {title}
                {content}
                {footer}
            </Fragment>
        )
    }

    setAttribute(name, value) {
        if (name == "style") {
            return this.root.setAttribute('style', value)
        }
        if (name == 'className') {
            return this.root.className = value;
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "";
            this.render().appendTo(this.root)
            return;
        }
        return this.property[name] = value;
    }

    getAttribute(name) {
        if (name == 'style') {
            return this.root.getAttribute(name)
        }
        if (name == 'className') {
            return this.root.className;
        }
        return this.property[name];
    }
}