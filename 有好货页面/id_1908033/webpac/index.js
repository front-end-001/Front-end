// import Carousel from './js/Carousel.js'
 import TabView from './js/TabView.js'
 import ScrollView from './js/ScrollView.js'
 import Div from './js/Div.js'
// import { type } from 'os';
import {create} from './js/create.js';

import ListView from "./js/ListView.js"
import tree from "./my.component";

// var t = <Text>abc</Text>
function loadMore() {
    // console.log("loadMore")
    setTimeout(() => {
      this.setAttribute("placeHolderText","没有更多了")
    },5000)
}


window.render = function(data,root) {
    var c = tree;
    c.appendTo(document.body)
}
