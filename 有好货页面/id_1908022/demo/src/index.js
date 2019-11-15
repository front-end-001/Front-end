import Tabview from "./tabView.js";
import Div from "./div.js";
import Carousel from "./carousel.js";
import ListView from "./ListView.js";
import ListShop from "./ListShop.js";
import {create} from "./create.js";
import ListHead from "./ListHead.js";
import ListAttention from "./ListAttention.js";
import ListFrame from "./ListFrame.js";


window.getJSON = function(url) {
	const promise = new Promise(function(resolve, reject){
		const handler = function() {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
		};
		const client = new XMLHttpRequest();
		client.open("GET", url);
		client.onreadystatechange = handler;
		client.responseType = "json";
		client.setRequestHeader("Accept", "application/json");
		client.send();

	});							

	return promise;
};






function loadMore(a){
	// console.log(a);
	// console.log("load more");

	setTimeout(() => {
		window.getJSON("../data.json").then( data => {
			window.render(data);
			this.setAttribute('placeHolder', "我也是有底线的！");
		}).catch(
			err => {
				console.log(err);
				return err;
			}
		)
		
		
	}, 1000)
}

window.render = function(obj, root) {
	var c = <Tabview style="width: 100%;height: 100%;display: block;">
	<Div tab-title="推介" placeHolder="load more" on-scrollToBottom={loadMore} style="background-color: rgb(238, 238, 238);padding: 35px;box-sizing: border-box;">
		<Carousel style="width: 100%;height: 496px;position: relative;box-sizing: border-box;">
		</Carousel>
		<div style="margin-top: 30px;">
			<ListShop  data={ obj } ></ListShop>
		</div>
		
	</Div>
	<Div tab-title="有趣的店" placeHolder="load more" on-scrollToBottom={loadMore} style="background: blueviolet;-webkit-overflow-scrolling:touch;"> 
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  abc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abcabc abc abc
	  123
	</Div>
	<Div tab-title="品牌新店" style="background: orange;">
		<div style="padding: 20px;">
			<ListHead ></ListHead>
		</div>
		<ListView ></ListView>
	</Div>
</Tabview>;
document.body.innerHTML = "";
c.appendTo(document.body);
}

/* import List from './list.js';
let urls = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

let config = {
	urls: urls
}

function myCreate(Class, attributes){
	var Object = new Class(config);
	for(let attr in attributes)
		Object.setAttribute(attr,attributes[attr]);
	return Object;
}

// let c = new carousel();

let c = <List tab-tilte="name" style="width: 500px;height: 300px;white-space: nowrap;overflow: hidden;background: white;"></List>;
c.appendTo(document.body);
let f = () => {console.log(222)};
c.addEventListener('click',() => {console.log(111)});
c.addEventListener('click', f);
c.removeEventListener('click', f);
c.triggerEvent('click');
console.log(c); */