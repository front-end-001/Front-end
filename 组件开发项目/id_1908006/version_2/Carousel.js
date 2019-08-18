let images = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

class Carousel {
    constructor(container)  {
        this._container = container;
        this._container.classList.add("carousel")
        this._handler = null;
        this.data = null;  // 用户初始化实例后，传递图片数据
    }

    render() {
        // 动态创建img标签，填充到container中
        for(let image of this.data) {
            let e = document.createElement("img");
            e.src = image;
            this._container.appendChild(e);
        }

        //使用slice.call方法，将container的子元素平铺为数组
        let children = Array.prototype.slice.call(this._container.children);

        let position = 0;

        let nextFrame = ()=>{
            let nextPosition = position + 1;
            nextPosition = nextPosition % children.length;

            //let [current, next] = [children[position], children[nextPosition]];
            let current = children[position],
                next = children[nextPosition];

            // next 放到正确的位置，即放到current的后面
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)` // 第一次，nextPosition=1， value为0， 接着, 2, -100% (左移动一福) ...
            
            setTimeout(()=>{
                // 1. 把 current 挪出div的视窗
                current.style.transition = ""; // 让当前transtion失效，使得全局css生效
                current.style.transform = `translate(${- 100 - 100 * position}%)`; // 第一次，position=0. value为 -100， 接着 1, -200%
                // 2. 把 next 挪进div的视窗
                next.style.transition = ""; // 使得全局css生效
                next.style.transform = `translate(${- 100 * nextPosition}%)`;
                position = nextPosition;

            }, 16);


            setTimeout(nextFrame,3000);
        }

        setTimeout(nextFrame,3000);
    }

}

let carousel = new Carousel(document.getElementById("carousel"));

carousel.data = images;

carousel.render();
