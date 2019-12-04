function enableGesture(main) {
    let start = (point, context) => {
        console.log('start', point.clientX, point.clientY);
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.startTime =Date.now()
        context.isTap = true;
        context.isPan = false;

        
    }
    let move = (point, context) => {
        //console.log('move',point.clientX,point.clientY);
        // console.log('move', context.startX, context.startY);
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {
            context.isTap = false;

            if (context.isPan === false) {
                let e = new Event('panstart');
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e);
                context.isPan = true;
            }
        }
        if (context.isPan) {
            let e = new Event('pan');
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }
    }
    let end = (point, context) => {
        console.log('end', point.clientX, point.clientY);
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (context.isTap) {
            console.log("tapped");
            let e = new Event('tap');
            main.dispatchEvent(e);
        }
        let v = Math.sqrt(dx*dx+dy*dy)/(Date.now()-context.startTime)
        console.log(v);
        if(context.isPan && v > 0.3){
            context.isFlick = true;
            let e  = new Event('flick');
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        }else{
            context.isFlick = false;
        }

        if (context.isPan) {
            let e = new Event('panned'); // ？@nyc
            e.isFlick=context.isFlick;
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e); // ？@nyc
            console.log('panned')
        }
    }
    let cancel = (point, context) => {
        console.log('cancel', point.clientX, point.clientY);
        let e = new Event('pancancel');
        main.dispatchEvent(e)
    }

    let contexts = Object.create(null);
    let mouseSymbol = Symbol('mouse'); // ？@nyc

    let mousedown = event => {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null); // ？@nyc
        start(event, contexts[mouseSymbol])
    }
    let mousemove = event => {
        move(event, contexts[mouseSymbol]);
    }
    let mouseup = event => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
        delete contexts[mouseSymbol];
    }

    main.addEventListener('mousedown', mousedown);

    let touchstart = event => {
        for (let touch of event.changedTouches) { // ？@nyc
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }
    let touchend = event => {
        for (let touch of event.changedTouches) {

            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    let touchmove = event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }

    }
    let touchcancel = event => {
        //事件点击无效
        for (let touch of event.changedTouches) {
            console.log('cancel', touch.clientX, touch.clientY);
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier]; // ？@nyc
        }
    }
    main.addEventListener('touchstart', touchstart, { passive: true });
    main.addEventListener('touchmove', touchmove);
    main.addEventListener('touchend', touchend);
    main.addEventListener('touchcancel', touchcancel);
}
export {enableGesture};