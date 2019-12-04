import { enableGesture } from '../lib/gesture'
import '../styles/TabView.scss'

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class TabView {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.defaultTop = document.createElement("div");
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");

        this.defaultTop.style = "text-align: center; position: relative; margin: 5vw 0;";
        this.headerContainer.classList.add('tab-header');
        this.headerContainer.style.marginBottom = '1.562vh';

        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.flex = "1";
        this.contentContainer.classList.add('tab-content');

        this.root.appendChild(this.defaultTop);
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);


        //触发手势库
        enableGesture(this.contentContainer);

        this[STATE_SYMBOL].position = 0;

        //防止父容器滚动
        this.root.addEventListener("touchmove",function(e){
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });

        this.contentContainer.addEventListener("pan", event => {
            if (event.isVertical) {
                return;
            }
            event.origin.preventDefault();
            //获取元素宽度
            let width = this.contentContainer.getBoundingClientRect().width;

            let dx = event.dx;

            if (this[STATE_SYMBOL].position == 0 && event.dx > 0) {
                dx = dx / 2;
            }

            if (this[STATE_SYMBOL].position == this.contentContainer.children.length - 1 && event.dx > 0) {
                dx = dx / 2;
            }

            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transform = `translateX(${ dx -width * this[STATE_SYMBOL].position }px)`;
                this.contentContainer.children[i].style.transition = `transform ease .5s`;
            }

        });
        this.contentContainer.addEventListener("panend", event => {
            if (event.isVertical) {
                return;
            }
            event.origin.preventDefault();
            let width = this.contentContainer.getBoundingClientRect().width;


            let isLeft;
            if (event.isFlick) {
                if (event.vx > 0) {
                    this[STATE_SYMBOL].position--;
                    isLeft = true;
                }

                if (event.vx < 0) {
                    this[STATE_SYMBOL].position++;
                    isLeft = false;
                }

            } else {
                if (event.dx > width / 2) {
                    this[STATE_SYMBOL].position--;
                    isLeft = true;
                } else if (event.dx < - width / 2) {
                    this[STATE_SYMBOL].position++
                    isLeft = false;
                } else if (event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }

                //position = (Math.round((position * 500 - event.dx) / 500));
            }
            // position = (children.length + position) % children.length;

            if (this[STATE_SYMBOL].position < 0) {
                this[STATE_SYMBOL].position = 0;
            }
            if (this[STATE_SYMBOL].position >= this.contentContainer.children.length) {
                this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
            }
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transform = `translateX(${ -width * this[STATE_SYMBOL].position }px)`;
                this.contentContainer.children[i].style.transition = `transform ease .5s`;
            }
        });
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        //第几个
        let n = this.children.length;

        this.children.push(child);

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement("div");
        header.innerText = title;
        header.classList.add('tab-header-item');
        if (title == '推荐') {
            header.classList.add('active');
        }
        this.headerContainer.appendChild(header);

        header.addEventListener('click', event => {
            let array = document.getElementsByClassName('tab-header-item');
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.classList.remove('active');
            }

            this[STATE_SYMBOL].position = n;
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`;
                this.contentContainer.children[i].style.transition = `ease .5s`;
            }
            child.style.display = 'inline-block';
            event.target.classList.add('active');
        });

        child.appendTo(this.contentContainer);

        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = "inline-block";
            this.contentContainer.children[i].classList.add('scroll');
        }

    }



    get children(){
        return this[PROPERTY_SYMBOL].children;
    }
    getAttribute(name){
        if(name == "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column"
        }
        if (name == "class") {
            this.root.classList.add(value);
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    addEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }
    removeEventListener(type, listener){
        if(!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }
    triggerEvent(type){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this);
    }
}