export default function enableGesture(main) {
    // start move end为鼠标和touch事件的公共方法抽象
    let start = (point, context) => {
        console.log('start', point.clientX, point.clientY)
        // 记录开始的位置
        context.startX = point.clientX;
        context.startY = point.clientY

        // 记录触发的起始时间
        context.startTime = Date.now()

        // 默认行为是点击行为
        context.isTap = true
        context.isPan = false
        context.isPress = false
        context.pressHandler = setTimeout(() => {
            context.isPress = true
            context.isTap = false
            let e = new Event('press')
            main.dispatchEvent(e)
            context.pressHandler = null
        }, 500)
    }

    let move = (point, context) => {
        console.log('move', point.clientX, point.clientY)
        console.log(context.startX, context.startX)
        // 计算偏移量
        let displacementX = point.clientX - context.startX
        let displacementY = point.clientY - context.startY
        if (displacementX * displacementX + displacementY * displacementY > 100) {

            // 有动作就取消长按判断
            if (context.pressHandler !== null) {
                
                clearTimeout(context.pressHandler)
                context.pressHandler = null
                context.isPress = false
            } else if (context.isPress) {
                context.isPress = false
                let e = new Event('presscancel')
                main.dispatchEvent(e)
            }
            // 偏移量大于10个像素则判定为移动，而不是点击
            context.isTap = false
            if (context.isPan == false) {
                if (Math.abs(displacementX) > Math.abs(displacementY)) {
                    context.isVertical = false
                    context.isHorizontal = true
                } else {
                    context.isVertical = true
                    context.isHorizontal = false
                }
                let e = new Event('panstart')
                e.startX = context.startX
                e.startY = context.startY
                main.dispatchEvent(e)
                context.isPan = true
            }

        }
        if (context.isPan) {
            let e = new Event("pan")
            e.dx = displacementX
            e.dy = displacementY
            e.isisHorizontal = context.isHorizontal
            e.isVertical = context.isVertical
            main.dispatchEvent(e)
        }
        console.log('偏移量', displacementX, displacementY)
    }

    let end = (point, context) => {
        console.log('end', point.clientX, point.clientY)
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler)
        }
        if (context.isPress) {
            let e = new Event('pressend')
            main.dispatchEvent(e)
        }
        if (context.isTap) {
            console.log('这是点击')
            let e = new Event("tap")
            main.dispatchEvent(e)
        }
        let displacementX = point.clientX - context.startX
        let displacementY = point.clientY - context.startY
        let v = Math.sqrt(displacementX * displacementX + displacementY * displacementY) / (Date.now() - context.startTime)
        if (context.isPan && v > 0.3) {
            console.log('这是快速滑动')
            context.isFlick = true
            let e = new Event("flick")
            e.dx = displacementX
            e.dy = displacementY
            main.dispatchEvent(e)
        } else {
            context.isFlick = false
        }
        if (context.isPan) {
            console.log('这是拖动')
            let e = new Event("panend")
            e.dx = displacementX
            e.dy = displacementY
            e.isFlick = context.isFlick
            e.isisHorizontal = context.isHorizontal
            e.isVertical = context.isVertical
            main.dispatchEvent(e)
        }
    }

    let cancel = (point, context) => {
        console.log('cancel', point.clientX, point.clientY)
        if (context.isPan) {
            console.log('这是取消')
            let e = new Event("pancancel")
            main.dispatchEvent(e)
        }
        if (context.isPress) {
            let e = new Event('presscancel')
            main.dispatchEvent(e)
        }
        if (context.pressHandler !== null) {
            let e = new Event('presscancel')
            main.dispatchEvent(e)
            clearTimeout(context.pressHandler)
        }
    }

    let contexts = Object.create(null) // 一个索引结构?
    let mouseSymbol = Symbol('mouse') // 调整鼠标和手势之间的却别

    // 鼠标事件
    let mousedown = event => {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        contexts[mouseSymbol] = Object.create(null)
        start(event, contexts[mouseSymbol])
    }

    let mousemove = event => {
        move(event, contexts[mouseSymbol])
    }

    let mouseup = event => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        end(event, contexts[mouseSymbol])
        delete contexts[mouseSymbol]

    }
    main.addEventListener('mousedown', mousedown)

    // 手指触屏事件
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

    // cancel,切窗口可触发
    let touchcancel = event => {
        for (let touch of event.changedTouches) {
            console.log('touchcancel', touch.clientX, touch.clientY)
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    }

    main.addEventListener("touchstart", touchstart)
    main.addEventListener("touchmove", touchmove)
    main.addEventListener("touchend", touchend)
    main.addEventListener("touchcancel", touchcancel)
}
