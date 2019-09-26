import {enableGesture} from "./Gesture.js"

const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const STATE_SYMBOL= Symbol("state");

export class MyTabView {
    constructor() {
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    getAttribute(name) {
        if(name == "style") {
            return this._container.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name];
    }

    setAttribute(name, value) {
        if(name == "style") {
            this._container.setAttribute("style", value);
            this._container.style.display = "flex";
            this._container.style.flexDirection = "column";
        }
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
        element.appendChild(this._container);
        this.mounted();
    }

    // 这里就是 Tab 去apped scrollView
    appendChild(child) {

        let n = this[PROPERTY_SYMBOL].children.length;
        this[STATE_SYMBOL].position = n; 
        
        this[PROPERTY_SYMBOL].children.push(child);

        // 把header单独拿出来，作为TAB的title，不用独立设置div
        let title = child.getAttribute("tab-title") || "default-title";

        this[PROPERTY_SYMBOL].headers.push(title);
        let header = document.createElement("div");
        header.innerText = title;
        header.style.display = "inline-block";
        header.style.height = "93px";
        header.style.fontFamily = "PingFang SC"
        header.style.fontSize = "46px";
        header.style.margin = "20px 35px 0 35px";

        this._headerContainer.appendChild(header); 


        // 把div设置成contentContainer的子元素
        child.appendTo(this._contentContainer);
        
        // set css style; 这里没法这样写，因为child 是MyDiv， 我们需要调用MyDiv的created().生成container即div 元素后，才能使用style
       // child.style.width = "100%";
       // child.style.height = "100%";
        //child.style.display = "inline-block";
        
        // 注释的 none 和 inline-block 对header增加click事件，先所有的都增加display：none， 然后对当前header的display设置为inline-block显示
        // 现在改成 css动画，点击后，完成 X轴的移动，同时增加transition动画 ease 0.5 
        header.addEventListener("click", event => {
            console.log(n);
            for (let i = 0; i< this._contentContainer.children.length;i++) {
                this._contentContainer.children[i].style.width = "100%";
                this._contentContainer.children[i].style.height = "100%";
                //this._contentContainer.children[i].style.display = "none";
                this._contentContainer.children[i].style.transition = "ease 0.5s";
                this._contentContainer.children[i].style.transform = `translateX(${-n*100}%)`
            }
            //child.style.display = "inline-block";
        });


        //  这里其实没有必要循环设置，唯一的好处就是怕被别的地方覆盖
        for(let i = 0; i < this._contentContainer.children.length; i ++) {
            this._contentContainer.children[i].style.width = "100%";
            this._contentContainer.children[i].style.height = "100%";
            this._contentContainer.children[i].style.verticalAlign = "top";
            this._contentContainer.children[i].style.display = "inline-block";
        }
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }




    created() {
        this._container = document.createElement("div");

        this._container.style.display = "flex";

        this._headerContainer = document.createElement("div");
        this._contentContainer  =  document.createElement("div");

        this._contentContainer.style.whiteSpace = "nowrap";
        this._contentContainer.style.overflow = "hidden";
        this._contentContainer.style.height = "100%";
        //this._contentContainer.style.flex = "1";

        this._headerContainer.style.height = "93px";  //如果是retina要换成 186 (*2)
        
        this._container.appendChild(this._headerContainer);
        this._container.appendChild(this._contentContainer);




        this[STATE_SYMBOL].position = 0;

        enableGesture(this._contentContainer);


        this._contentContainer.addEventListener("pan", event => {
            console.log("pan");
            if (event.isVertical) return; // 如果垂直分量大，就不移动

            let position = this[STATE_SYMBOL].position;
            let width = this._contentContainer.getBoundingClientRect().width;

            let dx = event.dx;

            if (position == 0 && event.dx >0) {
                dx = dx / 2;
            }

            if (position == this._contentContainer.children.length - 1 && event.dx < 0) {
                dx = dx / 2;
            }

            for (let i = 0; i<this._contentContainer.children.length; i++) {
                this._contentContainer.children[i].style.transition = "transform ease 0s";
                this._contentContainer.children[i].style.transform = `translateX(${dx - width * this[STATE_SYMBOL].position})`;

            }

        });

        /*
        // 改造点一， 使用轮播的思路对手势进行改造
        this._contentContainer.addEventListener("panend", event => {
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


            position = (children.length + position) % children.length;

            console.log("new postion: ", position);

            // 三张图轮换显示  last current next
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block

            let next = children[nextPosition];
            let last = children[lastPosition];
           
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
        });
    */

    }


    mounted() {
      
    }


    unmounted() {

    }

    update() {

    }

}
