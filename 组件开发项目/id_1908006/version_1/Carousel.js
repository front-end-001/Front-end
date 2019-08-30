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

        let postion = 0;

        let nextFrame = ()=>{
            postion++;
            postion = postion % children.length;
            
            for (let child of children) {
                child.style.transform = `translate(${-100 * postion}%)` // 左移动100%
            }

            this._handler = setTimeout(nextFrame,3000);
        }

        this._handler = setTimeout(nextFrame,3000);
    }

}

let carousel = new Carousel(document.getElementById("carousel"));

carousel.data = images;

carousel.render();
