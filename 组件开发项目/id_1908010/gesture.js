/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 16:38:23
 * @lastTime: 2019-09-07 17:01:20
 * @LastAuthor: Do not edit
 */
function enableGesture(main) {

    let start = (point, context) => {
        //    console.log("start ", point.clientX, point.clientY);
        if (context.isVertical) {
            return;
        }
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.startTime = Date.now();

        context.isTap = true;
        context.isPan = false;
    };

    let move = (point, context) => {
        //    console.log("move ", point.clientX, point.clientY);
        if (context.isVertical) {
            return;
        }
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {
            context.isTap = false;
            context.isPan = true;

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
                main.dispatchEvent(e);
                context.isPan = true;
            }
        }

        if (context.isPan) {
            let e = new Event("pan");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }

    };

    let end = (point, context) => {
        //   console.log("end ",  point.clientX, point.clientY);
        if (context.isTap) {
            console.log("Tap");
            let e = new Event("tap");
            main.dispatchEvent(e);
        }

        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        let dTime = Date.now() - context.startTime;
        let v = Math.sqrt(dx * dx + dy * dy) / dTime;

        if (context.isPan && v > 0.3) {
            let e = new Event("flick");
            context.isFlick = true;
            main.dispatchEvent(e);
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            console.log("Pan");
            let e = new Event("panend");
            e.dx = point.clientX - context.startX;
            e.dy = point.clientY - context.startY;
            e.isFlick = context.isFlick;
            main.dispatchEvent(e);
        }
    };

    let cancel = (point, context) => {
        if (context.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }
    }

    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");

    let mousedown = (event) => {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }

    let mousemove = (event) => {
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = (event) => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }


    main.addEventListener("mousedown", mousedown);

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
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove);
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);
// 双击放大问题
    document.addEventListener("touchstart", event => event.preventDefault(), {passive:false}); 

}