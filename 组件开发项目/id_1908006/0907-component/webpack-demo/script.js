import {Carousel} from "./carousel.js";

function myCreate(Class, attributes){
    var object = new Class();
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    return object; 
}


var c = <Carousel width="100">
</Carousel>
c.appendTo(document.body);
