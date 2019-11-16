import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'

export default class Wrapper extends BaseComponent {
    created(type){
        this.root = document.createElement(type);
    }

    getAttribute(name){
        return this.root.getAttribute(name)
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value)
    }
    addEventListener(type, listener){
        this.root.addEventListener(...arguments)
    }
    removeEventListener(type, listener){
        this.root.removeEventListener(...arguments)
    }
}