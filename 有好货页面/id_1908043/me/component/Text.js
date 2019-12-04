import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'

export default class Text extends BaseComponent {
    created(config){
        this.text = config || ''
        this.root = document.createElement("span");
        this.root.innerText = this.text
    }
}