function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6
    const ax = 3 * p1x - 3 * p2x + 1
    const bx = 3 * p2x - 6 * p1x
    const cx = 3 * p1x

    const ay = 3 * p1y - 3 * p2y + 1
    const by = 3 * p2y - 6 * p1y
    const cy = 3 * p1y

    function sampleCurveDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }

    function solveCurveX(x) {
        let t2 = x
        let derivative
        let x2
        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x
            if (Math.abs(x2) < ZERO_LIMIT) return t2
            derivative = sampleCurveDerivativeX(t2)
            if (Math.abs(derivative) < ZERO_LIMIT) break
            t2 -= x2 / derivative
        }
        let t1 = 1
        let t0 = 0
        t2 = x
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x
            if (Math.abs(x2) < ZERO_LIMIT) return t2
            if (x2 > 0) {
                t1 = t2
            } else {
                t0 = t2
            }
            t2 = (t1 + t0) / 2
        }
        return t2
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x))
    }

    return solve
}

let linear = cubicBezier(0, 0, 1, 1)
// let ease = cubicBezier(.25, .1, .25, 1)
// let easeIn = cubicBezier(.42, 0, 1, 1)
// let easeOut = cubicBezier(0, 0, .58, 1)
// let easeInOut = cubicBezier(.42, 0, .58, 1)
// let myCB = cubicBezier(.1, -0.85, .25, 1)
class Timeline {
    constructor() {
        this._animations = []
        this.pauseTime = 0
        this.status = 'inited'
        this._startPoint = 0
        this._rate = 1
    }

    set rate(value) {
        this._rate = value
    }

    get rate() {
        return this._rate
    }

    set startPoint(value) {
        this._startPoint = value
    }

    get startPoint() {
        return this._startPoint
    }

    pause() {
        if (this.status !== 'started') return
        this.status = 'paused'
        this._resumeTick = this._tick
        this._tick = null
        this._pauseStart = Date.now()
    }

    resume() {
        if (this.status !== 'paused') return 
        this.status = 'started'
        this.pauseTime += Date.now() - this._pauseStart
        this._tick = this._resumeTick
        requestAnimationFrame(this._tick)
    }
    
    restart() {
        if (this._tick) this._tick = null
        this.status = 'inited'
        this._resumeTick = null
        this.start()
        // requestAnimationFrame(()=> this.start())
    }
    start() {
        if (this.status === 'started') return 
        this.status = 'started'
        let startTime = Date.now()
        this.pauseTime = 0
        this._tick = () => {
            for (let animation of this._animations) {
                animation.tick((Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint)
            }
            if (this._tick) requestAnimationFrame(this._tick)
        }

        requestAnimationFrame(this._tick)
    }

    addAnimation(animation) {
        this._animations.push(animation)
    }

    clearAnimations() {
        this._animations = []
    }
}

class DOMElementStyleNumberAnimation {
    constructor(
        element,
        property, 
        startTime, 
        startValue, 
        endTime, 
        endValue, 
        transitCurve, 
        converter
    ) {
        this._element = element
        this._property = property
        this._startTime = startTime
        this._startValue = startValue
        this._endTime = endTime
        this._endValue = endValue
        this._transitCurve = transitCurve
        this._converter = converter
        this._fixKeyFrame = false
    }

    tick(t) {
        if (t > this._endTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._endTime
                this._fixKeyFrame = false
            }
        } else if (t < this._startTime) {
            if (!this._fixKeyFrame) {
                return 
            } else {
                t = this._startTime
                this._fixKeyFrame = false
            }
        } else {
            this._fixKeyFrame = true
        }
        let progress = (t - this._startTime) / (this._endTime - this._startTime)
        let displacement = this._transitCurve(progress) * (this._endValue - this._startValue)
        let currentValue = displacement + this._startValue
        this._element.style[this._property] = this._converter(currentValue);
    }
}

class DOMElementStyleVectorAnimation {
    constructor(
        element, 
        property, 
        startTime, 
        startValue, 
        endTime, 
        endValue, 
        transitCurve, 
        converter
    ) {
        this._element = element
        this._property = property
        this._startTime = startTime
        this._startValue = startValue
        this._endTime = endTime
        this._endValue = endValue
        this._transitCurve = transitCurve
        this._converter = converter
        this._fixKeyFrame = false
    }

    tick(t) {
        if (t > this._endTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._endTime
                this._fixKeyFrame = false
            }
        } else if (t < this._startTime) {
            if (!this._fixKeyFrame) {
                return
            } else {
                t = this._startTime
                this._fixKeyFrame = false
            }
        } else {
            this._fixKeyFrame = true
        }
        let progress = (t - this._startTime) / (this._endTime - this._startTime)
        let displacement = []
        let currentValue = []
        for (let i = 0; i < this._endValue.length; i++) {
            displacement[i] = this._transitCurve(progress) * (this._endValue[i] - this._startValue[i])
            currentValue[i] = displacement[i] + this._startValue[i]

        }
        this._element.style[this._property] = this._converter(currentValue)
    }
}

export default {
    Timeline, 
    DOMElementStyleVectorAnimation, 
    DOMElementStyleNumberAnimation, 
    linear
}