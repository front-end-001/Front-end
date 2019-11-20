import css from './listview.css';
import {create} from './create.js';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
styleElement.setAttribute('scoped', '');
document.getElementsByTagName('head')[0].appendChild(styleElement);


export default class CardView3 {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
        this.render().appendTo(this.root);
    }

    mounted() {

    }

    unmounted() {

    }

    update() {

    }

    render() {
        let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
        return <div>
            {data.map(item => {
                return <div style="margin: 28px; width: 924px; background-color: #523b26;border-radius: 36px;">
                    <div style="width: 100%; height: 793px;  ">
                        <div style="margin-left: 35px; display: flex;">
                            <div style="width: 50%;">
                                <div style="width: 116px; height: 116px; margin-top: 33px;">
                                    <img
                                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117799872,2369415256&fm=26&gp=0.jpg"
                                        alt="" style="border-radius: 50%; width: 100%; height: 100%;"/>
                                </div>
                                <div
                                    style="margin-top: 31px; width: 319px; height: 44px; font-family: PingFangSC-Medium; font-size: 46px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #ffffff;">
                                    极客时间旗舰店
                                </div>
                                <div
                                    style="opacity: 0.7; margin: 22px 0px; width: 233px; height: 30px; font-family: PingFangSC-Light; font-size: 32px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #ffffff;">
                                    科技风 行业优质
                                </div>
                            </div>
                            <div style="width: 50%;">
                                <div
                                    style="margin-top: 57px; display: flex; align-items: center; width: 440px; height: 69px; background-color: #000000; border-radius: 35px 0px 0px 35px; opacity: 0.3;">
                                    <div
                                        style="margin-left: 20px; width: 333px; height: 31px; font-family: PingFangSC-Light; font-size: 32px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #ffffff;">
                                        该店已被3.9万人关注啦！
                                    </div>
                                </div>
                                <div
                                    style="margin: 58px 35px 43px 0; float: right;display: flex; align-items: center;width: 160px; height: 72px; background-color:#8B5742;  border-radius: 36px;">
                                    <div
                                        style="margin-left: 25px;width: 76px; height: 37px; font-family: PingFangSC-Regular; font-size: 40px; font-weight: normal; font-stretch: normal; line-height: 35px; letter-spacing: 0px; color: #ffffff;">
                                        进店>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="margin: 35px; display: flex;">
                            <div style="width: 50%; height: 414px; margin-right: 26px;">
                                <img
                                    src="https://img.alicdn.com/imgextra/i4/1761455088/O1CN01KGXlyL1nSLiMaTtIr_!!1761455088.jpg_430x430q90.jpg"
                                    alt="" style="border-radius: 18px; width: 100%; height: 100%;"/>
                            </div>
                            <div style="width: 50%; height: 414px;">
                                <img
                                    src="https://img.alicdn.com/imgextra/i2/1761455088/O1CN01g0lV1x1nSLjsd5W81_!!1761455088.jpg_430x430q90.jpg"
                                    alt="" style="border-radius: 18px; width: 100%; height: 100%;"/>
                            </div>
                        </div>
                    </div>
                </div>;
            })}
        </div>;
    }

    addStyle() {

    }

    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root);
    }


    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        if (name === "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name === "style") {
            this.root.setAttribute("style", value);
        }
        if (name === 'data') {
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = "";
            this.render().appendTo(this.root);
            this.addStyle();
            return value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type, ...args) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }

        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this, ...args);
        }

    }
}