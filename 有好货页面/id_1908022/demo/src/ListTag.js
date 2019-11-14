const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

import css from './listTag.css';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListTag{
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
        this.root.classList.add('list-tag');
		this.root.classList.add('root');
		
		this.container = document.createElement('div');
		this.container.classList.add('container');
        
        

		this.root.appendChild(this.container);
		
		this.render();

	}

	mounted() {
		
	}

	

	render(){
		setTimeout(() => {
			let data = this[ATTRIBUTE_SYMBOL]["data"] || {};
			console.log(data);
			this.listBottom = document.createElement('div');
			this.listBottom.classList.add('list-bottom');

			this.listBottomLeft = document.createElement('div');
			this.listBottomLeft.classList.add('list-bottom-left');

			this.listBottomRight = document.createElement('div');
			this.listBottomRight.classList.add('list-bottom-right');
			this.listBottomRightSpan = document.createElement('span');
			this.listBottomRightSpan.classList.add('list-bottom-right-span');
			this.listBottomRightSpan.innerHTML = data.tagRight.message || '相似好店';
			this.listBottomRightImg = document.createElement('img');
			this.listBottomRightImg.classList.add('list-bottom-right-img');
			this.listBottomRightImg.src = data.tagRight.messageToImg || "https://gw.alicdn.com/tfs/TB1gmBrCzTpK1RjSZKPXXa3UpXa-24-54.png";
			this.listBottomRight.appendChild(this.listBottomRightSpan);
			this.listBottomRight.appendChild(this.listBottomRightImg);
			
			this.listBottom.appendChild(this.listBottomLeft);
			this.listBottom.appendChild(this.listBottomRight);

			this.container.appendChild(this.listBottom);

		}, 0 );
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

