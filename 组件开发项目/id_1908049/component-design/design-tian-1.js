const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("event");


class Carousel {
  constructor (config){
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this.create();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  create() {
    this.root = document.createElement('div');
    this.root.style.width = "300px";
    this.root.style.height = "300px";
    this[STATE_SYMBOL].hsl = 0;
    this.root.style.background = `hsl(${this[STATE_SYMBOL].hsl}, 50%, 50%)`;
  }

  mounted() {
    this.root.addEventListener("click", () => {
      this[STATE_SYMBOL].hsl += 60;
      this.root.style.background = `hsl(${this[STATE_SYMBOL].hsl}, 90%, 50%)`;
    })
  }

  log() {
    console.log('width', this.width);
  }

  get width(){
     return this[PROPERTY_SYMBOL].width;
  }
  set width(value){
    return this[PROPERTY_SYMBOL].width = value;
  } 

  getAttribute(name){
    return this[ATTRIBUTE_SYMBOL][name]
  }
  setAttribute(name, value){
    if(name == "width"){
      this.width ==  value;
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if(!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set;
    this[EVENT_SYMBOL][type].add(listenter);
  }
  removeEventListener(type, listener) {
    if(!this[EVENT_SYMBOL][type])
      return;
      this[EVENT_SYMBOL][type].delete(listener);
  }

  triggerEvent(){
    
  }
}