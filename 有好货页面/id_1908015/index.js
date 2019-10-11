import {Carousel} from "./carousel.js";

// React JSX 的核心就在于 myCreate 函数，将属性设置到对象上
function myCreate(Class, attributes){
  let object = new Class();
  for(let name in attributes) {
    object.setAttribute(name, attributes[name]);
    object[name] = attributes[name];
  }
  return object;
}

let c = <Carousel width={500} height={300} images={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}>
    </Carousel>;

// Parent
c.appendTo(document.body);

// 全部转换成嵌套的 createElem 函数
