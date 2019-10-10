import Text from "./Text.js";

export function create(Class, attributes, ...children){
    var object = new Class();
    for (let name in attributes) {
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }
    for (let child of children) {
        if (typeof child == "string") {
            object.appendChild(new Text(children));
        } else {
            object.appendChild(child);    
        }
    }
    return object; 
}