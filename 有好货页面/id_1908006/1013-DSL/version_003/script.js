import {MyTabView} from "./myTabView.js";
import {MyScrollView} from "./myScrollView.js";
import {MyDiv} from "./myDiv.js";
import {myCreate} from "./myCreate.js"
import {MyListView} from "./myListView.js";

import tree from "./demo.my_component"

function loadMore() {
    console.log("load more");

    setTimeout(()=> {
        this.setAttribute("placeHolderText", "no more...");
    },3000)
}



window.render = function(data, root) {
    console.log("use window.render()");
    var c = tree;
    c.appendTo(document.body);
}
