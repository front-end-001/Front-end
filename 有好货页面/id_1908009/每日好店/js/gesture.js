export default function enable(circle) {
    let start = (point, context) => {
        context.startX = point.clientX
        context.startY = point.clientY
        context.isTap = true
        context.isPan = false
        context.startTime = Date.now()

        context.isPress = false

        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event("pressstart");
            circle.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)

    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX
        let dy = point.clientY - context.startY
        if (dx * dx + dy * dy > 100) {
            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
                context.isPress = false;
            } else if (context.isPress) {
                context.isPress = false;
                let e = new Event("presscancel");
                circle.dispatchEvent(e);
            }

            context.isTap = false

            if (context.isPan == false) {
                //.log(point.clientX, dy)
                if (Math.abs(dx) > Math.abs(dy)) {
                    context.isVertical = false
                    context.isHorizontal = true
                } else {
                    context.isVertical = true
                    context.isHorizontal = false
                }
                let e = new Event('panstart')
                e.startX = point.clientX
                e.startY = point.clientY
                circle.dispatchEvent(e)
                context.isPan = true
            }
        }
        if (context.isPan) {
            let e = new Event('pan')
            e.dx = dx
            e.dy = dy
            e.isVertical = context.isVertical
            e.isHorizontal = context.isHorizontal
            circle.dispatchEvent(e)
        }

        context.dx = dx
        context.dy = dy
    }
    let end = (point, context) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
        }
        if (context.isPress) {
            let e = new Event("pressend");
            circle.dispatchEvent(e);
        }
        if (context.isTap) {
            // console.log('tap')
            let e = new Event('tap')
            circle.dispatchEvent(e)
        }
        let dx = point.clientX - context.startX
        let dy = point.clientY - context.startY
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
        if (context.isPan && v > 0.3) {
            context.isFlick = true
            let e = new Event('Flick')
            e.dx = dx
            e.dy = dy
            circle.dispatchEvent(e)
        } else {
            context.isFlick = false
        }
        if (context.isPan) {
            // console.log('pan')
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY
            let e = new Event('panend')
            e.dx = dx
            e.dy = dy
            e.isFlick = context.isFlick
            e.isVertical = context.isVertical
            e.isHorizontal = context.isHorizontal
            circle.dispatchEvent(e)
        }

    }
    let cancle = (point, context) => {
        if (context.isPan) {
            let e = new Event("pancancel");
            circle.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("presscancel");
            circle.dispatchEvent(e);
        }
        if (context.pressHandler !== null) {
            let e = new Event("pancancel");
            circle.dispatchEvent(e);
            clearTimeout(context.pressHandler);
        }
    }

    let contexts = Object.create(null)
    let mouseSymbol = Symbol('mouse')
    let mousedown = event => {
        event.preventDefault();
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        contexts[mouseSymbol] = Object.create(null)
        start(event, contexts[mouseSymbol])
    }
    let mousemove = event => {
        event.preventDefault();
        move(event, contexts[mouseSymbol])
    }
    let mouseup = event => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        end(event, contexts[mouseSymbol])
        delete contexts[mouseSymbol]
    }


    let touchstart = event => {
        for (let touche of event.changedTouches) {
            contexts[touche.identifier] = Object.create(null)
            start(touche, contexts[touche.identifier])
        }

    }
    let touchmove = event => {
        for (let touche of event.changedTouches) {
            move(touche, contexts[touche.identifier])
        }
    }
    let touchend = event => {
        for (let touche of event.changedTouches) {
            end(touche, contexts[touche.identifier])
            delete contexts[touche.identifier]
        }

    }
    let touchcancel = event => {
        for (let touche of event.changedTouches) {
            cancel(touche, contexts[touche.identifier])
            delete contexts[touche.identifier]
        }
    }

    circle.addEventListener('mousedown', mousedown)
    circle.addEventListener('touchstart', touchstart)
    circle.addEventListener('touchmove', touchmove, { passive: false })
    circle.addEventListener('touchend', touchend)
    circle.addEventListener('touchcancel', touchcancel)
}