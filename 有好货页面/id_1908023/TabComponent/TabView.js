import enableGesture from '../gesture.js';

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol("state");

export default class TapView {
  constructor(config) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];
    this[PROPERTY_SYMBOL].headers = [];

    this.created();
  }

  created() {
    this.root = document.createElement('div');
    this.root.style.display = "flex";
    this.headerContainer = document.createElement('div');
    this.contentContainer = document.createElement('div');
    this.contentContainer.style.whiteSpace = "nowrap";
    this.contentContainer.style.overflow = "hidden";
    this.contentContainer.style.flex = "1";
    // this.headerContainer.style.height = "93px";
    // 页头背景颜色
    this.headerContainer.style.backgroundColor = "#ff9900";
    this.headerContainer.style.color = '#fff';
    this.headerContainer.style.fontSize = '50px';
    // this.headerContainer.className = 'tab-header-container';
    // this.contentContainer.className = 'tab-content-container';
    const headerBar = document.createElement('div');
    const backIcon = document.createElement('div');
    // backIcon.style.color = '#fff';
    // backIcon.style.fontSize = '50px';
    backIcon.innerText = '<';
    const headerTitle = document.createElement('div');
    // headerTitle.style.color = '#fff';
    headerTitle.innerHTML = '<span>每日好店</span>';
    const headerShare = document.createElement('div');
    // headerShare.style.color = '#fff';
    headerShare.innerHTML = 'share';
    headerBar.appendChild(backIcon);
    headerBar.appendChild(headerTitle);
    headerBar.appendChild(headerShare);
    // this.headerContainer.appendChild(headerBar);

    this.root.appendChild(this.headerContainer);
    this.root.appendChild(this.contentContainer);



    // 拖拽
    // this.contentContainer.addEventListener('mousedown', e => e.preventDefault());
    enableGesture(this.contentContainer);

    this[STATE_SYMBOL].position = 0;

    document.addEventListener("touchmove", function (e) {
      if (e.touches.length == 1)
        e.preventDefault();
    }, {
      passive: false
    })

    // let children = Array.from(this.contentContainer.children);
    // let position = 0;
    // 移动中
    this.contentContainer.addEventListener('pan', e => {
      if (e.isVertical) return;

      e.origin.preventDefault();

      let width = this.contentContainer.getBoundingClientRect().width;
      let dx = e.dx;

      if (this[STATE_SYMBOL].position === 0 && e.dx > 0)
        dx = dx / 2;

      if (this[STATE_SYMBOL].position === this.contentContainer.children.length - 1 && e.dx < 0)
        dx = dx / 2;

      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition = 'transform ease 0s';
        this.contentContainer.children[i].style.transform = `translate(${dx - width * this[STATE_SYMBOL].position}px)`;
      }
    })

    // 移动结束
    this.contentContainer.addEventListener('panend', e => {
      if (e.isVertical) return;
      e.origin.preventDefault();

      let width = this.contentContainer.getBoundingClientRect().width;

      if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
        if (e.dx > 0) {
          this[STATE_SYMBOL].position--;
        } else {
          this[STATE_SYMBOL].position++;
        }
      } else {
        if (e.dx > width / 2) {
          this[STATE_SYMBOL].position--;
        } else if (e.dx < -width / 2) {
          this[STATE_SYMBOL].position++;
        }
      }

      if (this[STATE_SYMBOL].position < 0) {
        this[STATE_SYMBOL].position = 0;
      }

      if (this[STATE_SYMBOL].position >= this.contentContainer.children.length - 1) {
        this[STATE_SYMBOL].position = this.contentContainer.children.length - 1;
      }

      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.contentContainer.children[i].style.transition = 'transform ease 0.5s';
        this.contentContainer.children[i].style.transform = `translateX(${-width * this[STATE_SYMBOL].position}px)`;
        this.headerContainer.children[i].style.borderBottom = '';
      }
      this.headerContainer.children[this[STATE_SYMBOL].position].style.borderBottom = '5px solid white';

    })
  }

  appendTo(element) {
    element.appendChild(this.root);
    this.mounted();
  }

  mounted() { }

  appendChild(child) {
    let n = this.children.length;
    this.children.push(child);

    let title = child.getAttribute('tab-title') || '';
    this[PROPERTY_SYMBOL].headers.push(title);

    let header = document.createElement('div');
    header.innerText = title;
    header.style.display = 'inline-block';
    // header.style.height = '93px';
    header.style.fontSize = '46px';
    header.style.fontFamily = 'PingFang SC';
    header.style.margin = '20px 35px 0 35px';
    // header.style.color = 'white';
    // header.style.borderBottom = '5px solid #ccc';
    this.headerContainer.appendChild(header);

    this.headerContainer.children[0].style.borderBottom = '5px solid white';
    
    header.addEventListener('click', e => {
      this[STATE_SYMBOL].position = n;
      for (let i = 0; i < this.contentContainer.children.length; i++) {
        this.headerContainer.children[i].style.borderBottom = '';
        // this.contentContainer.children[i].style.width = '100%';
        // this.contentContainer.children[i].style.height = '100%';
        // this.contentContainer.children[i].style.display = 'none';
        this.contentContainer.children[i].style.transition = `transform 0.2s ease`;
        this.contentContainer.children[i].style.transform = `translateX(${-n * 100}%)`;
      }
      this.headerContainer.children[n].style.borderBottom = '5px solid white';
      // child.style.display = 'inline-block';
      // child.setAttribute('style', 'display:inline-block');
    })

    child.appendTo(this.contentContainer);

    for (let i = 0; i < this.contentContainer.children.length; i++) {
      this.contentContainer.children[i].style.width = '100%';
      this.contentContainer.children[i].style.height = '100%';
      this.contentContainer.children[i].style.verticalAlign = 'top';
      this.contentContainer.children[i].style.display = 'inline-block';
    }
  }

  get children() {
    return this[PROPERTY_SYMBOL].children;
  }

  getAttribute(name) {
    if (name === 'style') {
      return this.root.getAttribute('style');
    }
    if (name === 'class') {
      return this.root.getAttribute('class');
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }

  setAttribute(name, value) {
    if (name === 'style') {
      this.root.setAttribute('style', value);
      this.root.style.display = 'flex';
      this.root.style.flexDirection = 'column';
    }
    if (name === 'class') {
      this.root.setAttribute('class', value);
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }

  addEventListener(type, listener) {
    // 创建一个容器来存放事件
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set;
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventLister(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      throw new Error('no such event')
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type])
      return;
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this, type);
    }
  }
}
