import Text from "./component/Text.js"
import Wrapper from "./component/Wrapper.js";


export function create(Class, attributes, ...children){
    // console.log(children);
    
    var object;

    if( typeof Class =="string" ){
        object = new Wrapper(Class);
    }else{
        object = new Class();
    } 


    for(let name in attributes){
        if(name.match(/^on-([\s\S]+)$/)){
            // console.log(name);
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
            object.setAttribute(name, attributes[name]);
        }
    }
    for(let child of children) {
        if( child instanceof Array ){
            for(let c of child){
                if( typeof c =="string" ){
                    object.appendChild(new Text(c));
                }else{
                    object.appendChild(c);
                } 
            }
        } else if(typeof child === "object"){
            object.appendChild(child);
        } else {
            object.appendChild(new Text(child.toString()));
        }
            
    }
        
    return object; 
}