import { Carousel } from "./components/component";

function myCreate(Class, attributes){
    var object = new Class();
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    return object; 
}


var c = <Carousel width="100"></Carousel>
c.appendTo(document.body);