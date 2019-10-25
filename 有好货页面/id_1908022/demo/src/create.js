import Text from './text.js';
import Wrapper from './wrapper.js';

let urls = [
    "https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg",
    "https://gw.alicdn.com/imgextra/i4/122/O1CN01QcEEAP1ClusnDag9x_!!122-0-lubanu.jpg",
    "https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg",
    "https://gw.alicdn.com/imgextra/i1/1141228/O1CN01QaESyl1KwSvmg9rrG_!!1141228-0-lubanu.jpg"
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