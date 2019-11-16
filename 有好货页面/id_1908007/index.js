import {create} from './lib/create'
import TabView from './src/TabView.js'
import ScrollView from './src/ScrollView.js';
import ListView from './src/ListView.js'
import Div from './src/Div.js'
import {loadScript, happen} from './apis/FetchApi'
import "./src/Config.scss"
import "./src/Config.js"
import "./apis/FetchApi.js"
import './apis/LoadScript.js'
import ApiPath from './apis/ApiPath.js'
import icons from './res/icons/index.js'
import Fragment from './src/Fragment.js'

void async function(){ 
    let RecommendDataUrl = ApiPath.recommendedPageData;
    let iInterestingInterestingDataUrl = ApiPath.interestingPageDataAll;
    let iBBDataUrl = ApiPath.interestingPageDataSuprise;
    let iAccidentDataUrl = ApiPath.interestingPageDataUnexpect;
    let BrandDataUrl = ApiPath.BrandData;
    // let obj = await ((await fetch('./data.json')).json())
    // await happen(document, "DOMContentLoaded")

    // console.log(iAccidentDataUrl)

    // 所有的并行都逃避不开Promise.all
    let [RecommendData, InterestingInterestingData, BBData, AccidentData, BrandData, event] = await Promise.all([
        (async function(){ //async 标签返回的一定是promise
            return (await fetch(RecommendDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(iInterestingInterestingDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(iBBDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(iAccidentDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(BrandDataUrl)).json()
        })(),
        //fetch("./data.json").then(res => res.json()), //这里写await是为了先得到response
        happen(document, "DOMContentLoaded"),
        loadScript('./app.js')
    ]);

    window.render({RecommendData, InterestingInterestingData, BBData, AccidentData, BrandData}, document.body);

}();


function loadMore(a) {
    console.log('到底了')
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000);
}

window.render = function(data){ 
    let {RecommendData, InterestingInterestingData, BBData, AccidentData, BrandData} = data;
    let content = (
        <TabView className={"tabContainer"} >
            <ScrollView 
                title="推荐" 
                className={"scroll"} 
                active={true} 
                on-scrollToBottom={loadMore.bind(this)}
                placeHolderText="load more">
                <ListView data={{RecommendData, type: 1}} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="有趣的店" className={"scroll"} on-scrollToBottom={loadMore.bind(this)} placeHolderText="load more">
                <ListView data={{InterestingInterestingData, BBData, AccidentData, type: 2}} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="品牌新店" className={"scroll"} on-scrollToBottom={loadMore.bind(this)} placeHolderText="load more">
                <ListView data={{BrandData, type:3}} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="发现" className={"scroll"} placeHolderText="load more">
            <ListView data={{data:[], type:4}} className="listContainer"></ListView>
            </ScrollView>
        </TabView>
    )
    
    content.appendTo(document.body)
}