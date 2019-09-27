const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");

export default class Text {
  constructor(props) {
    this[PROPERTY_SYMBOL] = Object.create(null)
    this[ATTRIBUTE_SYMBOL] = Object.create(null)
    this[ATTRIBUTE_SYMBOL].children = props.children
    this.created();
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
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  created() {
    this.root = document.createTextNode(this[ATTRIBUTE_SYMBOL].children)
    // this.root.style = this[PROPERTY_SYMBOL].style
  }

  appendTo(element) { // 必须有，用来给父级节点添加内容的
    element.append(this.root);
  }
}