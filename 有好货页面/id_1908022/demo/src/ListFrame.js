const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

import css from './ListFrame.css';
import {create} from './create.js';
import ListHead from './ListHead.js';
import ListAttention from './ListAttention.js';
import ListImgPermutation from './ListImgPermutation.js';
import ListTag from './ListTag.js';

let styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(styleElement);

export default class ListFrame{
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
        this.root.classList.add('list-frame');
		this.root.classList.add('root');
		
		this.container = document.createElement('div');
		this.container.classList.add('container');
		
		this.render();
	}

	mounted() {
		
	}

	
	render(){
		let data = {
			"head": {
				"logoImage": "https://gw.alicdn.com/bao/uploaded//59/65/TB1o6x5bW1s3KVjSZFASut_ZXXa.jpg_110x10000Q75.jpg_.webp",
				"headDescribe": "极客大学天猫店",
				"headDescribeImg": "https://gw.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png_110x10000.jpg_.webp",
				"rightImg": "进店",
				"rightImgText": "https://gw.alicdn.com/tfs/TB1FAoOCXzqK1RjSZSgXXcpAVXa-220-100.png_140x10000.jpg_.webp"
			},
			"attention": {
				"showImg": "https://gw.alicdn.com/tfs/TB1ggdZHAzoK1RjSZFlXXai4VXa-72-72.png_110x10000.jpg_.webp",
				"showTitle": "好店君：该店已被2300人关注了，快来关注吧！"
			},
			"imgPermutation": {
				"imgBig": "https://gw.alicdn.com/bao/uploaded/i2/TB1lYWEGXXXXXa2XXXXXXXXXXXX_!!0-item_pic.jpg_290x10000Q75.jpg_.webp",
				"imgSmallTop": "https://gw.alicdn.com/bao/uploaded/i2/22092380/TB2SI.oaNfxQeBjSspjXXX4opXa_!!22092380.jpg_220x10000Q75.jpg_.webp",
				"imgSmallBottom": "https://gw.alicdn.com/bao/uploaded/i3/22092380/TB2x5eFppXXXXX6XFXXXXXXXXXX_!!22092380.jpg_220x10000Q75.jpg_.webp"
			},
			"tag": {
				"tagLeft": [
					{
						"message": "",
						"messageImg": ""
					},
					{
						"message": "",
						"messageImg": ""
					},
					{
						"message": "",
						"messageImg": ""
					}
				],
				"tagRight": {
					"message": "相似好店",
					"messageToImg": "https://gw.alicdn.com/tfs/TB1gmBrCzTpK1RjSZKPXXa3UpXa-24-54.png"
				}
			}
	
			
		};
		setTimeout(() => {
			 data = this[ATTRIBUTE_SYMBOL]["data"] || data;
			 this.listHead = <ListHead data = { data.head }></ListHead>;
			 this.listHead.appendTo(this.container);
	 
			 this.listAttention = <ListAttention data = { data.attention }></ListAttention>;
			 this.listAttentionBox = document.createElement('div');
			 this.listAttentionBox.classList.add('list-attention-box');
			 this.listAttention.appendTo(this.listAttentionBox);
			 this.container.appendChild(this.listAttentionBox);
			 
			 this.listImgPermutation = <ListImgPermutation data = { data.imgPermutation }></ListImgPermutation>;
			 this.listImgPermutationBox = document.createElement('div');
			 this.listImgPermutationBox.classList.add('list-img-permutation-box');
			 this.listImgPermutation.appendTo(this.listImgPermutationBox);
			 this.container.appendChild(this.listImgPermutationBox);
	 
			 this.listTag = <ListTag data =  { data.tag }  ></ListTag>;
			 this.listTag.appendTo(this.container);
	 
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
		if(name == 'data'){
            this[ATTRIBUTE_SYMBOL][name] = value;
            return value;
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

