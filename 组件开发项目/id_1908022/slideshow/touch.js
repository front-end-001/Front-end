function enableGesture(main){
    let contexts = Object.create(null);
    
    let start = (point,context) => {
        // console.log('start',point.clientX,point.clientY);
        context.startTime = Date.now();
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isTap = true;
        context.isPan = false;
    }
    let move = (point,context) => {
        // console.log('move',point.clientX,point.clientY);
        let dX = point.clientX - context.startX , dY = point.clientY - context.startY;
        if((dX * dX + dY * dY) > 100){
            context.isTap = false;
            if(!context.isPan){
                let e = new Event('panstart');
                e.startX = context.startX;
                e.startY = context.startY;
                main.dispatchEvent(e);
                context.isPan = true;
            }
        }
        if(context.isPan){
            let e = new Event('panmove');
            e.dX = dX;
            e.dY = dY;
            main.dispatchEvent(e);
        }
    }
    let end = (point,context) => {
        // console.log('end',point.clientX,point.clientY);
        let dX = point.clientX - context.startX , dY = point.clientY - context.startY;
        if(context.isTap){
            let e = new Event('tap');
            main.dispatchEvent(e);
        }
        let v = Math.sqrt(dX * dX + dY * dY) / (Date.now() - context.startTime);
        if(context.isPan && v >= 0.3){
            context.isFlick = true;
            let e = new Event('flick');
            e.dX = dX;
            e.dY = dY;
            main.dispatchEvent(e);
        }else{
            context.isFlick = false;
        }
            
        if(context.isPan){
            let e = new Event('panend');
            e.dX = dX;
            e.dY = dY;
            e.isFlick = context.isFlick;
            main.dispatchEvent(e);
        }
            
    }

    let mouseSymbol  = Symbol('mouse'); 
    let mouseDown = event => {
        main.addEventListener('mousemove',mouseMove);
        main.addEventListener('mouseup',mouseUp);
        contexts[mouseSymbol] = Object.create(null);
        start(event, contexts[mouseSymbol]);
    }
    let mouseMove = event => {
        move(event, contexts[mouseSymbol]);
    }
    let mouseUp = event => {
        main.removeEventListener('mousemove',mouseMove);
        main.removeEventListener('mouseup',mouseUp);
        end(event, contexts[mouseSymbol]);
    }
    main.addEventListener('mousedown',mouseDown);

    let touchStart = event => {
        for(let point of event.changedTouches){
            contexts[point.identifier] = Object.create(null);
            start(point,contexts[point.identifier]);
        }
    }
    let touchMove = event => {
        for(let point of event.changedTouches){
            move(point,contexts[point.identifier]);
        }
    }
    let touchEnd = event => {
        for(let point of event.changedTouches){
            end(point,contexts[point.identifier]);
            delete contexts[point.identifier];
        }
    }
    let touchCancle = event => {
        for(let point of event.changedTouches){
            end(point,contexts[point.identifier]);
            delete contexts[point.identifier];
        }
    }
    main.addEventListener('touchstart',touchStart);
    main.addEventListener('touchmove',touchMove);
    main.addEventListener('touchend',touchEnd);
    main.addEventListener('touchcancle',touchCancle);
   /*  main.addEventListener('panstart', e => {
        console.log('panstart',e);
    });
    main.addEventListener('panmove', e => {
        console.log(e);
        main.style.transform = `translate(${e.dX}px,${e.dY}px)`;
    });
    document.addEventListener('panend', e => {
        
    })
    main.addEventListener('tap', e => {
        console.log('tap',e);
    }) */

}