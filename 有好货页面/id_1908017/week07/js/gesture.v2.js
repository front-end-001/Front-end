const flickSpeed = 0.5;
// 分离各手势逻辑
class Context {
  constructor({ startX, startY }) {
    this.moved = false;
    this.createTime = +new Date;
    this.startX = startX;
    this.startY = startY;
  }
  getSpeed() {
    const { dx, dy } = this;
    const time = new Date - this.createTime;
    // console.log('speed', Math.sqrt(dx * dx + dy * dy) / time);
    return Math.sqrt(dx * dx + dy * dy) / time;
  }
}
//
export function enableGesture(el) {
  const contexts = Object.create(null);
  const pressTime = 500;
  const createContext = event => {
    const instance = new Context({ startX: event.clientX, startY: event.clientY });
    instance.getTimeZone = () => (new Date - instance.createTime) > 500 ? 1 : 0;
    instance.origin = event;
    return instance;
  }
  //listen ,emit
  const listeners = Object.create(null);
  const listen = (events, handler) => {
    for (const eName of events.split(',')) {
      (listeners[eName] || (listeners[eName] = [])).push(handler);
    }
  }
  const emit = e => el.dispatchEvent(e);
  const invokeListeners = (eName, ...args) => {
    for (const cb of listeners[eName]) {
      cb.apply(null, args);
    }
  }
  //start,move,end,cancel
  const start = (point, context) => {
    context.startX = point.clientX;
    context.startY = point.clientY;
    context._timer = setTimeout(() => {
      invokeListeners('timezone', { context });
    }, pressTime);
    el.dispatchEvent(new Event('start'));
  };
  const move = (point, context) => {
    const dx = context.dx = point.clientX - context.startX;
    const dy = context.dy = point.clientY - context.startY;
    if (!context.moved && dx * dx + dy * dy > 100) {
      context.moved = true;
      invokeListeners('firstMove', { point, context });
    }
    invokeListeners('move', { context });
  };
  const end = (point, context) => {
    clearTimeout(context._timer);
    context.dx = point.clientX - context.startX;
    context.dy = point.clientY - context.startY;
    invokeListeners('end', { point, context });
    el.dispatchEvent(new Event('end'));
  };
  const cancel = (point, context) => {
    clearTimeout(context._timer);
    invokeListeners('cancel', { point, context });
    el.dispatchEvent(new Event('cancel'));
  };

  //mouse
  const mouseId = Symbol('mouse');
  const mousedown = event => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    start(event, contexts[mouseId] = createContext(event));
  }
  const mousemove = event => {
    contexts[mouseId].origin = event;
    move(event, contexts[mouseId]);
  }
  const mouseup = event => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    contexts[mouseId].origin = event;
    end(event, contexts[mouseId]);
    delete contexts[mouseId];
  }
  el.addEventListener('mousedown', mousedown);

  //touch
  const touchstart = event => {
    for (const touch of event.changedTouches) {
      start(touch, contexts[touch.identifier] = createContext(event))
    }
  }
  const touchmove = event => {
    for (const touch of event.changedTouches) {
      contexts[touch.identifier].origin = event;
      move(touch, contexts[touch.identifier])
    }
  }
  const touchend = event => {
    for (const touch of event.changedTouches) {
      contexts[touch.identifier].origin = event;
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  }
  const touchcancel = event => {
    for (const touch of event.changedTouches) {
      contexts[touch.identifier].origin = event;
      cancel(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  }
  el.addEventListener('touchstart', touchstart);
  el.addEventListener('touchmove', touchmove);
  el.addEventListener('touchend', touchend);
  el.addEventListener('touchcancel', touchcancel);

  // enable tap,press,pan,flick
  [enableTap, enablePress, enablePan, enableFlick].forEach(enableG => enableG(listen, emit));
}

function enableTap(listen, emit) {
  listen('end', ({ context }) => {
    if (!context.moved && context.getTimeZone() === 0) {
      emit(new Event('tap'));
    }
  })
}
const pressSymbol = Symbol('press');

function enablePress(listen, emit) {
  listen('timezone', ({ context }) => {
    if (!context.moved) {
      context[pressSymbol] = Object.create(null);
      const e = new Event('pressstart');
      e.context = context;
      emit(e);
    }
  })
  listen('firstMove,cancel', ({ context }) => {
    const pressContext = context[pressSymbol];
    if (pressContext) {
      const e = new Event('presscancel');
      e.context = context;
      emit(e);
    }
  })
  listen('end', ({ context }) => {
    const pressContext = context[pressSymbol];
    if (pressContext && !context.moved) {
      const e = new Event('pressend');
      e.context = context;
      emit(e);
    }
  })
}

const panSymbol = Symbol('pan');

function enablePan(listen, emit) {
  listen('firstMove', ({ context }) => {
    context[panSymbol] = Object.create(null);
    const e = new Event('panstart');
    e.origin = context.origin;
    e.dx = context.dx;
    e.dy = context.dy;
    emit(e);
  })
  listen('move', ({ context }) => {
    const panContext = context[panSymbol];
    if (panContext) {
      const e = new Event('pan');
      e.origin = context.origin;
      e.dx = context.dx;
      e.dy = context.dy;
      emit(e);
    }
  })
  listen('end', ({ context }) => {
    const panContext = context[panSymbol];
    if (panContext) {
      const e = new Event('panend');
      e.origin = context.origin;
      e.dx = context.dx;
      e.dy = context.dy;
      e.isFlick = context.getSpeed() > flickSpeed;

      console.log('emit panend');
      emit(e);
    }
  })
  listen('cancel', ({ context }) => {
    const panContext = context[panSymbol];
    if (panContext) {
      const e = new Event('pancancel');
      e.origin = context.origin;
      emit(e);
    }
  })
}

function enableFlick(listen, emit) {
  listen('end', ({ context }) => {
    if (context.moved) {
      console.log('speed', context.getSpeed());
      if (context.getSpeed() > flickSpeed) {
        const e = new Event('flick');
        e.dx = context.dx;
        e.dy = context.dy;
        emit(e);
      }
    }
  })
}
//todo 换 isTab 风格再实现一遍
//?? isTab 风格有重复么？
/**
 * test
 *
 * tap:
 *  start(0,0).then(time:100).then(end(0,0))
 * pressstart:
 *  start(0,0).then(time:500).then(end(0,0))
 * presscancel:
 *  start(0,0).then(time:500).then(move(10,0))
 * pressend:
 *  start(0,0).then(time:500).then(end(0,0))
 *
 * panstart:
 *  start(0,0).then(move(10,0))
 * pan:
 *  start(0,0).then(move(10,0))
 * panend:
 *  start(0,0).then(move(10,0)).then(end())
 *
 * pancancel:
 *  start(0,0).then(move(10,0)).then(cancel())
 *
 * flick:
 *  start(0,0).then(move(10,0)).then(end())
 */

/**
 * 问题 监听作用域
 */