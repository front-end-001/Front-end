//业务代码
import TabView from "./components/TabView";
import ScrollView from "./components/ScrollView";
import ListView from "./components/ListView";
import Carousel from './lib/carousel'

import './styles/index.scss'

import {create} from './create'

const imageUrls = [
    './static/image/banner1.png',
    './static/image/banner2.png',
    './static/image/banner3.png'
];

function loadMore() {
    console.log("load more");
    /* 页面进行加载 */
    setTimeout(() => {
        this.setAttribute("placeHolderText", "没有更多了！")
    }, 1000);
}

window.render = function(obj, root) {
    /* on-scrollToBottom={loadMore.bind(this, 'my')} */
    var c = <div id="app" style="background:url(./static/image/bg_1.png);">
                <TabView class="tab" style="width:100%;height:100%;background-color:#eeeeee;">
                    <ScrollView tab-title="推荐"  style="background-color:lightgreen;">
                        <Carousel speed="3000" style="margin:0 auto;" height={480} width={908} data={imageUrls}></Carousel>
                        <ListView data={obj}></ListView>
                    </ScrollView>
                    <ScrollView tab-title="有趣的店" placeHolderText="load more" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc     abc abc abc  abc abc abc
                        abc abc abc abc abc abc
                        </ScrollView>
                    <ScrollView tab-title="品牌新店" style="background-color:pink;"></ScrollView>
                </TabView>
            </div>
    c.appendTo(root);
}
