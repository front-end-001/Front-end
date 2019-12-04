import { create } from '../create';
import TabButton from '../components/TabButton';
import ListView from '../components/ListView';
import ShopItem from '../components/ShopItem';
import api from '../api/shop';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

let buttons = ['全部','小惊喜','想不到'];
let shops = [];

export default class Div {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);

        this[PROPERTY_SYMBOL].children = [];
        this.state = {
            currTab: 0,
            shops: [],
        }
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.render().appendTo(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
    }

    async loadData(type){
        let fetch 
        switch(type){
            case 0:
                fetch = await api.fetchInterestingAll();
                break;
            case 1:
                fetch = await api.fetchInterestingSuprise();
                break;
            case 2:
                fetch = await api.fetchInterestingUnexpect();
                break;
            default:
                fetch = await api.fetchInterestingAll();
        }
        // 加载数据
        let result = await fetch.json();
        console.log(result);
        let shops = result.interestingShops;
        // 格式化数据
        if(Array.isArray(shops)){
            let formatResult = new Array(Math.ceil(shops.length / 3));
            for(let i = 0; i < shops.length; i++){
                if(!formatResult[Math.floor(i/3)]){
                    formatResult[Math.floor(i/3)] = [];
                }
                formatResult[Math.floor(i/3)].push(shops[i]);
            }
            console.log(formatResult)
            this.state.shops = formatResult;
        }
    }

    async handleClickTab(index){
        if(index != this.state.currTab){
            // 切换tab
            this.state.currTab = index;
            await this.loadData(index);
            this.root.innerHTML = '';
            this.render().appendTo(this.root);
        }
    }

    async mounted(){
        await this.loadData();
        this.root.innerHTML = '';
        this.render().appendTo(this.root);
    }

    render(){
        const { currTab, shops } = this.state;
        return <div>
                <div class="header-title">
                    <span style={{fontSize: '46px', color: '#fff'}}>新奇好店都在这</span>
                    <TabButton data={buttons} curr={currTab} onClikTab={index => this.handleClickTab(index)} />
                </div>
                <ListView 
                    //TODO:这里renderItem必须要在data之前，否者会报错，待优化
                    renderItem={(item, index) => <ShopItem isReverse={ index % 2 != 0 }  data={item} /> }
                    data={shops} 
                />
            </div>
    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
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