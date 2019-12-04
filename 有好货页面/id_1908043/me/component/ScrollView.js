import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'

export default class Carousel extends BaseComponent {
    created(){
        this.root = document.createElement("div");
        this.placeHolder= document.createElement("div");
        // this.placeHolder.innerText = "加载更多";
        this.placeHolder.style.backgroundColor = 'lightGreen';
        this.root.appendChild(this.placeHolder);

        this.root.addEventListener('scroll', event => {
            const clientRet = this.root.getBoundingClientRect()
            console.log(this.root.scrollHeight - this.root.scrollTop <= clientRet.height)
            // if (this.root.scrollHeight - this.root.scrollTop <= clientRet.height) {
            //     this.triggerEvent('scrollToBottom')
            // }

            const placeHolderRect = this.placeHolder.getBoundingClientRect()
            console.log(clientRet.bottom, placeHolderRect.top, clientRet.bottom > placeHolderRect.top)
            if (clientRet.bottom > placeHolderRect.top) {
                this.triggerEvent('scrollToBottom')
            }
        })
    }

    appendChild(child) {
        this.children.push(child)
        child.appendTo(this.root)
        this.root.appendChild(this.placeHolder);
    }

    get style() {
        return this.root.style;
    }

    setAttribute(name, value){
        if (name == 'style') {
            this.root.setAttribute('style', value)
        }
        if (name === 'placeHolderText') {
            this.placeHolder.innerText = value;
        }
        if(name === 'class') {
            this.root.setAttribute('class', value);
        }
        return this[ATTRIBUTE][name] = value;
    }

    triggerEvent(type){
        for(let event of this[EVENT][type])
            event.call(this);
    }
}