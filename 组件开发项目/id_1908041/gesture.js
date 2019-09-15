function enableGesture(main) {
  let start = (point, context) => {
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.startTime = Date.now();
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.pressTimer = setTimeout(() => {
      context.isPress = true;
      context.isTap = false;
      let e = new Event("pressstart");
      main.dispatchEvent(e);
      context.pressTimer = null;
    }, 500);
  };
  let move = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (dx * dx + dy * dy > 100) {
      context.isTap = false;
      //移动时press事件相关判断
      if (context.isPress) {
        //已经触发了pressstart事件，发送presscancel事件
        let e = new Event("presscancel");
        main.dispatchEvent(e);
        context.isPress = false;
      } else {
        //还没有触发pressstart，则取消
        clearTimeout(context.pressTimer);
        context.pressTimer = null;
      }
      if (!context.isPan) {
        //第一次判断水平和垂直方向,在pan和panend时增加相关参数
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isVertical = false;
          context.isHorizontal = true;
        } else {
          context.isVertical = true;
          context.isHorizontal = false;
        }
        context.isPan = true;
        let e = new Event("panstart");
        e.startX = context.startX;
        e.startY = context.startY;
        main.dispatchEvent(e);
      }
    }
    if (context.isPan) {
      let e = new Event("pan");
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  };
  let end = (point, context) => {
    if (context.isPress) {
      let e = new Event("pressend");
      main.dispatchEvent(e);
    } else {
      clearTimeout(context.pressTimer);
      context.pressTimer = null;
    }
    if (context.isTap) {
      let e = new Event("tap");
      main.dispatchEvent(e);
    }
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    let speed = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
    if (context.isPan && speed > 0.3) {
      context.isFlick = true;
      let e = new Event("flick");
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    }
    if (context.isPan) {
      let e = new Event("panend");
      e.dx = dx;
      e.dy = dy;
      e.isFlick = context.isFlick;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  };
  let cancel = (point, context) => {
    if (context.isPan) {
      let e = new Event("pancancel");
      main.dispatchEvent(e);
    }
    if (context.isPress) {
      let e = new Event("presscancel");
      main.dispatchEvent(e);
    } else {
      clearTimeout(context.pressTimer);
      context.pressTimer = null;
    }
  };
  let contexts = Object.create(null),
    mouseSymbol = Symbol("mouse");
  let mousedown = event => {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    contexts[mouseSymbol] = Object.create(null);
    start(event, contexts[mouseSymbol]);
  };
  let mousemove = event => {
    move(event, contexts[mouseSymbol]);
  };
  let mouseup = event => {
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
    end(event, contexts[mouseSymbol]);
    delete contexts[mouseSymbol];
  };

  let touchstart = event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  };
  let touchmove = event => {
    for (let touch of event.changedTouches)
      move(touch, contexts[touch.identifier]);
  };
  let touchend = event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  };
  let touchcancel = event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  };
  main.addEventListener("mousedown", mousedown);
  main.addEventListener("touchstart", touchstart);
  main.addEventListener("touchmove", touchmove);
  main.addEventListener("touchend", touchend);
  main.addEventListener("touchcancel", touchcancel);
}
