import Component from './BaseComponent.js'
import "./ListView.scss"
import {create} from '../lib/create'
import Div from './Div.js'
import RecmmendItem from './items/RecommendItem'
import Fragment from './Fragment.js'
import Divider from './widgets/Divider.js'
import FavoriteItem from './items/FavoriteItem.js'
import CarouselView from './CarouselView.js'

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
            <Fragment >
                <div className="carouselContainer">
                    <CarouselView className="carouselView" data={data["focusData"]}></CarouselView>
                </div>
                <Divider ></Divider>
                <div className="favSection">
                    <span className="favTitle">超多人收藏的店！</span>
                    <div className="favContainer">
                        {data["mostFavourateShops"].map(item => (
                            <FavoriteItem data={item} className="favItem"></FavoriteItem>
                        ))}
                    </div>
                </div>
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
        if (name == "className") {
            return this.root.className = value;
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
        return this.property[name]
    }
}