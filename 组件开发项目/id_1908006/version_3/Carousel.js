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

            let [current, next] = [children[position], children[nextPosition]];
           // let current = children[position],
            //    next = children[nextPosition];

            // next 放到正确的位置，即放到current的后面
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`; // 第一次，nextPosition=1， value为0， 接着, 2, -100% (左移动一福) ...
            
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

        //setTimeout(nextFrame,3000); 禁用自动播放，改用鼠标滑动
        
        // 其原理就是把所有图片看成整体，然后通过 - postion * 500 来控制显示哪张图片
        // 同时 每次挪动，startTransform就表示当前第一张图片的偏移量，用来累加鼠标滑动后的差值后 /500 取整数，计算position
        let startX, startTransform;

        let start = event  =>{
            event.preventDefault(); // 防止图片被选中后拖走的默认效果
            startX = event.clientX;  // MouseEvent.clientX 是只读属性， 它提供事件发生时的应用客户端区域的水平坐标
                                    // 这个startX 记录了 鼠标点击按下去那一刻的水平座标
            startTransform = -position * 500; // 500是div宽度, 初始值为0
            console.log("start::startTransform: ", startTransform);
            //this._container.addEventListener("mousemove", move);
            //this._container.addEventListener("mousedown", end);  // 使用document可以让鼠标在任何一个地方进行释放
            document.addEventListener("mousemove", move);   // start后紧接着注册两个事件, 不能在外面注册，否则随便移动鼠标就切换图片了
            document.addEventListener("mouseup", end);
        }

        let move = event => {
            event.preventDefault();
            for (let child of children) {
                child.style.transition = "ease 0s";
                let v = startTransform + event.clientX - startX; // 第一次往左边移动的时候，该值为负数，所有图片整体左移动
                child.style.transform = `translate(${v}px)`;
                console.log("move:move:", v);
            }
        }

        let end = event => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", end);

            console.log("end::startTransform: ", startTransform );
            position = -(Math.round((startTransform + event.clientX- startX) / 500)); //函数返回一个数字四舍五入后最接近的整数
            console.log("end::position-1: ", position);

            position = Math.max(0, Math.min(position, children.length -1)); // 避免出界 0 值时为左边界， length-1 为右边界
            console.log("end::position-2: ", position);

            for(let child of children) {
                child.style.transition = "";
                child.style.transform = `translate(${ - position * 500 }px)`;
            }

        }

       document.addEventListener("mousedown", start) ;

    }

}

let carousel = new Carousel(document.getElementById("carousel"));

carousel.data = images;

carousel.render();
