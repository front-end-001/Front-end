import TextView from '../src/TextView'

export function create(Class, attributes, ...children) {
    let object = new Class()
    for(let name in attributes){
        if(name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }

    for(let child of children) {
        if (typeof child == "string") {
            console.log(child)
            object.appendChild(new TextView(child))
        } else {
            object.appendChild(child)
        }
    }

    return object
}