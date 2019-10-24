import {MyText} from "./myText.js";
import {MyWrapper} from "./myWrapper.js";
export function myCreate(Class, attributes, ...children){
    let object;
    if (typeof Class === "string") {
        object = new MyWrapper(Class);
    }else{
         object = new Class();
    }

    for(let name in attributes) { // 遍历属性
        if  (name.match(/^on-([\s\S]+$)/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
            object.setAttribute(name, attributes[name]);
        }


    } 

    for(let child of children) { // 遍历集合类元素，如array， set等
        if (child instanceof Array) {
            for (let c of child) {
                if (typeof c === "string") {
                    object.appendChild(new MyText(c));
                }else{
                    object.appendChild(c);
                }
            }
        } else if (typeof child === "object") {
            object.appendChild(child);
        } else {
            object.appendChild(new MyText(child.toString()));
        }
    }


    return object; 
}



