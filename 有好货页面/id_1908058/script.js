import TabView from "./src/js/component/TabView"
import ScrollView from "./src/js/component/ScrollView.js"
import ListView from "./src/js/component/ListView.js"

import Div from "./src/js/component/Div.js"
import {create} from "./create.js"

import tree from "./my.component";


function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000);
}

window.render = function(data, root){
    var c = tree;
    c.appendTo(document.body);
}


