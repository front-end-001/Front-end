const anime = (function () {

  class Timeline {
    constructor({ rate = 1, direction = 1 }) {
      this._animation = [];
      /** 开始时间 */
      this.startTime;
      /** 增量时间 */
      this.pauseTime = 0;
      /** 暂停标志 */
      this.paused = false;
      /** 动画方向 1 正向, -1 反向 */
      this.direction = direction;
      /** 动画速率 */
      this._rate = rate;
      /** 动画总时间 */
      this.totalTime = 0;
    }

    run() {
      let finished = true;
      for (let animation of this._animation) {
        if (!animation.finished) {
          finished = false;
          animation.tick((Date.now() - this.startTime + this.pauseTime) * this._rate * this.direction);
        }
      }

      if (!finished && !this.paused) {
        requestAnimationFrame(() => {
          this.run();
        });
        return;
      }

      // 已结束
      if (finished) {
        this.pauseTime = 0;
        this.paused = false;
        return;
      }

      if (this.paused) {
        this.pauseTime = Date.now() - this.startTime;
        return;
      }
    }

    /**
     * 开始
     */
    play() {
      if (!this.paused) {
        this.startTime = Date.now();
        for (let animation of this._animation) {
          animation.finished = false;
          animation.direction = this._rate;
        }
      }

      requestAnimationFrame(() => {
        this.run();
      });
    }

    /**
     * 暂停
     */
    pause() {
      this.paused = true;
    }

    /**
     * 重新开始动画
     */
    restart() {
      this.paused = false;
      this.play();
    }

    /** 反向 */
    reverse() {
      this.direction = -1 * this.direction;
    }

    set rate(value) {
      if (value === 0) {
        return;
      }

      if (value > 0) {
        this._rate = value;
        this.direction = 1;
        return;
      }

      this._rate = -1 * value;
      this.direction = -1;
    }

    get rate() {
      return this._rate;
    }

    /**
     * 添加动画
     */
    add(animation) {
      this._animation.push(new MyAnimation(animation, v => `${v}px`));

      if (this.totalTime < animation.endTime) {
        this.totalTime = animation.endTime;
      }

      return this;
    }

    /**
     * 是否已经结束动画
     */
    isFinished() {
      const progress = (Date.now() - this.startTime + this.pauseTime) * this._rate;
      if (progress > this.totalTime) {
        return true;
      }
      return false;
    }
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

  return {
    timeline: Timeline,
  }
}());
