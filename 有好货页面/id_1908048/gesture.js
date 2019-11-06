export function enableGesture(main) {
    const pressDuration = 500;
    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");
    let mouseStart = event => {
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseEnd);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol],event);
    }
    let mouseMove = event => {
        move(event, contexts[mouseSymbol],event);
    }
    let mouseEnd = event => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseEnd);
        end(event, contexts[mouseSymbol],event);
        delete contexts[mouseSymbol];
    }

    let touchStart = event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier],event);
        }
    }
    let touchMove = event => {
        for (let touch of event.changedTouches) {

            move(touch, contexts[touch.identifier],event);
        }
    }
    let touchEnd = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier],event);
            delete contexts[touch.identifier];
        }
    }
    let touchCancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier],event);
        }
    }
    
    let start = (point, context,origin) => {
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
            //用于使用event.origin.preventDefault，去除事件原始动作
            e.origin = origin;
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, pressDuration);
    }
    let move = (point, context,origin) => {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {
            if (context.isPan == false) {
                if (context.pressHandler !== null){
                    clearTimeout(context.pressHandler);
                    context.pressHandler = null;
                }
                if (context.isPress) {
//                    context.isPress = false; 有presspan事件
                    let e = new Event("presscancel");
                    //用于使用event.origin.preventDefault，去除事件原始动作
                    e.origin = origin;
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
                //用于使用event.origin.preventDefault，去除事件原始动作
                e.origin = origin;
                e.startX = context.startX;
                e.startY = context.startY;
                e.isVertical = context.isVertical;
                e.isHorizontal = context.isHorizontal;
                main.dispatchEvent(e);
            }
            else {
                let e = new Event("pan");
                //用于使用event.origin.preventDefault，去除事件原始动作
                e.origin = origin;
                e.x = point.clientX;
                e.y = point.clientY;
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                main.dispatchEvent(e);
                if (context.isPress) {
                    let e = new Event("presspan");
                    //用于使用event.origin.preventDefault，去除事件原始动作
                    e.origin = origin;
                    e.x = point.clientX;
                    e.y = point.clientY;
                    e.dx = dx;
                    e.dy = dy;
                    e.isHorizontal = context.isHorizontal;
                    e.isVertical = context.isVertical;
                    main.dispatchEvent(e);
                }
            }
        }
        
    }
    let end = (point, context,origin) => {
        if (context.pressHandler !== null) { 
            clearTimeout(context.pressHandler);
            context.pressHandler = null;
        }
        if (context.isTap) {
            let e = new Event("tap");
            //用于使用event.origin.preventDefault，去除事件原始动作
            e.origin = origin;
            main.dispatchEvent(e);
        }
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (context.isPress) {
            if (context.isPan) {
                let e = new Event("presspanend")
                //用于使用event.origin.preventDefault，去除事件原始动作
                e.origin = origin;
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                main.dispatchEvent(e);
            }
            else {
                let e = new Event("press");
                //用于使用event.origin.preventDefault，去除事件原始动作
                e.origin = origin;
                main.dispatchEvent(e);
            }
        }
        if (context.isPan) {
            let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
            if (v > 0.3){
                let e = new Event("flick");
                //用于使用event.origin.preventDefault，去除事件原始动作
                e.origin = origin;
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
            //用于使用event.origin.preventDefault，去除事件原始动作
            e.origin = origin;
            e.dx = dx;
            e.dy = dy;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            e.isFlick = context.isFlick;
            main.dispatchEvent(e);
        }
    }
    let cancel = (point, context,origin) => {
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
            context.pressHandler = null;
        }
        if (context.isPan) {
            let e = new Event("pancancel");
            //用于使用event.origin.preventDefault，去除事件原始动作
            e.origin = origin;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("pressdisrupt");
            //用于使用event.origin.preventDefault，去除事件原始动作
            e.origin = origin;
            main.dispatchEvent(e);
        }
    }
    main.addEventListener("mousedown", mouseStart);
    main.addEventListener("touchstart", touchStart);
    main.addEventListener("touchmove", touchMove);
    main.addEventListener("touchend", touchEnd);
    main.addEventListener("touchcancel", touchCancel);
}