// import TabView from "./components/TabView"
// import ScrollView from "./components/ScrollView"
// import ListView from "./components/ListView"
// import Div from "./components/Div"

import {create} from "./create.js"

import tree from "./my.component"


function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000);
}

window.render = function(obj, root){
    var c = tree;
    c.appendTo(document.body);
}