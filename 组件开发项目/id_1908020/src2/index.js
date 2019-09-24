// // console.log(11111)
// function myCreate(Class){
//   console.log(arguments)
//   return new Class
// }
// class Component{}
// class Div{}
// var a =<Component attribute="1111">
//   <Div></Div>
// </Component>


// import Carousel from '../component.js'
// function myCreate(Class,attributes){
//   console.log(Class,attributes)
//   var obj=new Class()
//   for(let name in attributes){
//     obj.setAttribute(name,attributes[name])
//   }
//   return obj
// }

// var c = <Carousel width="100" ></Carousel>
// console.log(c)
// c.appendTo(document.body)
// setTimeout(_=>{
//   c.setAttribute('width',200)
// },3000)

import Carousel from '../component-copy'
import './style.css' 

function myCreate(Class, attributes) {
  console.log(Class, attributes)
  var obj = new Class({
    el: 'body',
    data: [
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
      "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
      "https://static001.geekbang.org/resource/image/88/f1/8807661ef5b82fcb75e8b8f2dbd71ef1.jpg"
    ],
    speed:300,
    arrow:true
  })
  return obj
}

var c = <Carousel></Carousel>