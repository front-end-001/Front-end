import {enaleGesture} from './enaleGesture'
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");


export default class Carousel {
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
    this.root.style.display = "flex";
    this.contentContainer = document.createElement("div");
    this.contentContainer.style.whiteSpace = "nowrap";
    this.contentContainer.style.overflow = "hidden";
    this.contentContainer.style.flex = "1";
    // this.headerContainer.style.position = 'fixed';
    // this.headerContainer.style.top = 0;
    // this.headerContainer.style.backgroundColor = "#792afd";
    this.root.appendChild(this.contentContainer);
    enaleGesture(this.contentContainer)
    this[STATE_SYMBOL].position = 0
    this.contentContainer.addEventListener("pan", event => {
      event.preventDefault();
      if(event.isVertical){
        return
      }
      let dx = event.dx
      //拿到宽度
      let width = this.contentContainer.getBoundingClientRect().width
      // 阻力效果
      if (this[STATE_SYMBOL].position == 0 && event.dx > 0) {
        dx = dx / 2
      }
      if (this[STATE_SYMBOL].position == this.contentContainer.children.length - 1 && event.dx < 0) {
        dx = dx / 2
      }
      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition = "ease 0.5s";
        this.contentContainer.children[i].style.transform = `translateX(${ dx - width * this[STATE_SYMBOL].position}%)`;
      }
    });
    this.contentContainer.addEventListener("panend", event => {
      // event.origin.preventDefault();
      event.preventDefault();
      if(event.isVertical){
        return
      }
      let width = this.contentContainer.getBoundingClientRect().width
      console.log(width,'width')

      let isLeft;
      if(event.isFlick) {
        if(event.dx > 0) {
          this[STATE_SYMBOL].position --;
          isLeft = true;
        }
        if(event.dx < 0) {
          this[STATE_SYMBOL].position ++;
          isLeft = false;
        }
      } else {
        if (event.dx > width/2) {
          this[STATE_SYMBOL].position--
          isLeft = true;
        } else if (event.dx < -width/2) {
          this[STATE_SYMBOL].position++
          isLeft = false;
        } else if (event.dx > 0) {
          isLeft = false;
        } else {
          isLeft = true;
        }

        //position = (Math.round((position * 500 - event.dx) / 500));
      }
      console.log(this[STATE_SYMBOL].position,'this[STATE_SYMBOL].position')
      // let position = (children.length + position) % children.length;
      if(this[STATE_SYMBOL].position<0){
        this[STATE_SYMBOL].position = 0
      }
      if(this[STATE_SYMBOL].position>=this.contentContainer.children.length ){
        this[STATE_SYMBOL].position = this.contentContainer.children.length-1
      }
      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition = "ease 0.5s";
        this.contentContainer.children[i].style.transform = `translateX(${ - width * this[STATE_SYMBOL].position}px)`;
      }
    });

    this[STATE_SYMBOL].h = 0;
  }
  mounted(){

  }
  unmounted(){

  }
  update(){

  }

  appendChild(child){
    let n = this.children.length
    this.children.push(child);
    this[STATE_SYMBOL].position = n
    child.appendTo(this.contentContainer);
    for(let i = 0; i < this.contentContainer.children.length; i ++) {
      this.contentContainer.children[i].style.width = "100%";
      this.contentContainer.children[i].style.height = "100%";
      this.contentContainer.children[i].style.display = "inline-block";
    }
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
      this.root.style.display = "flex";
      this.root.style.flexDirection = "column"
    }
    if(name == "class") {
      this.root.setAttribute("class", value);
    }
    if(name == "length-img") {
      this.root.setAttribute("length-img", value);
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

