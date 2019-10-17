import Text from "./Text.js";
import Wrapper from "./Wrapper.js";

export function create(Class, attributes, ...children){
    var object;

    if(typeof Class == "string") {
        object = new Wrapper(Class);
    }else{
        object = new Class();
    }

    // 遍历属性
    for(let name in attributes) {
        if(name.match(/^on-([\s\S]+)$/)){
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }
    
    // 遍历数组
    for( let child of children) {
        
        if(child instanceof Array){
            for(let c of child) {
                if(typeof c === "string") {
                    object.appendChild(new Text(c));
                }else{
                    object.appendChild(c);
                }
            }
            //object.appendChild(child);
        }else if(typeof child === "object") {
            object.appendChild(child);
            
        }else{
            object.appendChild(new Text(child.toString()));
        }
        
    }
        
    //console.log(children);
    return object; 
}