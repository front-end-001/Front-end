import "./Tab.scss";
import enableGesture from "../../v1.2/gesture";

const ATTRIBUTE_SYMBOL = Symbol("attribute");
const PROPERTY_SYMBOL = Symbol("property");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class Tab {
  constructor(options) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].headers = [];
    this[STATE_SYMBOL].position = 0;
    this.created();
  }

  created() {
    this._root = document.createElement("div");
    this._headerContainer = document.createElement("div");
    this._contentContainer = document.createElement("div");
    this._root.classList.add("m-tab");
    this._headerContainer.classList.add("m-tab_header");
    this._contentContainer.classList.add("m-tab_content");
    this._root.appendChild(this._headerContainer);
    this._root.appendChild(this._contentContainer);

    this._root.addEventListener(
      "touchmove",
      (e) => {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
      },
      { passive: false },
    );
    enableGesture(this._contentContainer);
    this._contentContainer.addEventListener("pan", (event) => {
      if (event.isVertical) return;

      const { width } = this._contentContainer.getBoundingClientRect();
      let { dx } = event;
      if (this[STATE_SYMBOL].position === 0 && event.dx > 0) {
        dx = event.dx / 2;
      }

      if (
        this[STATE_SYMBOL].position
          === this._contentContainer.children.length - 1
        && event.dx < 0
      ) {
        dx = event.dx / 2;
      }

      for (const c of this._contentContainer.children) {
        c.style.transition = "ease 0s";
        c.style.transform = `translate(${dx
          - this[STATE_SYMBOL].position * width}px)`;
      }
    });

    this._contentContainer.addEventListener("panend", (event) => {
      if (event.isVertical) return;
      const { width } = this._contentContainer.getBoundingClientRect();
      let isLeft; // true：左边图片需要过渡；flase：右边图片需要过渡
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          this[STATE_SYMBOL].position -= 1;
          isLeft = true;
        } else {
          this[STATE_SYMBOL].position += 1;
          isLeft = false;
        }
      } else if (event.dx >= width / 2) {
        this[STATE_SYMBOL].position -= 1;
        isLeft = true;
      } else if (event.dx <= -width / 2) {
        this[STATE_SYMBOL].position += 1;
        isLeft = false;
      } else if (event.dx >= 0) {
        isLeft = false;
      } else {
        isLeft = true;
      }

      if (this[STATE_SYMBOL].position < 0) this[STATE_SYMBOL].position = 0;
      if (
        this[STATE_SYMBOL].position
        > this._contentContainer.children.length - 1
      ) {
        this[STATE_SYMBOL].position =          this._contentContainer.children.length - 1;
      }

      for (const c of this._contentContainer.children) {
        c.style.transition = "ease 0.5s";
        c.style.transform = `translate(${-this[STATE_SYMBOL].position
          * width}px)`;
      }
    });
  }

  appendTo(el) {
    el.appendChild(this._root);
    this.mounted();
  }

  appendChild(child) {
    const title = child.getAttribute("title") || "";
    this[PROPERTY_SYMBOL].children.push(child);
    this[PROPERTY_SYMBOL].headers.push(title);
    const header = document.createElement("div");
    header.innerText = title;
    const index = this[PROPERTY_SYMBOL].headers.length - 1;
    header.addEventListener("click", (event) => {
      this[STATE_SYMBOL].position = index;
      for (const c of this._contentContainer.children) {
        // c.classList.add("m-tab_content_item--hidden");
        c.style.transition = "ease 0.5s";
        c.style.transform = `translate(${-index * 100}%)`;
      }

      child._root.classList.remove("m-tab_content_item--hidden");
    });
    this._headerContainer.appendChild(header);
    child.appendTo(this._contentContainer);
    for (const c of this._contentContainer.children) {
      c.classList.add("m-tab_content_item");
    }
    for (const c of this._headerContainer.children) {
      c.classList.add("m-tab_header_item");
    }
  }

  appendString(string) {
    this._root.innerHTML += string;
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    if (name === "style") {
      return this._root.getAttribute("style");
    }
    if (name === "class") {
      return this._root.getAttribute("class");
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (name === "style") {
      this._root.setAttribute("style", value);
    }
    if (name === "class") {
      this._root.setAttribute("class", value);
    }

    this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }

  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) return;
    this[EVENT_SYMBOL][type].delete(listener);
  }

  dispatchEvent(type) {
    if (!this[EVENT_SYMBOL][type]) return;
    for (const event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }
}
