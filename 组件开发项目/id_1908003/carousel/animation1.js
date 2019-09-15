class Timeline {
  constructor() {
    this.rate = '';
    this._animation = [];
    /** 开始时间 */
    this.startTime;
    /** 增量时间 */
    this.pauseTime = 0;
    this.finished = true;
    this.paused = false;
    this._rate = 1;
  }

  run(t) {
    for (let animation of this._animation) {
      if (!animation.finished) {
        animation.tick((Date.now() - this.startTime + this.pauseTime) * this._rate);
      }
    }
    if (!this.finished && !this.paused) {
      requestAnimationFrame((t) => {
        this.run(t);
      });
    }
    if (this.finished) {
      this.pauseTime = 0;

    }
    if (this.paused) {
      this.pauseTime = Date.now() - this.startTime;
    }
  }

  setPoint(time) {
    this.pauseTime = time / this.rate;
  }
  /**
   * 开始
   */
  start() {
    this.finished = false;
    this.paused = false;
    this.startTime = Date.now();
    for (let animation of this._animation) {
      animation.finished = false;
      animation.direction = this._rate;
    }
    requestAnimationFrame((t) => {
      this.run(t);
    });
  }

  /**
   * 暂停
   */
  pause() {
    if (!this.finished) return;
    this.finished = false;
    this.paused = true;
  }

  /**
   * 重新开始动画
   */
  resume() {
    if (this.finished) return;
    this.paused = false;
    this.startTime = Date.now();
    requestAnimationFrame((t) => {
      this.run(t);
    });
  }

  /**
   * 停止动画
   */
  stop() {
    this.finished = true;
    this.paused = false;
    for (let animation of this._animation) {
      animation.finished = true;
    }
  }
  set rate(value) {
    this._rate = value;
  }
  get rate() {
    return this._rate;
  }

  /**
   * 添加动画
   */
  addAnimation(animation) {
    this._animation.push(animation);
  }
  /**
   * 移除动画
   */
  removeAnimation(animation) {}
};

// @ts-ignore
class MyAnimation {
  /**
   * 构造函数
   * @param {{element: Element, property: string, startTime: number, startValue: any, endTime: number, endValue: any}} param0 
   * @param {function} conterter 
   */
  constructor({ element, property, startTime, startValue, endTime, endValue }, conterter) {
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._startValue = startValue;
    this._endTime = endTime;
    this._endValue = endValue;
    this._conterter = conterter;
    this.finished = false;
    // 增大方向
    this.direction = 1;
  }
  tick(t) {
    if (this.direction > 0) {
      if (t < this._startTime) {
        return;
      }
      if (t > this._endTime) {
        this.finished = true;
        // @ts-ignore
        this._element.style[this._property] = this._conterter(this._endValue);
        return;
      }

    } else {
      if (t > this._endTime) {
        return;
      }
      if (t < this._startTime) {
        this.finished = true;
        // @ts-ignore
        this._element.style[this._property] = this._conterter(this._startValue);
        return;
      }
    }
    const progress = ease((t - this._startTime) / (this._endTime - this._startTime));
    // @ts-ignore
    this._element.style[this._property] = this._conterter(progress * (this._endValue - this._startValue) + this._startValue);
  }
};
