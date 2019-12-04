import TabView from "./TabView.js";
import ScrollView from "./ScrollView.js";
import ListView from "./ListView.js";

import {create} from "./create.js";

import tree from "./my.component";



function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "there is no more.");
    }, 5000);
}

window.render =  function(data, root) {
    //var c = tree;
    var c = <div>
                <span class="x">abc</span>
                <ListView style="abc:1" data={[{a:1, b:2}]}></ListView>
            </div>;
    c.appendTo(document.body);
}



