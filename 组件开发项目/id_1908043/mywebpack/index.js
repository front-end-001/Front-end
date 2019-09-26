import Carousel from './carousel'

function myCreate(Class, attributes) {
    var object = new Class()
    console.log(object)
    for(let name in attributes) {
        // object.setAttribute(name, attributes[name])
        object[name] = attributes[name]
    }
    console.log(object)
    return object
}

var c = <Carousel width="200"></Carousel>
c.appendTo(document.body)




