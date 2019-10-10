const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class List {
  constructor(config){
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].headers = [];

    this.created();
  }

  appendTo(element){
    element.appendChild(this.root);
    this.mounted();
  }

  created(){
    this.root = document.createElement("div");
    this.listHeader = document.createElement('div')
    this.root.appendChild(this.listHeader)
    this[STATE_SYMBOL].h = 0;
  }
  mounted(){

  }
  unmounted(){

  }
  update(){

  }

  appendChild(child){
    this.children.push(child);
    let title = child.getAttribute("tab-title") || "";
    let src = child.getAttribute("src") || "";
    let isTmall = child.getAttribute("isTmall") || "";
    let isTmallLogo = document.createElement("img");
    isTmallLogo.setAttribute('src',isTmall)
    console.log(title)
    let header = document.createElement("span");
    let logo = document.createElement("img");
    header.innerText = title;
    logo.setAttribute('src',src)
    this.listHeader.setAttribute('class','list-header')
    isTmallLogo.setAttribute('class','isTmallLogo')
    logo.setAttribute('class','logo')
    this.listHeader.appendChild(logo)
    this.listHeader.appendChild(header)
    this.listHeader.appendChild(isTmallLogo)
    child.appendChild(header);
    console.log(child)
    child.appendTo(this.root)
  }


  get children(){
    return this[PROPERTY_SYMBOL].children;
  }
  getAttribute(name){
    if(name == "style") {
      return this.root.getAttribute("style");
    }
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value){
    if(name == "style") {
      this.root.setAttribute("style", value);
    }
    if(name == "src") {
      this.root.setAttribute("src", value);
    }if(name == "class") {
      this.root.setAttribute("class", value);
    }

    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  addEventListener(type, listener){
    if(!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set;
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener){
    if(!this[EVENT_SYMBOL][type])
      return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type){
    if(!this[EVENT_SYMBOL][type])
      return;
    for(let event of this[EVENT_SYMBOL][type])
      event.call(this);
  }
}
