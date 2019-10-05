import Text from './text.js';
import Wrapper from './wrapper.js';

let urls = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

let config = {
	urls: urls
}

export function create(Class, attributes, ...children){
    var object;
    if(typeof Class === 'string')
        object = new Wrapper(Class);
    else    
        object = new Class(config);

    for(let name in attributes){
        if(name.match(/^on-([\s\S]+)$/)){
            object.addEventListener(RegExp.$1, attributes[name]);
        }else{
            object.setAttribute(name, attributes[name]);
        }
    }
        
    for(let child of children){
        if(child instanceof Array){
            for(let c of child){
                if(typeof(c)  === "string"){
                    object.appendChild(new Text(c));
                }else {
                    object.appendChild(c);
                }
            }
        }else if(typeof(child)  === "object"){
			object.appendChild(child);
		} else {
            object.appendChild(new Text(child.toString()));
		}
	}
    	
    return object; 
}