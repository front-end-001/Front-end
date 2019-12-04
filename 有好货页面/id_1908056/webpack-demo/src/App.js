import Tab from './components/Tab';
import ScrollView from './components/ScrollView';
import Title from './components/Title';
import { create } from './create';
import ListShop from './components/ListShop';
import Carousel from './components/Carousel';
import ListView from './components/ListView';
import Shop from './components/Shop';
import ShopItemInfo from './components/ShopItemInfo';
import InterestingShops from './page/InterestingShops';
import shopApi from './api/shop';
import NewShops from './page/NewShops';
import './app.scss';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class App {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this[PROPERTY_SYMBOL].children = [];

        this.created();
        this.state = {
            newShops: [],
        }
    }

    appendTo(element){
        element.appendChild(this.root);
        // this.render();
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
    }

    async handleSwitch(index){
        switch(index){
            case 1:
                // TODO:加载数据
                break;
            case 2:
                let response = await shopApi.fetchNew();
                let result = await response.json();
                this.state.newShops = result;
                this.render().appendTo(this.root);
                break;
        }
    }

    render(){
        let data = this.getAttribute('data') || {};
        let { focusData, mostFavourateShops, recommendedShops } = data;
        let { newShops } = this.state;
        focusData = focusData.map(item => item.image) || [];
        mostFavourateShops = mostFavourateShops || [];
        recommendedShops = recommendedShops || [];
        newShops = newShops || [];
        
        return <Tab 
            style="width: 100%;height: 100%;"
            onSwitchTab={ index => this.handleSwitch(index)}
        >
            <ScrollView 
                tab-title="推荐" 
                default={true}
                style="-webkit-overflow-scrolling:touch;font-size: 50px; overflow: auto;"
            >
                <div style={{padding: '0 3.15vw' }}>
                    <Carousel data={focusData} width={window.outerWidth}></Carousel>
                </div>
                <div style="padding: 40px 34px;">
                    <Title style="font-size:46px; color: rgba(51, 51, 51, 1); font-weight: bold">超多人收藏的店！</Title>
                </div>
                <div style="display: flex; margin: 0 34px 35px 34px;">
                    {
                        mostFavourateShops.map((shop, index) => (
                            <div style={{flex: 1, marginRight: index === 0 ? '25px' : '' }}>
                                <Shop data={shop} />
                            </div>
                        ))
                    }
                </div>
                <ListView 
                    //TODO:这里renderItem必须要在data之前，否者会报错，待优化
                    onEndReached={ () => console.log('到底了')}
                    renderItem={item => <ListShop data={item}></ListShop>}
                    data={recommendedShops} 
                />
            </ScrollView>
            <ScrollView 
                tab-title="有趣的店" 
                style="font-size: 50px; overflow: scroll;"
            >
                <InterestingShops />
            </ScrollView>
            <ScrollView 
                tab-title="品牌新店" 
                style="font-size: 50px; overflow: scroll;"
            >
                
                <NewShops />
            </ScrollView>
        </Tab>;
    }

    mounted(){

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
        this[ATTRIBUTE_SYMBOL][name] = value;
        if(name === 'data'){
            this.root.innerHTML = '';
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