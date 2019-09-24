export default function enableGesture(main) {
    let start = (point, context) => {
        console.log('start');
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event('press');
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500);

        context.startTime = Date.now();
    }
    let move = (point, context) => {
        console.log('move');
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        if (dx * dx + dy * dy > 100) {

            if (context.pressHandler !== null) {
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
            } else {
                context.isPress = false;
                let e = new Event('presscancel');
                main.dispatchEvent(e);
            }

            context.isTap = false;

            if (!context.isPan) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }
                let e = new Event('panstart');
                main.dispatchEvent(e);
                e.startX = context.startX;
                e.startY = context.startY;
                context.isPan = true;
            }
        }
        if (context.isPan) {
            let e = new Event('pan');
            e.dx = dx;
            e.dy = dy;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
    }
    let end = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY;

        let speed = Math.sqrt((dx * dx + dy * dy)) / (Date.now() - context.startTime);
        if (context.isPan && speed > 0.3) {
            context.isFlick = true;
            let e = new Event('flick');
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);
        } else {
            context.isFlick = false;
        }

        if(context.pressHandler !== null) {
            clearTimeout(context.pressHandler);
        }
        if (context.isTap) {
            let e = new Event('tap');
            main.dispatchEvent(e);
        }
        if (context.isPan) {
            let e = new Event('panend');
            e.dx = point.clientX - context.startX;
            e.dy = point.clientY - context.startY;
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event('pressend');
            main.dispatchEvent(e);
        }
        console.log('end');
    }
    let cancel = (point, context) => {
        if (context.isPan) {
            let e = new Event('pancancel');
            main.dispatchEvent(e);
        }
        if (context.isPress) {
            let e = new Event('presscancel');
            main.dispatchEvent(e);
        }
    }
    
    let contexts = Object.create(null);
    let mouseSymbol = Symbol('mouse');
    let mousedown = event => {
        event.preventDefault();
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }
    let mousemove = event => {
        event.preventDefault();
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
        event.preventDefault();
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }
    let touchmove = event => {
        event.preventDefault();
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    }
    let touchend = event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    let touchcancel = event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }
    main.addEventListener('touchstart', touchstart);
    main.addEventListener('touchmove', touchmove);
    main.addEventListener('touchend', touchend);
    main.addEventListener('touchcancel', touchcancel);
}