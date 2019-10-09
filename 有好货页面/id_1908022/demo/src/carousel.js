const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

import { enableGesture } from './touch.js';

export default class Carousel{
	constructor(config){
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[ATTRIBUTE_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
		this[PROPERTY_SYMBOL].urls = config.urls;
		this[STATE_SYMBOL].position = 0;
		this.created();
	}

	log(){
		console.log(this.width);
	}

	appendTo(Ele){
		Ele.appendChild(this.root);
		this.mounted();
	}

	created() {
		this.root = document.createElement('div');
		this.root.style.width = '100%';
		// this.root.style.height = '350px';
		this.container = document.createElement('div');
		this.pointer = document.createElement('div');
		this.pointer.setAttribute('style','height: 30px;position: absolute;right: 30px;bottom: 20px;background: transparent;');
		
		this.container.style.width = '100%';
		this.container.style.height = '100%';
		this.container.style.overflow = "hidden";
		this.container.style.borderRadius = '10px';
		let urls = this[PROPERTY_SYMBOL].urls;
		for(let img of urls){
			let thisImg = document.createElement('img');
			thisImg.src = img;
			thisImg.style.width = "100%";
			thisImg.style.height = "100%";
			thisImg.style.transition = "ease .5s"
			this.container.appendChild(thisImg);
			let point = document.createElement('span');
			point.setAttribute('style','display: inline-block;width: 15px;height: 15px;background: transparent;border: 1px solid #fff;border-radius: 50%;margin-right: 10px;cursor: pointer;');
			this.pointer.appendChild(point);
		}
		this.root.appendChild(this.container);
		this.root.appendChild(this.pointer);

		this.root.addEventListener("touchmove",function(e){ 
            e.cancelBubble = true;
            e.stopImmediatePropagation();
        }, {
            passive: true
		});
		
		// console.log(enableGesture);
		enableGesture(this.container);

		let children = this.container.children;
        let x = 0;
        this[STATE_SYMBOL].position = 0;
		let width = this.root.offsetWidth;
        // console.log(contentContainerWidth);

        /* this._carousel.addEventListener('panstart',event => {
            console.log('start',event);  
        }) */

        //监听滑动
        this.container.addEventListener('panmove',event => {
            if(event.isVertical) return;
			event.origin.preventDefault();
			clearTimeout(this.Frame);
            let dX = event.dX;
            if(this[STATE_SYMBOL].position == 0 || this[STATE_SYMBOL].position == (children.length - 1))
                dX = dX / 2;
            x = this[STATE_SYMBOL].position * -this.container.offsetWidth;
            for(let child of children){
                child.style.transition = "transform ease 0s";
                child.style.transform = `translateX(${dX + x}px)`
            } 
        })

        //监听滑动结束
        this.container.addEventListener('panend',event => {
            if(event.isVertical) return;
            event.origin.preventDefault();

            if(event.isFlick){
                if(event.dX > 0){
                    this[STATE_SYMBOL].position -= 1;
                }else if(event.dX < 0){
                    this[STATE_SYMBOL].position += 1;
                }
            }else{
                x = this[STATE_SYMBOL].position * -this.container.offsetWidth;
                this[STATE_SYMBOL].position = -Math.round((event.dX + x) / this.container.offsetWidth);
            }
            
            this[STATE_SYMBOL].position = Math.max(0, Math.min(this[STATE_SYMBOL].position,children.length -1 ));
            for(let child of children){
                child.style.transition = "transform ease 0s";
                child.style.transform = `translateX(${this[STATE_SYMBOL].position * -this.container.offsetWidth}px)`;
			}
			this.pointMove();

			this.Frame = setTimeout(() => {
				this.nextFrame();
			},2000)
            
        })



	}

	mounted() {
		this.root.addEventListener('click', () => {
			this.root.style.background = 'green';
		})
		this.Frame = setTimeout(() => {
			this.nextFrame();
		},2000)
	}

	pointMove(){
		let points = this.pointer.children;
		for(let point of points){
			point.style.background = "transparent";
		}
		points[this[STATE_SYMBOL].position].style.background = "#ffffff";
	}

	nextFrame(){
		let childrens = this.container.children;
		let width = this.container.offsetWidth;
		let position = this[STATE_SYMBOL].position;
		let nextposition = position;
		nextposition++;
		nextposition = nextposition % childrens.length; 

		childrens[nextposition].style.transition = "ease 0s";
		childrens[nextposition].style.transform = `translate(${(-nextposition + 2 ) * width}px)`;		

		setTimeout(() => {
			childrens[position].style.transition = "ease .5s";
			childrens[position].style.transform = `translate(${(-position - 1 ) * width}px)`;
			childrens[nextposition].style.transition = "ease .5s";
			childrens[nextposition].style.transform = `translate(${(-nextposition ) * width}px)`;
			this[STATE_SYMBOL].position = nextposition;
			this.pointMove();
		},16)

			

		this.Frame = setTimeout(() => {
			this.nextFrame();
		},2000)
	}


	appendChild(child){
		// child.appendTo(this.root);
	}

	unmounted() {

	}

	update() {

	}


	get width(){
		return this[PROPERTY_SYMBOL].width;
	}

	set width(value){
		this.root.style['width'] = value + 'px'; 
		return this[PROPERTY_SYMBOL].width = value;
	}

	get height(){
		return this[PROPERTY_SYMBOL].height;
	}

	set height(value){
		this.root.style['height'] = value + 'px';
		return this[PROPERTY_SYMBOL].height = value;
	}


	getAttribute(name){
		return this[ATTRIBUTE_SYMBOL][name];
	}

	setAttribute(name,value){
		if(name == 'style'){
			value = value.split(';');
			for(let sty of value){
				if(sty.split(':')[0].trim()){
					if(sty.split(':')[0].trim() == "width")
						this.width = parseInt(sty.split(':')[1].trim());
					if(sty.split(':')[0].trim() == "height")
						this.height = parseInt(sty.split(':')[1].trim());
					this.root.style[sty.split(':')[0].trim()] = sty.split(":")[1].trim();	
				}
			}
		}
		return this[ATTRIBUTE_SYMBOL][name] = value;
	}


	addEventListener(type,listener){
		if(!this[EVENT_SYMBOL][type])
			this[EVENT_SYMBOL][type] = new Set;
		this[EVENT_SYMBOL][type].add(listener);
		console.log('todolist');
	}

	removeEventListener(type,listener){
		if(!this[EVENT_SYMBOL][type])
			return;
		this[EVENT_SYMBOL][type].delete(listener);
	}

	tiggerEvent(type){
		for(let event of this[EVENT_SYMBOL][type]){
			event.call(this);
		}
	}

}

