import React from '../react'

class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.contexts = Object.create(null)
  }

  render () {
    console.log(this.props)
    const { children } = this.props
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper" onTouchStart={this.touchstart.bind(this)}>
          {children.map(value => (
            <div className="carousel-item">
              {value}
            </div>
          ))}
        </div>
      </div>
    )
  }

  start (point, context) {
    context.startTime = Date.now()
    context.startX = point.clientX
    context.startY = point.clientY

    context.isTap = true
    context.isPan = false
  }

  move (point, context) {
    const dx = point.clientX - context.startX
    const dy = point.clientY - context.startY
    // 100 这里要在各种屏上做适配
    if (dx * dx + dy * dy > 100) {
      context.isTap = false
      if (context.isPan === false) {
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isVertical = false
          context.isHorizontal = true
        } else {
          context.isVertical = true
          context.isHorizontal = false
        }
        const e = new Event('panstart')
        e.startX = context.startX
        e.startY = context.startY
        this.main.dispatchEvent(e)
        context.isPan = true
      }
    }
    if (context.isPan) {
      const e = new Event('pan')
      e.dx = dx
      e.dy = dy
      this.main.dispatchEvent(e)
    }
  }

  end (point, context) {
    const dx = point.clientX - context.startX
    const dy = point.clientY - context.startY
    if (context.isTap) {
      const e = new Event('tap')
      this.main.dispatchEvent(e)
    }
    const v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
    console.log(v)
    if (context.isPan && v > 0.3) {
      console.log('flick')
      context.isFlick = true
      const e = new Event('flick')
      e.dx = dx
      e.dy = dy
      this.main.dispatchEvent(e)
    } else {
      context.isFlick = false
    }
    if (context.isPan) {
      const e = new Event('panend')
      e.dx = dx
      e.dy = dy
      e.isFlick = context.isFlick
      this.main.dispatchEvent(e)
    }
  }

  cancel (point, context) {
    if (context.isPan) {
      const e = new Event('pancancel')
      this.main.dispatchEvent(e)
    }
  }

  touchstart (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      this.contexts[touch.identifier] = Object.create(null)
      this.start(touch, this.contexts[touch.identifier])
    }
  }

  touchmove (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      this.move(touch, this.contexts[touch.identifier])
    }
  }

  touchend (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      this.end(touch, this.contexts[touch.identifier])
      delete this.contexts[touch.identifier]
    }
  }

  touchcancel (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      this.cancel(touch, this.contexts[touch.identifier])
      delete this.contexts[touch.identifier]
    }
  }
}

export default Carousel
