class Timeline {
    constructor() {
        this._animations = [];
        this.finished = false;
    }

    pause() {

    }

    resume() {

    }

    start() {
        let startTime = Date.now();
        setInterval(() => {
            for (let animation of this._animations) {
                if (!this.finished) {
                    animation.tick(Date.now() - startTime);
                }
            }
        }, 16); // 1000 / 60 帧
    }

    set rate(value) {

    }

    get rate() {

    }

    addAnimation(animation) {
        this._animations.push(animation);

    }

    removeAnimation(animation) {

    }
}


class DOMElementStyleAnimation {
    constructor(element, property, startTime, startValue, endTime, endValue, converter) {
        this._element = element;
        this._property = property;
        this._startTime = startTime;
        this._startValue = startValue;
        this._endTime = endTime;
        this._endValue = endValue;
        this._converter = converter;
    }

    tick(t) {
        if (t < this._startTime) return;
        if (t > this._endTime) { // 这里有误差的，所以如果查过了就等于endtime, 然后设置一个结束的标志即可。 
            t = this._endTime;
            this.finished = true;
        }

        
        let timeProcess = (t - this._startTime) / (this._endTime - this._startTime)

        this._element.style[this._property] = this._converter(ease(timeProcess)*
            (this._endValue - this._startValue) +
            this._startValue); // 线性计算时间和位置的关系

    }
}


let tl = new Timeline();

tl.addAnimation(new DOMElementStyleAnimation(
    document.getElementById("ball"),
    "top",
    0, 0,
    500, 100,
    (v) => `${v}px`
));

tl.addAnimation(new DOMElementStyleAnimation(
    document.getElementById("ball"),
    "left", // 距离左边XX，感觉就是向右移动
    500, 0,
    1000, 100,
    (v) => `${v}px`
));

tl.addAnimation(new DOMElementStyleAnimation(
    document.getElementById("ball"),
    "top", // 回到顶部
    1000, 100,
    1500, 0,
    (v) => `${v}px`
));

tl.addAnimation(new DOMElementStyleAnimation(
    document.getElementById("ball"),
    "left", // 回到左上角
    1500, 100,
    2000, 0,
    (v) => `${v}px`
));

tl.start();
