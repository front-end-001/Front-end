function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    // Calculate the polynomial coefficients,
    // implicit first and last control points are (1,0) and (1,1).
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;

    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx ) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy ) * t;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x) {
        var t2 = x;
        var derivative;
        var x2;

        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
        // First try a few iterations of Newton's method -- normally very fast.
        // http://en.wikipedia.org/wiki/Newton's_method
        for (let i = 0; i < 8; i++) {
            // f(t)-x=0
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            // == 0, failure
            /* istanbul ignore if */
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        // bisection
        // http://en.wikipedia.org/wiki/Bisection_method
        var t1 = 1;
        /* istanbul ignore next */
        var t0 = 0;

        /* istanbul ignore next */
        t2 = x;
        /* istanbul ignore next */
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        // Failure
        return t2;
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }

    return solve;
}

let linear = cubicBezier(0, 0, 1, 1);
let ease = cubicBezier(.25, .1, .25, 1);
let easeIn = cubicBezier(.42, 0, 1, 1);
let easeOut = cubicBezier(0, 0, .58, 1);
let easeInOut = cubicBezier(.42, 0, .58, 1);
let myCB = cubicBezier(.69,-0.85,.25,1);
  // 时间线
  // 位置有误差，如何解决不精准的问题
  class TimeLine {
    // inited started paused 三种状态
    constructor() {
      this._animations = [];
      this.status = 'inited';
      this._rate = 1; // 播放速率
      this._startPoint = 0;
    }
    // 暂停
    pause() {
      if (this.status !== 'started') {
        return;
      }
      this.status = 'paused';
      this._resumeTick = this._tick;
      this._tick = null;
      this._pauseStart = Date.now();
    }
    // 重新启动
    resume() {
      if (this.status !== 'paused') {
        return;
      }
      this.pauseTime += Date.now() - this._pauseStart;
      this._tick = this._resumeTick;
      requestAnimationFrame(this._tick);
    }
    // 开始
    start() {
      if (this.status === 'started') {
        return;
      }
      this.status = 'started';
      let startTime = Date.now();
      this.pauseTime = 0;
      this._tick = () => {
        for (let animation of this._animations) {
          if (!animation.finished) {
            animation.tick((Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint);
          }
        }
        // this._timer = setTimeout(this._tick, 16);
        if (this._tick) {
          // 没有 _tick时不执行
          requestAnimationFrame(this._tick);
        }
      }
      // 1秒60帧   1000 / 60 16毫秒
      // this._timer = setTimeout(this._tick, 16);
      requestAnimationFrame(this._tick);
    }
    restart() {
      // 清理一些状态信息
      if (this._tick) {
        this._tick = null;
      }
      this._resumeTick = null;
      this.status = 'inited';
      requestAnimationFrame(() => this.start());
      
    }
    // 从什么时间点开始
    set startPoint(value) {
      this._startPoint = value;
    }
    get startPoint() {
      return this._startPoint;
    }
    // rate属性
    set rate(value) {
      this._rate = value;
    }
    get rate() {
      return this._rate;
    }
    // 添加动画
    addAnimation(animation) {
      this._animations.push(animation);
    }
    // 移除动画
    removeAnimation(animation) {}
    // 移除所有动画
    removeAllAnimations() {
      this._animations = [];
    }
  }
  // 元素位置样式动画
  class DOMElementStyleNumberAnimation {
    // 元素 特性 开始时间 ...
    constructor(element, property, startTime, startValue, endTime, endValue, converter) {
      this._element = element;
      this._property = property;
      this._startTime = startTime;
      this._startValue = startValue;
      this._endTime = endTime;
      this._endValue = endValue;
      this._converter = converter;
      // this.finished = false;
      this._fixKeyFrame = false;
    }
    // 接收时间线参数 -- 当前动画进度
    tick(t) {
      if (t > this._endTime) {
        // console.log(t, this._endTime);
        // 不准的原因是传入最后一帧的参数t，和调用者传入的时间不对应
        // 解决: 修正动画最后进入的时间
        
        // this.finished = true;
        if (!this._fixKeyFrame) {
          return;
        } else {
          t = this._endTime;
          this._fixKeyFrame = false;
        }
      } else if (t < this._startTime) {
        if (!this._fixKeyFrame) {
          return;
        } else {
          t = this._startTime;
          this._fixKeyFrame = false;
        }
      } else {
        this._fixKeyFrame = true;
      }

      // 线性插值  当前时间过去的比例 * 
      // 时间进展百分比 0 - 1
      let progess = (t - this._startTime) / (this._endTime - this._startTime);
      // 增量，这段时间要移动的区段   -- 匀速插值方法
      let displacement = ease(progess) * (this._endValue - this._startValue);
      // 正弦
      // let displacement = Math.sin(progess * Math.PI / 2) * (this._endValue - this._startValue);
      // 当前值 = 开始值 + 增量
      let currentValue = this._startValue + displacement
      this._element.style[this._property] = this._converter(currentValue);
    }
  }

  /* 元素颜色样式动画 */
  class DOMElementStyleVectorAnimation {
    // 元素 特性 开始时间 ...
    constructor(element, property, startTime, startValue, endTime, endValue, converter) {
      this._element = element;
      this._property = property;
      this._startTime = startTime;
      this._startValue = startValue;
      this._endTime = endTime;
      this._endValue = endValue;
      this._converter = converter;
      // this.finished = false;
      this._fixKeyFrame = false;
    }
    // 接收时间线参数 -- 当前动画进度
    tick(t) {
      if (t > this._endTime) {
        // console.log(t, this._endTime);
        // 不准的原因是传入最后一帧的参数t，和调用者传入的时间不对应
        // 解决: 修正动画最后进入的时间
        
        // this.finished = true;
        if (!this._fixKeyFrame) {
          return;
        } else {
          t = this._endTime;
          this._fixKeyFrame = false;
        }
      } else if (t < this._startTime) {
        if (!this._fixKeyFrame) {
          return;
        } else {
          t = this._startTime;
          this._fixKeyFrame = false;
        }
      } else {
        this._fixKeyFrame = true;
      }

      // 线性插值  当前时间过去的比例 * 
      // 时间进展百分比 0 - 1
      let progess = (t - this._startTime) / (this._endTime - this._startTime);

      let displacement = [];
      let currentValue = [];
      for (let i = 0; i < this._endValue.length; i++) {
        displacement[i] = ease(progess) * (this._endValue[i] - this._startValue[i]);
        currentValue[i] = this._startValue[i] + displacement[i];
      }

      // 增量，这段时间要移动的区段   -- 匀速插值方法
      // let displacement = ease(progess) * (this._endValue - this._startValue);
      // 正弦
      // let displacement = Math.sin(progess * Math.PI / 2) * (this._endValue - this._startValue);
      // // 当前值 = 开始值 + 增量
      // let currentValue = this._endValue + displacement;
      this._element.style[this._property] = this._converter(currentValue);
    }
  }

  export {
    ease,
    TimeLine,
    DOMElementStyleNumberAnimation,
    DOMElementStyleVectorAnimation
  }