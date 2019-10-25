function enableGesture(main) {

    // 适合做索引
    const contexts = Object.create(null);
    const mouseSymbol = Symbol('mouse');

    const start = (point, context) => {
        // console.log('start', point.clientX, point.clientY);
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
        context.isFlick = false;
        context.startTime = Date.now();
    }
    const move = (point, context) => {
        // console.log('move', point.clientX, point.clientY);
        context.dx = point.clientX - context.startX;
        context.dy = point.clientY - context.startY;
        if (context.isPan) {
            const e = new Event('pan');
            e.dx = context.dx;
            e.dy = context.dy;
            main.dispatchEvent(e);
        } else if ((context.dx * context.dx + context.dy * context.dy) > 100) {
            context.isTap = false;
            context.isPan = true;
            const e = new Event('panstart');
            e.dx = context.dx;
            e.dy = context.dy;
            main.dispatchEvent(e);
        }
        // console.log(dx, dy);

    }
    const end = (point, context) => {
        const dt = Date.now() - context.startTime;
        const v = Math.sqrt(context.dx * context.dx + context.dy * context.dy) / (dt / 1000);

        if (context.isPan && dt <= 500 && v > 0.3) {
            context.isFlick = true;
            context.isPan = false;
            const e = new Event('flick');
            Object.assign(e, context);
            main.dispatchEvent(e);
        }

        if (context.isTap) {
            const e = new Event('tap');
            main.dispatchEvent(e);
        } else if (context.isPan) {
            const e = new Event('panend');
            Object.assign(e, context);
            main.dispatchEvent(e);
        }
    }


    const mouseStart = (event) => {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = {};
        start(event, contexts[mouseSymbol]);
    };

    const mousemove = (event) => {
        move(event, contexts[mouseSymbol]);
    };

    const mouseup = (event) => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
    };

    main.addEventListener('mousedown', mouseStart);

    const touchstart = (event) => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = {};
            start(touch, contexts[touch.identifier])
        }
    };

    const touchmove = (event) => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier]);
        }
    };

    const touchend = (event) => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    };

    const touchcancel = (event) => {
        for (let touch of event.changedTouches) {
            console.log('cancel', touch.clientX, touch.clientY);
            delete contexts[touch.identifier];
        }
    };

    main.addEventListener('touchstart', touchstart);
    main.addEventListener('touchmove', touchmove);
    main.addEventListener('touchend', touchend);
    main.addEventListener('touchcancel', touchcancel);
}
