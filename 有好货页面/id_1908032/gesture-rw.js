function enableGesture(main){
    let contexts = Object.create(null);

    let start = (pointer, context) => {
        // console.log('start', pointer, context, pointer.clientX, pointer.clientY)
        context.startX = pointer.clientX;
        context.startY = pointer.clientY;
        context.startTime = Date.now();

        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.pressHandler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            let e = new Event('pressstart', { bubbles: true });
            main.dispatchEvent(e);
            context.pressHandler = null;
        }, 500)
    }

    let move = (pointer, context) => {
        // console.log('move', context, pointer.clientX, pointer.clientY);
        let dx = pointer.clientX - context.startX, dy = pointer.clientY - context.startY;
        
        if(dx * dx + dy * dy > 100){
            if(context.pressHandler !== null){
                clearTimeout(context.pressHandler);
                context.pressHandler = null;
                context.isPress = false;
            } else if(context.isPress){
                context.isPress = false;
                let e = new Event('presscancle', { bubbles: true });
                main.dispatchEvent(e);
            }

            context.isTap = false;

            if(context.isPan == false){
                if(Math.abs(dx) > Math.abs(dy)){
                    context.isVertical = false;
                    context.isHorizontal = true;
                } else {
                    context.isVertical = true;
                    context.isHorizontal = false;
                }
                let e = new Event('panstart', { bubbles: true });
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e);
                context.isPan = true;
            }

            if(context.isPan){
                let e = new Event('pan', { bubbles: true });
                e.dx = dx;
                e.dy = dy;
                e.isHorizontal = context.isHorizontal;
                e.isVertical = context.isVertical;
                main.dispatchEvent(e);
            }

        }



    }

    let end = (pointer, context) => {
        // console.log('end', pointer.clientX, pointer.clientY);
        if(context.pressHandler!== null){
            clearTimeout(context.pressHandler);
        }
        if(context.isPress){
            let e = new Event('pressend', { bubbles: true });
            main.dispatchEvent(e);
        }
        
        if(context.isTap){
            let e = new Event('tap', { bubbles: true });
            main.dispatchEvent(e);
        }

        let dx = pointer.clientX - context.startX,  dy = pointer.clientY - context.startY;
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime)
        // console.log(v);
        if(context.isPan && v > 0.3){
            context.isFlick = true;
            let e = new Event('flick', { bubbles: true });
            e.dx = dx;
            e.dy = dy;
            main.dispatchEvent(e);

        } else {
            context.isFlick = false;
        }

        if(context.isPan){
            let e = new Event('panend', { bubbles: true });
            e.dx = dx;
            e.dy = dy;
            e.isFlick = context.isFlick;
            e.isHorizontal = context.isHorizontal;
            e.isVertical = context.isVertical;
            main.dispatchEvent(e);
        }

    }

    let mouseSymbol = Symbol('mouse');
    
    let mousedown = event => {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }

    let mousemove = event => {
        move(event, contexts[mouseSymbol]);
    }

    let mouseup = event => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        end(event, contexts[mouseSymbol]);
    }

    let touchstart = event => {
        for(let touch of event.changedTouches){
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    }

    let touchmove = event => {
        for(let touch of event.changedTouches){
            move(touch, contexts[touch.identifier]);
        }
    }

    let touchend = event => {
        for(let touch of event.changedTouches){
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    }

    main.addEventListener('mousedown', mousedown);
    main.addEventListener('touchstart', touchstart);
    main.addEventListener('touchmove', touchmove);
    main.addEventListener('touchend', touchend);

    // document.addEventListener('panstart', e => console.log('panstart'))
    // document.addEventListener('pan', e => console.log('pan'))
    // document.addEventListener('panend', e => console.log('panend'))
    document.addEventListener('pressstart', e => console.log('pressstart'))
    document.addEventListener('pressend', e => console.log('pressend'))
    document.addEventListener('presscancle', e => console.log('presscancle'))
}