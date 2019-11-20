import TabView from "./component/TabView.js"
import ScrollView from "./component/ScrollView.js"

import Div from "./component/Div.js"
import Text from "./component/Text.js"

import { create } from './create.js';
import ListView from './component/ListView'
import style from './script.less';
import Carousel from './component/Carousel';
import TwoPicCard from './component/TwoPicCard';
import ThreePicCard from './component/ThreePicCard';
import BackTop from './component/BackTop';
import ThreePicCardTwo from './component/ThreePicCardTwo'
import Menu from './component/Menu';
import TwoPicCardTwo from './component/TwoPicCardTwo';


function loadMore(){
    console.log("load more");
    setTimeout(()=>{
        console.log("no more");
        this.setAttribute("placeHolderText", '没有更多了');
    }, 500);
}
function switchMenu(value){
    [ THREE_PIC_CARD_TWO[0], THREE_PIC_CARD_TWO[2]] = [ THREE_PIC_CARD_TWO[2], THREE_PIC_CARD_TWO[0]]
    THREE_PIC_CARD_TWO.map((item, index)=>{
        switchC.target[index].setAttribute("data", item);
    })
}

const switchC = {
    target: [],
}

function switchLisDidMountHandle(){
    switchC.target.push(this);
}
// var c = myCreate( TabView, {style: "width:100%;height:100%;"}, myCreate(ScrollView, {"tab-title":"推荐"}) )

window.render = function(data){

var c = 
<TabView style="width:100%;height:100%;" className={style['wrap']}  >
    <ScrollView id={"recommend"} className={`${style["page"]}`} tab-title="推荐" placeHolderText="加载更多" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;box-sizing:border-box;">
        <ListView className={style["list"]}>
            <Carousel data={data[0].carousel} className={style['carousel-container']} />
            <div class={style["message"]}>超多人收藏的店！</div>
            <div class={style["two-pic-card-container"]}>
                {
                    TWO_CARD_DATA.map(item=>{
                        return (
                            <TwoPicCard data={item} />
                        )
                    })
                }
            </div>
            {   
                THREE_CARD_DATA.map(item=>{
                    return(
                        <ThreePicCard data={item} />
                    )
                })
            }
        </ListView>
        <BackTop target={()=>{return document.getElementById('recommend')}} />
    </ScrollView>
    <ScrollView className={`${style["page-two"]}`} tab-title="有趣的店" style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;box-sizing:border-box;" >
        <ListView className={style["list"]} >
            <div class={`${style["header"]}`}>
                <span class={`${style["title"]}`}> 新奇好店都在这</span>
                <Menu  on-click={switchMenu} />
            </div>
            { THREE_PIC_CARD_TWO.map(item=>{
                return (
                    <ThreePicCardTwo on-didMount={switchLisDidMountHandle} data={ item } />
                )
            }) }
        </ListView>
    </ScrollView>
    <ScrollView className={`${style["page-three"]}`} tab-title="品牌新店" style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;box-sizing:border-box;">
        <ListView className={style["list"]} >
            { TWO_CARD_DATA_TWO.map(item=>{
                return (
                    <TwoPicCardTwo data= {
                        item
                    } />
                )
            }) } 
        </ListView>
    </ScrollView>
</TabView>
c.appendTo(document.body);

}


let THREE_CARD_DATA = [{
    title: "极客时间旗舰店",
    imgLeft: "img5.png",
    imgMiddle: "img6.png",
    imgRight: "img7.png",   
},{
    title: "极客大学天猫店",
    imgLeft: "img8.jpg",
    imgMiddle: "img9.jpg",
    imgRight: "img10.jpg",   
    logo: "logo3.png",
},{
    title: "InfoQ官方旗舰店",
    imgLeft: "img11.jpg",
    imgMiddle: "img12.jpg",
    imgRight: "img13.jpg",   
    logo: "logo4.png",
}]

let TWO_CARD_DATA=[{
    title: "极客时间旗舰店",
    imgLeft: "img01.jpg",
    imgRight: "img2.png",
},{
    title: "乔丹旗舰店",
    imgLeft: "img3.png",
    imgRight: "img4.png",
    logo: "logo2.png",
}]

let THREE_PIC_CARD_TWO = [{
    type: 'one',
    items: [
        {url: "img21.jpg" }, 
        {url: "img6.png"},
        {url: "img23.jpg"}
    ],
},{
    type: 'two',
    items: [
        {url: "img24.jpg" }, 
        {url: "img25.jpg"},
        {url: "img26.jpg"}
    ],
},{
    type: 'one',
    items: [
        {url: "img27.jpg" }, 
        {url: "img6.png"},
        {url: "img23.jpg"}
    ],
}]

let TWO_CARD_DATA_TWO=[{
    title: "极客时间旗舰店",
    tip: "科技风 行业优质",
    logo: "logo31.jpg",
    items: [{img: "img27.jpg"}, {img: "img9.jpg"}]
},{
    title: "极客大学天猫店",
    tip: "科技风 行业优质",
    logo: "logo32.jpg",
    items: [{img: "img33.jpg"}, {img: "img01.jpg"}]
},{
    title: "InfoQ官方旗舰店",
    tip: "科技风 行业优质",
    logo: "logo4.png",
    items: [{img: "img10.jpg"}, {img: "img34.jpg"}]
}]