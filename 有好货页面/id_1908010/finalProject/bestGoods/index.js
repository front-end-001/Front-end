// if (!global._babelPolyfill) {
// 	require('babel-polyfill');
// }
import TabView from './src/TabView.js'
import ScrollView from './src/ScrollView.js';

import "./src/Config.scss"
import "./src/Config.js"
// import "./apis/XHRApi.js"
import "./apis/FetchApi.js"
import './apis/LoadScript.js'
import {create} from './lib/create'


window.render = function(){
    let test = (
        <TabView className={"tabContainer"}>
            <ScrollView title="推荐" className={"scroll"} active={true}>
            </ScrollView>
            <ScrollView title="有趣的店" className={"scroll"}></ScrollView>
            <ScrollView title="品牌新店" className={"scroll"}></ScrollView>
            <ScrollView title="发现" className={"scroll"}></ScrollView>
        </TabView>
    )
    
    test.appendTo(document.body)
}
