import enableGesture from './gesture'
import Animation from './animation'

export default class Carousel {
    constructor(
        container, 
        duration = 3000, 
        elementWidth = 500, 
        transitMethod = ease, 
        transitionDuration = 500
    ) {
        this._container = container
        this._duration = duration
        this._container.classList.add("carousel")
        this._handler = null
        this.data = null
        this.elementWidth = elementWidth
        this.transitMethod = transitMethod
        this.transitionDuration = transitionDuration
    }
    render() {
        let offsetTimeStart = 0
        let tl = new Animation.Timeline()
        let position = 0
        let children = Array.prototype.slice.call(this._container.children)
        this.elementWidth = Math.max(...children.map(i => i.width)) || 375
        let positionOf = (element) => {
            let position = element.style.transform.match(/\((.*?)\)/g)[0]
            if (position.slice(position.length - 2, position.length - 1) === "%") {
                return parseInt(position.slice(1, position.length - 2)) * this.elementWidth / 100;
            } else if (position.slice(position.length - 3, position.length - 1) === "px") {
                return parseInt(position.slice(1, position.length - 3))
            }
        }
        let nextFrame = (i = 1) => {
            let current = children[position]
            let nextPosition = (position + 1) % children.length
            let next = children[nextPosition]
            let nextNextPosition = (nextPosition + 1) % children.length
            let nextNext = children[nextNextPosition]
            offsetTimeStart = Date.now()
            tl.clearAnimations();
            if (i === -1) {
                current.style.transform = `translate(${-this.elementWidth - this.elementWidth * position}px)`
            } else {
                let currentPo = positionOf(current)
                let currentDis = Math.abs(-this.elementWidth - this.elementWidth * position - currentPo) / this.elementWidth
                tl.addAnimation(new Animation.DOMElementStyleNumberAnimation(
                    current,
                    "transform",
                    0, currentPo,
                    currentDis * this.transitionDuration, -this.elementWidth - this.elementWidth *
                    position,
                    this.transitMethod,
                    (v) => `translateX(${v}px)`
                ))
            }
            if (i === 1) {
                nextNext.style.transform = `translate(${this.elementWidth - this.elementWidth * nextNextPosition}px)`
            } else {
                let nextNextPo = positionOf(nextNext)
                let nextNextDis = Math.abs(this.elementWidth - this.elementWidth * nextNextPosition - nextNextPo) / this.elementWidth
                tl.addAnimation(new Animation.DOMElementStyleNumberAnimation(
                    nextNext,
                    "transform",
                    0, nextNextPo,
                    nextNextDis * this.transitionDuration, this.elementWidth - this.elementWidth *
                    nextNextPosition,
                    this.transitMethod,
                    (v) => `translateX(${v}px)`
                ))
            }
            let nextPo = positionOf(next)
            let nextDis = Math.abs(-this.elementWidth * nextPosition - nextPo) / this.elementWidth
            tl.addAnimation(new Animation.DOMElementStyleNumberAnimation(
                next,
                "transform",
                0, nextPo,
                this.transitionDuration * nextDis, -this.elementWidth * nextPosition,
                this.transitMethod,
                (v) => `translateX(${v}px)`
            ));
            tl.restart();
            position = nextPosition;
            this._handler = setTimeout(() => {
                // nextFrame()
            }, this._duration)

        }

        this._handler = setTimeout(() => {
            // nextFrame()
        }, this._duration)
        let offset = 0;
        let currentTime = 0
        enableGesture(this._container)
        this._container.addEventListener('pan', event => {
            if (event.isVertical) return 
            if (tl.status !== 'paused') {
                tl.pause()
                clearTimeout(this._handler)
                delete (this._handler)
                currentTime = Date.now()
                if (currentTime - offsetTimeStart < this.transitionDuration) {
                    offset = (1 - this.transitMethod((currentTime - offsetTimeStart) / this.transitionDuration)) * this.elementWidth
                } else {
                    off = 0
                }
            }
            let current = children[position]
            let nextPosition = (position + 1) % children.length
            let next = children[nextPosition]
            let previousPosition = (position + children.length - 1) % children.length
            let previous = children[previousPosition]
            current.style.transform = `translate(${- position * this.elementWidth + event.dx + offset}px`
            next.style.transform = `translate(${this.elementWidth - this.elementWidth * nextPosition + event.dx + offset}px)`
            previous.style.transform = `translate(${this.elementWidth * (- 1 - previousPosition) + event.dx + offset}px)`
        })
        this._container.addEventListener('panend', event => {
            let condition = 0
            if (event.isVertical) return 
            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                condition = (event.dx < 0) ? 1 : -1
            } else {
                let x = event.dx
                condition = (x < -this.elementWidth / 2) ? 1 : (x > this.elementWidth / 2) ? -1 : 0
            }
            position = (offset < this.elementWidth) ? ((position - 1 + 4 + condition) % 4) : ((position - 2 + 4 + condition) % 4)
            // nextFrame(condition)
        })
        this._container.addEventListener('pancancel', event => {
            let condition = 0
            position = (offset < this.elementWidth) ? ((position - 1 + 4 + condition) % 4) : ((position - 2 + 4 + condition) % 4)
            // nextFrame(condition)
        })
        this._container.addEventListener('mousedown', event => event.preventDefault())
    }
}