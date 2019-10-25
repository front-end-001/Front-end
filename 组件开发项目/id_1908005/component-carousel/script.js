
import Carousel from "./0907carousel.js";

function myCreate(Class, attributes) {
    var object = new Class();
    for (let name in attributes)
        object.setAttribute(name, attributes[name]);
    return object;
}

var c = (
  <Carousel
    width="500"
    imgs={[
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
      "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
      "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
    ]}
    autoPlay={true}
    height="300"
    className=""
    speed={2000}
  ></Carousel>
);
c.appendTo(document.body);