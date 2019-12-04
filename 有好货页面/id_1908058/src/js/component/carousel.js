const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

import { enableGesture } from './gesture.js';

import { DOMElementStyleVectorAnimation, DOMElementStyleAnimation, Timeline } from './animation';

import style from './carousel.less';



export default class Carousel {
    constructor(config){
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        

        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].headers = [];

        this.created();
    }

    appendTo(element){
        element.appendChild(this._container);
        this.mounted();
    }

    created(){
        this._container = document.createElement("div")

        this._container.classList.add(`${style["carousel"]}`);
        // console.log( this[ATTRIBUTE_SYMBOL], 'create')
        // this.root.classList.add(this[ATTRIBUTE_SYMBOL]["className"])
        this.render()
    }
    mounted(){

    }
    unmounted(){

    }
    update(){

    }

    render(){
        let data = this[ATTRIBUTE_SYMBOL]["data"] || [];

        if(data.length === 0){
            return
        }
        let dotsContainer =  document.createElement('div');
        dotsContainer.classList.add(`${style["dots-container"]}`);

        data.map( (item, index)=>{
            let img = document.createElement('img');
            let dots = document.createElement('span');

            dots.classList.add(`${style['dots']}`);
            dotsContainer.appendChild(dots);
            dots.setAttribute('data-pos', index);
            if(index == 0){
                dots.classList.add(`${style["active"]}`); 
            }

            img.src = item;
            this._container.appendChild(img);
            // img.style.zIndex = index;
        } );
        

        this._container.appendChild(dotsContainer);
        dotsContainer.addEventListener('click', (e)=>{
            let target = e.target;

            if(!target.classList.contains(style["dots"])){
                return
            }

            let pos = target.getAttribute('data-pos');

            nextPic(pos);

        })


        let tl = new Timeline();
        
        let children =  Array.prototype.slice.call(this._container.getElementsByTagName('img'));
        let position = 0;
        let offsetTimeStart = 0;
        
        let nextPic = ( pos )=>{
            let nextPosition = pos ? pos : position + 1;

            nextPosition = nextPosition % children.length;
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];

            // console.log(nextPosition);
            
            let current = children[position];
            let next = children[nextPosition];
            
            // console.log(lastPosition, position, nextPosition);

            //把next 摆放到正确的位置
            next.style.transition = 'ease 0s';
            next.style.transform = `translate(${ 100 - 100 * nextPosition }%)`;

            // current.style.transition = 'ease 0s';
            // current.style.transform = `translate(${ -100 * current }%)`;
            
            console.log(100 - 100 * nextPosition, nextPosition);
            // last.style.transition='ease 0s';
            // last.style.transform = `translate(${ 100 - 100 * nextPosition }%)`;

            console.log(last.style.transform, - 702 - 702 * position);
            
            offsetTimeStart = Date.now();
            tl = new Timeline();
            tl.addAnimation(new DOMElementStyleAnimation(
                current,
                "transform",
                0, - 702 * position,
                1000, - 702 - 702 * position,
                (v) => `translateX(${v}px)`
            ));
            tl.addAnimation(new DOMElementStyleAnimation(
                next,
                "transform",
                0, 702 - 702 * nextPosition,
                1000, - 702 * nextPosition,
                (v) => `translateX(${v}px)`
            ));
            tl.start();

            position = nextPosition;

            setTimeout(()=>{
                for(let i = 0; i < dotsContainer.children.length; i++){
                    if(nextPosition == i){
                        dotsContainer.children[i].classList.add(`${style["active"]}`);
                    }else{
                        dotsContainer.children[i].classList.remove(`${style["active"]}`);
                    }
                }
                
            }, 0);

            
            // requestAnimationFrame((()=>{
            //     requestAnimationFrame(()=>{
            //         current.style.transition = '';
            //         current.style.transform = `translate(${ -100 - 100 * position }%)`;

            //         next.style.transition = '';
            //         next.style.transform = `translate(${ -100 * nextPosition }%)`
            //         position = nextPosition;
            //     })
            // }))

            // setTimeout( ()=>{
            //     current.style.transition = '';
            //     current.style.transform = `translate(${ -100 - 100 * position }%)`;

            //     next.style.transition = '';
            //     next.style.transform = `translate(${ -100 * nextPosition }%)`
            //     position = nextPosition;
            // } , 16)
            
            nextPocTimer = setTimeout(nextPic, 3000);
        }
        
        let nextPocTimer = setTimeout(nextPic, 3000);
        enableGesture(this._container);

        this._container.addEventListener("touchmove",function(e){ 
            // console.log(e);
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive:false
        });

        let x = 0;
        let offset = 0;

        this._container.addEventListener("touchstart", event => {
            tl.pause();

            let currentTime = Date.now();
            if( currentTime - offsetTimeStart < 1404){
                offset = 702 -  (currentTime - offsetTimeStart) /1404  * 702;
            }else{
                offset = 0;
            }

            clearTimeout(nextPocTimer);
        })
        
        this._container.addEventListener('pan', event=>{
            // console.log('cc pan')
            if(event.isVertical){
                return
            }
            
            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let lastPosition = (children.length + position - 1) % children.length;
            let next = children[nextPosition];
            let last = children[lastPosition];
            
            console.log(lastPosition, position, nextPosition );
            last.style.transition = 'ease 0s';
            last.style.transform = `translate(${ -702 - 702 * lastPosition + event.dx + offset }px)`;
            
            next.style.transition = 'ease 0s';
            next.style.transform = `translate(${ 702 - 702 * nextPosition + event.dx + offset }px)`;

            current.style.transition = 'ease 0s';
            current.style.transform = `translate(${ -702 * position + event.dx + offset }px)`;

        });
        
        this._container.addEventListener("panend", event => {
            // console.log('panend')
            nextPocTimer = setTimeout(nextPic, 3000);
            let  isLeft;
            if(event.isVertical){
                return
            }
            if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){
                if(event.dx > 0) {
                    position --;
                    isLeft = true;
                }
                    
                if(event.dx < 0) {
                    position ++;
                    isLeft = false;
                }
            }else{
                if(event.dx > 351) {
                    position --
                    isLeft = true;
                } else if(event.dx < -351) {
                    position ++
                    isLeft = false;
                } else if(event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }


                // position = -(Math.round((position * 702 - event.dx) / 702));
            }

            
            // position = Math.max(0, Math.min(position, children.length - 1));
            position = (children.length + position) % children.length;
            
            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let lastPosition = (children.length + position - 1) % children.length;
            let next = children[nextPosition];
            let last = children[lastPosition];
            

            if(!isLeft){
                last.style.transition = "";
            }else{
                last.style.transition = "ease 0s";
            }

            last.style.transform = `translate(${ -702 - 702 * lastPosition }px)`;

            if(isLeft){
                next.style.transition = "";
            }else{
                next.style.transition = "ease 0s";
            }

            next.style.transform = `translate(${ 702 - 702 * nextPosition }px)`;

            current.style.transition = '';
            current.style.transform = `translate(${ -702 * position }px)`;



            console.log('end', lastPosition, position, nextPosition, );
            console.log(-702 - 702 * lastPosition , -702 * position ,  702 - 702 * nextPosition )
            console.log('end');
            // for(let child of children) {
            //     child.style.transition = "";
            //     child.style.transform = `translate(${-position * 702}px)`;
            // }

            x = -position * 702;
        });

        this._container.addEventListener("mousedown", event => event.preventDefault());
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
        // console.log(name, value, 'carousel');
        if(name == "style") {
            return this.root.setAttribute("style", value);
        }
        if(name == "data"){
            this[ATTRIBUTE_SYMBOL][name] = value;
            // this.root.innerHTML = "";
            // this.render().appendTo( this.root );
            this._container.innerHTML = "";
            this.render();
            return value
        }

        if( name == "className"){
            this[ATTRIBUTE_SYMBOL][name] = value;
            this._container.classList.add(value);
            return
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