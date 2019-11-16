import Component from './BaseComponent.js'
import "./ListView.scss"
import {create} from '../lib/create'
import Div from './Div.js'
import RecmmendItem from './items/RecommendItem'
import Fragment from './Fragment.js'
import Divider from './widgets/Divider.js'
import FavoriteItem from './items/FavoriteItem.js'
import CarouselView from './CarouselView.js'
import SwitchView from './SwitchView.js'
import ImageView from './ImageView.js'

export default class ListView extends Component {
    constructor(config) {
        super(config)
        this.property.children = []
        this.Create()
    }

    Create() {
        let content = this.render();
        if (!content) return;
        content.appendTo(this.root)
    }

    render(){
        let data = this.property["data"]
        if (!data) return;
        // console.log(data)
        switch(data.type) {
            case 1: 
            return (
                <Fragment >
                    <div className="carouselContainer">
                        <CarouselView className="carouselView" data={data.RecommendData["focusData"]}></CarouselView>
                    </div>
                    <Divider></Divider>
                    <div className="favSection">
                        <span className="favTitle">超多人收藏的店！</span>
                        <div className="favContainer">
                            {data.RecommendData["mostFavourateShops"].map(item => (
                                <FavoriteItem data={item} className="favItem"></FavoriteItem>
                            ))}
                        </div>
                    </div>
                    {data.RecommendData["recommendedShops"].map(item => {
                        return (
                            <Fragment>
                                <RecmmendItem data={item} className="itemContainer"/>  
                                <Divider></Divider>
                            </Fragment>
                        )}
                    )}
                </Fragment>
            )
            case 2: 
                let datas = [], item = []
                for (let i = 0; i < data.InterestingInterestingData["interestingShops"].length; i++){
                    let a =  {
                        name: data.InterestingInterestingData["interestingShops"][i].name, 
                        image: data.InterestingInterestingData["interestingShops"][i].items[0].image,
                        level: data.InterestingInterestingData["interestingShops"][i].level,
                    };
                    if (item.length == 3) {
                        datas.push(item)
                        item = []
                    } else {
                        item.push(a)
                    }
                }
                // console.log(datas)
                return (
                    <Fragment>
                        <div style="display: flex; flex-direction: row; justify-content: space-between; padding: 16px; align-items: center;">
                            <span className="interestTitle">新奇好店都在这</span>
                            <SwitchView></SwitchView>
                        </div>
                        <div style="display:flex; flex-direction: column;">
                        {datas.map((item, index) => {
                            let favs = []
                            for (let i = 0; i < item[0].level; i++) {
                                let image = <ImageView src="../res/icons/heart.svg" width="12" height="12"></ImageView>
                                favs.push(image)
                            }

                            if (index % 2 == 0) {
                                return (
                                <Fragment>
                                    <div className="interestItem">
                                        <div className="interestItemBig">
                                            <ImageView src={item[0].image} width="100%" height="100%" className="rounded"></ImageView>
                                            <div className="interestItemFooterBig">
                                                <div className="interestHeader">
                                                    <Fragment>{favs}</Fragment>
                                                    <div><span className="shopName">{item[0].name}</span></div>
                                                </div>
                                                <div className="interestEntry">
                                                    <span className="interestEntryName">进店</span>
                                                    <ImageView 
                                                        src="../res/icons/right_fill.svg" 
                                                        width="10" 
                                                        height="18"></ImageView>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="columnSection toLeft">
                                            <div className="interestItemSmall">
                                                <ImageView src={item[1].image} width="100%" height="100%" className="rounded"></ImageView>
                                            </div>
                                            <div className="interestItemSmall">
                                                <ImageView src={item[2].image} width="100%" height="100%" className="rounded"></ImageView>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider></Divider>
                                </Fragment>
                                )
                            } else {
                                return (
                                    <Fragment>
                                        <div className="interestItem">
                                            <div className="columnSection toRight">
                                                <div className="interestItemSmall">
                                                    <ImageView src={item[0].image} width="100%" height="100%" className="rounded"></ImageView>
                                                </div>
                                                <div className="interestItemSmall">
                                                    <ImageView src={item[1].image} width="100%" height="100%" className="rounded"></ImageView>
                                                </div>
                                            </div>
                                            <div className="interestItemBig">
                                                <ImageView src={item[2].image} width="100%" height="100%" className="rounded"></ImageView>
                                                <div className="interestItemFooterBig">
                                                <div className="interestHeader">
                                                    <Fragment>{favs}</Fragment>
                                                    <div><span className="shopName">{item[0].name}</span></div>
                                                </div>
                                                <div className="interestEntry">
                                                    <span className="interestEntryName">进店</span>
                                                    <ImageView 
                                                        src="../res/icons/right_fill.svg" 
                                                        width="10" 
                                                        height="18"></ImageView>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <Divider></Divider>
                                    </Fragment>
                                )
                            }
                        })}
                        </div>
                    </Fragment>
                );
            case 3:
                return (
                    <Fragment>
                        品牌新店界面
                    </Fragment>
                );
            case 4:
                return ( 
                    <Fragment>
                        发现界面
                    </Fragment>
                );
            default: break;
        }
    }

    setAttribute(name, value){
        if (name == "style") {
            return this.root.setAttribute('style', value)
        }
        if (name == "data") {
            this.property[name] = value;
            this.root.innerHTML = "" 
            return this.render().appendTo(this.root)

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