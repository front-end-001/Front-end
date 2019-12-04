import {MyTab} from "./myTab.js";

function myCreate(Class, attributes){
    var object = new Class();
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    return object; 
}

var c = <MyTab number="3">
</MyTab>
c.appendTo(document.body);

