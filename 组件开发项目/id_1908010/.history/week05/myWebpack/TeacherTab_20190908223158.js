/*
 * @Author: 玉皇大亮
 * @since: 2019-09-07 10:16:56
 * @LastAuthor: Do not edit
 * @lastTime: 2019-09-08 22:31:59
 * @message: 组件设计 健壮 高可用 
 */

import {enableGesture} from './Gesture.js'
import {cubicBezier} from './CubicBezier.js'
import {TimeLine} from './TimeLine.js'
import { endianness } from 'os';


const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state')

export default class TabView { //是否可以抽象出来一部分作为基类？
    constructor(config) { //config的设计
        this[PROPERTY_SYMBOL] = Object.create(null); 
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //如果要设计toString，这样不会去找原型链
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];
        this.startX = 0;
        this.position = 0;
        this.didCreated();
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.didMounted();
    }

     // lifeCycle
     didCreated() {
        this.root = document.createElement('div');
        this.root.style.display = 'flex';
        this.root.style.flexDirection = "column";
        this.root.style.height = "100%"
        this.headerContainer = document.createElement('div')
        this.contentContainer = document.createElement('div')

        
        
        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)
        
        enableGesture(this.contentContainer);
    }

    didMounted() {
        //绑定事件
        let children = this.contentContainer.children;
        let parentW = this.contentContainer.clientWidth; 

        let panmove = (event) => {
            if (event.isVertical) 
                return;
            event.preventDefault();//阻止默认的拖拽效果
            for (let child of children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translateX(${this.startX + event.dx}px)`; //复位
            }
        }
    
        let panend = (event) => {
            if (event.isVertical) 
                return;
                
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.position = this.position - 1;
                } 
                if (event.dx < 0) {
                    this.position = this.position + 1;
                }
            } else {
                this.position = - Math.round((this.startX + event.dx) / parentW);  // 取最近的整数
            }
    
            this.position = Math.max(0, Math.min(this.position, this.children.length - 1));//如果position 不取正值
    
            for (let child of children) {
                child.style.transition = "";
                child.style.transform = `translate(${-this.position * parentW}px)`; //复位
            }
    
            this.startX  = -this.position * parentW;
            this.didUpdate()
        }

        let tap = (event) => {
            console.log("tap");
        }

        this.contentContainer.addEventListener('panmove', panmove);
        this.contentContainer.addEventListener('panend', panend);
        
        for (let header of this.headerContainer.children) {
            header.addEventListener('tap', tap);
        }
        
        this.didUpdate()
    }

    didUnmounted() {

    }

    didUpdate() {
  
        let headers = this.headerContainer.children;
        for (let i = 0; i < headers.length; i++) {
            let bottom = headers[i].children[0];
            if (i === this.position) {
                bottom.style.display = 'block';
                headers[i].style.fontWeight = 500;
            } else {
                bottom.style.display = 'none';
                headers[i].style.fontWeight = 300;
            }
        }
    }

    didDestroyed() { //无法实现

    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    appendChild(child) {
        this.children.push(child);

        let title = child.getAttribute('tab-title') || '';
        this[PROPERTY_SYMBOL].headers.push(title);

        let header = document.createElement('div');
        header.innerText = title;
        header.style.display = 'inline-block';
        header.style.fontFamily = 'PingFang SC';
        header.style.fontSize = '23px';
        header.style.color = 'white';
        header.style.fontWeight = 300;
        header.style.lineHeight = '18px';
        header.style.padding = "10px 19px 10px 18px";

        let bottomLine = document.createElement('div');
        bottomLine.style.width = '30px';
        bottomLine.style.height = '3px';
        bottomLine.style.backgroundColor = 'white';
        bottomLine.style.marginLeft = 'auto'
        bottomLine.style.marginRight = 'auto'
        bottomLine.style.marginTop = '10px'
        bottomLine.style.display = 'none'
        header.appendChild(bottomLine);

        this.headerContainer.appendChild(header)
        

        child.appendTo(this.contentContainer);
        for (let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.display = "inline-block";
        }

        
    }

    // 设计Attribute
    getAttribute(name) {
        if (name == 'style') { 
            return this.root.getAttribute('style');
        } 
        return this[ATTRIBUTE_SYMBOL][name]
    } 

    setAttribute(name, value) {
        if (name == 'style') { 
            this.contentContainer.setAttribute('style', value);

            this.contentContainer.style.whiteSpace = 'nowrap';
            this.contentContainer.style.overflow = 'hidden';
            this.contentContainer.style.flex = 1;
    
            this.headerContainer.style.width = '100%';
            // this.headerContainer.style.height = '95px'
            this.headerContainer.style.whiteSpace = 'nowrap';
            this.headerContainer.style.overflow = 'hidden';
            this.headerContainer.style.backgroundColor = 'purple';
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }
    // demo
    get width() {
        return this[PROPERTY_SYMBOL].width;
    }

    set width(value) {
        return this[PROPERTY_SYMBOL].width = value; //return 为了和等号的语义相同
    }

    addEventListener(type, listener) {
        //this[EVENT_SYMBOL][type] = listener //不可以这样写，事件多头机制 不允许！！！
        if (!this[EVENT_SYMBOL][type]) {
            // this[EVENT_SYMBOL][type] = []
            this[EVENT_SYMBOL][type] = new Set;
        }
        // this[EVENT_SYMBOL][type].push(listener)
        this[EVENT_SYMBOL][type].add(listener)
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return //宽松设计
            // throw new Error('no such event') //严格设计
        }
        this[EVENT_SYMBOL][type].delete(listener); //利用set的优势
    }

    triggerEvent(type) {
        for(let event of this[EVENT_SYMBOL][type]) {
            event.call(this); //event() 也可以，但这样更严谨，如果不用箭头函数，可以正确找到this
        }
    }
}