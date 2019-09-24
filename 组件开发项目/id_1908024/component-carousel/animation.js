class Timeline {
    // 四个状态 inited, started, paused
    constructor() {
        this._animations = []
        this.status = 'inited'
        this._rate = 1
        this._startPoint = 0
    }

    // 暂停思路： 计算暂停的总时间，然后在tick里面，减掉这个总时间
    pause() {
        if (this.status != 'started') return
        this.status = 'paused'

        clearTimeout(this._timer)
        this._timer = null
        this._pauseStart = Date.now()
    }
    resume() {
        if (this.status != 'paused') return
        this.pauseTime += Date.now() - this._pauseStart

        this.status = 'started'
        this._timer = setTimeout(this._tick, 16)
    }

    start() {
        if (this.status == 'started') return
        this.status = 'started'
        // t 为当前时间线的时间
        let startTime = Date.now()
        this.pauseTime = 0
        this._tick = () => {
            for (let animation of this._animations) {
                animation.tick(
                    (Date.now() - this.pauseTime - startTime) * this._rate + this._startPoint,
                )
            }
            if (this._tick) {
                this._timer = setTimeout(this._tick, 16)
            }
        }
        this._timer = setTimeout(this._tick, 16)
    }

    restart() {
        if (this._tick) {
            this._tick = null
        }
        this.status = 'inited'
        this.start()
    }

    set startPoint(value) {
        this._startPoint = value
    }

    get startPoint() {
        return this._startPoint
    }

    set rate(value) {
        this._rate = value
    }

    get rate() {
        return this._rate
    }

    addAnimation(animation) {
        this._animations.push(animation)
    }

    clear() {
        this._animations = []
    }

    removeAnimation(animation) {}
}

// 时间线上到哪了，就会进行这个animation
class DOMElementStyleNumberAnimation {
    constructor({ element, property, startTime, startValue, endTime, endValue, callback }) {
        this._element = element
        this._property = property
        this._startTime = startTime
        this._startValue = startValue
        this._endTime = endTime
        this._endValue = endValue
        this._callback = callback
        this._fixKeyFrame = false
    }

    tick(t) {
        // 最后一帧的时候，修复关键帧=false,这样下一帧tick就return 不执行了
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
        let displacement = ease(progress) * (this._endValue - this._startValue)
        let currentValue = displacement + this._startValue
        this._element.style[this._property] = this._callback(currentValue)
    }
}

class DOMElementStyleVectorAnimation {
    constructor({ element, property, startTime, startValue, endTime, endValue, callback }) {
        this._element = element
        this._property = property
        this._startTime = startTime
        this._startValue = startValue
        this._endTime = endTime
        this._endValue = endValue
        this._callback = callback
        this._fixKeyFrame = false
    }

    tick(t) {
        // 最后一帧的时候，修复关键帧=false,这样下一帧tick就return 不执行了
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
            displacement[i] = ease(progress) * (this._endValue[i] - this._startValue[i])
            currentValue[i] = displacement[i] + this._startValue[i]
        }

        this._element.style[this._property] = this._callback(currentValue)
    }
}
