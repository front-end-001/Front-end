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
export default (function () {
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
  const touchstart = (event) => {
    let touch;

    if (event.changedTouches.length >= 1) {
      touch = event.changedTouches.item(0);
    } else {
      touch = event.touches.item(0);
    }

    contexts[touch.identifier] = {};
    touch.currentTarget = event.currentTarget;
    start(touch, contexts[touch.identifier]);
  };

  /**
   * touchmove
   * @param {TouchEvent} event 
   */
  const touchmove = (event) => {
    let touch;

    if (event.changedTouches.length >= 1) {
      touch = event.changedTouches.item(0);
    } else {
      touch = event.touches.item(0);
    }

    move(touch, contexts[touch.identifier]);
  };

  /**
   * touchend
   * @param {TouchEvent} event 
   */
  const touchend = (event) => {
    let touch;

    if (event.changedTouches.length >= 1) {
      touch = event.changedTouches.item(0);
    } else {
      touch = event.touches.item(0);
    }

    end(touch, contexts[touch.identifier]);
    delete contexts[touch.identifier];
  };

  /**
   * touchcancel
   * @param {TouchEvent} event 
   */
  const touchcancel = (event) => {
    let touch;

    if (event.targetTouches.length >= 1) {
      touch = event.targetTouches.item(0);
    } else {
      touch = event.touches.item(0);
    }

    console.log('cancel', touch.clientX, touch.clientY);
    delete contexts[touch.identifier];
  };

  return {
    /**
     * 启用拖拽
     * @param {Element} el 绑定事件的元素
     */
    enableGesture(el) {
      // 能力检测
      let useTouch = false;
      try {
        document.createEvent('TouchEvent');
        useTouch = true;
      } catch (err) {
        useTouch = false;
      }

      // if (window.PointerEvent) { 
      //   // Pointer events are supported. 
      //   alert('支持 pointer 事件');
      // }

      if (useTouch) {
        el.addEventListener('touchstart', (event) => {
          event.preventDefault();
        });

        el.addEventListener('touchstart', touchstart, {passive:false});
        el.addEventListener('touchmove', touchmove, {passive:false});
        // el.addEventListener('pointermove', touchmove, {passive:false});
        el.addEventListener('touchend', touchend);
        el.addEventListener('touchcancel', touchcancel);
        // alert('add mousemove')
      } else {
        el.addEventListener('mousedown', mouseStart);
      }
    },
    /**
     * 取消拖拽
     * @param {Element} el 绑定事件元素
     */
    disableGesture(el) {
      el.removeEventListener('touchstart', touchstart);
      el.removeEventListener('touchmove', touchmove);
      el.removeEventListener('touchend', touchend);
      el.removeEventListener('touchcancel', touchcancel);
      el.removeEventListener('mousedown', mouseStart);
    },
  };
}());
