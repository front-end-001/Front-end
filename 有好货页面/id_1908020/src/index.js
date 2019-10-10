import './index.css'
import Div from './component/Div'
class Text {
  constructor(config) {
    this.text = config
    this.created();
  }
  created() {
    this.node = document.createElement("span");
    this.node.innerText = this.text
  }
  mounted() {
  }
  appendTo(el) {
    el.appendChild(this.node);
    this.mounted();
  }
}

function myCreate(Class, attributes, ...children) {
  let object = new Class();
  for (let name in attributes) {
    if (name.match(/^on-([\s\S]+)$/)) {
      console.log(object)
      object.addEventListener(RegExp.$1, attributes[name])
    } else {
      object.setAttribute(name, attributes[name]);
    }
  }
  for (let child of children) {
    if (typeof child === "string") {
      object.appendChild(new Text(child));
    } else {
      object.appendChild(child);
    }
  }
  return object;
}

function aaaa() {
  console.log('aaaaaaaa')
}

let c =
  <Div className="container1" >
    <Div className="container2" style="color:red;" on-click={aaaa.bind(this)}>111</Div>
    <Div className="container3" style="color:green;" >222</Div>
    <Div className="container4" style="color:blue;" >333</Div>
    {/* asdfasdf
    <Div className="container" style="color:green;" >111</Div> */}
  </Div>

c.appendTo(document.querySelector('#app'))
console.log(c)