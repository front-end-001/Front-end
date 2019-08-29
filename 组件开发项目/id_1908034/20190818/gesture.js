function enableGesture(main) {
    let start = (point, context) => {
        //console.log("start")
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.startTime = Date.now();

        context.isTap = true; // 轻点击
        context.isPan = false; // 拖动
        context.isPress = false; // 长按
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event("pressstart");
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)
    };
    let move = (point, context) => {
        //console.log(context.startX,context.startY);
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {

            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
                context.isPress = false;
            } else if (context.isPress) {
                context.isPress = false;
                let e = new Event("presscancel");
                main.dispatchEvent(e);
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
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
        //console.log(dx , dy);
    };
    let end = (point, context) => {
        //console.log("end")
        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
        }
        if (context.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }
        if (context.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
        //console.log(v);
        // 判断是否为：迅速离开
        if (context.isPan && v > 0.3) {
            context.isFlick = true;
            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
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
            main.dispatchEvent(e);
        }
    };
    let cancel = (point, context) => {
        if (context.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event("presscancel");
            main.dispatchEvent(e);
        }
        if (context.pressHandler !== null) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
            clearTimeout(context.pressHandler);
        }
    };
    /*
    Object.create(null)
    1.你需要一个非常干净且高度可定制的对象当作数据字典的时候；
    2.想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候
     */
    let contexts = Object.create(null);

    let mouseSymbol = Symbol("mouse");

    let mousedown = event => {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    };
    let mousemove = event => {
        move(event, contexts[mouseSymbol]);
    };

    let mouseup = event => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    };
    main.addEventListener("mousedown", mousedown);


    let touchstart = event => {

        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }

    };
    let touchmove = event => {
        for (let touch of event.changedTouches)
            move(touch, contexts[touch.identifier]);
    };
    let touchend = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    };
    let touchcancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    };
    window.onload = function () {
        main.addEventListener("touchstart", touchstart);
        main.addEventListener("touchmove", touchmove);
        main.addEventListener("touchend", touchend);
        main.addEventListener("touchcancel", touchcancel);
    };

}
