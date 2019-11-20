import ScrollView from "./components/ScrollView.js";
import TabView from "./components/TabView.js";
import Div from "./components/Div.js";
import ListView from "./components/ListView.js";
import Carousel from "./components/carousel.js";
import { create } from "./create.js";
import css from "./assets/css/main.css";
import HeaderView from "./components/HeaderView.js";

let styleElement = document.createElement("style");
styleElement.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styleElement);

function loadMore() {
    setTimeout(() => {
        this.setAttribute("placeHolderText", "没有更多了")
    }, 5000)
}

window.render = (data, root) => {
    let myComponent =
    <Div class="main" style="height: 100%"> 
        <Div class="mainform">
            <HeaderView></HeaderView>
            <TabView class="tabview" style="z-index: 100;">
                <ScrollView tab-title="推荐" placeHolderText="人家是有底线的啦" on-scrollToBottom={loadMore}>
                    <Carousel imgs={data.tabOne.carouselImgs}></Carousel>
                    <ListView data={data.tabOne}></ListView>
                </ScrollView>
                <ScrollView tab-title="有趣的店" placeHolderText="人家是有底线的啦" on-scrollToBottom={loadMore}>
                    <ListView data={data.tabSecond}></ListView>
                </ScrollView>
                <ScrollView tab-title="品牌新店" placeHolderText="人家是有底线的啦" on-scrollToBottom={loadMore}>
                    <ListView data={data.tabThree}></ListView>
                </ScrollView>
            </TabView>
        </Div>
    </Div>

    myComponent.appendTo(document.body);
}















// import Carousel from "./carousel.js";

// console.log(8759696968, Carousel);

// function myCreate(Class, attributes){
//     var object = new Class();
//     for(let name in attributes)
//         // object.setAttribute(name, attributes[name]);
//         object[name] = attributes[name];
//     return object; 
// }


// let data = ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
// "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
// "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
// "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"];

// var c = <Carousel width="100" imgsData={data}></Carousel>
// c.appendTo(document.body);