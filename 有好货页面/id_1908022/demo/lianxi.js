const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');


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
		this.root.style.width = '500px';
		this.root.style.height = '300px';
		let urls = this[PROPERTY_SYMBOL].urls;
		for(let img of urls){
			let thisImg = document.createElement('img');
			thisImg.src = img;
			thisImg.style.width = "100%";
			thisImg.style.height = "100%";
			thisImg.style.transition = "ease .5s"
			this.root.appendChild(thisImg);
		}

	}

	mounted() {
		this.root.addEventListener('click', () => {
			this.root.style.background = 'green';
		})
		setTimeout(() => {
			this.nextFrame();
		},2000)
	}

	nextFrame(){
		let childrens = this.root.children;
		let width = this[PROPERTY_SYMBOL].width;
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
		},16)

			
		setTimeout(() => {
			this.nextFrame();
		},2000)
	}


	appendChild(child){

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

	tiggerEvent(type){
		for(let event of this[EVENT_SYMBOL][type]){
			event.call(this);
		}
	}

}

