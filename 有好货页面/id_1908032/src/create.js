import Text from './components/Text';
import Wrapper from './components/Wrapper';

export function create(Class, attributes, ...children){
    let object;
    if(typeof Class === 'string'){
        object = new Wrapper(Class);
    } else {
        object = new Class;
    }
    for(let name in attributes){
        if(name.startsWith('on-')){
            object.addEventListener(name.replace('on-', ''), attributes[name]);
        } else if(name.startsWith('off-')){
            object.addEventListener(name.replace('off-', ''), attributes[name]);
        } else {
            try {
                object.setAttribute(name, attributes[name]);
            } catch (error) {
               console.log(error); 
            }
        }
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