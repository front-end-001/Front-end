import Component from './BaseComponent'
import './ScrollView.scss'
import {create} from '../lib/create'
import {enableGesture} from '../lib/gesture'

export default class ScrollView extends Component {
    constructor(config){
        super(config)
        this.property.children = []
        this.state.triggeredPullDown = false
        this.state.triggeredPullUp = false

        this.Create()

    }

    Create(){

        //阻止滑动事件向上传播
        // this.root.addEventListener('touchmove', (event) => {
        //     event.cancelBubble = true
        //     event.stopImmediatePropagation(); 
        // }, {
        //     passive: false
        // })
        enableGesture(this.root)


        this.root.addEventListener("pan", (event) => {
            if (event.isVertical) {
                event.origin.cancelBubble = true
                event.stopImmediatePropagation();
            } 
        }, {
            passive: true 
        })
        
        this.placeHolder = document.createElement("div");
        //this.placeHolder.innerText = "加载更多";
        this.placeHolder.style.backgroundColor = "lightgreen";
        this.root.appendChild(this.placeHolder);

        this.root.addEventListener("scroll", event => {
            let clientRect = this.root.getBoundingClientRect();
            let placeHolderRect = this.placeHolder.getBoundingClientRect();
            console.log(this.root.scrollHeight, this.root.scrollTop, clientRect.height)
            if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height) {
                if(!this.state.triggeredPullDown) {
                    this.triggerEvent("scrolToBottom");
                    this.state.triggeredPullDown = true;
                }
            }
            //console.log(this.root.scrollHeight, clientRect.height, this.root.scrollTop );
            /*if(this.root.scrollHeight - this.root.scrollTop <= clientRect.height) {
                this.triggerEvent("scrolToBottom", "b");
            }*/
        })
    }

    appendChild(child){
        child.appendTo(this.root)

        

    }

    setAttribute(name, value) {
        if (name == 'className') {
            return this.root.className = value
        }
        return this.attrs[name] = value
    }

    getAttribute(name) {
        if(name == 'className'){
            return this.root.className
        } 
        return this.attrs[name]
    }

    triggerEvent(type, ...args){
        console.log('type', type)
        if(!this[EVENT_SYMBOL][type])
            return;
        for(let event of this[EVENT_SYMBOL][type])
            event.call(this, ...args);
    }
} 