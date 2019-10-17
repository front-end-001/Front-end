export default (function () {

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
      this.onFinish = null;
    }

    run() {
      let currentPoint;
      let finished = false;
      if (this.direction > 0) {
        currentPoint = (Date.now() - this.startTime + this.pauseTime) * this._rate;
        if (currentPoint > this.totalTime) {
          finished = true;
        }
      } else {
        currentPoint = (this.totalTime - (Date.now() - this.startTime) + this.pauseTime) * this._rate;
        if (currentPoint < 0) {
          finished = true;
        }
      }
      for (let animation of this._animation) {
        if (!animation.finished) {
          if (this.direction > 0) {
            animation.tick(currentPoint);
          } else {
            animation.tick(currentPoint);
          }
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
        if (this.onFinish) {
          this.onFinish();
        }
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
        for (let animation of this._animation) {
          animation.finished = false;
          animation.direction = this.direction;
        }
      }
      this.startTime = Date.now();
      this.paused = false;
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
      this.pauseTime = 0;
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
    add(animation, conterter) {
      if (!conterter) {
        conterter = (v) => `${v}px`;
      }
      this._animation.push(new MyAnimation(animation, conterter));

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

    checkFinished(t) {
      // 已经结束直接返回
      if (this.finished) return;

      // 正向
      if (this.direction > 0) {
        if (t < this._startTime) return;

        if (t > this._endTime) {
          this.finished = true;
          // @ts-ignore
          this._element.style[this._property] = this._conterter(this._endValue);
          return;
        }

        return true;
      }

      // 反向
      if (t > this._endTime) return;

      if (t < this._startTime) {
        this.finished = true;
        // @ts-ignore
        this._element.style[this._property] = this._conterter(this._startValue);
        return;
      }
      return true;
    }

    tick(t) {
      if (!this.checkFinished(t)) return;

      const progress = cubicBezierFuc.linear((t - this._startTime) / (this._endTime - this._startTime));
      // @ts-ignore
      this._element.style[this._property] = this._conterter(progress * (this._endValue - this._startValue) + this._startValue);
    }
  };

  return {
    timeline: Timeline,
  }
}());
