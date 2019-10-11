function enableGesture(main) {

 
  const contexts = Object.create(null);
  const mouseSymbol = Symbol('mouse');

  const start = (point, context) => {
  point.clientY);
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isTap = true;
    context.isPan = false;
    context.isFlick = false;
    context.isPress = false;
    context.startTime = Date.now();
    context.pressTimer = setTimeout(() => {
      context.isPress = true;
      context.isTap = false;
      const e = new Event('press');
      Object.assign(e, context);
      main.dispatchEvent(e);
    }, 3000);
  }
  const move = (point, context) => {
    context.dx = point.clientX - context.startX;
    context.dy = point.clientY - context.startY;
    if (context.isPan) {
      const e = new Event('pan');
      Object.assign(e, context);
      main.dispatchEvent(e);
    } else if ((context.dx * context.dx + context.dy * context.dy) > 100) {
      if (context.pressTimer) {
        clearInterval(context.pressTimer);
        context.pressTimer = null;
      }
      if (context.isPress) {
        context.isPress = false;
        const e = new Event('presscancel');
        Object.assign(e, context);
        main.dispatchEvent(e);
      }

      if (Math.abs(context.dx) > Math.abs(context.dy)) {
        /** 水平 */
        context.isHorizontal = true;
        /** 垂直 */
        context.isVertical = false;

      } else {
        context.isHorizontal = false;
        context.isVertical = true;
      }
      context.isTap = false;
      context.isPan = true;
      const e = new Event('panstart');
      Object.assign(e, context);
      main.dispatchEvent(e);
    }
    

  }
  const end = (point, context) => {
    const dt = Date.now() - context.startTime;
    const v = Math.sqrt(context.dx * context.dx + context.dy * context.dy) / (dt / 1000);

    if (context.pressTimer) {
      clearInterval(context.pressTimer);
      context.pressTimer = null;
    }

    if (context.isPan && dt <= 500 && v > 0.3) {
      context.isFlick = true;
      context.isPan = false;
      const e = new Event('flick');
      Object.assign(e, context);
      main.dispatchEvent(e);
    }

    if (context.isTap) {
      const e = new Event('tap');
      main.dispatchEvent(e);
    }

    if (context.isPan) {
      const e = new Event('panend');
      Object.assign(e, context);
      main.dispatchEvent(e);
    }

    if (context.isPress) {
      const e = new Event('pressend');
      Object.assign(e, context);
      main.dispatchEvent(e);
    }
  }


  const mouseStart = (event) => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    contexts[mouseSymbol] = {};
    start(event, contexts[mouseSymbol]);
  };

  const mousemove = (event) => {
    move(event, contexts[mouseSymbol]);
  };

  const mouseup = (event) => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    end(event, contexts[mouseSymbol]);
  };

  main.addEventListener('mousedown', mouseStart);

  const touchstart = (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = {};
      start(touch, contexts[touch.identifier])
    }
  };

  const touchmove = (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  };

  const touchend = (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  };

  const touchcancel = (event) => {
    for (let touch of event.changedTouches) {
      delete contexts[touch.identifier];
    }
  };

  main.addEventListener('touchstart', touchstart);
  main.addEventListener('touchmove', touchmove);
  main.addEventListener('touchend', touchend);
  main.addEventListener('touchcancel', touchcancel);
}

const main = document.getElementById('gesture');

let x = 0;
let y = 0;

enableGesture(main);


main.addEventListener('press', (event) => {
  console.log('main press');
});

main.addEventListener('pressend', (event) => {
  console.log('main pressend');
});

main.addEventListener('presscancel', (event) => {
  console.log('main presscancel');
});

main.addEventListener('touchstart', (event) => {
  event.preventDefault();
});

main.addEventListener('tap', (event) => {
  console.log('main tap');
});

main.addEventListener('panstart', (event) => {
  console.log('main panstart');
});

main.addEventListener('pan', (event) => {
  main.style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`;
});

main.addEventListener('panend', (event) => {
  console.log('main panend');
  main.style.transform = `translate(${event.dx + x}px, ${event.dy + y}px)`;
  x = event.dx + x;
  y = event.dy + y;
});