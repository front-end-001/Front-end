
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

import css from './div.css';
import {create} from './create.js';
import ListFrame from './ListFrame.js';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class Div {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        
        this.created();
    }

    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.classList.add('div');
        this.root.classList.add('root');
        this.placeHolder = document.createElement('div');
        this.placeHolder.classList.add('palce-holder');
        this.placeHolder.innerText = "加载更多......";
        this.pullHolder = document.createElement('div');
        this.pullHolder.classList.add('pull-holder');
        this.pullHolder.innerText = "下拉刷新";
        // this.root.appendChild(this.placeHolder);
        this[PROPERTY_SYMBOL]['isDone'] = false;
        this.root.addEventListener('scroll', event => {
            let clientRect = this.root.getBoundingClientRect();
            let placeHolderRect = this.placeHolder.getBoundingClientRect();
            /* if(clientRect.bottom < placeHolderRect.top){
                this.triggerEvent('scrollToBottom', 'aaa');
            } */

            if(this.root.scrollTop <= 0){
                this.root.insertBefore(this.pullHolder, this.root.children[0]);
                this.root.removeChild(this.placeHolder);
                setTimeout(() => {
                    window.getJSON("../data.json").then( data => {
                        window.render(data[((Math.random() * 10) > 5) ? 0 : 1]);
                        // // document.body.removeChild(this.root.getElementsByClassName('.list-frame'));
                        // this.root.removeChild(this.root.children);
                        // this.render([data[((Math.random() * 10) > 5) ? 0 : 1]]).appendTo(this.root);
                        // this.root.removeChild(this.pullHolder);
                    }).catch(
                        err => {
                            console.log(err);
                            return err;
                        }
                    )
                }, 1000);
                
            }

            if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height + 10){
                if(!this[PROPERTY_SYMBOL]['isDone']){
                    this.triggerEvent('scrollToBottom', '加载更多......');
                    this.root.appendChild(this.placeHolder);
                    this[PROPERTY_SYMBOL]['isDone'] = true;

                     setTimeout(() => {
                        this[PROPERTY_SYMBOL]['isDone'] = false;
                        window.getJSON("../data.json").then( data => {
                            // this[ATTRIBUTE_SYMBOL]["data"].push(data[2]);
                            this.root.removeChild(this.placeHolder);
                            this.render([data[1], data[2]]).appendTo(this.root);
                            this.triggerEvent('scrollToBottom', '人家也是有底线的！');
                            this.root.appendChild(this.placeHolder);
                        }).catch(
                            err => {
                                console.log(err);
                                return err;
                            }
                        )
                    }, 2000);
                }


                
            }
            // console.log(this.root.scrollHeight, clientRect.height, this.root.scrollTop);
        });


        this.imgBottom = document.createElement("img");
        this.imgBottom.src = "https://gw.alicdn.com/tfs/TB1hH4MQVXXXXXhXpXXXXXXXXXX-108-108.png_110x10000.jpg_.webp";
        this.imgBottom.setAttribute('style', `
            border: 0px solid black;
            position: fixed;
            box-sizing: border-box;
            display: flex;
            -webkit-box-orient: vertical;
            flex-direction: column;
            place-content: flex-start space-between;
            flex-shrink: 0;
            -webkit-box-pack: justify;
            z-index: 1001;
            right: 14px;
            width: 108.616px;
            opacity: 1;
            height: 108.712px;
            bottom: 125.28px;
            -webkit-box-align: center;
            align-items: center;
        `);
        // this.root.appendChild(this.imgBottom);

        this.imgBottom.addEventListener('click', () => {
            console.log(111);
            // this.root.scrollTop = 0;
            console.log(this.root);
            this.root.scrollTop = 0;
            // this.root.style.background = 'blue';
            // this.root.scrollIntoView("alignToTop");
        })

        /* this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        }); */
    }

    
    mounted(){

    }


    render(data) {
        // let data = this[ATTRIBUTE_SYMBOL]["data"] || [];
        console.log(data);
        return <div>
            {
                data.map(item => {
                   return <div class="frame-box">
                        {
                            <ListFrame data={item}></ListFrame>
                        }
                   </div>;
                })
            }
        </div>;
    }


    unmounted(){

    }
    update(){

    }


    

    
    log(){
        console.log("width:", this.width);
    }
    get width(){
        return this[PROPERTY_SYMBOL].width;
    }
    set width(value){
        return this[PROPERTY_SYMBOL].width = value;
    }
    get urls(){
    	return this[PROPERTY_SYMBOL].urls;
    }
    set urls(value){
    	return this[PROPERTY_SYMBOL].urls = value;
    }
    appendChild(child){
        child.appendTo(this.root);
        this.root.appendChild(this.placeHolder);

    }

    getAttribute(name){
        return this[ATTRIBUTE_SYMBOL][name]
    }
    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute('style',value);
            this.root.style.width = "100%";
            this.root.style.height = "100%";
            this.root.style.display = "inline-block";
            this.root.style.verticalAlign = "top";
            this.root.style.overflowY = 'scroll';
        }
        if(name == "data"){

        }

        if(name == "placeHolder"){
            this.placeHolder.innerText = value;
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