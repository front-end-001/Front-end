import {MyTabView} from "./myTabView.js"
import {MyScrollView} from "./myScrollView.js"
import {MyListView} from "./myListView.js"

import {MyDiv} from "./myDiv.js"
import {myCreate} from "./myCreate.js"

import tree from "./my.component"

console.log("1---------------------");
console.log(tree);
console.log("2---------------------");

function loadMore() {
    console.log("load more");

    setTimeout(()=> {
        this.setAttribute("placeHolderText", "no more...");
    },3000)
}



window.render = function(data, root) {
    console.log("!!!  render start");
    var c = tree;
    console.log(c);
    c.appendTo(document.body);
    console.log("!!!  render end");
}

