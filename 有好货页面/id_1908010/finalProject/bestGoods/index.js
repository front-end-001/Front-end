
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
    let rPageDataUrl = ApiPath.recommendedPageData;
    let iAllPageDataUrl = ApiPath.interestingPageDataAll;
    let iSupPageDataUrl = ApiPath.interestingPageDataSuprise;
    let iUnexpectDataUrl = ApiPath.interestingPageDataUnexpect;
    let newPageDataUrl = ApiPath.newPageData;
    // let obj = await ((await fetch('./data.json')).json())
    // await happen(document, "DOMContentLoaded")

    // console.log(iUnexpectDataUrl)

    // 所有的并行都逃避不开Promise.all
    let [rPageData, allPageData, supPageData, unexpectData, newPageData, event] = await Promise.all([
        (async function(){ //async 标签返回的一定是promise
            return (await fetch(rPageDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(iAllPageDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(iSupPageDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(iUnexpectDataUrl)).json()
        })(),
        (async function(){ 
            return (await fetch(newPageDataUrl)).json()
        })(),
        //fetch("./data.json").then(res => res.json()), //这里写await是为了先得到response
        happen(document, "DOMContentLoaded"),
        loadScript('./app.js')
    ]);

    window.render({rPageData, allPageData, supPageData, unexpectData, newPageData}, document.body);

}();


function loadMore(a) {
    // console.log('loadmore')
}

window.render = function(data){ 
    let {rPageData, allPageData, supPageData, unexpectData, newPageData} = data;
    let content = (
        <TabView className={"tabContainer"} >
            <ScrollView 
                title="推荐" 
                className={"scroll"} 
                active={true} 
                on-scrollToBottom={loadMore.bind(this)}>
                <ListView data={{rPageData, type: 1}} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="有趣的店" className={"scroll"} on-scrollToBottom={loadMore.bind(this)}>
                <ListView data={{allPageData, supPageData, unexpectData, type: 2}} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="品牌新店" className={"scroll"} on-scrollToBottom={loadMore.bind(this)}>
                <ListView data={{newPageData, type:3}} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="发现" className={"scroll"}></ScrollView>
        </TabView>
    )
    
    content.appendTo(document.body)
}
