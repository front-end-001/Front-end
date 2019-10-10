import Text from "./Text";
import Wrapper from "./Wrapper";

export default function myCreate(Class, attributes, ...children) {
    let object
    if (typeof Class === 'string') {
        object = new Wrapper(Class)
    } else {
        object = new Class();
    }
    for (let name in attributes) {
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }

    for (let child of children) {
        if (typeof child !== 'object') {
            object.appendChild(new Text(child.toString()))
        } else if (child instanceof Array) {
            for (let c of child) {
                if (child !== 'object') {
                    object.appendChild(new Text(c.toString()))
                } else {
                    object.appendChild(c)
                }
            }
        } else {
            object.appendChild(child)
        }
    }
    return object;
}
