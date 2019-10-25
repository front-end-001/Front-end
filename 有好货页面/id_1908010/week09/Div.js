/*
 * @Author: 玉皇大亮
 * @since: 2019-09-07 10:16:56
 * @LastAuthor: Do not edit
 * @lastTime: 2019-09-08 15:15:16
 * @message: 组件设计 健壮 高可用 
 */

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state')

export default class Div { 
    constructor(config) { //config的设计
        this[PROPERTY_SYMBOL] = Object.create(null); 
        this[ATTRIBUTE_SYMBOL] = Object.create(null); 
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];
        this.didCreated();
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.didMounted();
    }

     // lifeCycle
     didCreated() {
        this.root = document.createElement('div');
        
    }

    didMounted() {
        //绑定事件
        
    }

    didUnmounted() {

    }

    didUpdate() {

    }

    didDestroyed() { //无法实现

    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root);
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
            this.root.setAttribute('style', value);

        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
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