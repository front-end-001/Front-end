export default class Timeline {
  // inited, started, paused
  constructor() {
    this._animations = [];
    this._pauseTime = 0;
    this._rate = 1;
    this._startPoint = 0;
    this.status = "inited";
  }

  start() {
    if (this.status === "started") return;
    this.status = "started";
    const startTime = Date.now();
    this._tick = () => {
      for (const animation of this._animations) {
        if (!animation.finish) {
          animation.tick(
            (Date.now() - startTime - this._pauseTime) * this._rate
              + this._startPoint,
          );
        }
      }
      if (this._tick) {
        requestAnimationFrame(this._tick);
      }
    };
    requestAnimationFrame(this._tick);
  }

  pause() {
    if (this.status !== "started") return;
    this._pauseStart = Date.now();
    this.status = "paused";
    this._remuseTick = this._tick;
    this._tick = null;
  }

  remuse() {
    if (this.status !== "paused") return;
    this.status = "started";
    this._pauseTime += Date.now() - this._pauseStart;
    this._tick = this._remuseTick;
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

  removeAnimation(animation) {}
}
