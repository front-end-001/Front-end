import TabView from "./teacher/tabview.js";
import Div from "./container.js";
import ScrollView from './teacher/scrollview.js';
import ListView from './teacher/listview';
import {create} from './teacher/create.js';
// import tree from './my.component';
import Carousel from './carouselview.js';

/*
* 禁用系统的scroll
* */
function loadMore() {
    setTimeout(() => {

        this.setAttribute('placeHolderText', 'No more');
        console.log('end', Date.now())
    }, 5000);
}

window.render = function (data, root) {
    let pictures = [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
    ];
    let c = <TabView style="width:100%;height:100%;">
        <ScrollView tab-title="推荐" placeHolderText="load more" on-scrolltobottom={loadMore}
                    style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
            <Carousel
                style="border-radius: 36px; margin: 28px; height: 492px; width: 924px;; overflow: hidden; white-space: nowrap;"
                pictures={pictures}>

            </Carousel>
            <ListView data={data}>
                <div style="width: 924px; height: 960px; margin: 28px; background-color: #fefefe; border-radius: 36px;">
                    <div style="display: flex; height: 164px;">
                        <div style="width: 50%; margin: 40px;">
                            极客时间旗舰店
                        </div>
                        <div style="width: 50%;">
                            <a style="float: right; margin: 36px;" href="javascript:void(0);">进店</a>
                        </div>
                    </div>

                    <div style="padding-left:34px; display: flex; align-items: center; font-size:36px; height:98px; background:rgba(245,245,245,1); border-radius:16px; margin: 0 35px;">
                        好店君：该店已被1.3万人关注，快来关注吧！
                    </div>
                </div>
                <div
                    style="width: 924px; height: 960px; margin: 28px; background-color: #fefefe; border-radius: 36px;"></div>
                <div
                    style="width: 924px; height: 960px; margin: 28px; background-color: #fefefe; border-radius: 36px;"></div>
                <div
                    style="width: 924px; height: 960px; margin: 28px; background-color: #fefefe; border-radius: 36px;"></div>
            </ListView>
        </ScrollView>
        <ScrollView tab-title="有趣的店"
                    style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightgreen;white-space:normal;font-size:50px">
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf dbf
            dbf dbf dbf dbf dbf dbf
        </ScrollView>
        <ScrollView tab-title="品牌新店" style="background-color:pink;font-size:50px">
            <ListView data={data}></ListView>
        </ScrollView>
    </TabView>;

    // let c = tree;
    // c = <div>
    //     <span class="x">000</span>
    //     <br/><br/>
    //     <ListView data={[{abc: 123 * 123}]}></ListView>
    // </div>;
    c.appendTo(document.body);
};
