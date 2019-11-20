import {create} from "../create.js";
import Div from "./Div.js";
import css from "../assets/css/ListView.css";
import ShopView from "./ShopView.js";
import ShopImgView from "./ShopImgView.js";
import ShopNewView from "./ShopNewView.js";
import SwitchButton from "./SwitchButton.js"

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


let styleElement = document.createElement("style");
styleElement.innerHTML = css;
document.getElementsByTagName("head")[0].appendChild(styleElement);

export default class ListView {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL]['swibtnData'] = {
            defaultIndex: "all",
            btnData: [{
                index: 'all',
                description: "全部"
            },
            {
                index: 'jingxi',
                description: "小惊喜"
            },
            {
                index: 'xiangbudao',
                description: "想不到"
            }]
        };
        
        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    addStyle(){

    }

    created(){
        this.root = document.createElement("div");
        this.root.className = "list-view";
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }


    render(){
        let thisObj = this;
        let data = this[ATTRIBUTE_SYMBOL]["data"]["shopList"] || [];
        let displayType = this[ATTRIBUTE_SYMBOL]["data"]["displayType"] || 1;
        
        if (displayType == 1) {
            return <Div>
                {
                    data.map(item => (
                        <ShopView data={item}></ShopView>
                    ))
                }
            </Div>
        } else if (displayType == 2) {
            let swibtnData = thisObj[STATE_SYMBOL]['swibtnData'];
            let len = data.length;
            switch (swibtnData.defaultIndex) {
                case "jingxi":
                    len = Math.min(len, 9);
                    break;
                case "xiangbudao":
                    len = Math.min(len, 6);
                    break;
                default:
                    break;
            }
            let dataGroup = [];
            for (let i = 0; i < len; i+=3) {
                dataGroup.push(data.slice(i, i + 3))
            }
            let switchbtn = function(index) {
                thisObj[STATE_SYMBOL]['swibtnData'].defaultIndex = index;
                thisObj.root.innerHTML = "";
                thisObj.render().appendTo(thisObj.root);
            };
            return <Div>
                <Div class="secondType">
                    <Div class="xinqihaodian">
                        新奇好店都在这
                    </Div>
                    <SwitchButton data={swibtnData} on-switch={switchbtn}></SwitchButton>
                </Div>
                {      
                    dataGroup.map((item, index) => (
                        <ShopImgView data={item}></ShopImgView>
                    ))
                }
            </Div>
        }
        else if (displayType == 3) {
            return <Div>
                {
                    data.map(item => (
                        <ShopNewView data={item}></ShopNewView>
                    ))
                }
            </Div>
        }
    }

    get style(){
        return this.root.style;
    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
        this.root.appendChild(this.placeHolder);
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
        }
        if(name == "data") {
            this[ATTRIBUTE_SYMBOL][name] = value;

            this.root.innerHTML = "";
            this.render().appendTo(this.root);

            return value;
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
    triggerEvent(type, ...args){
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
}