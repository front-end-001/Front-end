//封装
function enablegesture(main) {
    // let startX,startY;

    // 将点击，移动，结束，无效等事件抽象，可同时供鼠标，触摸板事件调用
    // 触摸屏移动时，还要考虑屏幕特点，有些手机，或大屏幕，移动间距大
    //调用时输入事件监控信息，信息存储容器

    // context.starttime
    // 时间计算
    // context.isTap = true;
    // 点击
    // //拖动
    // context.isPan = false;
    // //按压
    // context.isPress = false;
    // 快速挪动，只在结束时判断
    // context.isFlick = true;

    let start = (point, context) => {
        // console.log("start", point.clientX, point.clientY);
        //注意大小寫
        // startX=point.clientX;
        // startY=point.clientY;
        // context.clientX = point.clientX;
        // context.clientY = point.clientY;
        // //鼠標，與觸摸的判斷
        // context.isTap = true;
        // context.isPan = false;
        context.startX = point.clientX;
        context.startY = point.clientY;

        //context.isTap = true;
        //context.isPan = false;
        //用来存储和判断移动的快慢，移动快时，不再考虑距离
        context.starttime = Date.now();
        //点击
        context.isTap = true;
        //拖动
        context.isPan = false;
        //按压
        context.isPress = false;

        context.pressHandler = setTimeout(() => {
            //通过时间判断，将点击变为按压
            context.isPress = true;
            context.isTap = false;
            let e = new Event("pressstart");
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)

    }
    let move = (point, context) => {
        // console.log("move", point.clientX, point.clientY);
        //判斷移動的量，移動大了
        // let dx = point.clientX - context.startX, dy = point.clientX - context.startY
        //移动后的点位置，减去初始存储点位置，判断位移。
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        //判斷是點擊，還是觸摸
        if (dx * dx + dy * dy > 100) {

            // //水平，竖直问题
            // if(Math.abs(dx)>Math.abs(dy)){
            // // context.is

            // }
            // if(Math.abs(dx)<Math.abs(dy)){


            // }
            //按压状态处理
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
            // context.isPan = true;
            if (context.isPan == false) {
                //判断先横移还是先竖移。另一个方向失效
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
            // console.log("P", dx, dy);
            let e = new Event("pan")
            e.dx = dx
            e.dy = dy
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e)


        }

    }
    let end = (point, context) => {
        // console.log("end", point.clientX, point.clientY);

        if (context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
        }
        if (context.isPress) {
            let e = new Event("pressend");
            main.dispatchEvent(e);
        }



        if (context.isTap) {

            // console.log("T")
            // let e = new Event("pan")
            // main.dispatchEvent(e)
            let e = new Event("tap");
            main.dispatchEvent(e);
        }
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now - context.starttime)
        if (context.isPan && v > 0.3) {
            //突然快速移动判断，距离除以时间
            context.isFlick = true;

            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);

        } else {
            context.isFlick = false;
        }
        if (context.isPan) {
            // console.log("P")
            // let e = new Event("pan")
            // main.dispatchEvent(e)
            let e = new Event("panend");
            // let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            e.dx = dx;
            e.dy = dy;
            // e.isFlick =context.isFlick;
            //待补齐代码
            //突然快速移动判断
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
    }
    let cancel = (point, context) => {
        // if (context.isPan) {
        //     console.log("P")

        // }
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


    }


    //保存触摸板
    let contexts = Object.create(null);
    //哈希表，時，這樣寫。索引結構
    //保存鼠標
    let mouseSymbol = Symbol("mouse");

    //鼠标的情况，点击，移动，抬起
    let mousedown = event => {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        // console.log("down",event.clientx,event.clienty);
        //空的鼠标位置存储翠香
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }
    let mousemove = event => {
        // console.log("move", event.clientx, event.clienty);
        // contexts[mouseSymbol] = Object.create(null);
        // move(event, contexts[mouseSymbol]);
        //报错，没有xcontext.startX

        //不间断输入鼠标移动事件，位置。
        move(event, contexts[mouseSymbol]);

    }

    let mouseup = event => {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        // console.log("end", event.clientx, event.clienty);
        // end(event);
        end(event, contexts[mouseSymbol]);
        //鼠标抬起，事件结束，清除存储数据。
        delete contexts[mouseSymbol];
        // delete

    }

    main.addEventListener("mousedown", mousedown);


    //触摸板的情况，点击，移动，抬起，无效判断

    let touchstart = event => {
        for (let touch of event.changedTouches) {//注意大小寫
            // console.log("start", touch.clientx, touch.clienty);
            // touch.identifier返回一个可以唯一地识别和触摸平面接触的点的值. 这个值在这根手指（或触摸笔等）所引发的
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
        // console.log("event");
        //这种不适当日志会错误引导的
        //这种不适当日志会错误引导的
        //谢谢
        //谢谢

    }
    let touchmove = event => {
        for (let touch of event.changedTouches) {
            // console.log("move", touch.clientx, touch.clienty);
            // move(touch);
            move(touch, contexts[touch.identifier]);
        }
        // console.log("event");
    }
    let touchend = event => {
        for (let touch of event.changedTouches) {
            // console.log("end", touch.clientx, touch.clienty);
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
        // console.log("event");
    }
    let touchcancel = event => {
        // for (let touch of event.changedTouches) {
        //     // console.log("end", touch.clientx, touch.clienty);
        //     end(touch);
        // }
        // console.log("event");
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    // 启动监听
    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove);
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);




}