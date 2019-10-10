import { Timeline, DOMElementStyleAnimation } from "../0908animation";
import { cubicBezier } from "../cubicBezier";
import { enableGesture } from "../gesture";

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");
const KEYS = Symbol("keys");
const TIMELINE = Symbol("timeLine");
const ENABLEGESTURE = Symbol("enableGesture");
const CUBICBEZIER = Symbol("cubicBezier");

export default class Tab {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[KEYS] = Object.create(null);
    this[TIMELINE] = Timeline;
    this[ENABLEGESTURE] = enableGesture;
    this[CUBICBEZIER] = cubicBezier;

    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].tabs = [];

    this.activeTabKey = [];

    this.created();
  }

  appendTo(element) {

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
    this[TIMELINE] = new Timeline();
    // this.root.addEventListener(
    //   "touchmove",
    //   function(e) {
    //     e.cancelBubble = true;
    //     e.stopImmediatePropagation();
    //   },
    //   {
    //     passive: false
    //   }
    // );
    // 引入手势库
    this[ENABLEGESTURE](this.contentContainer);
    let contents = this.contentContainer,
      timeline = this[TIMELINE],
      activeTabKey = this.activeTabKey,
      keys = this[KEYS];
    this.headerContainer.addEventListener("touchstart", function(e) {
      let clickTab = e.target;
      console.log("====当前key======");
      console.log(clickTab.getAttribute("key"));
      timeline.clearAnimation();
      for (let i = 0; i < this.children.length; i++) {
        if (
          clickTab.getAttribute("key") === this.children[i].getAttribute("key")
        ) {
          clickTab.setAttribute("active", true);
          clickTab.style.fontWeight = "bold";
          clickTab.classList.add("tab-active");
          clickTab.children[0].style.display = "block";
          activeTabKey.push(clickTab.getAttribute("key"));
          if (activeTabKey.length > 3) {
            activeTabKey.shift();
          }
        } else {
          this.children[i].setAttribute("active", false);
          this.children[i].style.fontWeight = "normal";
          this.children[i].classList.remove("tab-active");
          this.children[i].children[0].style.display = "none";
        }
      }
      // 重复点当前tab 不进行动画展示
      if (this.getAttribute("key") === activeTabKey[activeTabKey.length - 2]) {
        return;
      }
      // 便利每个子元素 如果key与tab选中的key相同 则将active设置为true 给予显示
      // 否则隐藏 并且将active设置为false
      for (let i = 0; i < contents.children.length; i++) {
        // 初始位置到展示位置需要移动的距离
        let d = -keys[contents.children[i].getAttribute("key")] * 100;
        if (
          clickTab.getAttribute("key") ===
          contents.children[i].getAttribute("key")
        ) {
          contents.children[i].setAttribute("active", true);
          contents.children[i].style.width = "100%";
          contents.children[i].style.height = "100%";
          contents.children[i].style.transform = `translateX(${d + 100}%)`;

          timeline.addAnimation(
            new DOMElementStyleAnimation(
              contents.children[i],
              "transform",
              0,
              d + 100,
              500,
              d,
              v => `translateX(${v}%)`
            )
          );
        } else {
          contents.children[i].setAttribute("active", false);
          contents.children[i].style.width = "100%";
          contents.children[i].style.height = "100%";
          // contents.children[i].style.display = "none";
          if (
            activeTabKey[activeTabKey.length - 2] ===
            contents.children[i].getAttribute("key")
          ) {
            timeline.addAnimation(
              new DOMElementStyleAnimation(
                contents.children[i],
                "transform",
                0,
                d,
                500,
                d - 100,
                v => `translateX(${v}%)`
              )
            );
          } else {
            contents.children[i].style.transform = `translateX(${d - 100}%)`;
          }
        }
      }
      timeline.restart();
    });
    // 绑定子元素的手势监听
    contents.addEventListener("pan", function(event) {
      // 如果是垂直移动 则终止一切横移展示
      if (event.isVertical) {
        return;
      }
      for (let i = 0; i < contents.children.length; i++) {
        // 获取当前content宽度 移动距离 对应的key
        let width = contents.children[i].getBoundingClientRect().width,
          dx = event.dx,
          key = contents.children[i].getAttribute("key");
        if (key === activeTabKey[activeTabKey.length - 1]) {
          // 获取下一个 上一个 档案content key对应的下角标
          let next =
              keys[key] + 1 < contents.children.length ? keys[key] + 1 : 0,
            prev =
              keys[key] - 1 >= 0 ? keys[key] - 1 : contents.children.length - 1,
            now = keys[key];
          // 默认初始位置到展示位置的距离
          let d = -keys[contents.children[i].getAttribute("key")] * 100;
          contents.children[now].style.transform = `translateX(${-keys[
            contents.children[now].getAttribute("key")
          ] *
            100 +
            (100 * dx) / width}%)`;
          contents.children[next].style.transform = `translateX(${-keys[
            contents.children[next].getAttribute("key")
          ] *
            100 +
            100 +
            (100 * dx) / width}%)`;
          contents.children[prev].style.transform = `translateX(${-keys[
            contents.children[prev].getAttribute("key")
          ] *
            100 -
            100 +
            (100 * dx) / width}%)`;
        }
      }
    });
    let tabs = this.headerContainer.children;
    contents.addEventListener("panend", function(event) {
      let theKey = "";
      let width, dx, key, next, prev, now;
      for (let i = 0; i < contents.children.length; i++) {
        width = contents.children[i].getBoundingClientRect().width;
        dx = (100 * event.dx) / width;
        key = contents.children[i].getAttribute("key");
        if (key === activeTabKey[activeTabKey.length - 1]) {
          next = keys[key] + 1 < contents.children.length ? keys[key] + 1 : 0;
          prev =
            keys[key] - 1 >= 0 ? keys[key] - 1 : contents.children.length - 1;
          now = keys[key];
          console.log("panend dx", dx);
          if (Math.abs(dx) < 50) {
            contents.children[now].style.transform = `translateX(${-keys[
              contents.children[now].getAttribute("key")
            ] * 100}%)`;
            contents.children[prev].style.transform = `translateX(${-keys[
              contents.children[prev].getAttribute("key")
            ] *
              100 -
              100}%)`;
            contents.children[next].style.transform = `translateX(${-keys[
              contents.children[next].getAttribute("key")
            ] *
              100 +
              100}%)`;
            theKey = contents.children[now].getAttribute("key");
            addKey(theKey);
          } else {
            if (dx > 0) {
              contents.children[prev].style.transform = `translateX(${-keys[
                contents.children[prev].getAttribute("key")
              ] * 100}%)`;
              contents.children[now].style.transform = `translateX(${-keys[
                contents.children[now].getAttribute("key")
              ] *
                100 -
                100}%)`;
              contents.children[next].style.transform = `translateX(${-keys[
                contents.children[next].getAttribute("key")
              ] *
                100 -
                100}%)`;
              theKey = contents.children[prev].getAttribute("key");
            } else {
              contents.children[next].style.transform = `translateX(${-keys[
                contents.children[next].getAttribute("key")
              ] * 100}%)`;
              contents.children[now].style.transform = `translateX(${-keys[
                contents.children[now].getAttribute("key")
              ] *
                100 -
                100}%)`;
              contents.children[prev].style.transform = `translateX(${-keys[
                contents.children[prev].getAttribute("key")
              ] *
                100 -
                100}%)`;
              theKey = contents.children[next].getAttribute("key");
            }
          }

          
          
        }
      }
      activeTabKey.push(theKey);
      if (activeTabKey.length > 3) {
        activeTabKey.shift();
      }
      for (let i = 0; i < tabs.length; i++) {
        if (
          activeTabKey[activeTabKey.length - 1] ===
          tabs[i].getAttribute("key")
        ) {
          this.setAttribute("active", true);
          this.style.fontWeight = "bold";
          this.classList.add("tab-active");
          tabs[i].children[0].style.display = "block";
        } else {
          tabs[i].setAttribute("active", false);
          tabs[i].style.fontWeight = "normal";
          tabs[i].classList.remove("tab-active");
          tabs[i].children[0].style.display = "none";
        }
      }
    });
  }
  mounted() {
  }
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
      this.activeTabKey.push(key)
    }
    tab.setAttribute("key", key);
    this.tab = tab;
    this.headerContainer.appendChild(tab);
    child.appendTo(this.contentContainer);
    let keys = this[KEYS];
    for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.width = "100%";
        this.contentContainer.children[i].style.height = "100%";
        this.contentContainer.children[i].style.display = "inline-block";
        // 获取key对应下角标
        keys[this.contentContainer.children[i].getAttribute("key")] = i;
    }
    this[KEYS] = keys;
    
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
