export default function enableGesture(container) {
  let mouseSymbol = Symbol('mouse');
  let ctx = Object.create(null);

  let start = (e, ctx) => {
    ctx.startX = e.clientX;
    ctx.startY = e.clientY;

    ctx.startTime = Date.now();

    ctx.isTap = true;
    ctx.isPan = false;
    ctx.isPress = false; // 手按经过一定时间触发
    ctx.pressHandler = setTimeout(() => {
      ctx.isPress = true;
      ctx.isTap = false;
      let e = new Event('press');
      container.dispatchEvent(e);
    }, 500)
  };

  let move = (e, ctx) => {
    let dx, dy;
    dx = e.clientX - ctx.startX;
    dy = e.clientY - ctx.startY;
    if (dx * dx + dy * dy > 100) {
      if (ctx.pressHandler) {
        clearTimeout(ctx.pressHandler);
        ctx.pressHandler = null;
        ctx.isPress = false;
      }
      ctx.isTap = false;
      if (ctx.isPan === false) {
        if (Math.abs(dx) > Math.abs(dy)) {
          ctx.isVertical = false;
          ctx.isHorizontal = true;
        } else {
          ctx.isVertical = true;
          ctx.isHorizontal = false;
        }
        ctx.isPan = true;
      }
    }

    if (ctx.isPan) {
      // 触发事件
      let ev = new Event('pan');
      ev.dx = dx;
      ev.dy = dy;
      ev.isHorizontal = ctx.isHorizontal;
      ev.isVertical = ctx.isVertical;
      container.dispatchEvent(ev);
    }
  };

  let end = (e, ctx) => {
    if (ctx.isTap) {
      let ev = new Event('tap');
      container.dispatchEvent(ev)
    }

    let dx, dy;
    dx = e.clientX - ctx.startX;
    dy = e.clientY - ctx.startY;
    let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - ctx.startTime < 300);

    let isFlick = false;
    if (ctx.isPan && v > 0.3) {
      let ev = new Event('flick');
      container.dispatchEvent(ev);
      isFlick = true
    } else {
      isFlick = false
    }

    if (ctx.isPan) {
      let ev = new Event('panend');
      ev.dx = e.clientX - ctx.startX;
      ev.dy = e.clientY - ctx.startY;
      ev.isFlick = isFlick;
      ev.isVertical = ctx.isVertical;
      ev.isHorizontal = ctx.isHorizontal;
      container.dispatchEvent(ev);
    }
  };

  let mouseStart = e => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    ctx[mouseSymbol]  = Object.create(null);
    start(e, ctx[mouseSymbol])
  };

  let mousemove = e => {
    move(e, ctx[mouseSymbol])
  };

  let mouseup = e => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    end(e, ctx[mouseSymbol]);
    delete  ctx[mouseSymbol]
  };

  container.addEventListener('mousedown', mouseStart);

  let touchStart = e => {
    for (let t of e.changedTouches) {
      ctx[t.identifier] = Object.create(null);
      start(t, ctx[t.identifier]);
    }
  };

  let touchMove = e => {
    for (let t of e.changedTouches) {
      move(t, ctx[t.identifier]);
    }
  };

  let touchEnd = e => {
    // log('touch end: ', e);
    for (let t of e.changedTouches) {
      end(t, ctx[t.identifier]);
      delete ctx[t.identifier];
    }
  };

  let touchCancel = e => {
    for (let t of e.changedTouches) {
      end(t)
    }
  };

  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);
  container.addEventListener('touchcancel', touchCancel);
}
