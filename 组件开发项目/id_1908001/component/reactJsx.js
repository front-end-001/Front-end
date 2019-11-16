import Carousel from './Carousel'

function myCreate (Class, attributes) {
    const object = new Class()
    for (const a in attributes) {
        object[a] = attributes[a]
    }
    return object
}
const images = ['https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg']

const c = <Carousel width = '500' height = '300' images={images}>

</Carousel>
c.init(document.getElementById('body'))
