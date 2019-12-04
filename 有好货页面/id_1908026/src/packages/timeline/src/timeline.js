export StyleNumberAnimation from './style-number-animation';
export StyleVectorAnimation from './style-vector-animation';
export { linear, ease, easeIn, easeOut, easeInOut } from './cubic-bezier';

export default class Timeline {
  // inited, started, paused
  constructor() {
    this._animations = []; // 记录timeline的状态, inited, started, paused
    this._pauseTime = 0; // 记录总暂停时间累加
    this._rate = 1;
    this._startPoint = 0;
    this.status = 'inited';
    this._startTime = null;
    this.num = 0;
  }

  start() {
    if (this.status === 'started') return;

    this.status = 'started';
    if (!this._startTime) {
      this._startTime = Date.now();
    }
    const startTime = Date.now(); // 记录开始时间
    this._tick = () => {
      for (const animation of this._animations) {
        if (!animation.finish) {
          animation.tick(
            (Date.now() - startTime - this._pauseTime) * this._rate + this._startPoint,
          );
        }
      }
      if (this._tick) {
        requestAnimationFrame(this._tick);
      } else {

      }
    }; // 每一帧需要执行的函数
    requestAnimationFrame(this._tick); // 执行一帧动画
  }

  restart() {
    // TODO: restart的前一帧会出现继续使用上一个startTime的情况
    if (this._tick) {
      this._tick = null;
      this._resumeTick = null;
    }
    this._startTime = null;
    this.status = 'inited';
    // this.start();
    if (this.num === 0) {
      requestAnimationFrame(() => {
        this.start();
      });
    }
  }

  pause() {
    if (this.status !== 'started') return;
    this._pauseStart = Date.now(); // 记录暂停时间戳
    this.status = 'paused';
    this._resumeTick = this._tick; // 缓存_tickFunc
    this._tick = null; // 清空_tickFunc，requestAnimationFrame的执行依赖于_tickFunc是否有值
  }

  remuse() {
    if (this.status !== 'paused') return;
    this.status = 'started';
    this._pauseTime += Date.now() - this._pauseStart; // 累加暂停时间
    this._tick = this._resumeTick; // 重新为_tick赋值
    requestAnimationFrame(this._tick); // 进行下一帧动画
  }

  set startPoint(value) {
    this._startPoint = value;
  }

  get startPoint() {
    return this._startPoint;
  }

  set rate(value) {
    this._rate = value;
  }

  get rate() {
    return this._rate;
  }

  addAnimation(animation) {
    this._animations.push(animation);
  }

  // removeAnimation(animation) {}
  clearAnimations() {
    this._animations = [];
  }

  clearTick() {
    if (this._tick) {
      this._tick = null;
      this._resumeTick = null;
    }
  }
}
