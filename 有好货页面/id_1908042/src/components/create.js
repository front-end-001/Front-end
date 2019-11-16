import Text from './Text'
import Wrapper from './Wrapper'

export function create(Class, Attributes, ...children) {
    let object = typeof Class === 'string' ? new Wrapper(Class) : new Class()

    for (let name in Attributes) {
        if (name.match(/^on-([\s\S]+)$/)) {
            object.addEventListener(RegExp.$1, Attributes[name])
        } else {
            object.setAttribute(name, Attributes[name])
        }
    }

    for (let child of children) {
        if (child instanceof Array) {
            for (let c of child) {
                if (typeof c === 'string') {
                    object.appendChild(new Text(c))
                } else {
                    object.appendChild(c)
                }
            }
        } else if (typeof child === 'object') {
            object.appendChild(child)
        } else {
            object.appendChild(new Text(child.toString()))
        }
    }

    return object
}