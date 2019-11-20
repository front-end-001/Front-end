import { ease } from './cubic-bezier';

export default class StyleVectorAnimation {
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

    const progress = (t - this._startTime) / (this._endTime - this._startTime);
    const currentValues = [];

    for (let i = 0; i < this._endValue.length; i++) {
      // eslint-disable-next-line no-multi-spaces
      currentValues[i] =
        ease(progress) * (this._endValue[i] - this._startValue[i]) + this._startValue[i];
    }

    this._el.style[this._property] = this._converter(currentValues);
  }
}
