import Component from './BaseComponent'
import './TabView.scss'
import {enableGesture} from '../lib/gesture.js'
import { STATE_SYMBOL } from '../lib/consts';

export default class TabView extends Component {
    constructor(config){
        super(config);

        this.property.children = [];
        this.property.headers = [];

        this.didCreate();
    }

    didCreate(){
        this.headerContainer = document.createElement('div')
        this.headerContainer.className = 'headerContainer'

        this.contentContainer = document.createElement('div')
        this.contentContainer.className = 'contentContainer'

        this.root.appendChild(this.headerContainer)
        this.root.appendChild(this.contentContainer)

        enableGesture(this.contentContainer)

        this.state.position = 0

        this.contentContainer.addEventListener('pan', event => {
            event.origin.preventDefault()
            console.log("pan")
            let contentWidth = this.contentContainer.getBoundingClientRect().width;

            // --> 边界阻力效果
            let dx = event.dx;
            if(this.state.position == 0 && event.dx > 0){
                dx = dx/2;
            }
            if(this.state.position == this.contentContainer.children.length-1 && event.dx < 0){
                dx  = dx/2;
            }
            // <-- 边界阻力效果

            for(let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0.5s'
                let originOffset = contentWidth * this.state.position //起始位置
                this.contentContainer.children[i].style.transform = `translateX(${dx - originOffset}px)`
            }

        })

        this.contentContainer.addEventListener('panend', event => {
            event.origin.preventDefault()
            console.log("panend")
            let isLeft;
            let contentWidth = this.contentContainer.getBoundingClientRect().width
            if (event.isFlick) {
                if (event.vx > 0) {
                    this.state.position--;
                    isLeft = true;
                }
                
                if (event.vx < 0) {
                    this.state.position++;
                    isLeft = false;
                } 
            } else {
                if (event.dx > contentWidth/2) {
                    this.state.position--;
                    isLeft = true;
                } else if (event.dx < -contentWidth/2) {
                    this.state.position++;
                    isLeft = false;
                } else if(event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }
            }

            if(this.state.position < 0) {
                this.state.position = 0
            } 
            if(this.state.position >= this.contentContainer.children.length) {
                this.state.position = this.contentContainer.children.length - 1;
            }

            for(let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transition = 'transform ease 0.5s'
                let originOffset = contentWidth * this.state.position
                this.contentContainer.children[i].style.transform = `translateX(${-originOffset}px)`
            }

            // update headerItem index
            for(let i = 0; i < this.headerContainer.children.length; i++) {
                if (this.state.position == i) {
                    this.headerContainer.children[i].className = "headerItem active"
                    this.headerContainer.children[i].children[0].style.display = "block";
                } else {
                    this.headerContainer.children[i].className = "headerItem"
                    this.headerContainer.children[i].children[0].style.display = "none";
                }
            }

        })
    }

    didMounted(){
        
    }

    appendChild(child) {
        let n = this.children.length;
        this.children.push(child)
        let title = child.getAttribute('title') || ""
        this.property.headers.push(title)

        let headerItem = document.createElement('div')
        headerItem.innerText = title
        headerItem.className = "headerItem" 
        let headerIndicator = document.createElement('div')
        headerIndicator.className = "headerIndicator"
        let defaultActive=child.getAttribute('active') || false
        headerIndicator.style.display = defaultActive ? "block" : 'none';
        
        headerItem.appendChild(headerIndicator)
        this.headerContainer.appendChild(headerItem)

        headerItem.addEventListener("click", event => {
            this.state.position = n;
            let idx = this.property.headers.indexOf(headerItem.innerText)

            for(let i = 0; i < this.headerContainer.children.length; i++) {
                if (idx == i) {
                    this.headerContainer.children[i].className = "headerItem active"
                    this.headerContainer.children[i].children[0].style.display = "block";
                } else {
                    this.headerContainer.children[i].className = "headerItem"
                    this.headerContainer.children[i].children[0].style.display = "none";
                }
            }

            for(let i = 0; i < this.contentContainer.children.length; i++) {
                this.contentContainer.children[i].style.transform = `translateX(${-n*100}%)`
                this.contentContainer.children[i].style.transition = 'ease 0.5s'
            }
        });

        child.appendTo(this.contentContainer)
        
    }

    setAttribute(name, value) {
        if (name == 'className') {
            this.root.className = value
        }
        return this.attrs[name] = value
    }

    getAttribute(name) {
        if(name == 'className'){
            return this.root.className
        } 
        return this.attrs[name]
    }

    get children() {
        return this.property.children
    }

}