function enableGesture(main) {
  const start = (point, context) => {
    context.startX = point.clientX;
    context.startY = point.clientY;

    context.startTime = Date.now();

    context.isTap = true;
    context.isPan = false;
  }
  const move = (point, context) => {
    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;

    if (dx * dx + dy * dy > 100) {
      context.isTap = false;
      if (context.isPan === false) {
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isHorizontal = true;
          context.isVertical = false;
        } else {
          context.isHorizontal = false;
          context.isVertical = true;
        }

        const e = new Event('panstart');
        e.dx = context.startX;
        e.dy = context.startY;
        main.dispatchEvent(e);
        
        context.isPan = true;
      }
    }

    if (context.isPan) {
      const e = new Event('pan');
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  }
  const end = (point, context) => {
    if (context.isTap) {
      const e = new Event('tap');
      main.dispatchEvent(e);
      return;
    }

    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;

    const v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);

    if (context.isPan && v > 0.3) {
      context.isFlick = true;
      const e = new Event('flick');
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      const e = new Event('panend');
      e.dx = dx;
      e.dy = dy;
      e.isFlick = context.isFlick;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  }
  const calcel = () => {
  }

  const contexts = Object.create(null);
  const mouseSymble = Symbol('mouse');

  const mousedown = e => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    contexts[mouseSymble] = Object.create(null);
    start(e, contexts[mouseSymble]);
  }
  const mousemove = e => {
    move(e, contexts[mouseSymble]);
  }
  const mouseup = e => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    end(e, contexts[mouseSymble]);
    delete contexts[mouseSymble];
  }

  main.addEventListener('mousedown', mousedown);

  const touchstart = e => {
    for (let touch of e.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  }
  const touchmove = e => {
    for (let touch of e.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  }
  const touchend = e => {
    for (let touch of e.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  }
  const touchcancel = e => {
    for (let touch of e.changedTouches) {
      calcel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  }

  main.addEventListener('touchstart', touchstart);
  main.addEventListener('touchmove', touchmove);
  main.addEventListener('touchend', touchend);
  main.addEventListener('touchcancel', touchcancel);

}