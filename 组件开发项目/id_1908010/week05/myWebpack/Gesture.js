/*
 * @Description: In User Settings Edit
 * @Author: 玉皇大亮
 * @Date: 2019-08-21 20:52:40
 * @lastTime: 2019-09-07 15:21:38
 */
export function enableGesture(main) {

    let start = (point, ctx) => {
        ctx.startX = point.clientX;
        ctx.startY = point.clientY;

        ctx.startTime = Date.now();
        // default setting
        ctx.isTap = true;
        ctx.isPan = false;

        ctx.isPress = false;
        ctx.pressHandler = setTimeout(() => {
            ctx.isPress = true;
            ctx.isTap = false;
            let e = new Event("pressstart");
            main.dispatchEvent(e);
            ctx.pressHandler = null;
        }, 500);
    }

    let move = (point, ctx) => {
        let dx = point.clientX - ctx.startX;
        let dy = point.clientY - ctx.startY;

        if (dx * dx + dy * dy > 100) {
            ctx.isTap = false;

            if (ctx.pressHandler !== null) {
                ctx.isPress = false;
                clearTimeout(ctx.pressHandler);
                ctx.pressHandler = null;
            } else if (ctx.isPress){
                ctx.isPress = false;
                let e = new Event("presscancel");
                main.dispatchEvent(e);
            }

            if (ctx.isPan == false) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    ctx.isHorizontal = true;
                    ctx.isVertical = false;
                } else {
                    ctx.isHorizontal = false;
                    ctx.isVertical = true;
                }

                let e = new Event("panstart");
                e.startX = ctx.startX;
                e.startY = ctx.startY;
                main.dispatchEvent(e);
                ctx.isPan = true;
            } 
        } 
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - ctx.startTime);
        if (ctx.isPan && v > 0.3) {
            ctx.isFlick = true;
            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        } else {
            ctx.isFlick = false;
        }

        // 适配逻辑 
        if (ctx.isPan) {
            let e = new Event("panmove");
            e.dx = dx;
            e.dy = dy;
            e.isFlick = ctx.isFlick;
            e.isHorizontal = ctx.isHorizontal;
            e.isVertical = ctx.isVertical;
            main.dispatchEvent(e);
        }
    }

    let end = (point, ctx) => {

        if (ctx.pressHandler !== null) {
            clearTimeout(ctx.pressHandler);
        }

        if (ctx.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }

        if (ctx.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }
        let dx = point.clientX - ctx.startX;
        let dy = point.clientY - ctx.startY;
        if (ctx.isPan) {
            let e = new Event("panend");
            e.dx = dx;
            e.dy = dy;
            e.isHorizontal = ctx.isHorizontal;
            e.isVertical = ctx.isVertical;
            main.dispatchEvent(e);
        }
    }

    let cancel = (point, ctx) => {
        if (ctx.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }

        if (ctx.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }

        if (ctx.pressHandler !== null) {
            let e = new Event("presscancel");
            main.dispatchEvent(e);
            clearTimeout(ctx.pressHandler);
        }
    }

    let contexts = Object.create(null);
    
    let mouseSymbol = Symbol("mouse");
    // mouse gesture
    let mousestart = (event) => {
        event.preventDefault();
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }

    let mousemove = (event) => {
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = (event) => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }
    main.addEventListener('mousedown', mousestart);

    // touch gesture
    let touchstart = (event) => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }

    let touchmove = (event) => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    }

    let touchend = (event) => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    let touchcancel = (event) => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchstart", (event) => { event.preventDefault(), {passive: false}} );
    main.addEventListener("touchmove", touchmove);
    main.addEventListener('touchend', touchend);
    main.addEventListener('touchcancel', touchcancel);
}