function enableGesture(main){
    let start = (point, context) => {
        //console.log("start")
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.isTap = true;
        context.isPan = false;
    }
    let move = (point, context) => {
        //console.log(context.startX,context.startY);
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if(dx * dx + dy * dy > 100) {
            context.isTap = false;

            if(context.isPan == false) {
                let e = new Event("panstart");
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e);
                context.isPan = true;
            }
        }
        if(context.isPan) {
            let e = new Event("pan");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }
        //console.log(dx , dy);
    }
    let end = (point, context) => {
        //console.log("end")
        if(context.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }
        if(context.isPan) {
            let e = new Event("panend");
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }
    }
    let cancel = (point, context) => {
        if(context.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }
    }
    let contexts = Object.create(null);

    let mouseSymbol = Symbol("mouse");

    let mousedown = event => {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup",mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }
    let mousemove = event => {
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = event => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup",mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }
    main.addEventListener("mousedown", mousedown);


    let touchstart = event => {

        for(let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }

    }
    let touchmove = event => {
        for(let touch of event.changedTouches)
            move(touch, contexts[touch.identifier]);
    }
    let touchend = event => {
        for(let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    let touchcancel = event => {
        for(let touch of event.changedTouches){
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove);
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);
}
