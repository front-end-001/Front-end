const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

import css from './ListImgPermutation.css';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListImgPermutation{
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
        this.root.classList.add('list-imgPermutation');
		this.root.classList.add('root');
		
		this.container = document.createElement('div');
		this.container.classList.add('container');
		
		
		
		this.render();

	}

	mounted() {
		
	}

	
	render() {
		setTimeout(() => {
			let data = this[ATTRIBUTE_SYMBOL]['data'] || {};
			this.listImgBox = document.createElement('div');
			this.listImgBox.classList.add('list-img-box');
			this.listImgBoxLeft = document.createElement('div');
			this.listImgBoxLeft.classList.add("list-img-box-left");
			this.listImgBoxLeft.style.backgroundImage = `url(${data.imgBig || "https://gw.alicdn.com/bao/uploaded/i2/TB1lYWEGXXXXXa2XXXXXXXXXXXX_!!0-item_pic.jpg_290x10000Q75.jpg_.webp"})`
			this.listImgBox.appendChild(this.listImgBoxLeft);

			this.listImgBoxRight = document.createElement('div');
			this.listImgBoxRight.classList.add("list-img-box-right");
			this.listImgBoxRightTop = document.createElement('div');
			this.listImgBoxRightTop.classList.add("list-img-box-right-top");
			this.listImgBoxRightTop.style.backgroundImage = `url(${data.imgSmallTop || "https://gw.alicdn.com/bao/uploaded/i2/22092380/TB2SI.oaNfxQeBjSspjXXX4opXa_!!22092380.jpg_220x10000Q75.jpg_.webp"})`
			this.listImgBoxRight.appendChild(this.listImgBoxRightTop);

			this.listImgBoxRightBottom = document.createElement('div');
			this.listImgBoxRightBottom.classList.add("list-img-box-right-bottom");
			this.listImgBoxRightBottom.style.backgroundImage = `url(${data.imgSmallBottom || "https://gw.alicdn.com/bao/uploaded/i3/22092380/TB2x5eFppXXXXX6XFXXXXXXXXXX_!!22092380.jpg_220x10000Q75.jpg_.webp"})`
			this.listImgBoxRight.appendChild(this.listImgBoxRightBottom);

			this.listImgBox.appendChild(this.listImgBoxRight);

			this.container.appendChild(this.listImgBox);

			this.root.appendChild(this.container);
		}, 0);
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
	}

	removeEventListener(type,listener){
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

