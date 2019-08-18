function enableGesture(el) {
    const context = Object.create(null);
    const start = (point, context) => {
        context.isTab = true;
        context.startX = point.clientX;
        context.startY = point.clientY;
    };
    const move = ({ clientX, clientY }, context) => {
        const dx = clientX - context.startX,
            dy = clientY - context.startY;
        if (context.isTab) {
            if (dx * dx + dy * dy > 100) {
                context.isTab = false;
                const panstart = new Event('panstart');
                panstart.startX = context.startX;
                panstart.startY = context.startY;
                el.dispatchEvent(panstart);
            }
        } else {
            const pan = new Event('pan');
            pan.dx = dx;
            pan.dy = dy;
            el.dispatchEvent(pan);
        }
    };
    const end = ({ clientX, clientY }, context) => {
        if (context.isTab) {
            const tab = new Event('tab');
            el.dispatchEvent(tab);
        } else {
            const dx = clientX - context.startX,
                dy = clientY - context.startY;
            const panend = new Event('panend');
            panend.dx = dx;
            panend.dy = dy;
            el.dispatchEvent(panend);
        }
    };
    const cancel = (event, context) => {
        if (context.isTab) {
            return;
        } else {
            const dx = clientX - context.startX,
                dy = clientY - context.startY;
            const pancancel = new Event('pancancel');
            pancancel.dx = dx;
            pancancel.dy = dy;
            el.dispatchEvent(pancancel);
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