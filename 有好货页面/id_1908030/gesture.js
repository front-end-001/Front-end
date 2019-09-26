export function enableGesture(container) {
    let start = (point, context) => {
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.isTab = true;
        context.isPan = false;
        context.isPress = false;
        context.startTime = Date.now();
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTab = false;
            let e = new Event("pressstart");
            container.dispatchEvent(e);
            context.pressHandler = null;
            console.log("pressstart");
        }, 500);
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        if ((dx * dx + dy * dy) > 100) {
            if (context.pressHandler) {
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
                context.isPress = false;
            }
            else if (context.isPress) {
                context.isPress = false;
                let e = new Event("presscancel");
                container.dispatchEvent(e);
                console.log("presscancel");
            }

            context.isTab = false;
            if (!context.isPan) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }
                let e = new Event("panstart");
                e.startX = context.startX;
                e.startY = context.startY;
                container.dispatchEvent(e);
                console.log("panstart");
                context.isPan = true;
            }
            if (context.isPan) {
                let e = new Event("pan");
                e.dx = dx;
                e.dy = dy;
                e.isVertical = context.isVertical;
                e.isHorizontal = context.isVertical;
                container.dispatchEvent(e);
                console.log("pan");
            }
        }
    }

    let end = (point, context) => {
        if (context.pressHandler) {
            clearTimeout(context.pressHandler);
            context.pressHandler = null;
        }
        if (context.isTab) {
            let e = new Event("tab");
            container.dispatchEvent(e);
            console.log("tab");
        }

        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);

        if (context.isPan && v > 0.3) {
            context.isFlick = true;
            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            container.dispatchEvent(e);
            console.log("flick");
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            let e = new Event("panend");
            e.dx = dx;
            e.dy = dy;
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            container.dispatchEvent(e);
            console.log("panend");
        }

        if (context.isPress) {
            let e = new Event("pressend");
            container.dispatchEvent(e);
            console.log("pressend");
        }
    }

    let cancel = (point, context) => {
        console.log("cancel", point.clientX, point.clientY);
        if (context.isPan) {
            let e = new Event("pancancel");
            container.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("presscancel");
            container.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("presscancel");
            container.dispatchEvent(e);
        }
    }

    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");

    let mousestart = event => {
        event.preventDefault();
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseend);
    };

    let mousemove = event => {
        event.preventDefault();
        move(event, contexts[mouseSymbol]);
    }

    let mouseend = event => {
        event.preventDefault();
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseend);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }
    container.addEventListener("mousedown", mousestart);

    let touchstart = event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identified] = Object.create(null);
            start(touch, contexts[touch.identified]);
        }
    }

    let touchmove = event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identified]);
        }
    }

    let touchend = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identified]);
            delete contexts[touch.identified];
        }
    }

    let touchcancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identified]);
            delete contexts[touch.identified];
        }
    }

    container.addEventListener("touchstart", touchstart);
    container.addEventListener("touchmove", touchmove);
    container.addEventListener("touchend", touchend);
    container.addEventListener("touchcancel", touchcancel);
}