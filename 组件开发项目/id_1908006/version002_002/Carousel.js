main = document.getElementById("main")


let contexts = Object.create(null);


let start = (point, context) => {
    console.log("start", point.clientX, point.clientY);

    context.startX = point.clientX;
    context.startY = point.clientY;

    context.isTap = true;
    context.isPan = false;
}

let move = (point, context) => {
    console.log("move", point.clientX, point.clientY);

    let dx = context.startX - point.clientX;
    let dy = context.startY - point.clientY;

    console.log("move2", dx, dy);

    if (dx * dx + dy * dy > 10 * 10) {
        context.isTap = false;
        context.isPan = true;
    }
}

let end = (point, context) => {
    console.log("end ", point.clientX, point.clientY);
    if (context.isTap) console.log("isTap");
    if (context.isPan) console.log("isPan");
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
    move(event, context[mouseSymbol]);
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
        canel(touch);
    }
}

main.addEventListener("touchstart", touchstart);
main.addEventListener("touchmove", touchmove);
main.addEventListener("touchend", touchend);
main.addEventListener("touchcancel", touchcancel);
