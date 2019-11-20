import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"
import Carousel from "./carousel"
import Div from "./Div.js"
import Text from "./Text.js"
import CarouselItem from './CarouselItem'
import {create} from "./create.js"
import ListView from "./ListView.js"
import Shop from './Shop'

function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 1000);
}

window.render = function(data, root){
    var c = 
    <TabView style="width:100%;height:100%;">
    <ScrollView tab-title="推荐" style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:#EEEEEE;white-space:normal;font-size:50px">
    <Carousel>
        <CarouselItem src='https://c-ssl.duitang.com/uploads/item/201904/25/20190425142011_npdec.jpg'></CarouselItem>
        <CarouselItem src='https://c-ssl.duitang.com/uploads/item/201904/25/20190425142011_orbyy.jpg'></CarouselItem>
        <CarouselItem src="https://c-ssl.duitang.com/uploads/item/201904/25/20190425142013_tbhsg.jpg"></CarouselItem>
        <CarouselItem src="https://c-ssl.duitang.com/uploads/item/201904/25/20190425142015_brgsq.jpg"></CarouselItem>
        <CarouselItem src="https://c-ssl.duitang.com/uploads/item/201904/25/20190425142015_vxzlx.jpg"></CarouselItem>
    </Carousel>
    <div>
        <span class="x">abc</span>
        <ListView style="abc:1" data={[{a:1, b:2}]}></ListView>
    </div>
    </ScrollView>
    <ScrollView style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:#EEEEEE;white-space:normal;font-size:50px" tab-title="有趣的店">
    <ListView></ListView>
    </ScrollView>
    <ScrollView on-scrolToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:#EEEEEE;white-space:normal;font-size:50px" tab-title="品牌新店">
        <ListView>
            <Shop data={data.newShops} />
        </ListView>
    </ScrollView>
</TabView>
    
    c.appendTo(document.body);
}