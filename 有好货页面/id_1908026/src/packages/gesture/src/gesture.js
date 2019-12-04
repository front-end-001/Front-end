/**
 * 启用手势操作
 *
 * panstart 平滑滑动开始
 * pan 平滑滑动
 * panend 平滑滑动结束
 * flick 快速滑动
 * tap 轻点
 * press 长按
 * pressend 长按结束
 * presscancel 长按取消
 * @export
 * @param {*} el
 * @param {*} [options={
 *     panDistance: 10,
 *     flickSpeed: 0.3,
 *     pressDuration: 500,
 *     log: false
 *   }] 基本参数
 */
export default class Gesture {
  constructor(
    options = {
      panDistance: 10,
      flickSpeed: 0.3,
      pressDuration: 500,
      log: false
    }
  ) {
    this.options = options;
    this.events = {};
    this.log = options.log;
    this.init();
  }

  init() {
    const contexts = Object.create(null);
    const mouseSymbol = Symbol("mouse");
    this.events["mousemove"] = event => {
      event.preventDefault();
      this.move(event, contexts[mouseSymbol]);
    };

    this.events["mouseend"] = event => {
      document.removeEventListener("mousemove", this.events["mousemove"]);
      document.removeEventListener("mouseup", this.events["mouseend"]);
      this.end(event, contexts[mouseSymbol]);
      delete contexts[mouseSymbol];
    };

    this.events["mousestart"] = event => {
      event.preventDefault();
      document.addEventListener("mousemove", this.events["mousemove"]);
      document.addEventListener("mouseup", this.events["mouseend"]);
      contexts[mouseSymbol] = Object.create(null);
      this.start(event, contexts[mouseSymbol]);
    };

    this.events["touchstart"] = event => {
      if (event.changedTouches.length > 1) {
        return false;
      }
      for (const touch of event.changedTouches) {
        touch.currentTarget = event.currentTarget;
        contexts[event.identifier] = Object.create(null);
        this.start(touch, contexts[event.identifier]);
      }
    };

    this.events["touchmove"] = event => {
      if (event.changedTouches.length > 1) {
        return false;
      }
      for (const touch of event.changedTouches) {
        this.move(touch, contexts[event.identifier]);
      }
    };

    this.events["touchend"] = event => {
      if (event.changedTouches.length > 1) {
        return false;
      }
      for (const touch of event.changedTouches) {
        this.end(touch, contexts[event.identifier]);
        delete contexts[event.identifier];
      }
    };

    this.events["touchcancel"] = event => {
      if (event.changedTouches.length > 1) {
        return false;
      }
      for (const touch of event.changedTouches) {
        this.cancel(touch, contexts[event.identifier]);
      }
    };
  }

  enable(el) {
    if (el == null) throw new Error("el is required");
    let useTouch = false;
    try {
      document.createEvent("TouchEvent");
      useTouch = true;
    } catch (err) {
      useTouch = false;
    }

    if (useTouch) {
      el.addEventListener("touchstart", this.events["touchstart"], {
        passive: false
      });
      el.addEventListener("touchmove", this.events["touchmove"], {
        passive: false
      });
      el.addEventListener("touchend", this.events["touchend"]);
      el.addEventListener("touchcancel", this.events["touchcancel"]);
      // el.addEventListener("touchstart", event => {
      //   event.preventDefault();
      // });
      // document.addEventListener("touchmove", event => event.preventDefault(), {
      //   passive: false
      // });
    } else {
      el.addEventListener("mousedown", this.events["mousestart"]);
    }

    return () => {
      el.removeEventListener("mousedown", this.events["mousestart"]);
      el.removeEventListener("touchstart", this.events["touchstart"]);
      el.removeEventListener("touchmove", this.events["touchmove"]);
      el.removeEventListener("touchend", this.events["touchend"]);
      el.removeEventListener("touchcancel", this.events["touchcancel"]);
    };
  }

  start(point, context) {
    context.el = point.currentTarget || point.target;
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.startTime = Date.now();
    context.pressHandler = setTimeout(() => {
      context.isPress = true;
      context.isTap = false;
      const e = new Event("press");
      this.log && console.log("press");
      context.el.dispatchEvent(e);
      context.pressHandler = null;
    }, this.options.pressDuration);
  }

  move(point, context) {
    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;

    if (
      dx * dx + dy * dy >
      this.options.panDistance * this.options.panDistance
    ) {
      if (context.pressHandler !== null) {
        clearTimeout(context.pressHandler);
        context.pressHandler = null;
        context.isPress = false;
      } else if (context.isPress) {
        // press之后move
        context.isPress = false;
        const e = new Event("presscancel");
        this.log && console.log("presscancel");
        context.el.dispatchEvent(e);
      }

      context.isTap = false;

      if (context.isPan === false) {
        context.isPan = true;
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isVertical = false;
          context.isHorizontal = true;
        } else {
          context.isVertical = true;
          context.isHorizontal = false;
        }
        const e = new Event("panstart");
        this.log && console.log("panstart");
        e.startX = context.startX;
        e.startY = context.startY;
        context.el.dispatchEvent(e);
      }
    }

    if (context.isPan) {
      const e = new Event("pan");
      // TODO: 轮播抓住以后开始移动会因为不会判断为pan而卡顿一下,l 10 并不是一个准确数字
      if (dx > 0) {
        e.dx = dx - this.options.panDistance;
      } else {
        e.dx = dx + this.options.panDistance;
      }

      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      this.log && console.log("pan");
      context.el.dispatchEvent(e);
    }
  }

  end(point, context) {
    if (context.pressHandler !== null) {
      clearTimeout(context.pressHandler);
    }
    if (context.isPress) {
      const e = new Event("pressend");
      this.log && console.log("pressend");
      context.el.dispatchEvent(e);
    }
    if (context.isTap) {
      const e = new Event("tap");
      this.log && console.log("tap");
      context.el.dispatchEvent(e);
    }
    const dx = point.clientX - context.startX;
    const dy = point.clientY - context.startY;
    const v = Math.sqrt(dx * dx, dy * dy) / (Date.now() - context.startTime);

    if (context.isPan && v > this.options.flickSpeed) {
      context.isFlick = true;
      const e = new Event("flick");
      this.log && console.log("flick");
      e.dx = dx;
      e.dy = dy;
      context.el.dispatchEvent(e);
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      const e = new Event("panend");
      this.log && console.log("panend");
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      e.isFlick = context.isFlick;
      context.el.dispatchEvent(e);
    }
  }

  cancel(point, context) {
    if (context.isPan) {
      const e = new Event("pancancel");
      context.el.dispatchEvent(e);
    }
    if (context.isPress) {
      const e = new Event("presscancel");
      context.el.dispatchEvent(e);
    }
    if (context.pressHandler !== null) {
      const e = new Event("pancancel");
      context.el.dispatchEvent(e);
      clearTimeout(context.pressHandler);
    }
  }
}
