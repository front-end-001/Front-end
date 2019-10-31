
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
    let rPageData = ApiPath.recommendedPageData;
    let iAllPageData  = ApiPath.interestingPageDataAll;
    let iSupPageData  = ApiPath.interestingPageDataSuprise;
    let iUnexpectData = ApiPath.interestingPageDataUnexpect;
    // let obj = await ((await fetch('./data.json')).json())
    // await happen(document, "DOMContentLoaded")

    // 所有的并行都逃避不开Promise.all
    let [obj, event] = await Promise.all([
        (async function(){ //async 标签返回的一定是promise
            return (await fetch(rPageData)).json()
        })(),
        (async function(){ 
            return (await fetch(iAllPageData)).json()
        })(),
        (async function(){ 
            return (await fetch(iSupPageData)).json()
        })(),
        (async function(){ 
            return (await fetch(iUnexpectData)).json()
        })(),
        //fetch("./data.json").then(res => res.json()), //这里写await是为了先得到response
        happen(document, "DOMContentLoaded"),
        loadScript('./app.js')
    ]);
    console.log(obj)
    window.render(obj, document.body);

}();


function loadMore(a) {
    console.log(a)
    console.log('loadmore')
}

window.render = function(data){ //
    let test = (
        <TabView className={"tabContainer"}>
            <ScrollView 
                title="推荐" 
                className={"scroll"} 
                active={true} 
                on-scrollToBottom={loadMore.bind(this, "mg")}>
                <ListView data={data} className="listContainer"></ListView>
            </ScrollView>
            <ScrollView title="有趣的店" className={"scroll"}></ScrollView>
            <ScrollView title="品牌新店" className={"scroll"}></ScrollView>
            <ScrollView title="发现" className={"scroll"}></ScrollView>
        </TabView>
    )
    
    test.appendTo(document.body)
}
