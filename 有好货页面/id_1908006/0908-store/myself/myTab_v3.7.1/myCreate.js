import {MyText} from "./myText.js";
export function myCreate(Class, attributes, ...children){
    var object = new Class();
    for(let name in attributes) { // 遍历属性
        if  (name.match(/^on-([\s\S]+$)/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
            object.setAttribute(name, attributes[name]);
        }


    } 

    for(let child of children) { // 遍历集合类元素，如array， set等
        if (typeof child === "string") {
            object.appendChild(new MyText(child));
        }else {
            object.appendChild(child);
        }
    }
    return object; 
}



