import TabView from "./TabView.js"
import ScrollView from "./ScrollView.js"
import ListView from "./ListView.js"

import Div from "./Div.js"
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


