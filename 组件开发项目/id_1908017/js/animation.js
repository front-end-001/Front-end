class TimeLine {
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
    requestAnimationFrame(this._tick);
  }
  //只能开始调用一次
  play(startTime = 0) {
    this._escaped = startTime;
    this._lastTime = +new Date();
    requestAnimationFrame(this._tick);
  }
  resume() {
    if (this._isPause) {
      this._isPause = false;
      this._lastTime = +new Date();
      requestAnimationFrame(this._tick);
    }
  }
  pause() {
    if (!this._isPause) {
      this._isPause = true;
      cancelAnimationFrame(this._tick);
    }
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
/**
 * 
 * @param {*} val1 要求字符串,带单位;#00FF00不能简写为#0F0
 * @param {*} val2 
 * @param {*} diffValRatio 
 */
function getBetweenVal(val1, val2, diffValRatio) {
  const matchVal = /#[\da-fA-F]+|(?:[\d.]+)/g;
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

/*
问题：
pause 检查，少参数？
设计强壮的接口
  重复调用play,pause,resume
*/