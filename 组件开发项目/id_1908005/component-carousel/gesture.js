export function enableGesture(box) {
    let context = Object.create(null);

    let start = (p, context) => {
        context.startX = p.clientX;
        context.startY = p.clientY;
        context["clientX"] = p.clientX
        context["clientY"] = p.clientY
        context["isTap"] = false;
        context["isPan"] = false;
        context['startTime'] = Date.now();
        context.isPress = false;
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event("pressstart");
            box.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)
        
    }
    let move = (p, context) => {
        let dx = p.clientX - context["clientX"],
            dy = p.clientY - context["clientY"];
        if (dx * dx + dy * dy > 100) {
            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
                context.isPress = false;
            } else if (context.isPress) {
                context.isPress = false;
                let e = new Event("presscancel");
                box.dispatchEvent(e);
            }
            context.isTap = false;
            if (context.isPan === false) {

                if (Math.abs(dx) > Math.abs(dy)) {
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }
                let e = new Event("panstart");
                e.clientX = context["clientX"]
                e.clientY = context["clientY"]
                box.dispatchEvent(e);
                context.isPan = true
            }
        }
        if (context.isPan) {
            let e = new Event("pan");
            e.dx = dx;
            e.dy = dy;

            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            box.dispatchEvent(e);
        }
    }
    let end = (p, context) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
        }
        if (context.isPress) {
            let e = new Event("pressend");
            box.dispatchEvent(e);
        }
        if (context.isTap) {
            let e = new Event("tap");
            box.dispatchEvent(e);
        }
        
        let dx = p.clientX - context.startX, dy = p.clientY - context.startY;
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context["startTime"])
        console.log("v ====>",v)
        if (context.isPan && v > 0.3) {
            context["isFlick"] = true;
            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            box.dispatchEvent(e);
        } else {
            context["isFlick"] = false;
        }
        if (context.isPan) {
            let e = new Event("panend");
            e.dx = dx;
            e.dy = dy;
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            box.dispatchEvent(e);
        }
    }
    let cancel = (p, context) => {
        if (context.isPan) {
            let e = new Event("pancancel");
            box.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("presscancel");
            box.dispatchEvent(e);
        }
        if (context.pressHandler !== null) {
            let e = new Event("pancancel");
            box.dispatchEvent(e);
            clearTimeout(context.pressHandler);
        }
    }
    let touchStart = e => {
        console.log(e)
        for (let touch of e.changedTouches) {
            context[touch.identifier] = Object.create(null)
            start(touch, context[touch.identifier])
        }
    }
    let touchMove = e => {
        for (let touch of e.changedTouches) {
            move(touch, context[touch.identifier]);
        }
    }
    let touchEnd = e => {
        for (let touch of e.changedTouches) {
            end(touch, context[touch.identifier]);
            delete context[touch.identifier];
        }
    }
    let touchCancel = e => {
        for (let touch of e.changedTouches) {
            end(touch.clientX)
            delete context[touch.identifier];
        }
    }
    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");
    let mouseStart = e => {
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup",mouseUp);
        contexts[mouseSymbol] = Object.create(null);
        start(e,contexts[mouseSymbol])
    }
    let mouseMove = e => {
        move(e, contexts[mouseSymbol])
    }
    let mouseUp = e => {
        end(e,contexts[mouseSymbol])
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }

    box.addEventListener("mousedown",mouseStart)

    box.addEventListener("touchstart", touchStart)
    box.addEventListener("touchmove", touchMove)
    box.addEventListener("touchend", touchEnd)
    box.addEventListener("touchcancel", touchCancel)
}