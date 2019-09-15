function enableGesture(main) {
  let start = (point, context) => {
    // console.log('start', point.clientX, point.clientY);
    context.startX = point.clientX;
    context.startY = point.clientY;

    context.startTime = Date.now();

    context.isTap = true;
    context.isPan = false;
  }

  let move = (point, context) => {
    // console.log('move', point.clientX, point.clientY);
    // console.log(context.startX, context.startY);
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    // 防止触屏的时候出现抖动（手指或电容），比如超过10个像素
    if ((dx * dx + dy * dy) > 100) {
      context.isTap = false;
      // context.isPan = true;
      if (context.isPan == false) {
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isVertical = false;
          context.isHorizontal = true;
        } else {
          context.isVertical = true;
          context.isHorizontal = false;
        }

        let e = new Event('panstart');
        e.startX = context.startX;
        e.startY = context.startY;
        main.dispatchEvent(e);
        context.isPan = true;
      }
    }
    // console.log(dx, dy);
    if (context.isPan) {
      // console.log('pan', dx, dy);
      // 触发事件
      let e = new Event('pan');
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }

  }

  let end = (point, context) => {
    // console.log('end', point.clientX, point.clientY);
    if (context.isTap) {
      // console.log('tap');
      let e = new Event('tap');
      main.dispatchEvent(e);
    }
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);

    console.log(v);
    if (context.isPan && v > 0.3) {
      // console.log('panend');
      context.isFlick = true;
      let e = new Event('flick');
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      // console.log('panend');
      let e = new Event('panend');
      e.dx = dx;
      e.dy = dy;
      e.isFlick = context.isFlick;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  }

  let cancel = (point, context) => {
    if (context.isPan) {
      let e = new Event("pancancel");
      main.dispatchEvent(e);
    }
  }

  // 创建一个纯净的空对象
  let contexts = Object.create(null);

  let mouseSymbol = Symbol('mouse');

  let mousedown = e => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    // console.log('down', e.clientX, e.clientY);
    contexts[mouseSymbol] = Object.create(null);

    start(e, contexts[mouseSymbol]);
  }

  let mousemove = e => {
    // console.log('move', e.clientX, e.clientY);
    move(e, contexts[mouseSymbol]);
  }

  let mouseup = e => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    // console.log('end', e.clientX, e.clientY);
    end(e, contexts[mouseSymbol]);
    delete contexts[mouseSymbol];
  }

  main.addEventListener('mousedown', mousedown);

  let touchstart = e => {
    // console.log(e);
    for (let touch of e.changedTouches) {
      // console.log('start', touch.clientX, touch.clientY);
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier])
    }
  }
  let touchmove = e => {
    // console.log(e);
    for (let touch of e.changedTouches) {
      // console.log('move', touch.clientX, touch.clientY);
      move(touch, contexts[touch.identifier])
    }
  }
  let touchend = e => {
    // console.log(e);
    for (let touch of e.changedTouches) {
      // console.log('end', touch.clientX, touch.clientY);
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier];
    }
  }
  // 不用触发任何事件
  let touchcancel = e => {
    // console.log(e);
    for (let touch of e.changedTouches) {
      // console.log('cancel', touch.clientX, touch.clientY);
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  }
  main.addEventListener('touchstart', touchstart);
  main.addEventListener('touchmove', touchmove);
  main.addEventListener('touchend', touchend);
  main.addEventListener('touchcancel', touchcancel);
}