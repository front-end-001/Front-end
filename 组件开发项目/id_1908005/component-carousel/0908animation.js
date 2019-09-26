import { cubicBezier } from "./cubicBezier";

let linear = cubicBezier(0, 0, 1, 1);
let ease = cubicBezier(.25, .1, .25, 1);
let easeIn = cubicBezier(.42, 0, 1, 1);
let easeOut = cubicBezier(0, 0, .58, 1);
let easeInOut = cubicBezier(.42, 0, .58, 1);
let myCB = cubicBezier(.69, -0.85, .25, 1);

export class Timeline {
    constructor() {
        this._animationArr = [];
        this.pauseTime = 0;
        this.status = "inited";
        this._rate = 1;
        this._startPoint = 0;
    }

    // 开始
    start() {
        if (this.status === "started") {
            return
        }
        this.status = "started"
        this.pauseTime = 0;

        let startTime = Date.now();

        this._tick = () => {
            for (let animation of this._animationArr) {
                animation.tick((Date.now() - startTime - this.pauseTime) * this._rate + this._startPoint);
            }
            if (this._tick) {
                requestAnimationFrame(this._tick)
            }
        }
        requestAnimationFrame(this._tick)

    }
    // 刷洗状态 重新开始
    restart() {
        if (this._tick) {
            this._tick = null;
        }
        this._resumeTick = null;
        this.status = "inited";
        requestAnimationFrame(() => this.start())
    }
    // 暂停
    pause() {

        if (this.status !== "started") {
            return
        }

        this.status = "paused"
        this._pauseStart = Date.now();

        this._resumeTick = this._tick;
        this._tick = null
    }
    // 暂停后重开
    resume() {
        if (this.status !== "paused") {
            return
        }
        this.status = "started"
        this.pauseTime += Date.now() - this._pauseStart;

        this._tick = this._resumeTick
        requestAnimationFrame(this._tick)
    }
    // 添加一段动画
    addAnimation(animation) {
        this._animationArr.push(animation)
    }
    // 移除一段动画
    removeAnimation() {

    }
    // 倒放
    set startPoint(value) {
        this._startPoint = value
    }
    get startPoint() {
        return this._startPoint
    }
    set rate(value) {
        // 播放速率
        this._rate = value
    }
    get rate() {
        return this._rate
    }
}
export class DOMElementStyleAnimation {
    constructor(el, pro1, startTime, startVal, endTime, endVal, converter) {
        this._el = el;
        this._pro1 = pro1;
        this._startTime = startTime;
        this._startVal = startVal;
        this._endTime = endTime;
        this._endVal = endVal;
        this._converter = converter;
        this._fixKeyFrame = false;
    }
    tick(t) {
        if (t > this._endTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._endTime
                this._fixKeyFrame = false;
            }
        } else if (t < this._startTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._startTime
                this._fixKeyFrame = false;
            }
        } else {
            this._fixKeyFrame = true;
        }


        // let value = ease((t - this._startTime) / (this._endTime - this._startTime))
        //     * this._endVal - this._startVal
        //     + this._startVal;
        // this._el.style[this._pro1] = this._converter(value)
        let progress = (t - this._startTime) / (this._endTime - this._startTime)
        let displacement = ease(progress) * (this._endVal - this._startVal);
        let currentValue = this._startVal + displacement;
        this._el.style[this._pro1] = this._converter(currentValue);
    }
}

class DOMElementStyleVectorAnimation {
    constructor(el, pro1, startTime, startVal, endTime, endVal, converter) {
        this._el = el;
        this._pro1 = pro1;
        this._startTime = startTime;
        this._startVal = startVal;
        this._endTime = endTime;
        this._endVal = endVal;
        this._converter = converter;
        this._fixKeyFrame = false;
    }
    tick(t) {
        if (t > this._endTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._endTime
                this._fixKeyFrame = false;
            }
        } else if (t < this._startTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._startTime
                this._fixKeyFrame = false;
            }
        } else {
            this._fixKeyFrame = true;
        }


        let progress = (t - this._startTime) / (this._endTime - this._startTime);
        let displacement = [], currentValue = [];
        for (let i = 0; i < this._endVal.length; i++) {
            displacement[i] = progress * (this._endVal[i] - this._startVal[i])
            currentValue[i] = this._startVal[i] + displacement[i]
        }
        this._el.style[this._pro1] = this._converter(currentValue)
    }
}
