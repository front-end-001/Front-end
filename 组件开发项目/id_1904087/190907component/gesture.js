
export function enableGesture(main) {

    // 索引结构好习惯
    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");

    // 阻止双击变大
    // document.addEventListener("touchstart", event => event.preventDefault(), {passive:false}); 

    let start = (point, context) => {
        //console.log("start", point.clientX, point.clientY);
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.startTime = Date.now();
        context.isTap = true;
        context.isPan = false;

        context.isPress = false;
        context.pressHandler = setTimeout(()=> {
            context.isPress = true;
            context.isTap = false;
            
        })
    }

    let move = (point, context) => {
        //console.log("move", point.clientX, point.clientY);
        //let displacementX, displacementY;
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        
        //console.log(context.startX, context.startY, dx, dy);

        //10 像素 需要适配工作
        if( dx*dx + dy*dy > 100) {

            context.isTap = false;

            if(context.isPan == false) {

                if(Math.abs(dx) > Math.abs(dy)) {
                    context.isVertical = false;
                    context.isHoriontal = true;
                }else {
                    context.isVertical = true;
                    context.isHoriontal = false;
                }


                context.isPan = true;
                let e = new Event("panstart");
                e.startX = context.clientX;
                e.startY = context.clientY;
                main.dispatchEvent(e);
            }
        }

        if(context.isPan) {
            console.log("pan", dx, dy);
            let e = new Event("pan");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }

    }

    let end = (point, context) => {
        console.log("end", point.clientX, point.clientY);
        if(context.isTap) {
            //console.log("tap")
            let e = new Event("tap");
            main.dispatchEvent(e);
        }

        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        let v = Math.sqrt(dx*dx + dy*dy) / (Date.now() - context.startTime);
        if(context.isPan && v > 0.3) {
            context.isFlick = true;
            let e = new Event("flick");
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }else{
            context.isFlick = false;
        }
        
        if(context.isPan) {
            //console.log("pan end")
            let e = new Event("panend");
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            e.dx = dx;
            e.dy = dy;
            e.isFlick = context.isFlick;
            main.dispatchEvent(e);
        }
    }


    let cancel = (point, context) => {
        //console.log("cancel", point.clientX, point.clientY);
        if(context.isPan) {
            let e = new Event("pancancel");
            main.dispatchEvent(e);
        }
    }

    //--------------------------------------//

    let mousedown = event => {
        //event.preventDefault();
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        contexts[mouseSymbol] = Object.create(null)
        start(event, contexts[mouseSymbol]);
    }

    let mousemove = event => {
        event.preventDefault();
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = event => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        end(event, contexts[mouseSymbol]);
        //delete contexts[mouseSymbol];
    }

    main.addEventListener("mousedown", mousedown);


    let touchstart = event => {
        for(let touch of event.changedTouches) {
            console.log("id: ", touch.identifier);
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }

    let touchmove = event => {
        for(let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    }

    let touchend = event => {
        for(let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    let touchcancel = event => {
        for(let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove);
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);

}