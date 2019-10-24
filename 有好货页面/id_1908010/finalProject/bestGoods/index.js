import "babel-polyfill"
import {create} from './lib/create'
import TabView from './src/TabView.js'
import ScrollView from './src/ScrollView.js';
import ListView from './src/ListView.js'
import Div from './src/Div.js'
import {loadScript, happen} from './apis/FetchApi'
import "./src/Config.scss"
import "./src/Config.js"
// import "./apis/XHRApi.js"
import "./apis/FetchApi.js"
import './apis/LoadScript.js'

void async function(){ 
    // let obj = await ((await fetch('./data.json')).json())
    // await happen(document, "DOMContentLoaded")

    // 所有的并行都逃避不开Promise.all
    let [obj, event] = await Promise.all([
        (async function(){ //async 标签返回的一定是promise
            return (await fetch('./data.json')).json()
        })(),
        //fetch("./data.json").then(res => res.json()), //这里写await是为了先得到response
        happen(document, "DOMContentLoaded"),
        loadScript('./app.js')
    ]);
    window.render(obj, document.body);
    // console.log(obj, event)
}();


window.render = function(){
    let test = (
        <TabView className={"tabContainer"}>
            <ScrollView title="推荐" className={"scroll"} active={true}>
                <ListView></ListView>
            </ScrollView>
            <ScrollView title="有趣的店" className={"scroll"}></ScrollView>
            <ScrollView title="品牌新店" className={"scroll"}></ScrollView>
            <ScrollView title="发现" className={"scroll"}></ScrollView>
        </TabView>
    )
    
    test.appendTo(document.body)
}
