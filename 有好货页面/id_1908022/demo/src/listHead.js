const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

import css from './listHead.css';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListHead{
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
        this.root.classList.add('list-head');
		this.root.classList.add('root');
		
		this.container = document.createElement('div');
		this.container.classList.add('container');
		
		this.leftImg = document.createElement('img');
		this.leftImg.classList.add('left-img');
		this.leftImg.src = "https://gw.alicdn.com/bao/uploaded//59/65/TB1o6x5bW1s3KVjSZFASut_ZXXa.jpg_110x10000Q75.jpg_.webp";
		this.container.appendChild(this.leftImg);

		this.describe = document.createElement('div');
		this.describe.classList.add('describe');
		this.describeText = document.createElement('span');
		this.describeText.innerHTML = "极客大学天猫店";
		this.describeText.classList.add('describe-text');
		this.describeImg = document.createElement('img');
		this.describeImg.classList.add('describe-img');
		this.describeImg.src = "https://gw.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png_110x10000.jpg_.webp";

		this.describe.appendChild(this.describeText);
		this.describe.appendChild(this.describeImg);
		this.container.appendChild(this.describe);

        this.rightImg = document.createElement('div');
        this.rightImg.innerHTML = "进店";
		this.rightImg.classList.add('right-img');
		this.rightImg.style.backgroundImage = "url('https://gw.alicdn.com/tfs/TB1FAoOCXzqK1RjSZSgXXcpAVXa-220-100.png_140x10000.jpg_.webp')";
        // this.rightImgSpan = document.createElement('span');
        // this.rightImgSpan.classList.add('right-img-span');
        // this.rightImgSpan.innerText = '进店';
        // this.rightImg.appendChild(this.rightImgSpan);
        this.container.appendChild(this.rightImg);

        this.root.appendChild(this.container);

	}

	mounted() {
		
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

