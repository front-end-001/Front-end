//业务代码
import TabView from "./components/TabView";
import ScrollView from "./components/ScrollView";
import ListView from "./components/ListView";
import CollectionShop from './components/CollectionShop';
import RecommendedShops from './components/RecommendedShops'
import NewPage from './components/NewPage'
import Carousel from './lib/carousel'

import './styles/index.scss'

import {create} from './create'

function loadMore() {
    console.log("load more");
    /* 页面进行加载 */
    setTimeout(() => {
        this.setAttribute("placeHolderText", "没有更多了！")
    }, 1000);
}

window.render = function (RecommendationPageData, interestingPageDataTypeAll, interestingPageDataTypeSurprise, interestingPageDataTypeUnexpect, newPageData, root) {
    /* on-scrollToBottom={loadMore.bind(this, 'my')} */
    var c = <div id="app">
                <TabView class="tab">
                    <ScrollView tab-title="推荐">
                        <Carousel speed="2000" style="margin:0 auto;border-radius:3.333vw;" data={RecommendationPageData.focusData}></Carousel>
                        <CollectionShop data={RecommendationPageData.mostFavourateShops}></CollectionShop>
                        <RecommendedShops data={RecommendationPageData.recommendedShops}></RecommendedShops>
                    </ScrollView>
                    <ScrollView tab-title="有趣的店">
                        <RecommendedShops data={RecommendationPageData.recommendedShops}></RecommendedShops>
                    </ScrollView>
                    <ScrollView tab-title="品牌新店">
                        <NewPage data={newPageData.newShops}></NewPage>
                    </ScrollView>
                </TabView>
            </div>
    c.appendTo(root);
}
/* <ScrollView tab-title="有趣的店" placeHolderText="load more" on-scrollToBottom={loadMore} style="-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px">
                        <RecommendedShops data={RecommendationPageData.recommendedShops}></RecommendedShops>
                    </ScrollView> */