import {enableGesture} from './gesture.js'
import {Timeline, DOMElementStyleAnimation, ease} from './animation.js'
export class carousel {
    constructor(container) {
      this._container = container;
      //this._container.classList.add("carousel");
      this.data = null;
      enableGesture(this._container);
    }

    render() {
        let i = this.data.length;
        for (let d in this.data) {
            let e = document.createElement("img");
            e.src = this.data[d];
            e.id = d;
            //e.style.zIndex = i++;
            this._container.appendChild(e);
        }

        let tl = new Timeline(); // or Timeline

        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#Array-like
        // 将 类数组（Array-like）对象/集合转换成一个新数组
        let children = Array.prototype.slice.call(this._container.children);
        console.log("size: ", children.length)

        let position = 0;
        let offsetTimeStart = 0;

        
        let nextPic = ()=>{
            let nextPosition = position + 1;

            // 确保按顺序循环播放图片集合 [0, 1, 2...children.length -2,  children.length -1 ]
            nextPosition = nextPosition % children.length;

            let current = children[position];
            let next = children[nextPosition];

            console.log("cur:: ",position,  current);
            //console.log("next:: ",nextPosition,  next)

            //将next移动到下一帧的位置
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

            offsetTimeStart = Date.now();

            tl.addAnimation(new DOMElementStyleAnimation(
                current,
                "transform",
                0, - 500 * position,
                1000, - 500 - 500 * position,
                (v) => `translateX(${v}px)`
            ));
            tl.addAnimation(new DOMElementStyleAnimation(
                next,
                "transform",
                0, 500 - 500 * nextPosition,
                1000, - 500 * nextPosition,
                (v) => `translateX(${v}px)`
            ));
            tl.restart();

            position = nextPosition;
            nextPicTimer = setTimeout(nextPic, 3000);
        }
        let nextPicTimer = setTimeout(nextPic, 3000);



        let offset = 0;
        this._container.addEventListener("mousedown", event => {
            //startTransform = - position * 500;
            tl.pause();

            let currentTime = Date.now();
            if (currentTime - offsetTimeStart < 1000) {
                offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(nextPicTimer);
        });
        this._container.addEventListener("pan", event => {
            // event.origin.preventDefault();
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`;

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`;

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-500 * position + event.dx + offset}px)`;
        });
        this._container.addEventListener("panend", event => {
            // event.origin.preventDefault();
            let isLeft;
            if (event.isFlick) {
                if (event.dx > 0) {
                    position--;
                    isLeft = true;
                }

                if (event.dx < 0) {
                    position++;
                    isLeft = false;
                }

            } else {
                if (event.dx > 250) {
                    position--;
                    isLeft = true;
                } else if (event.dx < -250) {
                    position++;
                    isLeft = false;
                } else {
                    isLeft = event.dx <= 0;
                }

                //position = (Math.round((position * 500 - event.dx) / 500));
            }
            position = (children.length + position) % children.length;

            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];

            if (!isLeft) {
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`;

            if (isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`;

            current.style.transition = "";
            current.style.transform = `translate(${-500 * position}px)`;

            //nextPicTimer = setTimeout(nextPic, 3000);
        });
        this._container.addEventListener("mousedown", event=> event.preventDefault());
    }
    
  }
  