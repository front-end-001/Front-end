
const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ScrollView {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  created() {
    this.root = document.createElement("div");
    this.root.addEventListener(
      "touchmove",
      function(e) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
      },
      {
        passive: false
      }
    );
    this[STATE_SYMBOL].h = 0;
  }
  mounted() {
    // 判断展示哪个content 将展示的translate过来
    console.log("mounted this.root", this.root);
    // for (let i = 0; i < this.parentElement.children.length; i++) {
    //   if (
    //     this.getAttribute("key") ===
    //     this.parentElement.children[i].getAttribute("key")
    //   ) {
    //     this.setAttribute("active", true);
    //     this.style.fontWeight = "bold";
    //     this.classList.add("tab-active");
    //     this.parentElement.children[i].children[0].style.display = "block";
    //   } else {
    //     this.parentElement.children[i].setAttribute("active", false);
    //     this.parentElement.children[i].style.fontWeight = "normal";
    //     this.parentElement.children[i].classList.remove("tab-active");
    //     this.parentElement.children[i].children[0].style.display = "none";
    //   }
    // }
  }
  unmounted() {}
  update() {}

  appendChild(child) {
      this.children.push(child);
      child.appendTo(this.root);
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  getAttribute(name) {
    if (name == "style") {
      return this.root.getAttribute("style");
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    if (name == "style") {
      this.root.setAttribute("style", value);
    }
    if (name == "class") {
      this.root.setAttribute("class", value);
    }
    if (name == "key") {
      this.root.setAttribute("key", value);
    }
    if (name == "active") {
      this.root.setAttribute("active", value);
    }
    this.root.style.overflow = "auto";
    this.root.style.whiteSpace = "normal";
    return (this[ATTRIBUTE_SYMBOL][name] = value);
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (let event of this[EVENT_SYMBOL][type]) event.call(this);
  }
}