import {cubicBezier} from "./cubicBezier.js"

let ease = cubicBezier(.25, .1, .25, 1);
let linear = cubicBezier(0, 0, 1, 1);

export class Timeline {
    constructor() {
        this._animations = [];
        this.status = "inited";
        this._rate = 1;
        this._startPoint = 0;
    }
    pause() {
        if (this.status != "started")
            return;
        this.status = "paused";
        this._resumeTick = this._tick;
        this._tick = null;
        this._pauseStart = Date.now();
    }
    resume() {
        if (this.status != "paused")
            return;
        this.status = "started";
        this.pauseTime += Date.now() - this._pauseStart;

        this._tick = this._resumeTick;
        requestAnimationFrame(this._tick);
    }
    start() {
        if (this.status == "started") 
            return;
        this.status = "started";
        let startTime = Date.now();
        this.pauseTime = 0;
        this._tick = () => {
            for(let animation of this._animations) {
                if (!animation.finished) {
                    animation.tick((Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint);
                }
            }
            if (this._tick)
                requestAnimationFrame(this._tick);
        };
        requestAnimationFrame(this._tick);
    }
    restart() {
        if (this._tick) {
            this._tick = null;
        }
        this._resumeTick = null;
        this.status = "inited";
        requestAnimationFrame(() => this.start());
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
    removeAnimation(animation) {
    }
    clearAnimtaion() {
        this._animations.length = 0;
    }
}

export class DOMElementStyleNumberAnimation {
    constructor(element, property, startTime, startValue, endTime, endValue, conveter) {
        this._element = element;
        this._property = property;
        this._startTime = startTime;
        this._startValue = startValue;
        this._endTime = endTime;
        this._endValue = endValue;
        this._converter = conveter;
        this._fixKeyFrame = false;
    }
    tick(t) {
        if (t > this._endTime) {
            if (!this._fixKeyFrame)
                return;
            else {
                t = this._endTime;
                this._fixKeyFrame = false;
            }
        } else if (t < this._startTime) {
            if (!this._fixKeyFrame)
                return;
            else{
                t = this._startTime;
                this._fixKeyFrame = false;
            }
        } else {
            this._fixKeyFrame = true;
        }

        let progress = (t - this._startTime) / (this._endTime - this._startTime);
        let displacement = ease(progress) * (this._endValue - this._startValue);
        let currentValue = displacement + this._startValue;
        this._element.style[this._property] = this._converter(currentValue);
    }
}

export class DOMElementStyleVectoriAnimation {
    constructor(element, property, startTime, startValue, endTime, endValue, conveter) {
        this._element = element;
        this._property = property;
        this._startTime = startTime;
        this._startValue = startValue;
        this._endTime = endTime;
        this._endValue = endValue;
        this._converter = conveter;
        this._fixKeyFrame = false;
    }
    tick(t) {
        if (t > this._endTime) {
            if (!this._fixKeyFrame)
                return;
            else {
                t = this._endTime;
                this._fixKeyFrame = false;
            }
        } else if (t < this._startTime) {
            if (!this._fixKeyFrame)
                return;
            else{
                t = this._startTime;
                this._fixKeyFrame = false;
            }
        } else {
            this._fixKeyFrame = true;
        }

        let progress = (t - this._startTime) / (this._endTime - this._startTime);
        
        let displacement = [];
        let currentValue = [];
        for(let i = 0; i < this._endValue.length; i++) {
            displacement[i] = ease(progress) * (this._endValue[i] - this._startValue[i]);
            currentValue[i] = displacement[i] + this._startValue[i];
        }
        this._element.style[this._property] = this._converter(currentValue);
    }
}