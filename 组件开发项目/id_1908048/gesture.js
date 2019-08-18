function enableGesture(main) {
    const pressDuration = 500;
    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");
    let mouseStart = event => {
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseEnd);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }
    let mouseMove = event => {
        move(event, contexts[mouseSymbol]);
    }
    let mouseEnd = event => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseEnd);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }
    main.addEventListener("mousedown", mouseStart);
    let touchStart = event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }
    let touchMove = event => {
        for (let touch of event.changedTouches) {

            move(touch, contexts[touch.identifier]);
        }
    }
    let touchEnd = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    let touchCancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
        }
    }
    let start = (point, context) => {
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.startTime = Date.now();
        context.pressHandler = setTimeout(()=>{
            context.isTap = false;
            context.isPress = true;
            let e = new Event("pressstart");
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, pressDuration);
    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {
            if (context.isPan == false) {
                if (context.pressHandler !== null){
                    clearTimeout(context.pressHandler);
                    context.pressHandler = null;
                }
                if (context.isPress) {
                    let e = new Event("presscancel");
                    main.dispatchEvent(e);
                }
                context.isTap = false;
                context.isPan = true;
                if (Math.abs(dx)>Math.abs(dy)){
                    context.isHorizontal = true;
                    context.isVertical = false;
                }
                else{
                    context.isHorizontal = false;
                    context.isVertical = true;
                }
                let e = new Event("panstart");
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e);
            }
            else {
                let e = new Event("pan");
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                main.dispatchEvent(e);
                if (context.isPress) {
                    let e = new Event("presspan");
                    e.dx = dx;
                    e.dy = dy;
                    e.isHorizontal = context.isHorizontal;
                    e.isVertical = context.isVertical;
                    main.dispatchEvent(e);
                }
            }
        }
        
    }
    let end = (point, context) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
            context.pressHandler = null;
        }
        if (context.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (context.isPress) {
            if (context.isPan) {
                let e = new Event("presspanend")
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                main.dispatchEvent(e);
            }
            else {
                let e = new Event("press");
                main.dispatchEvent(e);
            }
        }
        if (context.isPan) {
            let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
            if (v > 0.3){
                let e = new Event("flick");
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                context.isFlick = true;
                main.dispatchEvent(e);
            }
            else {
                context.isFlick = false;
            }
            let e = new Event("panend");
            e.dx = dx;
            e.dy = dy;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            e.isFlick = context.isFlick;
            main.dispatchEvent(e);
        }
    }
    let cancel = (point, context) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
            context.pressHandler = null;
        }
        if (context.isPan) {
            let e = new Event("pancancel");
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("pressdisrupt");
            main.dispatchEvent(e);
        }
    }
    main.addEventListener("touchstart", touchStart);
    main.addEventListener("touchmove", touchMove);
    main.addEventListener("touchend", touchEnd);
    main.addEventListener("touchcancel", touchCancel);
}