import {MyText} from "./myText.js";
import {MyWrapper} from "./myWrapper.js";
export function myCreate(Class, attributes, ...children){
    console.log("call myCreate", Class);
    let object;
    if (typeof Class === "string") {
        object = new MyWrapper(Class);
    }else{
         object = new Class();
    }

    for(let name in attributes) {
        if  (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
            object.setAttribute(name, attributes[name]);
        }


    } 

    for(let child of children) {
        if (child instanceof Array) {
            for (let c of child) {
                if (typeof c === "string") {
                    console.log(object);
                    object.appendChild(new MyText(c));
                }else{
                    console.log(object);
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



