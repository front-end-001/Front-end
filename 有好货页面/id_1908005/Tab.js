const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tab {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].tabs = [];

    this.created();
  }

  appendTo(element) {
    console.log(2222, element);

    element.appendChild(this.root);
    this.mounted();
  }

  created() {
    this.root = document.createElement("div");
    this.headerContainer = document.createElement("div");
    this.headerContainer.classList.add("tabs-title");
    this.headerContainer.style.display = "flex";
    this.contentContainer = document.createElement("div");
    this.contentContainer.classList.add("tabs-content");
    this.contentContainer.style.whiteSpace = "nowrap";
    this.contentContainer.style.overflow = "hidden";
    this.contentContainer.style.height = "100%";
    this.root.appendChild(this.headerContainer);
    this.root.appendChild(this.contentContainer);
    this[STATE_SYMBOL].h = 0;
  }
  mounted() {}
  unmounted() {}
  update() {}

  appendChild(child) {
    this.children.push(child);

    let title = child.getAttribute("tab-title") || "";
    this[PROPERTY_SYMBOL].tabs.push(title);

    let tab = document.createElement("div");
    tab.innerText = title;
    tab.classList.add("tab");
    tab.style.padding = "5px 10px";
    tab.style.display = "flex";
    tab.style.flexDirection = "column";
    tab.style.alignItems = "center";
    let tabBar = document.createElement("div");
    tabBar.style.backgroundColor = "#fff";
    tabBar.style.width = "1.5em";
    tabBar.style.height = "2px";
    tabBar.style.borderRadius = "2px"
    if (child.getAttribute("active")) {
      tab.style.fontWeight = "bold";
      tabBar.style.display = "block";
    } else {
      tabBar.style.display = "none";
      tab.style.fontWeight = "normal";
    }
    tab.appendChild(tabBar);
    let key = child.getAttribute("key");
    if(!key) {
      throw "tab的key值不能为空"
    }
    if (child.getAttribute("active")) {
      this.activeTabKey = child.getAttribute("key");
    }
    tab.setAttribute("key", key);
    
    this.headerContainer.appendChild(tab);
    console.log(11111111111, this.contentContainer);
    child.appendTo(this.contentContainer);
    for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.width = "100%";
        this.contentContainer.children[i].style.height = "100%";
        this.contentContainer.children[i].style.display = "inline-block";
    }
    let contents = this.contentContainer;
    tab.addEventListener("touchstart", function() {
      console.log("====当前key======");
      console.log(this.getAttribute("key"));
      console.log("===============");
      this.activeTabKey = this.getAttribute("key");
      for (let i = 0; i < this.parentElement.children.length; i++) {
        if (
          this.getAttribute("key") ===
          this.parentElement.children[i].getAttribute("key")
        ) {
          this.setAttribute("active", true);
          this.style.fontWeight = "bold";
          this.classList.add("tab-active");
          this.parentElement.children[i].children[0].style.display = "block";
        } else {
          this.parentElement.children[i].setAttribute("active", false);
          this.parentElement.children[i].style.fontWeight = "normal";
          this.parentElement.children[i].classList.remove("tab-active");
          this.parentElement.children[i].children[0].style.display = "none";
        }
      }
      console.log("contents", contents);
      for (let i = 0; i < contents.children.length; i++) {
        if (
          this.getAttribute("key") === contents.children[i].getAttribute("key")
        ) {
          contents.children[i].setAttribute("active", true);
          contents.children[i].style.width = "100%";
          contents.children[i].style.height = "100%";
          contents.children[i].style.display = "inline-block";
        } else {
          contents.children[i].setAttribute("active", false);
          contents.children[i].style.width = "100%";
          contents.children[i].style.height = "100%";
          contents.children[i].style.display = "none";
        }
      }
    });
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
