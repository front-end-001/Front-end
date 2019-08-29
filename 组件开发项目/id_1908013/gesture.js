function enableGesture(main) {
    let start = (point, context) => {
        context.startX = point.clientX
        context.startY = point.clientY

        context.isTap = true
        context.isPan = false
        context.startTime = Date.now()
        context.isPress = false
        context.pressHandler = setTimeout(() => {
            context.isPress = true
            context.isTap = false
            let e = new Event('press')
            main.dispatchEvent(e)
        }, 500)
    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY

        if (dx * dx + dy * dy > 100) {
            if (context.pressHandler) {
                clearTimeout(context.pressHandler)
                context.pressHandler = null
                context.isPress = false
            }
            context.isTap = false

            if (context.isPan === false) {
                let e = new Event('panstart')
                e.startX = context.startX
                e.startY = context.startY
                main.dispatchEvent(e)
                context.isPan = true
            }
        }
        if (context.isPan) {
            let e = new Event('pan')
            e.dx = dx
            e.dy = dy
            main.dispatchEvent(e)
        }
    }
    let end = (point, context) => {
        if (context.isPan) {
            let e = new Event('presscancel')

        }
        if (context.isPress) {

        }
        if (context.isTap) {
            let e = new Event('tap')
            main.dispatchEvent(e)
        }
        let dx = point.clientX - context.startX, dy = point.client - context.startY
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)

        if (context.isPan && v > 0.3) {
            context.isFlick = true
            let e = new Event('flick')

            main.dispatchEvent(e)
        } else {
            context.isFlick = false
        }
        if (context.isPan) {
            let e = new Event('panend')
            e.dx = dx
            e.dy = dy
            e.isVertical = context.isVertical
            e.isHorizontal = context.isHorizontal
            e.isFlick = context.isFlick
            main.dispatchEvent(e)
        }
    }

    let contexts = Object.create(null)
    let mouseSymbol = Symbol('mouse')

    let mousedown = (event) => {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        contexts[mouseSymbol] = Object.create(null)
        start(event, contexts[mouseSymbol])
    }
    let mousemove = (event) => {
        move(event, contexts[mouseSymbol])

    }
    let mouseup = (event) => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)

        end(event, contexts[mouseSymbol])
        delete contexts[mouseSymbol]
    }

    let touchstart = event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null)
            start(touch, contexts[touch.identifier])
        }
    }
    let touchmove = event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    }
    let touchend = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    }

    main.addEventListener('mousedown', mousedown)
    main.addEventListener('touchstart', touchstart)
    main.addEventListener('touchmove', touchmove)
    main.addEventListener('touchend', touchend)
}
