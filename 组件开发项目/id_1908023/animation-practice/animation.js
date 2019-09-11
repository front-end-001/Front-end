class Timeline {
  constructor() {
    this.animations = [];
    // 时间线状态
    this.status = 'inited';
    // 动画速率
    this.rate = 1;
    // 指定开始位置
    this.startPoint = 0;
  }
  start() {
    if (this.status === 'started') {
      return;
    }

    this.status = 'started';
    let startTime = Date.now();
    this.pauseTime = 0;
    this.tick = () => {
      for (let animation of this.animations) {
          animation.tick(Date.now() - startTime);
      }
      if (this.tick) {
        requestAnimationFrame(this.tick);
      }
    }
    requestAnimationFrame(this.tick);
  }
  pause() {
    if (this.status !== 'started') {
      return;
    }
    this.status = 'paused';
    this.resumeTick = this.tick;
    this.tick = null;
    this.pauseStart = Date.now();
  }
  resume() {

  }
  set rate(value) {

  }
  get rate() {

  }
  addAnimation(animation) {
    this.animations.push(animation);
  }
  removeAnimation() {

  }
}

class DomElementAnimation {
  constructor(element, property, startTime, startValue, endTime, endValue, converter) {
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._endTime = endTime;
    this._converter = converter;
    this._fixKeyFrame = false;
    if (!Array.isArray(endValue)) {
      startValue = [startValue];
      endValue = [endValue];
    }
    this._startValue = startValue;
    this._endValue = endValue;
  }
  tick(t) {
    // t 从0逐渐增大
    if (t > this._endTime) {
      // 超过终止秒
      if (!this._fixKeyFrame) {
        return;
      } else {
        t = this._endTime;
        this._fixKeyFrame = false;
      }
    } else if (t < this._startTime) {
      return;
    } else {
      this._fixKeyFrame = true;
    }

    // 插值函数
    // 线性插值 y = kx + b
    // this._element.style[this._property] = this._converter(
    //   (t - this._startTime) / (this._endTime - this._startTime) 
    //   * (this._endValue - this._startValue) + this._startValue);

    // let progress = (t - this._startTime) / (this._endTime - this._startTime);
    // let displacement = ease(progress) * (this._endValue - this._startValue);
    // let currentValue = displacement + this._startValue;

    let progress = (t - this._startTime) / (this._endTime - this._startTime);
    let displacement = []
    let currentValue = []
    for (let i = 0; i < this._endValue.length; i++) {
      displacement[i] = ease(progress) * (this._endValue[i] - this._startValue[i]);
      currentValue[i] = displacement[i] + this._startValue[i];
    }

    this._element.style[this._property] = this._converter(currentValue);
  }
}
