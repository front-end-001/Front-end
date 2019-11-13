import Text from './text.js';
import Wrapper from './wrapper.js';

let urls = [
    "https://gw.alicdn.com/imgextra/i3/1618197344/O1CN01ojvFXL247bENVZDBI_!!1618197344-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp",
    "https://gw.alicdn.com/imgextra/i4/1114322414/TB2Jq3lxlmWBuNkSndVXXcsApXa_!!1114322414-2-beehive-scenes.png_790x10000.jpg_.webp",
    "https://gw.alicdn.com/imgextra/i1/3402647387/TB2Mr64rQCWBuNjy0FaXXXUlXXa_!!3402647387-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp",
    "https://gw.alicdn.com/imgextra/i3/1618197344/O1CN01ojvFXL247bENVZDBI_!!1618197344-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp"
];

/* let urls = [
    "../img/01.jpg",
    "../img/02.jpg",
    "../img/03.jpg",
    "../img/04.jpg"
]; */

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