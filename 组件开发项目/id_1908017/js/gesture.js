function enableGesture(el) {
    const context = Object.create(null);
    const start = (point, context) => {
        context.moved = false;
        context.pressStarted = false;
        context.pressBeginTimer = setTimeout(() => {
            context.pressStarted = true;
        }, 500);
        context.startTime = +new Date();
        // context.isFlick = false;
        // context.isVertical = null;
        context.startX = point.clientX;
        context.startY = point.clientY;
    };
    const move = ({ clientX, clientY }, context) => {
        const dx = clientX - context.startX,
            dy = clientY - context.startY;

        if (!context.moved) {
            if (dx * dx + dy * dy > 100) {
                context.moved = true;
                //press
                if (!context.pressStarted) {
                    clearTimeout(context.pressBeginTimer);
                    delete context.pressBeginTimer;
                } else {
                    const e = new Event('presscancel');
                    el.dispatchEvent(e);
                }
                //panstart
                context.moved = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
                const e = new Event('panstart');
                e.startX = context.startX;
                e.startY = context.startY;
                e.isVertical = context.moved === 'y';
                el.dispatchEvent(e);
            }
        } else {
            //pan 
            const e = new Event('pan');
            e.dx = dx;
            e.dy = dy;
            e.isVertical = context.moved === 'y';
            el.dispatchEvent(e);
        }
    };
    const end = ({ clientX, clientY }, context) => {
        if ('pressBeginTimer' in context) {
            clearTimeout(context.pressBeginTimer);
        }
        if (!context.moved) {
            const e = new Event(!context.pressStarted ? 'tab' : 'pressend');
            el.dispatchEvent(e);
        } else {
            const dx = clientX - context.startX,
                dy = clientY - context.startY;
            const v = Math.sqrt(dx * dx + dy * dy) / (new Date() - context.startTime);
            console.log('v', v);
            if (v > 0.3) {
                context.isFlick = true;
                const flick = new Event('flick');
                flick.dx = dx;
                flick.dy = dy;
                el.dispatchEvent(flick);
            }

            const panend = new Event('panend');
            panend.dx = dx;
            panend.dy = dy;
            panend.isFlick = context.isFlick;
            el.dispatchEvent(panend);
        }
    };
    const cancel = (event, context) => {
        if ('pressBeginTimer' in context) {
            clearTimeout(context.pressBeginTimer);
        }
        if (!context.moved) {
            if (pan)

                return;
        } else {
            const dx = clientX - context.startX,
                dy = clientY - context.startY;
            const e = new Event('pancancel');
            e.dx = dx;
            e.dy = dy;
            e.isVertical = context.moved === 'y';
            el.dispatchEvent(e);
        }
    }

    //mouse
    const mouseId = Symbol('mouse');
    const mousedown = event => {
        el.addEventListener('mousemove', mousemove);
        el.addEventListener('mouseup', mouseup);
        start(event, context[mouseId] = Object.create(null));
    }
    const mousemove = event => {
        move(event, context[mouseId]);
    }
    const mouseup = event => {
        el.removeEventListener('mousemove', mousemove);
        el.removeEventListener('mouseup', mouseup);
        end(event, context[mouseId]);
        delete context[mouseId];
    }
    el.addEventListener('mousedown', mousedown);

    //touch
    const touchstart = event => {
        for (const touch of event.changedTouches) {
            start(touch, context[touch.identifier] = Object.create(null))
        }
    }
    const touchmove = event => {
        for (const touch of event.changedTouches) {
            move(touch, context[touch.identifier])
        }
    }
    const touchend = event => {
        for (const touch of event.changedTouches) {
            end(touch, context[touch.identifier])
            delete context[touch.identifier]
        }
    }
    const touchcancel = event => {
        for (const touch of event.changedTouches) {
            cancel(touch, context[touch.identifier])
            delete context[touch.identifier]
        }
    }
    el.addEventListener('touchstart', touchstart);
    el.addEventListener('touchmove', touchmove);
    el.addEventListener('touchend', touchend);
    el.addEventListener('touchcancel', touchcancel);
}
//todo 换 isTab 风格再实现一遍
//?? isTab 风格有重复么？
/**
 * test
 * 
 * tap: 
 *  start(0,0).then(time:100).then(end(0,0))
 * pressstart: 
 *  start(0,0).then(time:500).then(end(0,0))
 * presscancel:
 *  start(0,0).then(time:500).then(move(10,0))
 * pressend:
 *  start(0,0).then(time:500).then(end(0,0))
 * 
 * panstart:
 *  start(0,0).then(move(10,0))
 * pan:
 *  start(0,0).then(move(10,0))
 * panend:
 *  start(0,0).then(move(10,0)).then(end())
 *   
 * pancancel:
 *  start(0,0).then(move(10,0)).then(cancel())
 * 
 * flick:
 *  start(0,0).then(move(10,0)).then(end())
 */