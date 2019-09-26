/**
 * 手势库
 * @param {DOMObject} main 要添加手势的 DOM
 * @example
 enableGesture(document.getElementById("main"));
 var x = 0, y = 0;
 document.getElementById("main").addEventListener("panend", event=> {
     x = event.dx + x;
     y = event.dy + y;
 });
 document.getElementById("main").addEventListener("pan", event=> {
     console.log(event.dx)
     document.getElementById("main").style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`
 });
 */
export default function enableGesture(main) {
  const contexts = Object.create(null);

  const start = (point, context, origin) => {
    context.startX = point.clientX;
    context.startY = point.clientY;

    context.startTime = Date.now();

    context.isTap = true;
    context.isPan = false;

    context.pressHandler = setTimeout(() => {
      let e = new Event('pressStart');
      e.origin = origin;
      main.dispatchEvent(e);
      context.isPress = true;
      context.pressHandler = null;
    }, 500);
  }
  const move = (point, context, origin) => {
    // const dx = point.clientX - context.startX;
    // const dy = point.clientY - context.startY;
    if (
      Math.abs(point.clientX - context.startX) > 10
      || Math.abs(point.clientY - context.startY) > 10
    ) {
      context.isTap = false;
      if (context.isPan === false) {
        context.isPan = true;
        if (context.isPress) {
          context.isPress = false;
          let e = new Event('pressCancel');
          main.dispatchEvent(e);
        }

        if (Math.abs(point.clientX - context.startX) < Math.abs(point.clientY - context.startY)) {
          context.isVertical = true;
        } else {
          context.isVertical = false;
        }

        const e = new Event('panstart');
        e.origin = origin;
        e.startX = context.startX;
        e.startY = context.startY;
        e.isVertical = context.isVertical;

        main.dispatchEvent(e);

        if (context.pressHandler)
          clearTimeout(context.pressHandler);
      }
    }

    if (context.isPan) {
      const e = new Event('pan');
      e.x = point.clientX;
      e.y = point.clientY;
      e.dx = point.clientX - context.startX;
      e.dy = point.clientY - context.startY;
      e.origin = origin;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  }

  const end = (point, context, origin) => {
    if (Date.now() - context.startTime < 300 && context.isTap) {
      var e = new Event("tap");
      main.dispatchEvent(e);
    }

    if (context.isPan) {
      let isFlick = false;
      let t = (Date.now() - context.startTime);
      let v = (Math.sqrt(Math.pow(point.clientX - context.startX, 2) +
        Math.pow(point.clientY - context.startY, 2)) / t)
      if (v > 0.5) {
        isFlick = true;
        var e = new Event("flick");
        e.vx = (point.clientX - context.startX) / t;
        e.vy = (point.clientY - context.startY) / t;
        main.dispatchEvent(e);
      }

      var e = new Event("panend");
      e.x = point.clientX;
      e.y = point.clientY;
      e.dx = point.clientX - context.startX;
      e.dy = point.clientY - context.startY;
      e.vx = (point.clientX - context.startX) / t;
      e.vy = (point.clientY - context.startY) / t;
      e.origin = origin;
      e.isFlick = isFlick;
      e.isVertical = context.isVertical;

      main.dispatchEvent(e);
    }

    if (context.isPress) {
      var e = new Event("pressend");
      main.dispatchEvent(e);
    }
  }

  const calcel = () => {}

  const mouseSymble = Symbol('mouse');

  const mousedown = e => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    contexts[mouseSymble] = Object.create(null);
    start(e, contexts[mouseSymble], e);
  }
  const mousemove = e => {
    move(e, contexts[mouseSymble], e);
  }
  const mouseup = e => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    end(e, contexts[mouseSymble], e);
    delete contexts[mouseSymble];
  }

  const touchstart = e => {
    for (let touch of e.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier], e);
    }
  }
  const touchmove = e => {
    for (let touch of e.changedTouches) {
      move(touch, contexts[touch.identifier], e);
    }
  }
  const touchend = e => {
    for (let touch of e.changedTouches) {
      end(touch, contexts[touch.identifier], e);
      delete contexts[touch.identifier];
    }
  }
  const touchcancel = e => {
    for (let touch of e.changedTouches) {
      calcel(touch, contexts[touch.identifier], e);
      delete contexts[touch.identifier];
    }
  }

  main.addEventListener('mousedown', mousedown);
  main.addEventListener('touchstart', touchstart);
  main.addEventListener('touchmove', touchmove);
  main.addEventListener('touchend', touchend);
  main.addEventListener('touchcancel', touchcancel);
}