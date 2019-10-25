import tree from './my.element'

import create from './create.js'

function loadMore(){
    setTimeout(()=>{
        this.setAttribute("placeHolderText", "没有更多啦！");
    }, 5000 );
}

window.render = function(data, root) {
    var c = tree 
       
    c.appendTo(document.body);
}


