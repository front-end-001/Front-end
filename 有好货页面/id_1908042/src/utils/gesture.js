import { connect } from "tls"

export const enableGesture = main => {
    const pressDuration = 500
    let contexts = Object.create(null)

    const touchStart = e => {
        for (let touch of e.changedTouches) {
            contexts[touch.identifier] = Object.create(null)
            start(touch, contexts[touch.identifier])
        }
    }

    const touchMove = e => {
        for (let touch of e.changedTouches) move(touch, contexts[touch.identifier])
    }

    const touchEnd = e => {
        for (let touch of e.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    }

    const touchCancel = e => {
        for (let touch of e.changedTouches) {
            cancel(touch, contexts[touch.identifier])
        }
    }

    const start = (point, context) => {
        context.startX = point.clientX
        context.startY = point.clientY
        context.isTap = true
        context.isPan = false
        context.isPress = false
        context.startTime = Date.now()
        context.pressHandler = setTimeout(() => {
            context.isTap = false
            context.isPress = true
            context.pressHandler = null
        }, pressDuration)
    }

    const move = (point, context, origin) => {
        if (Math.abs(point.clientX - context.startX) > 10 || Math.abs(point.clientY - context.startY) > 10) {
            context.isTap = false
            if (!context.isPan) {
                context.isPan = true
                if (context.isPress) {
                    context.isPress = false
                    let presscancel = new Event('presscancel')
                    main.dispatchEvent(presscancel)
                }

                context.isVertical = Math.abs(point.clientX - context.startTime) < Math.abs(point.clientY - context.startY) ? true : false

                let panstart = new Event('panstart')
                panstart.origin = origin
                panstart.startX = context.startX
                panstart.startY = context.startY
                panstart.isVertical = context.isVertical
                main.dispatchEvent(panstart)

                if (context.pressHandler) clearTimeout(context.pressHandler)
            }
        }

        let dx = point.clientX - context.startX
        let dy = point.clientY - context.startY

        if (dx * dx + dy * dy > 100) {
            if (!context.isPan) {
                if (context.pressHandler !== null) {
                    clearTimeout(context.pressHandler)
                    context.pressHandler = null
                }

                if (context.isPress) main.dispatchEvent(new Event('presscancel'))

                context.isTap = false
                context.isPan = true

                if (Math.abs(dx) > Math.abs(dy)) {
                    context.isHorizontal = true
                    context.isVertical = false
                } else {
                    context.isHorizontal = false
                    context.isVertical = true
                }

                let e = new Event('panstart')
                e.startX = context.startX
                e.startY = context.startY
                main.dispatchEvent(e)
            } else {
                let e = new Event('pan')
                e.dx = dx
                e.dy = dy
                e.isHorizontal = context.isHorizontal
                e.isVertical = context.isVertical
                main.dispatchEvent(e)
                if (context.isPress) {
                    let e = new Event('presspan')
                    e.dx = dx
                    e.dy = dy
                    e.isHorizontal = context.isHorizontal
                    e.isVertical = context.isVertical
                    main.dispatchEvent(e)
                }
            }
        }
    }

    const end = (point, context) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler)
            context.pressHandler = null
        }

        if (context.isTap) main.dispatchEvent(new Event('tap'))

        let dx = point.clientX - context.startX
        let dy = point.clientY - context.startY

        if (context.isPress) {
            if (context.isPan) {
                let e = new Event('presspanend')
                e.dx = dx
                e.dy = dy
                e.isHorizontal = context.isHorizontal
                e.isVertical = context.isVertical
                main.dispatchEvent(e)
            } else {
                main.dispatchEvent(new Event('press'))
            }
        }

        if (context.isPan) {
            let v = Math.abs(dx * dx + dy * dy) / (Date.now() - context.startTime)
            if (v > 0.3) {
                let e = new Event('flick')
                e.dx = dx
                e.dy = dy
                e.isHorizontal = context.isHorizontal
                e.isVertical = context.isVertical
                main.dispatchEvent(e)
                context.isFlick = true
            } else {
                context.isFlick = false
            }

            let e = new Event('panend')
            e.dx = dx
            e.dy = dy
            e.isHorizontal = context.isHorizontal
            e.isVertical = context.isVertical
            e.isFlick = context.isFlick
            main.dispatchEvent(e)
        }
    }

    const cancel = (point, context) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler)
            context.pressHandler = null
        }

        if (context.isPan) {
            let e = new Event('pancancel')
            e.isHorizontal = context.isHorizontal
            e.isVertical = context.isVertical
            main.dispatchEvent(e)
        }
    }

    main.addEventListener('touchstart', touchStart)
    main.addEventListener('touchmove', touchMove)
    main.addEventListener('touchend', touchEnd)
    main.addEventListener('touchcancel', touchCancel)

}