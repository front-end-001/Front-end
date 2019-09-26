class Timeline {
  constructor() {
    this._animations = [];
    this.status = 'inited';
    this._rate = 1; // 播放速率
    this._startPoint = 0;
  }

  pause() {
    if (this.status != 'started') {
      return;
    }
    this.status = 'paused';
    this.resumeTick = this._tick;
    this._tick = null
    this._pauseStart = Date.now();
  }

  resume() {
    if (this.status != 'paused') {
      return;
    }
    this.status = "started";
    this.pauseTime += Date.now() - this._pauseStart;
    this._tick = this.resumeTick;
    requestAnimationFrame(this._tick);
  }

  start() {
    if (this.status == 'started') {
      return;
    }
    this.status = 'started';
    let startTime = Date.now();
    this.pauseTime = 0;
    this._tick = () => {
      for (let animation of this._animations) {
        if (!animation.finished) {
          animation.tick((Date.now() - this.pauseTime - startTime) * this._rate);
        }
      }
      if (this._tick)
        requestAnimationFrame(this._tick);
    }
    requestAnimationFrame(this._tick);
  }

  set startPoint(val) {
    this._startPoint = val;
  }

  get startPoint() {
    return this._startPoint;
  }

  set rate(value) {
    this._rate = value
  }

  get rate() {
    return this._rate;
  }

  addAnimation(animation) {
    this._animations.push(animation);
  }

  removeAnimation(animation) { }
}

class DOMElementStyleNumberAnimation {
  constructor(element, property, startTime, startValue, endTime, endValue, converter) {
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._startValue = startValue;
    this._endTime = endTime;
    this._endValue = endValue;
    this._converter = converter;
    this._fixKeyFrame = false;
  }
  tick(t) {
    // if t>this._endTime解决两个动画无缝衔接问题
    if (t > this._endTime) {
      if (!this._fixKeyFrame) {
        return;
      } else {
        t = this._endTime;
        this._fixKeyFrame = false;
      }
      t = this._endTime;
    } else if (t < this._startTime) {
      if (!this._fixKeyFrame)
        return;
      else {
        t = this._startTime;
        this._fixKeyFrame = false;
      }
    } else {
      this._fixKeyFrame = true;
    }
    let progress = (t - this._startTime) / (this._endTime - this._startTime);
    if (this._property === 'background') {
      return this._element.style[this._property] = this._converter(this._endValue);
    }
    let displacement = ease(progress) * (this._endValue - this._startValue);
    let currentValue = displacement + this._startValue;
    this._element.style[this._property] = this._converter(currentValue);
  }
}

class DOMElementStyleVectorAnimation {
  constructor(element, property, startTime, startValue, endTime, endValue, converter) {
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._startValue = startValue;
    this._endTime = endTime;
    this._endValue = endValue;
    this._converter = converter;
    this._fixKeyFrame = false;
  }
  tick(t) {
    if (t > this._endTime) {
      if (!this._fixKeyFrame)
        return;
      else {
        t = this._endTime;
        this._fixKeyFrame = false;
      }
    } else if (t < this._startTime) {
      if (!this._fixKeyFrame)
        return;
      else {
        t = this._startTime;
        this._fixKeyFrame = false;
      }
    } else {
      this._fixKeyFrame = true;
    }
    let progress = (t - this._startTime) / (this._endTime - this._startTime);

    let displacement = [];
    let currentValue = [];

    for (let i = 0; i < this._endValue.length; i++) {
      displacement[i] = ease(progress) * (this._endValue[i] - this._startValue[i]);
      currentValue[i] = displacement[i] + this._startValue[i];
    }
    this._element.style[this._property] = this._converter(currentValue);
  }
}
