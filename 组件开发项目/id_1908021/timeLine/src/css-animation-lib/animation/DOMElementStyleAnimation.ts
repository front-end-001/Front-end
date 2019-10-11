import AlgType from '../algorithm/Type';

export type BaseType = number | number[];

export interface IConverterFunc<BaseType> {
  (arg0: BaseType): string;
}

class DOMElementStyleAnimation {
  protected _element: HTMLElement | null;
  protected _property: string = '';
  protected _animationType: AlgType;
  protected _startTime: number;
  protected _endTime: number;
  protected _startValue: number;
  protected _endValue: number;
  protected _converter: IConverterFunc<BaseType>;
  private _finished: boolean;
  private _fixKeyFrame: boolean;

  constructor() {
    this._element = null;
    this._animationType = AlgType.linear;
    this._startTime = 0;
    this._endTime = 1;
    this._startValue = 0;
    this._endValue = 1;
    this._converter = (val: BaseType) => val.toString();
    this._finished = false;
    this._fixKeyFrame = false;
  }

  get finished(): boolean {
    return this._finished;
  }

  set finished(value: boolean) {
    this._finished = value;
  }

  updateElemStyle = (value: BaseType): void => {
    // TODO pollyfill
    if (this._element) {
      this._element.style[this._property as any] = this._converter(value);
    }
  };

  fixKeyFrame = (t: number): boolean => {
    // terrible
    if (t > this._endTime) {
      if (!this._fixKeyFrame) return false;
      else {
        t = this._endTime;
        this._finished = true;
        this._fixKeyFrame = false;
      }
    } else if (t < this._startTime) {
      if (!this._fixKeyFrame) return false;
      else {
        t = this._startTime;
        this._fixKeyFrame = false;
      }
    } else {
      this._fixKeyFrame = true;
    }

    return true;
  };

  tick = (t: number): void => {};
}

export default DOMElementStyleAnimation;
