import React from '../react'

class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.contexts = Object.create(null)
    this.state = {
      move: 0,
      start_x: 0,
      start_y: 0,
      move_x: 0,
      move_y: 0,
      end_x: 0,
      end_y: 0,
      last_x: 0,
      last_y: 0,
      index: 0
    }
  }

  render () {
    console.log(this.props)
    const { children } = this.props
    return (
      <div className="carousel-container">
        <div
          id={this.props.name}
          className="carousel-wrapper">
          {children.map(value => (
            <div className="carousel-item">
              {value}
            </div>
          ))}
        </div>
      </div>
    )
  }

  componentDidMount (base) {
    setTimeout(_ => {
      if (this.props.vm) {
        this.props.vm(this)
      }
      this.dom = document.querySelector(`#${this.props.name}`)
      this.go(this.props.index)
      this.dom.addEventListener('touchstart', this.touchstart.bind(this))
      this.dom.addEventListener('touchmove', this.touchmove.bind(this))
      this.dom.addEventListener('touchend', this.touchend.bind(this))
    })
  }

  go (index) {
    this.dom.style.transition = 'transform .3s'
    this.dom.style.transform = `translate(-${(this.dom.offsetWidth * index)}px,0)`
    this.state.index = index
  }

  direction () {
    if (this.state.start_x > this.state.end_x) {
      return 1
    } else {
      return -1
    }
  }

  start (point) {
    this.state.start_x = point.clientX
    this.state.start_y = point.clientY
  }

  move (point) {
    this.state.move_x = -(this.state.index * this.dom.offsetWidth) + point.clientX - this.state.start_x
    this.dom.style.transition = 'transform 0s'
    this.dom.style.transform = `translate(${this.state.move_x}px,0)`
    // console.log(point, context)
  }

  end (point) {
    this.state.last_x = this.state.move_x
    this.state.end_x = point.clientX
    if ((this.state.index === 0 && this.direction() < 0) || (this.direction() > 0 && this.state.index === this.props.children.length - 1)) {
      this.go(this.state.index)
    } else {
      this.go(this.state.index + this.direction())
    }
  }

  touchstart (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      // this.contexts[touch.identifier] = Object.create(null)
      this.start(touch)
    }
  }

  touchmove (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      this.move(touch)
    }
  }

  touchend (e) {
    e.stopPropagation()
    for (const touch of e.changedTouches) {
      this.end(touch)
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
