export class TimeLine {
  constructor() {
    this._ratio = 1;
    this._animations = [];
    this._tick = this._tick.bind(this);
  }
  set ratio(val) {
    this._ratio = val;
  }
  get ratio() {
    return this._ratio;
  }
  addAnimation(animation) {
    this._animations.push(animation);
  }
  _updateEscaped() {
    const now = +new Date();
    this._escaped += this._ratio * (now - this._lastTime);
    this._lastTime = now;
    return this._escaped;
  }
  _tick() {
    const t = this._updateEscaped();
    for (let animation of this._animations) {
      animation.tick(t);//todo check timeLine 需要知道 animation 是否跨界么？
    }
    // console.log('timeline run');
    this.rAF(this._tick);
  }
  //只能开始调用一次
  play(startTime = 0) {
    this._escaped = startTime;
    this._lastTime = +new Date();
    this.rAF(this._tick);
  }
  resume() {
    if (this._isPause) {
      this._isPause = false;
      this._lastTime = +new Date();
      this.rAF(this._tick);
    }
  }
  pause() {
    if (!this._isPause) {
      this._isPause = true;
      this.cAF();
    }
  }
  rAF(fn) {
    this._requestId = requestAnimationFrame(fn);
  }
  cAF() {
    cancelAnimationFrame(this._requestId);
    this._requestId = null;
  }
}
class StyleAnimation {
  constructor(el, startTime, endTime, style, timingFunction = diffTRatio => diffTRatio) {
    //assert keysEqual(startProps,endProps)
    this.el = el;
    this.startTime = startTime;
    this.endTime = endTime;
    this.style = style;
    this.timingFunction = timingFunction;
  }
  adjustTick(t) {
    const { startTime, endTime, _lastInRange } = this;
    const lOutRange = t <= startTime, rOutRange = t >= endTime;
    if (!lOutRange & !rOutRange) {
      this._lastInRange = true;
      return [true, t];
    }
    if (_lastInRange) {
      this._lastInRange = false;
      return [true, lOutRange ? startTime : endTime];
    }
    return [false];
  }
  tick(t) {
    const [doUpdate, adjustT] = this.adjustTick(t);
    if (doUpdate) {
      this._update(adjustT);
    }
  }
  _update(t) {
    const { startTime, endTime, timingFunction, style } = this;
    const diffValRatio = timingFunction((t - startTime) / (endTime - startTime));
    const elStyle = this.el.style;
    for (const [key, [start, end]] of Object.entries(style)) {
      elStyle[key] = getBetweenVal(start, end, diffValRatio);
    }
  }
}
export class NormalAnimation {
  constructor(startTime, endTime, vals, updater, timingFunction = diffTRatio => diffTRatio) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.vals = vals;
    this.timingFunction = timingFunction;
    this._lastInRange = false;
    this.updater = updater;
  }
  tick(t) {
    const [doUpdate, adjustT] = this._adjustTick(t);
    if (doUpdate) {
      this._update(adjustT);
    }
  }
  _adjustTick(t) {
    const { startTime, endTime, _lastInRange } = this;
    const lOutRange = t <= startTime, rOutRange = t >= endTime;
    if (!lOutRange & !rOutRange) {
      this._lastInRange = true;
      return [true, t];
    }
    if (_lastInRange) {
      this._lastInRange = false;
      return [true, lOutRange ? startTime : endTime];
    }
    return [false];
  }
  _update(t) {
    const { startTime, endTime, timingFunction, vals, updater } = this;
    const diffValRatio = timingFunction((t - startTime) / (endTime - startTime));
    for (const [key, [start, end]] of Object.entries(vals)) {
      updater(key, getBetweenVal(start, end, diffValRatio));
    }
  }
}
/**
 * 
 * @param {*} val1 要求字符串,带单位;#00FF00不能简写为#0F0
 * @param {*} val2 
 * @param {*} diffValRatio 
 */
function getBetweenVal(val1, val2, diffValRatio) {
  const matchVal = /#[\da-fA-F]+|(?:[-\d.]+)/g;
  const val2Vals = [];
  val2.replace(matchVal, v => val2Vals.push(v));
  let i = 0;
  return val1.replace(matchVal, v1 => {
    let v2 = val2Vals[i];
    if (v1[0] === '#') {
      //颜色

      //#00FF00 转为 [0,255,0]
      [v1, v2] = [v1, v2].map(v => [v.substr(1, 2), v.substr(3, 2), v.substr(5, 2)].map(n => parseInt(n, 16)));
      const result = v1.map((v, i) => {
        const val = Math.max(0, Math.min(255, Math.floor(v + (v2[i] - v) * diffValRatio)));
        return `0${val.toString(16)}`.substr(-2, 2);
      })
      return "#" + result.join("");
    } else {
      //数字
      [v1, v2] = [v1, v2].map(v => parseFloat(v));
      return v1 + (v2 - v1) * diffValRatio;
    }
  });
}

function cubicBezier(p1x, p1y, p2x, p2y) {
  const ZERO_LIMIT = 1e-6;
  // Calculate the polynomial coefficients,
  // implicit first and last control points are (0,0) and (1,1).
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
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t) {
    return ((ay * t + by) * t + cy) * t;
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

export let linear = cubicBezier(0, 0, 1, 1);
export let ease = cubicBezier(.25, .1, .25, 1);
export let easeIn = cubicBezier(.42, 0, 1, 1);
export let easeOut = cubicBezier(0, 0, .58, 1);
export let easeInOut = cubicBezier(.42, 0, .58, 1);
export let myCB = cubicBezier(.69, -0.85, .25, 1);
/*
问题：
pause 检查，少参数？
设计强壮的接口
  重复调用play,pause,resume
*/