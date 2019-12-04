import TabView from "./components/TabView"
import ScrollView from "./components/ScrollView"
import ListView from "./components/ListView"
import Div from "./components/Div"

import {create} from "./create.js"

import tree from "./my.component"


function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000);
}

window.render = function(obj, root){
    // var c = tree;
    var c = <div>
        <span class="x">abc</span>
        <ListView style="abc:1" data={[{a:1, b:2}]}></ListView>
    </div>
    c.appendTo(document.body);
}