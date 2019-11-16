import enableGesture from '../gesture'
import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'
import './TabView.css'

export default class Tab extends BaseComponent {
    created(){
        this.handleGesture = this.handleGesture.bind(this);
        this[PROPERTY].headers = [];
        this[STATE].startTransform = 0;

        this.root = document.createElement("div");
        this.root.style.display = "flex";
        this.headerContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.contentContainer.style.whiteSpace = "nowrap";
        this.contentContainer.style.overflow = "hidden";
        // this.contentContainer.style.height = "100%";
        this.contentContainer.style.flex = "1";
        this.root.appendChild(this.headerContainer);
        this.root.appendChild(this.contentContainer);

        this.root.addEventListener("touchmove",function(e){
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });

        this[STATE].h = 0;

        enableGesture(this.contentContainer)
        this.handleGesture()
    }

    appendChild(child){
        this.children.push(child);

        let n = this.children.length - 1;

        let title = child.getAttribute("tab-title") || "";
        this[PROPERTY].headers.push(title);

        let header = document.createElement("header");
        header.innerText = title;
        header.style.display = "inline-block";
        // header.style.height = '22px';
        header.style.fontFamily = 'PingFangSC-Light';
        // header.style.fontSize = '20px';
        header.style.margin = '10px 17px 10px 17px';
        this.headerContainer.appendChild(header);
        child.appendTo(this.contentContainer);
        for(let i = 0; i < this.contentContainer.children.length; i ++) {
            this.contentContainer.children[i].style.width = "100%";
            this.contentContainer.children[i].style.height = "100%";
            this.contentContainer.children[i].style.verticalAlign = "top";
            this.contentContainer.children[i].style.display = "inline-block";
        }

        header.addEventListener('click', event => {
            // 直接切换
            // for(let i = 0; i < this.contentContainer.children.length; i ++) {
            //     this.contentContainer.children[i].style.width = "100%";
            //     this.contentContainer.children[i].style.height = "100%";
            //     this.contentContainer.children[i].style.display = "none";
            // }
            // console.log(child);
            // // child.setAttribute('style', 'display: inline-block')
            // child.style.display = 'inline-block';

            // 通过设置 translateX 切换
            console.log(n)
            for(let i = 0; i < this.contentContainer.children.length; i ++) {
                this.contentContainer.children[i].style.transition = "ease 0.5s";
                // this.contentContainer.children[i].style.transform = `translateX(${ -n * 100}%)`;
                this.contentContainer.children[i].style.transform = `translateX(${ -n * this.width}px)`;
            }
            this[STATE].startTransform = -n * this.width;

            console.log(this.contentContainer);


            // // 通过 js Animation 设置
            // let timer = setInterval(() => {
            //     this.time += 16
            //     const totalTime = 0.5 * 1000;
            //     let progress = startTransform / startTransform;
            //     if (progress > 1) {
            //         progress = 1;
            //         clearInterval(timer)
            //         this.time = 0;
            //     }
            //     for (let i = 0; i < this.contentContainer.children.length; i++) {
            //         this.contentContainer.children[i].style.transform = `translateX(${ -(n * progress)* 100}%)`;
            //     }
            // }, 16)
        })
    }

    get width() {
        return this.contentContainer.getBoundingClientRect().width
        // return this.root.clientWidth;
    }

    setAttribute(name, value){
        if (name == "style") {
            this.root.setAttribute("style", value);
            this.root.style.display = "flex";
            this.root.style.flexDirection = "column";
        }
        if (name == "class") {
            this.root.setAttribute("class", value);
        }

        return this[ATTRIBUTE][name] = value;
    }

    handleGesture(){
        this.contentContainer.addEventListener('mousedown', event => event.preventDefault());

        this.contentContainer.addEventListener('pan', event => {
            if (event.isVertical) return
            this.update()
            console.log('pan')

            for (let child of this.children) {
                child.style.transition = 'transform ease 0s'
                child.style.transform = `translate(${this[STATE].startTransform + event.dx}px)`
            }
        })

        this.contentContainer.addEventListener('panend', event => {
            if (event.isVertical) return
            this.update()
            console.log('panend')
            this.position = - (Math.round((this[STATE].startTransform + event.dx) / this.width))

            this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

            for (let child of this.children) {
                child.style.transition = 'ease 0.5s'
                child.style.transform = `translate(${ - this.position * this.width}px)`
            }
            this[STATE].startTransform = - this.position * this.width;
        })

        this.contentContainer.addEventListener('flick', event => {
            this.update()
            console.log('flick', event.dx)
            if (event.dx > 0) {
                this.position = this.position - 1
            }
            if (event.dx < 0) {
                this.position = this.position + 1
            }

            this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

            for (let child of this.children) {
                child.style.transition = 'ease 0.5s'
                child.style.transform = `translate(${ - this.position * this.width}px)`
            }
            this[STATE].startTransform = - this.position * this.width;
        })
    }
}

