import TabView from './component/TabView'
import ScrollView from './component/ScrollView'
import Div from './component/Div'
import Text from './component/Text'
import ListView from './component/ListView';
import Carousel from './component/Carousel';


import { myCreate } from './create.js';


// var t = <Text>abc</Text>
// t.appendTo(document.body)

var c = <TabView style="width:100%;height:100%">
    <ScrollView tab-title="推荐" style="background-color:lightblue;"></ScrollView>
    <ScrollView tab-title="有趣的店" style="background-color:lightgreen;"></ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
</TabView>

function loadMore (event) {
    console.log('loadMore', event);
}

window.render = function(data) {
    console.log('data', data);
    const CarouselUrls = data.focusData.map(item => item.image)

    var d = <TabView class="tabview" style="width:100%;height:100%;">
        <ScrollView
            tab-title="推荐"
            placeHolderText="加载更多"
            on-scrollToBottom={loadMore}
            style="-webkit-overflow-scrolling:touch;overflow:scroll;"
        >
            <Carousel data={CarouselUrls} ></Carousel>
            <ListView data={data.recommendedShops}></ListView>
        </ScrollView>
        <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;"></ScrollView>
        <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
    </TabView>
    d.appendTo(document.body);
}
