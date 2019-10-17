import Text from '../commponents/Text.js'
import Wrapper from '../commponents/Wrapper.js'
export function myCreate(Class, attributs, ...children) {
    var object 
    if(typeof Class == 'string'){
        object = new Wrapper(Class)
    }else{
        object = new Class()
    } 
    for (let name in attributs) {
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributs[name])
        } else {
            object.setAttribute(name, attributs[name]);
        }
    }

    for (let child of children) {
        if (child instanceof Array) {
            for (let c of child) {
                if (typeof c === "string") {
                    object.appendChild(new Text(c));
                } else {
                    object.appendChild(c)
                }
            }
        }else if (typeof child === "object") {
            object.appendChild(child)
        } else {
            object.appendChild(new Text(child.toString()));
        }
    }
    return object
}