export default function enableGesture(main) {
  let start = (point, context) => {
    context.startTime = Date.now()
    context.startX = point.clientX
    context.startY = point.clientY

    context.isTap = true
    context.isPan = false
  }
  let move = (point, context) => {
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY
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
        let e = new Event("panstart")
        e.startX = context.startX
        e.startY = context.startY
        main.dispatchEvent(e)
        context.isPan = true
      }
    }
    if (context.isPan) {
      let e = new Event("pan")
      e.dx = dx
      e.dy = dy
      main.dispatchEvent(e)
    }
  }
  let end = (point, context) => {
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY
    if (context.isTap) {
      let e = new Event("tap")
      main.dispatchEvent(e)
    }
    let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
    console.log(v)
    if (context.isPan && v > 0.3) {
      console.log("flick")
      context.isFlick = true
      let e = new Event("flick")
      e.dx = dx
      e.dy = dy
      main.dispatchEvent(e)
    } else {
      context.isFlick = false
    }
    if (context.isPan) {

      let e = new Event("panend")
      e.dx = dx
      e.dy = dy
      e.isFlick = context.isFlick
      main.dispatchEvent(e)
    }
  }
  let cancel = (point, context) => {
    if (context.isPan) {
      let e = new Event("pancancel")
      main.dispatchEvent(e)
    }
  }
  let contexts = Object.create(null)
  let mouseSymbol = Symbol('mouse')
  let mousedown = e => {
    e.stopPropagation()
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
    contexts[mouseSymbol] = Object.create(null)
    start(e, contexts[mouseSymbol])
  }
  let mousemove = e => {
    e.stopPropagation();
    move(e, contexts[mouseSymbol])
  }
  let mouseup = e => {
    e.stopPropagation();
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
    end(e, contexts[mouseSymbol])
    delete contexts[mouseSymbol]
  }


  let touchstart = e => {
    for (const touch of e.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  }
  let touchmove = e => {
    for (const touch of e.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  }
  let touchend = e => {
    for (const touch of e.changedTouches) {
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  }
  let touchcancel = e => {
    for (const touch of e.changedTouches) {
      cancel(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  }
  main.addEventListener('mousedown', mousedown)
  main.addEventListener('touchstart', touchstart)
  main.addEventListener('touchmove', touchmove)
  main.addEventListener('touchend', touchend)
  main.addEventListener('touchcancel', touchcancel)
}