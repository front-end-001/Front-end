import Text from "../component/Text"
import Wrapper from "../component/Wrapper"

export function myCreate (Class, attributes, ...children) {
    let object = null
    if (typeof Class === 'string') {
        object = new Wrapper(Class)
    } else {
        object = new Class()
    }
    for (const a in attributes) {
        if (a.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(a, attributes[a])
            continue
        }
        object.setAttribute(a, attributes[a])
    }
    for (const c of children) {
        if (c instanceof Array) {
            for (const a of c) {
                if (typeof a === 'object') {
                    object.appendChild(a)
                } else {
                    object.appendChild(new Text(a))
                }
            }
        } else if(typeof c === 'object') {
            object.appendChild(c)
        } else {
            object.appendChild(new Text(c))
        }
    }
    return object
}
