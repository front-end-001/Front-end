class Timeline {
  constructor() {
    this.animations = [];
    // 时间线状态
    this.status = 'init';
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
        animation.tick((Date.now() - this.pauseTime - startTime) * this.rate + this.startPoint);
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
    // 暂停的时候，保存当前动画状态
    this.resumeTick = this.tick;
    this.tick = null;
    this.pauseStart = Date.now();
  }

  // 从暂停状态中恢复动画
  resume() {
    if (this.status !== 'paused') {
      return;
    }
    this.pauseTime += Date.now() - this.pauseStart;
    this.tick = this.resumeTick;
    this.status = 'started';
    requestAnimationFrame(this.tick);
  }

  // 这个有 bug 
  // restart() {
  //   if (this.tick) {
  //     this.tick = null;
  //     // 如果是暂停状态，会有这个临时保存的状态，也要清楚掉
  //     this.resumeTick = null;
  //   }
  //   this.status = 'init';
  //   for (let animation of this.animations) {
  //     animation.resetTick();
  //   }
  //   this.start();
  // }
  
  addAnimation(animation) {
    this.animations.push(animation);
  }
  removeAnimation() {
    this.animations = [];
  }
}

class DomElementAnimation {
  constructor(element, property, startTime, startValue, endTime, endValue, converter) {
    this.defaultParams = {element, property, startTime, startValue, endTime, endValue, converter}
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._endTime = endTime;
    this._converter = converter;
    this._fixKeyFrame = false;
    let tmpStartValue = startValue;
    let tmpEndValue = endValue;
    if (!Array.isArray(tmpEndValue)) {
      tmpStartValue = [tmpStartValue];
      tmpEndValue = [tmpEndValue];
    }
    this._startValue = tmpStartValue;
    this._endValue = tmpEndValue;
  }
  
  // resetTick() {
  //   this._element = this.defaultParams.element;
  //   this._property = this.defaultParams.property;
  //   this._startTime = this.defaultParams.startTime;
  //   this._endTime = this.defaultParams.endTime;
  //   this._converter = this.defaultParams.converter;
  //   this._fixKeyFrame = false;
  //   let tmpStartValue = this.defaultParams.startValue;
  //   let tmpEndValue = this.defaultParams.endValue;
  //   if (!Array.isArray(tmpEndValue)) {
  //     tmpStartValue = [tmpStartValue];
  //     tmpEndValue = [tmpEndValue];
  //   }
  //   this._startValue = tmpStartValue;
  //   this._endValue = tmpEndValue;
  // }

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
