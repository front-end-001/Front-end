class Timeline{
    constructor(){
        this._animations = [];
        this._rate = 1;
        this._startPoint = 0;
    }
    pause() {
        if(this.status != "started")
            return;
        clearTimeout(this._timer);
        this.status = "paused";
        this._resumeTick = this._tick;
        this._tick = null;
        this._pauseStart = Date.now();
    }
    resume() { 
        if(this.status != "paused")
            return;
        this.pauseTime += Date.now() - this._pauseStart;
        this._tick = this._resumeTick;
        requestAnimationFrame(this._tick);
        this.status = "started";
    }
    restart() {
        if(this._tick) {
            this._tick = null;
            this._resumeTick = null;
        }
        this.status = "inited";
        requestAnimationFrame(() => {
            this.start();
        });
    }
    start() {
        if(this.status == "started")
            return;
        this.status = "started";
        this.pauseTime = 0;
        let startTime = Date.now();
        this._tick = () => {
            for(let animation of this._animations){
                if(!animation.finished){
                    animation.tick((Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint);
                }
            }
            if(this._tick)
                requestAnimationFrame(this._tick);
        }
        requestAnimationFrame(this._tick);
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