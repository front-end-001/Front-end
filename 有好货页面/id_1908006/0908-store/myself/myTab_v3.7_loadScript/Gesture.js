export function enableGesture(main) {

    /*
    let [x, y] = [0, 0];

    main.addEventListener("pan", event => {
        console.log(event.dx, event.dy);
        main.style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`;
    });


    main.addEventListener("panend", event => {
        x = x + event.dx; // 结束后，固定到拖拽后的结束位置
        y = y + event.dy;
    });

    main.addEventListener("pancancel", event => {
        console.log("cancel");
        main.style.transform = `translate(${x}px, ${y}px)`;
    })

*/

    let contexts = Object.create(null);


    let start = (point, context) => {
        //console.log("start", point.clientX, point.clientY);

        context.startX = point.clientX;
        context.startY = point.clientY;

        context.isTap = true;
        context.isPan = false;

        // for flick

        context.startTime = Date.now();

        context.isVertical = false;
        context.isHorizontal = false;
        context.isPress = false;

        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false; // 主要就是为了区分press和tap, tap不能触发
            let e = new Event("pressstart");
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)

    }

    let move = (point, context) => {
        //console.log("move", point.clientX, point.clientY);

        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        if (dx * dx + dy * dy > 10 * 10) {

            // move 了就不是press了
            
            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler); // 清除定时器，一次性的事情
                context.pressHandler = null;
                context.isPress = false;
            }else if(context.isPress) {
                context.isPress = false;
                let e = new Event("presscancel");
                main.dispatchEvent(e);
            }



            context.isTap = false;

            if (context.isPan == false) {
                if (Math.abs(dx) > Math.abs(dy)) { // 说明水平移动的分量 大于 垂直移动的分量
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }

                context.isPan = true;
                let e = new Event("panstart"); // 事件定义
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e); // 事件分发，在外部listener后，进行处理, 这样可以使得库和业务分离。 业务上监听这个事件即可
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
    }

    let end = (point, context) => {
        //console.log("end ", point.clientX, point.clientY);

        if (context.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }

        if (context.isTap) {
            let e = new Event("tap");
            main.dispatchEvent(e);
        }


        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY;
        // 在PAN 结束的时候，判断一下移动的速率，如果够快，比如0.3 ，则认为要flick
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);

        if (context.isPan && v > 0.3) { // 这个0.3 是个经验值，且最好根据不同的屏幕要有修改
            console.log("isFlick");
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
            // 结束后，把当前的座标，作为事件的dx和dy
            e.dx = dx;
            e.dy = dy;
            e.isFlick = context.isFlick;
            e.isVertical = context.isVertical;
            e.isHorizontal = context.isHorizontal;
            main.dispatchEvent(e);
        }
    }


    let cancel = (point, context) => {

        if (context.isPress) {
            let e = new Event("presscancel");
            main.dispatchEvent(e);
        }

        if (context.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }
    }

    // mouse


    let mouseSymbol = Symbol("mouse");

    let mousedown = event => {
        main.addEventListener("mousemove", mousemove);
        main.addEventListener("mouseup", mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);

    }


    let mousemove = event => {
        move(event, contexts[mouseSymbol]);
    }


    let mouseup = event => {
        main.removeEventListener("mousemove", mousemove);
        main.removeEventListener("mouseup", mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }

    main.addEventListener("mousedown", mousedown);


    // touch




    let touchstart = event => {
        for (let touch of event.changedTouches) {
            contexts[event.identifier] = Object.create(null);
            start(touch, contexts[event.identifier]);
        }
    }


    let touchmove = event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[event.identifier]);
        }
    }

    let touchend = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[event.identifier]);
            delete contexts[event.identifier];
        }
    }

    let touchcancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[event.identifier]);
        }
    }

    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove);
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);

}
