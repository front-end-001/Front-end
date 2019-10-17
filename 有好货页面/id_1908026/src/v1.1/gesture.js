export default function enableGesture(main) {
  const contexts = Object.create(null);
  const mouseSymbol = Symbol("mouse");

  const start = (point, context) => {
    context.startX = point.clientX;
    context.startY = point.clientY;

    context.startTime = Date.now();

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.pressHandler = setTimeout(() => {
      context.isPress = true;
      context.isTap = false;
      const e = new Event("pressstart");
      main.dispatchEvent(e);
      context.pressHandler = null;
    }, 500);
  };
  const move = (point, context) => {
    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;
    if (dx * dx + dy * dy > 100) {
      if (context.pressHandler !== null) {
        clearTimeout(context.pressHandler);
        context.pressHandler = null;
        context.isPress = false;
      } else if (context.isPress) {
        // press之后move
        context.isPress = false;
        const e = new Event("presscancel");
        main.dispatchEvent(e);
      }

      context.isTap = false;

      if (context.isPan === false) {
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isVertical = false;
          context.isHorizontal = true;
        } else {
          context.isVertical = true;
          context.isHorizontal = false;
        }
        const e = new Event("panstart");
        e.startX = context.startX;
        e.startY = context.startY;
        main.dispatchEvent(e);
        context.isPan = true;
      }
    }

    if (context.isPan) {
      const e = new Event("pan");
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  };
  const end = (point, context) => {
    if (context.pressHandler !== null) {
      clearTimeout(context.pressHandler);
    }
    if (context.isPress) {
      const e = new Event("pressend");
      main.dispatchEvent(e);
    }
    if (context.isTap) {
      const e = new Event("tap");
      main.dispatchEvent(e);
    }
    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;
    const v = Math.sqrt(dx * dx, dy * dy) / (Date.now() - context.startTime);

    if (context.isPan && v > 0.3) {
      context.isFlick = true;
      const e = new Event("flick");
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      const e = new Event("panend");
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      e.isFlick = context.isFlick;
      main.dispatchEvent(e);
    }
  };

  const cancel = (point, context) => {
    if (context.isPan) {
      const e = new Event("pancancel");
      main.dispatchEvent(e);
    }
    if (context.isPress) {
      const e = new Event("presscancel");
      main.dispatchEvent(e);
    }
    if (context.pressHandler !== null) {
      const e = new Event("pancancel");
      main.dispatchEvent(e);
      clearTimeout(context.pressHandler);
    }
  };
  const mouseMove = (event) => {
    event.preventDefault();
    move(event, contexts[mouseSymbol]);
  };

  const mouseEnd = (event) => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseEnd);
    end(event, contexts[mouseSymbol]);
    delete contexts[mouseSymbol];
  };

  const mouseStart = (event) => {
    event.preventDefault();
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseEnd);
    contexts[mouseSymbol] = Object.create(null);
    start(event, contexts[mouseSymbol]);
  };

  const touchStart = (event) => {
    for (const touch of event.changedTouches) {
      contexts[event.identifier] = Object.create(null);
      start(touch, contexts[event.identifier]);
    }
  };

  const touchMove = (event) => {
    for (const touch of event.changedTouches) {
      move(touch, contexts[event.identifier]);
    }
  };

  const touchEnd = (event) => {
    for (const touch of event.changedTouches) {
      end(touch, contexts[event.identifier]);
      delete contexts[event.identifier];
    }
  };

  const touchCancel = (event) => {
    for (const touch of event.changedTouches) {
      cancel(touch, contexts[event.identifier]);
    }
  };

  main.addEventListener("mousedown", mouseStart);
  main.addEventListener("touchstart", touchStart);
  main.addEventListener("touchmove", touchMove);
  main.addEventListener("touchend", touchEnd);
  main.addEventListener("touchcancel", touchCancel);
  document.addEventListener("touchstart", (event) => event.preventDefault(), {
    passive: false,
  });
  document.addEventListener("touchmove", (event) => event.preventDefault(), {
    passive: false,
  });
}
