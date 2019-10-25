export class Timeline {
    constructor() {
        this._animations = [];
        this.status = "inited";
        this.pauseDurationTime = 0;
        this._rate = 1;
        this._startPoint = 0;
    }

    pause() {
        if (this.status != "started") return;

        this.status = "paused";

        this._resumeTick = this._tick;
        this._tick = null;

        this._pauseStartTime = Date.now();
    }

    resume() {
        if (this.status != "paused") return;
        this.pauseDurationTime += Date.now() - this._pauseStartTime;

        this._tick = this._resumeTick;
        requestAnimationFrame(this._tick)
    }

    restart() {
        if (this._tick) {
            this._tick = null;
        }
        this._resumeTick = null;
        this.status = "inited";
        this._animations = [];
        requestAnimationFrame(()=> this.start());

    }

    start() {
        if (this.status == "started") return;
        this.status = "started";
        let startTime = Date.now();
        this._tick = () => {
            for (let animation of this._animations) {
                    let tick_value = (Date.now() - this.pauseDurationTime - startTime) * this._rate + this._startPoint;
                    animation.tick(tick_value);
            }

            if (this._tick) requestAnimationFrame(this._tick);
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

    removeAnimation(animation) {

    }
}


export class DOMElementStyleElemAnimation {
    constructor(element, property, startTime, startValue, endTime, endValue, converter) {
        this._element = element;
        this._property = property;
        this._startTime = startTime;
        this._startValue = startValue;
        this._endTime = endTime;
        this._endValue = endValue;
        this._converter = converter;
        this._fixKeyFrame = false;
    }

    tick(t) { // 这里用 > end < start 来控制还未发生的动画，进行return， 正在进行的就是true， 一旦过了边界，重装为边界，并设定为false
        if(t > this._endTime) {
            if(!this._fixKeyFrame)
                return;
            else {
                t = this._endTime;
                this._fixKeyFrame = false;
            }
        } else if(t < this._startTime) {
            if(!this._fixKeyFrame)
                return;
            else {
                t = this._startTime;
                this._fixKeyFrame = false;
            }

        } else {
            this._fixKeyFrame = true;
        }
        //console.log("t, startTime, endTime" , t, this._startTime, this._endTime);
        //
        //let timeProcess = (t - this._startTime) / (this._endTime - this._startTime)

        //let v = timeProcess *(this._endValue - this._startValue) + this._startValue;
        //console.log("animation transform:", v);
        //this._element.style[this._property] = this._converter(ease(timeProcess) *
        //this._element.style[this._property] = this._converter(timeProcess *
        //    (this._endValue - this._startValue) +
        //    this._startValue); // 线性计算时间和位置的关系
        let progress = (t - this._startTime) / (this._endTime - this._startTime);
        let displacement = progress * (this._endValue - this._startValue);
        let currentValue = this._startValue + displacement;
        this._element.style[this._property] = this._converter( currentValue );

    }
}

class DOMElementStyleVectorAnimation {
    constructor(element, property, startTime, startValue, endTime, endValue, converter) {
        this._element = element;
        this._property = property;
        this._startTime = startTime;
        this._startValue = startValue;
        this._endTime = endTime;
        this._endValue = endValue;
        this._converter = converter;
        this._fixKeyFrame = false;
    }

    tick(t) { // 这里用 > end < start 来控制还未发生的动画，进行return， 正在进行的就是true， 一旦过了边界，重装为边界，并设定为false
        if(t > this._endTime) {
            if(!this._fixKeyFrame)
                return;
            else {
                t = this._endTime;
                this._fixKeyFrame = false;
            }
        } else if(t < this._startTime) {
            if(!this._fixKeyFrame)
                return;
            else {
                t = this._startTime;
                this._fixKeyFrame = false;
            }

        } else {
            this._fixKeyFrame = true;
        }

        let progress = (t - this._startTime) / (this._endTime - this._startTime)

        let displacement = [];
        let currentValue = [];
        for(let i = 0; i < this._endValue.length; i++) {
            displacement[i] = ease(progress) * (this._endValue[i] - this._startValue[i]);
            currentValue[i] = this._startValue[i] + displacement[i];
        }
        this._element.style[this._property] = this._converter( currentValue );

    }
}

