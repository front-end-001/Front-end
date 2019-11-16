//const WIDTH_PROPERTY_SYMBOL = Symbol("width");
//const WIDTH_ATTRIBUTE_SYMBOL = Symbol("width"); // 虽然名字一样，但是两个symbol不一样

import  {Timeline,DOMElementStyleElemAnimation} from "./animation.js"

import {enableGesture} from "./Gesture.js"

const WIDTH_SYMBOL = Symbol("width");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


export class Carousel {
    constructor() {
        this[WIDTH_SYMBOL] = Object.create(null); // 不能用{} 避免默认的原型上的一些默认方法和成员
        this[ATTRIBUTE_SYMBOL] = Object.create(null); // 不能用{} 避免默认的原型上的一些默认方法和成员
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

    }

    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set;
        }

        this[EVENT_SYMBOL][type].add(listener);
    }


    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return
        }

        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }


    appendTo(element) {
        this.created();
        element.appendChild(this._container);
        this.mounted();
    }

    created() {
        this._container = document.createElement("div");
        this._container.classList.add("carousel")
        this._handler = null;
        this.data = this.getAttribute("data"); // 用户初始化实例后，传递图片数据
        console.log(this.data);
    }


    mounted() {

        // 动态创建img标签，填充到container中
        let i = this.data.length;
        for (let image of this.data) {
            let e = document.createElement("img");
            e.src = image;
            e.style.zIndex = i--;
            this._container.appendChild(e);
        }

        //使用slice.call方法，将container的子元素平铺为数组
        let children = Array.prototype.slice.call(this._container.children);

        let position = 0;
        
        let offsetTimeStart = 0;

        var tl = new Timeline();

        let nextPic = () => {
            let nextPosition = position + 1;
            nextPosition = nextPosition % children.length;

            let [current, next] = [children[position], children[nextPosition]];
            // let current = children[position],
            //    next = children[nextPosition];
            //

            offsetTimeStart = Date.now();

            // next 放到正确的位置，即放到current的后面
            //next.style.transition = "ease 0s";
            //next.style.transform = `translate(${100 - 100 * nextPosition}%)`; // 第一次，nextPosition=1， value为0， 接着, 2, -100% (左移动一福) ...
            //console.log("next, translate: ", nextPosition, 500 - 500 * nextPosition);
            next.style.transform = `translate(${ 500 - 500 * nextPosition}px)`; // 第一次，nextPosition=1， value为0， 接着, 2, -100% (左移动一福) ...

            console.log("current: ", position, current.style.transform);
            console.log("next: ", nextPosition, next.style.transform);
            console.log("");

            tl.restart();
            tl.addAnimation(new DOMElementStyleElemAnimation(
                current,
                "transform",
                0,    -500*position,   // 使用animation 定义start值
                1000, -500 - 500*position, // 定义了end值
                (v) => `translateX(${v}px)`
            ));

            tl.addAnimation(new DOMElementStyleElemAnimation(
                next,
                "transform",
                0,     500 - 500*nextPosition, // next的start 
                1000,  - 500*nextPosition, // 把next挪到 current即可, 左移动即可
                (v) => `translateX(${v}px)`
            ));


            position = nextPosition; 

            nextPicTimer = setTimeout(nextPic, 3000);
        };

        let nextPicTimer = setTimeout(nextPic, 3000);

        let offset = 0; // 这个的作用是，当自动播放的时候，鼠标点下去的一瞬间，其实图片已经左移了，后续pan的时候需要补上这个offset
        this._container.addEventListener("mousedown", event => {
            tl.pause();

            let currentTime = Date.now();

            if (currentTime - offsetTimeStart < 1000) { // 小于1秒，说明 有pan的操作，否则正常应该是 1000ms
                offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;  // 这个offset是 500 - 移动的部分， 就是pan要补偿的部分
            }else{
                offset = 0;
            }

            console.log("offset: ", offset);

            clearTimeout(nextPicTimer);
        });

        // 使用手势库，重写手动控制的轮播组件

        enableGesture(this._container);


        this._container.addEventListener("pan", event => {
            console.log("pan");
            if (event.isVertical) return; // 如果垂直分量大，就不移动

            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block

            let next = children[nextPosition];
            let last = children[lastPosition];

            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${- 500 * position + event.dx + offset}px)`

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`



            /*
            for(let child of children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${event.dx + x}px)`;
            }
            */
        })

        // 改造点一， 使用轮播的思路对手势进行改造
        this._container.addEventListener("panend", event => {
            if (event.isVertical) return; // 如果垂直分量大，就不移动

            console.log("original postion: ", position)

            let isLeft; // 这个变量的含义是， 是否是左边的照片进入current

            if (event.isFlick && event.isHorizontal) {
                if (event.dx > 0) { // 右移动  (之前的写反了) , 鼠标右移， dx 才会 > 0
                    position = position - 1;
                    isLeft = true;
                }
                if (event.dx < 0) { // 左移动  (之前的写反了)
                    position = position + 1;
                    isLeft = false;
                }
            } else {  // 如果不是flick, 根据dx的像素是不是超过 1/2 进行判断
                if (event.dx > 250) { // 右移超过1/2
                    position = position - 1;
                    isLeft = true;
                } else if (event.dx < -250) { // 左移超过1/2
                    position = position + 1;
                    isLeft = false;
                } else if(event.dx > 0) {  
                    isLeft = false ;   // 如果右移动只移动的了一点点的举例，其实还是当前抓的照片，恢复到current，则 左边的照片不进入
                } else {
                    isLeft = true;  // 反之, 同上
                }

            }


            /*  使用轮播思路后，这里就不能是边界了，而是循环 0 1 2 3 0 1 2 3 ...
            position = Math.max(0, Math.min(position, children.length - 1 )); // 依旧处理边界
            */
            position = (children.length + position) % children.length;

            console.log("new postion: ", position);

            // 三张图轮换显示  last current next
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block

            let next = children[nextPosition];
            let last = children[lastPosition];
            /*
             *
             * [0,1,2,3]
             * 这里的 current 假设为0， last为3 ,next 为1， 那需要图片放到 正确的 last，cur，next位置
             * 则需要 3 移动到 0 的左边， 即-2000的位置， 而 1 本来就在 0  的右边，则不需要移动
             *
             */
            
            if(!isLeft) { // 如果左边的不进入，则不用进行transition
                last.style.transition = "";
            } else{
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${- 500 * position}px)`

            if(isLeft) { // 如果左边进入，则不用进行transition
                next.style.transition = "";
            } else{
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`

            /*
            for(let child of children) {
                child.style.transition = "";
                child.style.transform = `translate(${ - position * 500 }px)`; 
            }
            */

            //tl.resume();
        });


        this._container.addEventListener("mousedown", event => event.preventDefault());
        this._container.addEventListener("pressstart", event => {
            console.log("pressstart");
        });

        this._container.addEventListener("pressend", event => {
            console.log("pressend");
        });

        this._container.addEventListener("presscancel", event => {
            console.log("presscancel");
        });

    }

    unmounted() {

    }

    update() {

    }
}
