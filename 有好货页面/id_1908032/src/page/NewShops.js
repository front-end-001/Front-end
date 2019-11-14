import { create } from '../create';
import ListView from '../components/ListView';
import ShopItemInfo from '../components/ShopItemInfo';
import shopApi from '../api/shop';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Div {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];
        this.data = [];
        this.created();
        this.fetchShops = this.fetchShops.bind(this);
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
    }

    async fetchShops(){
        let response = await shopApi.fetchNew();
        let result = await response.json();
        this.data = [...this.data, ...result.newShops];
        this.root.innerHTML = '';
        this.render().appendTo(this.root);
    }
    
    mounted(){
       this.fetchShops(); 
    }
    unmounted(){

    }
    update(){

    }

    appendChild(child){
        this.children.push(child);
        child.appendTo(this.root);
    }

    render(){
        let data = this.data || [];
        console.log(this.data);
        return <ListView 
            //TODO:这里renderItem必须要在data之前，否者会报错，待优化
            // onEndReached={this.fetchShops}
            renderItem={item => <ShopItemInfo data={item} />}
            data={data} 
        />
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
        this[ATTRIBUTE_SYMBOL][name] = value;
        if(name == 'data'){
            this.render().appendTo(this.root);
        }
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