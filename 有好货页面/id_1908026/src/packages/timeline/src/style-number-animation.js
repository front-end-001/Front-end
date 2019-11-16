import { ease } from './cubic-bezier';

export default class StyleNumberAnimation {
  constructor(el, property, startTime, startValue, endTime, endValue, converter) {
    this._el = el;
    this._property = property;
    this._startTime = startTime;
    this._startValue = startValue;
    this._endTime = endTime;
    this._endValue = endValue;
    this._converter = converter;
    this._needFixKeyFrame = false;
    this._finish = false;
  }

  get finish() {
    return this._finish;
  }

  tick(t) {
    if (t >= this._endTime) {
      if (this._needFixKeyFrame) {
        t = this._endTime;
        this._needFixKeyFrame = false;
        this._finish = true;
      } else {
        return;
      }
    } else if (t <= this._startTime) {
      if (this._needFixKeyFrame) {
        t = this._startTime;
        this._needFixKeyFrame = false;
        this._finish = true;
      } else {
        return;
      }
    } else {
      this._needFixKeyFrame = true;
    }

    this._el.style[this._property] = this._converter(
      ease((t - this._startTime) / (this._endTime - this._startTime)) *
        (this._endValue - this._startValue) +
        this._startValue,
    );
  }
}
