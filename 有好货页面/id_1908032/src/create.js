import Text from './Text';
import Wrapper from './Wrapper';

export function create(Class, attributes, ...children){
    let object;
    if(typeof Class === 'string'){
        object = new Wrapper(Class);
    } else {
        object = new Class;
    }
    for(let name in attributes){
        object.setAttribute(name, attributes[name])
    }
    for(let child of children){
        if(Array.isArray(child)){
            for(let c of child){
                if(typeof c === 'string'){
                    object.appendChild(new Text(c))
                } else {
                    object.appendChild(c);
                }
            }
        } else if(typeof child === 'object'){
            object.appendChild(child);
        } else {
            object.appendChild(new Text(child.toString()))
        }
    }
    return object;
}