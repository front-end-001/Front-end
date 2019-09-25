export default function enableGesture (main) {
    const contexts = Object.create(null)
    const start = (point, context) => {
        // console.log('start', point.clientX, point.clientY)
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.isTap = true
        context.isPan = false
        context.startTime = Date.now()

        // press 事件
        context.isPress = false
        context.pressHandler = setTimeout(() => {
            context.isPress = true
            context.isTap = false
            const e = new Event('pressstart')
            main.dispatchEvent(e)
            context.pressHandler = null
        }, 500)
    }
    const move = (point, context) => {
        // console.log('move', point.clientX, point.clientY)
        const dx = point.clientX - context.startX
        const dy = point.clientY - context.startY

        if (dx * dx + dy * dy > 100) {
            context.isTap = false
            context.isPan = true

            // 如果 pressHandler 正在运行中，准备发 pressstart，停止它
            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler)
                context.pressHandler = null
                context.isPress = false

            // 如果 pressstart 已经发生了，说明 pressHandler已执行，认为 presscancel
            } else if (context.isPress) {
                const e = new Event('presscancel')
                main.dispatchEvent(e)
            }
        }

        if (Math.abs(dx) > Math.abs(dy)) {
            context.isVertical = true
            context.isHorizontal = false
        } else {
            context.isVertical = false
            context.isHorizontal = true
        }

        const v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
        if (context.isPan && v > 0.3) {
            context.isFlick = true
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            const e = new Event('pan')
            e.dx = dx
            e.dy = dy
            e.isVertical = context.isVertical
            main.dispatchEvent(e)
        }
    }
    const end = (point, context) => {
        // console.log('end', point.clientX, point.clientY)
        if (context.isTap) {
            const e = new Event('tap')
            main.dispatchEvent(e)
        }
        const dx = point.clientX - context.startX;
        const dy = point.clientY - context.startY;

        if (context.isPan) {
            const e = new Event('panend')
            e.dx = dx;
            e.dy = dy;
            e.isVertical = context.isVertical
            main.dispatchEvent(e)
        }

        if (context.isFlick) {
            const e = new Event('flick')
            e.dx = dx
            e.dy = dy
            e.isVertical = context.isVertical
            main.dispatchEvent(e)
        }

        if (context.isPress) {
            const e = new Event('pressend')
            e.clientX = point.clientX
            e.clientY = point.clientY
            main.dispatchEvent(e)
        }
    }

    const cancel = (point, context) => {
        // console.log('cancel', point.clientX, point.clientY)
        if (context.isPan) {
            const e = new Event('pancancel')
            main.dispatchEvent(e)
        }
        if (context.isPress) {
            const e = new Event('presscancel')
            main.dispatchEvent(e)
        }
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler)
            context.pressHandler = null
            const e = new Event('presscancel')
            main.dispatchEvent(e)
        }
    }

    const mouseSymbol = Symbol('mouse')
    const mousedown = event => {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol])
    }
    const mousemove = event => {
        move(event, contexts[mouseSymbol])
    }
    const mouseup = event => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        end(event, contexts[mouseSymbol])
        delete contexts[mouseSymbol]
    }

    const touchstart = event => {
        // console.log(event)
        for(let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    }

    const touchmove = event => {
        for(let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    }

    const touchend = event => {
        for(let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    }
    const touchcancel = event => {
        for(let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    }

    document.addEventListener("mousedown", mousedown)
    main.addEventListener("touchstart", touchstart)
    main.addEventListener("touchmove", touchmove)
    main.addEventListener("touchend", touchend)
    main.addEventListener("touchcancel", touchcancel)
}