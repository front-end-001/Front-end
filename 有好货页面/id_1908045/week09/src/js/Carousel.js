import enableGesture from './gesture'
import Animation from './animation'

export default class Carousel {
  constructor(container, duration = 3000, elementWidth = 500, transitMethod = ease, transitionDuration = 500) {
    this._container = container;
    this._duration = duration;
    this._container.classList.add("carousel");
    this._handler = null;
    this.data = null;
    this.elementWidth = elementWidth;
    this.transitMethod = transitMethod;
    this.transitionDuration = transitionDuration;
  }
  render() {
    // this._container.innerHTML = "";
    // for (let d in this.data) {
    //   let e = document.createElement("img");
    //   e.src = this.data[d];
    //   //若不设置transform，则无法获取到图片实时位置
    //   e.style.transform = `translate(0px)`;
    //   //若图片数量大于2，则把序列最后一张图片放在第一张图片的左侧，这样可以被起始的拖动看到
    //   if (parseInt(d) === this.data.length - 1 && this.data.length > 2) {
    //     e.style.transform = `translate(-${this.elementWidth * ( 1 + parseInt(d))}px)`;
    //   }
    //   // // 解决点被图片盖住的问题，原因是图片设置了transform
    //   this._container.appendChild(e);
    // }
    let offsetTimeStart = 0;
    let currentTranstitionDuration = 0;
    let tl = new Animation.Timeline();
    let position = 0;
    let children = Array.prototype.slice.call(this._container.children);
    this.elementWidth = Math.max(...children.map(i => i.width))||375;
    console.log(this.elementWidth,children)
    let positionOf = (element) => {
      let position = element.style.transform.match(/\((.*?)\)/g)[0];
      if (position.slice(position.length - 2, position.length - 1) === "%") {
        return parseInt(position.slice(1, position.length - 2)) * this.elementWidth / 100;
      } else if (position.slice(position.length - 3, position.length - 1) === "px") {
        return parseInt(position.slice(1, position.length - 3));
      } else
        console.log("positionOf error, positoin=", position);
    }
    let nextFrame = (i = 1) => {
      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let nextNextPosition = (nextPosition + 1) % children.length;
      let nextNext = children[nextNextPosition];
      offsetTimeStart = Date.now();
      tl.clearAnimations();
      if (i === -1) {
        current.style.transform =
          `translate(${-this.elementWidth - this.elementWidth * position}px)`;
      } else {
        //由于无法从ease等动作的位移推断经过时间，若动作不是linear，从暂停状态再次加载动作（比如点击提示点，pan等动作）时动画时间与正常动画时间有出入。
        let currentPo = positionOf(current);
        let currentDis = Math.abs(-this.elementWidth - this.elementWidth * position - currentPo) /
          this.elementWidth;
        tl.addAnimation(new Animation.DOMElementStyleNumberAnimation(
          current,
          "transform",
          0, currentPo,
          currentDis * this.transitionDuration, -this.elementWidth - this.elementWidth *
          position,
          this.transitMethod,
          (v) => `translateX(${v}px)`
        ));
      }
      if (i === 1) {
        nextNext.style.transform =
          `translate(${this.elementWidth - this.elementWidth * nextNextPosition}px)`;
      } else {
        let nextNextPo = positionOf(nextNext);
        let nextNextDis = Math.abs(this.elementWidth - this.elementWidth * nextNextPosition -
          nextNextPo) / this.elementWidth;
        tl.addAnimation(new Animation.DOMElementStyleNumberAnimation(
          nextNext,
          "transform",
          0, nextNextPo,
          nextNextDis * this.transitionDuration, this.elementWidth - this.elementWidth *
          nextNextPosition,
          this.transitMethod,
          (v) => `translateX(${v}px)`
        ));
      }
      let nextPo = positionOf(next);
      let nextDis = Math.abs(-this.elementWidth * nextPosition - nextPo) / this.elementWidth;
      tl.addAnimation(new Animation.DOMElementStyleNumberAnimation(
        next,
        "transform",
        0, nextPo,
        this.transitionDuration * nextDis, -this.elementWidth * nextPosition,
        this.transitMethod,
        (v) => `translateX(${v}px)`
      ));
      tl.restart();
      position = nextPosition;
      //由于图片整体向左错了一位，所以dots[0]指向第二张图片，
      this._handler = setTimeout(() => {
        // nextFrame();
      }, this._duration);

    }

    this._handler = setTimeout(() => {
      // nextFrame();
    }, this._duration);
    let offset = 0;
    let currentTime = 0;
    enableGesture(this._container);
    this._container.addEventListener("pan", event => {
      if (event.isVertical)
        return;
      if (tl.status !== "paused") {
        tl.pause();
        clearTimeout(this._handler);
        delete(this._handler);
        currentTime = Date.now();
        if (currentTime - offsetTimeStart < this.transitionDuration)
          offset = (1 - this.transitMethod((currentTime - offsetTimeStart) / this
            .transitionDuration)) * this.elementWidth;
        else
          offset = 0;
      }
      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let previousPosition = (position + children.length - 1) % children.length;
      let previous = children[previousPosition];
      current.style.transform = `translate(${- position * this.elementWidth + event.dx+offset}px`;
      next.style.transform =
        `translate(${this.elementWidth-this.elementWidth * nextPosition +event.dx+offset}px)`;
      previous.style.transform =
        `translate(${this.elementWidth * ( - 1 - previousPosition)  + event.dx+offset}px)`;
    });
    this._container.addEventListener("panend", event => {
      let condition = 0;
      if (event.isVertical)
        return;
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        condition = (event.dx < 0) ? 1 : -1;
      } else {
        let x = event.dx;
        condition = (x < -this.elementWidth / 2) ? 1 : (x > this.elementWidth / 2) ? -1 : 0;
      }
      position = (offset < this.elementWidth) ? ((position - 1 + 4 + condition) % 4) : ((
        position - 2 + 4 + condition) % 4);
      // nextFrame(condition);
    });
    this._container.addEventListener("pancancel", event => {
      let condition = 0;
      position = (offset < this.elementWidth) ? ((position - 1 + 4 + condition) % 4) : ((
        position - 2 + 4 + condition) % 4);
      // nextFrame(condition);
    });
    this._container.addEventListener("mousedown", event => event.preventDefault());
  }
}