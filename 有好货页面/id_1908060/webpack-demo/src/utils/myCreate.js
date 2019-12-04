import Text from "../base-component/Text";

export default function myCreate(Class, attributes, ...children){
    var object = new Class();
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    for(let child of children)
        if(typeof child === "string") {
            object.appendChild(new Text(child));
        } else {
            object.appendChild(child);
        }
    return object;
}
