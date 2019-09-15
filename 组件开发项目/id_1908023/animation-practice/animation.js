class TimeLine {
  constructor() {
    this._animations = [];
    this._timer = null;
  }
  start() {
    let startTime = Date.now();
    this.tick = () => {
      for (let animation of this._animations) {
        if (!animation.finished) {
          animation.tick(Date.now() - startTime);
        }
      }
    }
    this._timer = setInterval(this.tick, 16);
  }
  pause() {

  }
  resume() {

  }
  set rate(value) {

  }
  get rate() {

  }
  addAnimation(animation) {
    this._animations.push(animation);
  }
  removeAnimation() {

  }
}

class DomElementAnimation {
  constructor(element, property, startTime, startValue, endTime, endValue, converter) {
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._startValue = startValue;
    this._endTime = endTime;
    this._endValue = endValue;
    this._converter = converter;
  }
  tick(t) {
    if (t > this._endTime) {
      this.finished = true;
      return;
    } 
    // console.log(t);
    // 插值函数
    // 线性插值 y = kx + b
    this._element.style[this._property] = this._converter(
      (t - this._startTime) / (this._endTime - this._startTime) 
      * (this._endValue - this._startValue) + this._startValue);
  }
}

const tl = new TimeLine();

tl.addAnimation(new DomElementAnimation(
  document.getElementById('ball'),
  'transform',
  0, 0,
  2000, 500,
  v => `translateX(${v}px)`
));
// tl.addAnimation();
tl.start();