export function enableGesture(main){
    let contexts = Object.create(null);

    let start = (point, context, origin) => {
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.startTime = Date.now();
        context.isTap = true;
        context.isPan = false;
        context.pressHandler = setTimeout(() => {
            let e = new Event("pressstart");
            e.origin = origin;
            main.dispatchEvent(e);
            context.isPress = true;
            context.pressHandler = null;
        }, 500);

        //console.log("start",[point.clientX, point.clientY])
    }
    let move = (point, context, origin) => {
        // console.log(origin.target, "pan move");
        if(Math.abs(point.clientX - context.startX) > 10 || 
            Math.abs(point.clientY - context.startY) > 10){
            // console.log(origin.target, "panstart")
            context.isTap = false;
            if(context.isPan == false){
                context.isPan = true;
                if(context.isPress) {
                    context.isPress = false;
                    let e = new Event("presscancel");
                    main.dispatchEvent(e);
                }
                if(Math.abs(point.clientX - context.startX) < Math.abs(point.clientY - context.startY)){
                    context.isVertical = true;
                } else {
                    context.isVertical = false;
                }
                
                let e = new Event("panstart");
                e.origin = origin;
                e.startX = context.startX;
                e.startY = context.startY;
                e.isVertical = context.isVertical;

                main.dispatchEvent(e);
                

                if(context.pressHandler)
                    clearTimeout(context.pressHandler);
            }
        }

        if(context.isPan) {
            // console.log("pan dispatch")
            let e = new Event("pan");
            e.x = point.clientX;
            e.y = point.clientY;
            e.dx = point.clientX - context.startX;
            e.dy = point.clientY - context.startY;
            e.origin = origin;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }

        //console.log("move",[point.clientX, point.clientY], context)
    }
    let end = (point, context, origin) => {
        
        if(Date.now() - context.startTime < 300 && context.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }

        if(context.isPan) {
            let isFlick = false;
            let t = (Date.now() - context.startTime);
            let v = (Math.sqrt(Math.pow(point.clientX - context.startX, 2) +
                Math.pow(point.clientY - context.startY, 2)) / t)
            if(v > 0.3) {
                isFlick = true;
                let e = new Event("flick");
                e.vx = (point.clientX - context.startX) / t;
                e.vy = (point.clientY - context.startY) / t;
                main.dispatchEvent(e);
            }
            // console.log("panend")
            let e = new Event("panend");
            e.x = point.clientX;
            e.y = point.clientY;
            e.dx = point.clientX - context.startX;
            e.dy = point.clientY - context.startY;
            e.vx = (point.clientX - context.startX) / t;
            e.vy = (point.clientY - context.startY) / t;
            e.origin = origin;
            e.isFlick = isFlick;
            e.isVertical = context.isVertical;

            main.dispatchEvent(e);
        }

        if(context.isPress){
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }
    }
    let cancel = (point, context, origin) => {
        //console.log("cancel",[point.clientX, point.clientY])
    }

    let mousedown = event => {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        contexts[""] = {}
        // console.log("mousedown")
        start(event, contexts[""], event);
    }
    let mousemove = event => {
        // console.log("mouse move")
        move(event, contexts[""], event);
    }
    let mouseup = event => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        // console.log("mouseup")
        end(event, contexts[""], event);
        delete contexts[""];
    }


    let touchstart = event => {
        // console.log("touchstart")
        for(let touch of event.changedTouches) {
            contexts[touch.identifier] = {};
            start(touch, contexts[touch.identifier], event);
        }
    }
    let touchmove = event => {
        // console.log(event.target, "touchmove")
        // console.log(event.changedTouches);
        for(let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier], event);
        }
    }
    let touchend = event => {
        // console.log("touchend")
        for(let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier], event);
            delete contexts[touch.identifier];
        }
    }
    let touchcancel = event => {
        for(let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier], event);
            delete contexts[touch.identifier];
        }
    }
    main.addEventListener("mousedown", mousedown);
    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove, {
        passive: false
    });
    // 是否添加都不影响
    // , {
    //     passive: false,
    // }
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);
}