/*
 * @Author: 玉皇大亮
 * @since: 2019-09-07 10:16:56
 * @LastAuthor: Do not edit
 * @lastTime: 2019-09-07 18:52:29
 * @message: 组件设计 健壮 高可用 
 */
// method1
const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state')

export default class Component { //是否可以抽象出来一部分作为基类？
    constructor(config) { //config的设计
        //js 改变
        this[PROPERTY_SYMBOL] = Object.create(null); 
        //html 改变
        this[ATTRIBUTE_SYMBOL] = Object.create(null); //如果要设计toString，这样不会去找原型链
        //外部传入
        this[EVENT_SYMBOL] = Object.create(null);
        //内部变量
        this[STATE_SYMBOL] = Object.create(null);

        // this.onWidthChange = null;
        this.didCreated();
    }
    appendTo(element) {
        element.appendChild(this.root);
        this.didMounted();
    }

     // lifeCycle
     didCreated() {
        this.root = document.createElement('div');
        this.root.style.width = '500px';
        this.root.style.height = '500px';
        // this.root.style.backgroundColor = 'blue'
        this[STATE_SYMBOL].h = 0; //色相

        this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`; // 色相 纯度 明度
    }

    didMounted() {
        //绑定事件
        this.root.addEventListener('click', () => {
            this[STATE_SYMBOL].h += 30;
            this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        });
    }

    didUnmounted() {

    }

    didUpdate() {

    }

    didDestroyed() { //无法实现

    }

    get property() {
        return this.property
    }
    set property(value) {
        this.property = value;
    }
    // 设计Attribute
    getAttribute(name) {
        return this[ATTRIBUTE_SYMBOL][name]
    } 

    setAttribute(name, value) {
        // 如果想名字分流 ifelse or switch
        if (name == 'width') { 
            this.width = value; // html的单向同步设计
            // if (this.onWidthChange) {
            //     this.onWidthChange();
            // }
            // this.triggerEvent('widthChange') //如果想在设置attr时候，调用触发事件，可以这样用
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
        // let events = this[EVENT_SYMBOL][type];
        // for(let i = 0; i < events.length; i++) {
        //     if (events[i] == listener) {
        //         //events.splice(i, 1); // O(n) 操作
        //         let tmp = events[i]; //更好的设计，放到数组最后，然后pop()
        //         event[i] = events[events.length - 1];
        //         events[events.length - 1] = tmp;
        //         events.pop();
        //     }
        // }
    }

    triggerEvent(type) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        } 
        for(let event of this[EVENT_SYMBOL][type]) {
            event.call(this); //event() 也可以，但这样更严谨，如果不用箭头函数，可以正确找到this
        }
    }

    log() {
        console.log('width:', this.width);
    }

   
}