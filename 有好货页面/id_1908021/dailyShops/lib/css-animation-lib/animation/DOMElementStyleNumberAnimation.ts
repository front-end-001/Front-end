import AlgType from '../algorithm/Type';
import InterpolationAlg from '../algorithm/InterpolationAlg';
import DOMElementStyleAnimation, { IConverterFunc, BaseType } from './DOMElementStyleAnimation';

class DOMElementStyleNumberAnimation extends DOMElementStyleAnimation {
  constructor(
    element: HTMLElement | null,
    property: string,
    startTime: number = 0,
    startValue: number = 0,
    endTime: number = 1,
    endValue: number = 1,
    converter: IConverterFunc<BaseType>,
    animationType: AlgType = AlgType.linear
  ) {
    super();
    this._element = element;
    this._property = property;
    this._startTime = startTime;
    this._endTime = endTime;
    this._startValue = startValue;
    this._endValue = endValue;
    this._converter = converter;
    this._animationType = animationType;
  }

  tick = (t: number): void => {
    if (!this.fixKeyFrame(t)) return;
    this.updateElemStyle(this.getValue(t));
  };

  getValue = (t: number): number => {
    return InterpolationAlg.getValue(
      t,
      this._startTime,
      this._endTime,
      this._startValue,
      this._endValue,
      this._animationType
    );
  };
}

export default DOMElementStyleNumberAnimation;
