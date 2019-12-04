class Timeline {
  constructor() {
      this._animations = [];
      this.pauseTime = 0;
      this.status = "inited";
      this._startPoint = 0;
      this._rate = 1;
  }
  pause() {
      if (this.status !== "started")
          return;
      this.status = "paused";
      this._resumeTick = this._tick;
      this._tick = null;
      this._pauseStart = Date.now();
  }
  resume() {
      if (this.status !== "paused")
          return;
      this.status = "started";
      this.pauseTime += Date.now() - this._pauseStart;
      this._tick = this._resumeTick;
      requestAnimationFrame(this._tick);
  }
  restart() {
      if (this._tick)
          this._tick = null;
      this.status = "inited";
      this._resumeTick = null;
      this.start();
      //        requestAnimationFrame(()=> this.start());
  }
  start() {
      if (this.status === "started")
          return;
      this.status = "started";
      let startTime = Date.now();
      this.pauseTime = 0;
      this._tick = () => {
          for (let animation of this._animations) {
              animation.tick((Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint);

          }
          if (this._tick)
              requestAnimationFrame(this._tick);
      }

      requestAnimationFrame(this._tick);
  }
  set rate(value) {
      this._rate = value;
  }
  get rate() {
      return this._rate;
  }
  set startPoint(value) {
      this._startPoint = value;
  }
  get startPoint() {
      return this._startPoint;
  }
  addAnimation(animation) {
      this._animations.push(animation);
  }
  removeAnimation(animation) {
  }
  clearAnimations() {
      this._animations = [];
  }
}
