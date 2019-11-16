import TabView from "./teacher/tabview.js";
import Div from "./container.js";
import ScrollView from './teacher/scrollview.js';
import ListView from './teacher/listview';
import {create} from './teacher/create.js';
// import tree from './my.component';
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
    let c = <TabView style="width:100%;height:100%;">
        <ScrollView tab-title="推荐" placeHolderText="load more" on-scrolltobottom={loadMore}
                    style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc abc abc abc abc abc abc
            abc abc abc abc abc abc
        </ScrollView>
        <ScrollView tab-title="有趣的店" style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightgreen;white-space:normal;font-size:50px">
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
