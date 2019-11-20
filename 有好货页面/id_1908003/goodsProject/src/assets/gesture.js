/**
 * 启动自定义手势事件
 * panstart 平滑滑动开始
 * pan 平滑滑动
 * panend 平滑滑动结束
 * flick 快速滑动
 * tap 轻点
 * press 长按
 * pressend 长按结束
 * presscancel 长按取消
 */

// 能力检测
let useTouch = false;
try {
  document.createEvent('TouchEvent');
  useTouch = true;
} catch (err) {
  useTouch = false;
}

// 适合做索引
const contexts = Object.create(null);
const mouseSymbol = Symbol('mouse');

const start = (point, context) => {
  context.startX = point.clientX;
  context.startY = point.clientY;
  context.gestureEle = point.currentTarget || point.target;
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
    context.gestureEle.dispatchEvent(e);
  }, 3000);
};

const move = (point, context) => {
  context.dx = point.clientX - context.startX;
  context.dy = point.clientY - context.startY;
  if (context.isPan) {
    const e = new Event('pan');
    Object.assign(e, context);
    context.gestureEle.dispatchEvent(e);
  } else if ((context.dx * context.dx + context.dy * context.dy) > 100) {
    if (context.pressTimer) {
      clearInterval(context.pressTimer);
      context.pressTimer = null;
    }
    if (context.isPress) {
      context.isPress = false;
      const e = new Event('presscancel');
      Object.assign(e, context);
      context.gestureEle.dispatchEvent(e);
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
    context.gestureEle.dispatchEvent(e);
  }
};

// @ts-ignore
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
    context.gestureEle.dispatchEvent(e);
  }

  if (context.isTap) {
    const e = new Event('tap');
    context.gestureEle.dispatchEvent(e);
  }

  if (context.isPan) {
    const e = new Event('panend');
    Object.assign(e, context);
    context.gestureEle.dispatchEvent(e);
  }

  if (context.isPress) {
    const e = new Event('pressend');
    Object.assign(e, context);
    context.gestureEle.dispatchEvent(e);
  }
};

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

/**
 * touchstart
 * @param {TouchEvent} event 
 */
function touchstart(event) {
  let touch;

  if (event.changedTouches.length >= 1) {
    touch = event.changedTouches.item(0);
  } else {
    touch = event.touches.item(0);
  }
  this.contexts[touch.identifier] = {};
  // @ts-ignore
  touch.currentTarget = event.currentTarget;
  start(touch, this.contexts[touch.identifier]);
}

/**
 * touchmove
 * @param {TouchEvent} event 
 */
function touchmove(event) {
  let touch;

  if (event.changedTouches.length >= 1) {
    touch = event.changedTouches.item(0);
  } else {
    touch = event.touches.item(0);
  }

  move(touch, this.contexts[touch.identifier]);
}

/**
 * touchend
 * @param {TouchEvent} event 
 */
function touchend(event) {
  let touch;

  if (event.changedTouches.length >= 1) {
    touch = event.changedTouches.item(0);
  } else {
    touch = event.touches.item(0);
  }

  end(touch, this.contexts[touch.identifier]);
  delete this.contexts[touch.identifier];
}

/**
 * touchcancel
 * @param {TouchEvent} event 
 */
function touchcancel(event) {
  let touch;

  if (event.targetTouches.length >= 1) {
    touch = event.targetTouches.item(0);
  } else {
    touch = event.touches.item(0);
  }

  // console.log('cancel', touch.clientX, touch.clientY);
  this.contexts[touch.identifier] = null;
}

class Gesture {
  constructor(ele) {
    this.$el = ele;
    this.contexts = Object.create(null);
    this.useTouch = useTouch;
    this.eventList = {
      mouseStart: mouseStart,
      touchstart: touchstart.bind(this),
      touchmove: touchmove.bind(this),
      touchend: touchend.bind(this),
      touchcancel: touchcancel.bind(this),
    };
  }

  enable() {
    const { mouseStart, touchstart, touchmove, touchend, touchcancel } = this.eventList;

    if (!this.useTouch) {
      this.$el.addEventListener('mousedown', mouseStart);
    }

    this.$el.addEventListener('touchstart', touchstart, { passive: false });
    this.$el.addEventListener('touchmove', touchmove, { passive: false });
    this.$el.addEventListener('touchend', touchend);
    this.$el.addEventListener('touchcancel', touchcancel);
  }

  disable() {
    const { mouseStart, touchstart, touchmove, touchend, touchcancel } = this.eventList;

    this.$el.removeEventListener('touchstart', touchstart);
    this.$el.removeEventListener('touchmove', touchmove);
    this.$el.removeEventListener('touchend', touchend);
    this.$el.removeEventListener('touchcancel', touchcancel);
    this.$el.removeEventListener('mousedown', mouseStart);

  }
}

export default Gesture;

// export default {
//   /**
//    * 启用拖拽
//    * @param {Element} el 绑定事件的元素
//    */
//   enableGesture(el) {
//     if (useTouch) {
//       el.addEventListener('touchstart', (event) => {
//         event.preventDefault();
//       });
//       console.log(el);
//       // 创建一个上下文
//       const contexts = Object.create(null);

//       el.addEventListener('touchstart', (evt) => {
//         // @ts-ignore
//         touchstart(evt, contexts);
//       }, { passive: false });
//       el.addEventListener('touchmove', (evt) => {
//         // @ts-ignore
//         touchmove(evt, contexts);
//       }, { passive: false });
//       el.addEventListener('touchend', (evt) => {
//         // @ts-ignore
//         touchend(evt, contexts);
//       });
//       el.addEventListener('touchcancel', (evt) => {
//         // @ts-ignore
//         touchcancel(evt, contexts);
//       });
//     } else {
//       el.addEventListener('mousedown', mouseStart);
//     }
//   },
//   /**
//    * 取消拖拽
//    * @param {Element} el 绑定事件元素
//    */
//   disableGesture(el) {
//     // 删除相关上下文

//     // @ts-ignore
//     el.removeEventListener('touchstart', touchstart);
//     el.removeEventListener('touchmove', touchmove);
//     el.removeEventListener('touchend', touchend);
//     el.removeEventListener('touchcancel', touchcancel);
//     el.removeEventListener('mousedown', mouseStart);
//   },
// };
