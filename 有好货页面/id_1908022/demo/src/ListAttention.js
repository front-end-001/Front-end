const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

import css from './ListAttention.css';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListAttention{
	constructor(config){
		this[PROPERTY_SYMBOL] = Object.create(null);
		this[ATTRIBUTE_SYMBOL] = Object.create(null);
		this[EVENT_SYMBOL] = Object.create(null);
		this[STATE_SYMBOL] = Object.create(null);
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
        this.root.classList.add('list-attention');
		this.root.classList.add('root');
		
		this.container = document.createElement('div');
		this.container.classList.add('container');
		
		this.leftImg = document.createElement('img');
		this.leftImg.classList.add('left-img');
		this.leftImg.src = "https://gw.alicdn.com/tfs/TB1ggdZHAzoK1RjSZFlXXai4VXa-72-72.png_110x10000.jpg_.webp";
		this.container.appendChild(this.leftImg);

		this.describe = document.createElement('div');
        this.describe.classList.add('describe');
        this.describe.innerHTML = '好店君：该店已被2300人关注了，快来关注吧！';
		/* this.describeText = document.createElement('span');
		this.describeText.innerHTML = "极客大学天猫店";
		this.describeText.classList.add('describe-text');
		this.describeImg = document.createElement('img');
		this.describeImg.classList.add('describe-img');
		this.describeImg.src = "https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg";

		this.describe.appendChild(this.describeText);
		this.describe.appendChild(this.describeImg); */
		this.container.appendChild(this.describe);

		/* this.rightImg = document.createElement('img');
		this.rightImg.classList.add('right-img');
		this.rightImg.src = "https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg";
		this.container.appendChild(this.rightImg); */

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

