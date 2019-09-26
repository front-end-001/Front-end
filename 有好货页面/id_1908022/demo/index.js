/* import Tabview from "./tabView.js";
import Div from "./div.js";
import Carousel from "./lianxi.js";

let urls = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
];

let config = {
	urls: urls
}


function myCreate(Class, attributes, ...children){
	console.log(Class);
    var object = new Class(config);
    for(let name in attributes)
        object.setAttribute(name, attributes[name]);
    for(let child of children)
    	object.appendChild(child);
    return object; 
}


var c = <Tabview style="width: 100%;height: 100%;display: block;">
	<Div tab-title="推介" style="background: greenyellow;">
		<Carousel style="width: 500px;height: 300px;">
			123
		</Carousel>
	</Div>
	<Div tab-title="有趣的店" style="background: blueviolet;"></Div>
	<Div tab-title="品牌新店" style="background: orange;"></Div>
</Tabview>
c.appendTo(document.body); */

import List from './list.js';
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
console.log(c);