import Component from '../BaseComponent'
import './FavoriteItem.scss'
import {create} from '../../lib/create'
import Fragment from '../Fragment.js'
import Divider from  '../widgets/Divider.js'
import ImageView from '../ImageView.js'

export default class FavoriteItem extends Component {
    constructor(props) {
        super(props)
        this.didCreate();
    }

    didCreate(){
        let content = this.render()
        if (!content) return;
        content.appendTo(this.root)
    }

    render(){
        let data = this.property["data"] || ""
        if(!data) return null;
        let {name, icon, items} = data;
        // console.log(data)
        let header = (
            <div className="favItemHeader">
                <div className="favItemLogo">
                    <ImageView src={icon} width="26" height="26" className="icon"></ImageView>
                    {/* <img src={icon} width="26" height="26" className="icon"></img>     */}
                </div>
                <div className="itemTitle">
                    <div className="itemName">{name}</div>
                    <div style="margin-top:4px;"><span className="itemType">天猫</span></div>
                </div>
            </div>
        )

        let content = (
            <div className="favContent">
                <ImageView src={items[0].image} width="66" height="66" className="rounded"></ImageView>
                <ImageView src={items[0].image} width="66" height="66" className="rounded"></ImageView>
{/* 
                <img src={items[0].image} width="66" height="66" className="rounded"></img>
                <img src={items[0].image} width="66" height="66" className="rounded"></img> */}
            </div>
        )

        return (
            <Fragment>
                {header}
                {content}
            </Fragment>
        )
    }


    setAttribute(name, value){
        if (name == "style") {
            return this.root.setAttribute('style', value);
        }
        if (name == "className") {
            return this.root.className = value;
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "";
            this.render().appendTo(this.root)
            return;
        }
        this.property[name] = value;
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