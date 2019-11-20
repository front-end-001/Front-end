import TextView from '../src/TextView'
import Wrapper from '../src/Wrapper'

export function create(Class, attributes, ...children) {
    let object
    if(typeof Class == "string") {
        object = new Wrapper(Class)
    } else {
        object = new Class()
    }
    
    for(let name in attributes){
        if(name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }

    for(let child of children) {
        if (child instanceof Array) {
            for (let item of child) {
                if (typeof item == 'string') {
                    object.appendChild(new Text(item))
                } else {
                    object.appendChild(item)
                }
            }
        } else if (typeof child == "object") {
            object.appendChild(child)
        } else {
            object.appendChild(new TextView(child.toString()))
        }
    }
    return object
}