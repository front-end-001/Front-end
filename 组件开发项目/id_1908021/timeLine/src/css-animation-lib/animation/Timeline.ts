import DOMElementStyleAnimation from './DOMElementStyleAnimation';

enum TimeLineStatus {
  initial = 'initial',
  started = 'started',
  paused = 'paused'
}

const emptyFunc = () => {};
/**
 * TimeLine
 *
 * @class TimeLine
 */
export default class TimeLine {
  private _animations: DOMElementStyleAnimation[];
  private _rate: number; // 播放速率
  private _pauseStart: number;
  private _pauseTime: number;
  private _startPoint: number;
  private _tick: () => void = emptyFunc;
  private _resumeTick: () => void = emptyFunc;

  private status: TimeLineStatus;

  constructor() {
    this._animations = [];
    this._rate = 1;
    this._pauseStart = 0;
    this._pauseTime = 0;
    this._startPoint = 0;
    this.status = TimeLineStatus.initial;
  }

  get rate(): number {
    return this._rate;
  }

  get startPoint(): number {
    return this._startPoint;
  }

  set rate(value: number) {
    this._rate = value;
  }

  set startPoint(value: number) {
    this._startPoint = value;
  }

  pause = (): void => {
    if (this.status !== TimeLineStatus.started) return;
    this.status = TimeLineStatus.paused;
    this._resumeTick = this._tick;
    this._tick = emptyFunc;
    this._pauseStart = Date.now();
  };

  resume = (): void => {
    if (this.status !== TimeLineStatus.paused) return;
    this._pauseTime += Date.now() - this._pauseStart;

    this._tick = this._resumeTick;
    requestAnimationFrame(this._tick);
  };

  addAnimation = (animation: DOMElementStyleAnimation): void => {
    this._animations.push(animation);
  };

  start = (): void => {
    if (this.status === TimeLineStatus.started) return;
    this.status = TimeLineStatus.started;
    this._pauseTime = 0;

    let startTime = Date.now();

    this._tick = (): void => {
      for (let animation of this._animations) {
        if (!animation.finished) {
          animation.tick(
            (Date.now() - this._pauseTime - startTime) * this._rate + this._startPoint
          );
        }
      }
      requestAnimationFrame(this._tick);
      // if (this._tick) {
      //   requestAnimationFrame(this._tick);
      // }
    };
    requestAnimationFrame(this._tick);
  };

  removeAnimation = () => {};

  restart = (): void => {
    if (this._tick) {
      this._tick = emptyFunc;
      this._resumeTick = emptyFunc;
    }
    this.status = TimeLineStatus.initial;
    requestAnimationFrame(() => {
      this.start();
    });
  };
}
