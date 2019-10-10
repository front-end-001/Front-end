/*
 * @Author: 玉皇大亮
 * @since: 2019-09-08 14:06:34
 * @LastAuthor: Do not edit
 * @lastTime: 2019-09-08 14:43:04
 * @message: Tag组件
 */

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state')

export default class MyTabComponent {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null); 
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.config = config;
        this.didCreated();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.didMounted();
    }

    didCreated() {
        let {headers, children} = this.config;
        this.headers = headers;
        this.children = children;
        this.root = document.createElement('div');
        this.root.appendChild(this.headers);
    }

    didMounted() {

    }

    getAttribute(type) {
        return this[ATTRIBUTE_SYMBOL][type]
    }

    setAttribute(type, value) {
        switch(type) {
            case 'width':
                this.width = value;
                break;
            case 'height':
                this.height = value;
                break;
            case 'headers':
                this.headers = this.headers;
                break;
            case 'children': 
                this.children = this.children;
                break;
        }
        this[ATTRIBUTE_SYMBOL][type] = value;
    }

    get headers() {
        return this[PROPERTY_SYMBOL].headers;
    }

    set headers(value) {
        let headerCmp = value.map(text => {
            let item = document.createElement('div');
            item.classList += 'tabItem';
            item.innerHTML = text;
            return item;
        });
        let headerContainer = document.createElement('div');
        for (let item of headerCmp) {
            headerContainer.appendChild(item);
        }
        headerContainer.classList += 'tabs';
        return this[PROPERTY_SYMBOL].headers = headerContainer;
    }

    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    set children(value) {
        return this[PROPERTY_SYMBOL].children = value;
    }
};