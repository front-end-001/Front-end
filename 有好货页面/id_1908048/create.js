import Text from "./Text.js"
import Wrapper from "./Wrapper.js"
export function create(Class, attributes, ...children) {
    //    console.log("Class=",Class,"children=",children);
    //    console.log("attributes=",attributes);
    let object;
    if (typeof Class == "string")
        object = new Wrapper(Class);
    else 
        object = new Class();

    for (let name in attributes) {
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, attributes[name])
        } else {
            object.setAttribute(name, attributes[name]);
        }
    }
    for (let child of children) {
        if (child instanceof Array) {
            console.log("child=",child)
            for (let c of child) {
                console.log("c=",c)
                if (typeof c === "string"){
                    object.appendChild(new Text(c));
                } else {
                    object.appendChild(c);     
                }
            }
        } else if (typeof child === "object") {
            object.appendChild(child);
        } else {
            object.appendChild(new Text(child.toString()));
        }

    }

    return object;
}