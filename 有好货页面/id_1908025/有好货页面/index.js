import TabView from "./pages/TabView.js"
import ScrollView from "./pages/ScrollView.js"
import ListView from "./pages/ListView/ListView.js"
import Shop from "./pages/Shop/Shop.js"
import Carousel from './pages/carousel'
import Text from "./pages/Text.js"
import Div from "./pages/Div.js"
import Wrapper from "./pages/Wrapper.js";
import {create} from "./create.js"
import data from './data.json'
// function create(Class, attributes, ...children){    
//     var object = new Class();
//     for(let name in attributes) {
//         if(name.match(/^on-([\s\S]+)$/)){
//             object.addEventListener(RegExp.$1, attributes[name])
//         } else {
//             object.setAttribute(name, attributes[name]);
//         }
//     }
        
//     for(let child of children) {
//         if(typeof child === "string") {
//             object.appendChild(new Text(child));
//         } else {
//             object.appendChild(child);
//         }
//     }
    
//     return object; 
// }
console.log(data)

function loadMore(){
    //console.log(a);
    //console.log("load more");
    //console.log(this);
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000);
}

var c = <TabView style="width:100%;height:100%;">
    <ScrollView  tab-title="推荐" placeHolderText="load more" on-scrolToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;font-size:50px">
      <Carousel data={data.focusData} width={window.outerWidth}></Carousel>
      <div style="padding: 40px 34px;">
            <div style="font-size:46px; color: rgba(51, 51, 51, 1); font-weight: bold">超多人收藏的店！</div>
        </div>
        <div style="display: flex; margin: 0 34px 35px 34px;">
            {
                data.mostFavourateShops.map((shop, index) => (
                    <div style={{flex: 1, marginRight: index === 0 ? '25px' : '' }}>
                        <Shop data={shop} />
                    </div>
                ))
            }
        </div>
        <ListView 
          //TODO:这里renderItem必须要在data之前，否者会报错，待优化
          onEndReached={ () => console.log('到底了')}
          data={data.recommendedShops} 
        />
    </ScrollView>
    <ScrollView tab-title="有趣的店"  style="background-color:lightgreen;">
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 
    def def def def def def def def def def def def def def def def def def 

    </ScrollView>
    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
</TabView>
c.appendTo(document.getElementById('box'));