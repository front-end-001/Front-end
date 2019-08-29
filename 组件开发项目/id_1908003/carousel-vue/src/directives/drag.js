/**
 * 拖拽指令
 */

/**
 * 拖拽相关事件 shim
 * 启用后,监听 drag 相关事件, dragstart drag dragend
 */
const dragUtils = (function enableDrag() {

  // 适合做索引
  const contexts = Object.create(null);
  const mouseSymbol = Symbol('mouse');

  const start = (point, context) => {
    context.identifier = generateID();
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isPan = false;
    context.dragEle = point.currentTarget || point.target;
    context.containerEle = context.dragEle.parentElement;
    // 获取父元素区域和拖拽元素区域
    const rectTarget = context.dragEle.getBoundingClientRect();
    const rectContainer = context.containerEle.getBoundingClientRect();
    context.range = {
      minX: 0,
      minY: 0,
      maxX: rectContainer.width - rectTarget.width,
      maxY: rectContainer.height - rectTarget.height,
    };
    context.dx = 0;
    context.dy = 0;
  };

  const move = (point, context) => {
    let dx = point.clientX - context.startX;
    if (dx < context.range.minX) {
      dx = context.range.minX;
    } else if (dx > context.range.maxX) {
      dx = context.range.maxX;
    }
    let dy = point.clientY - context.startY;
    if (dy < context.range.minY) {
      dy = context.range.minY;
    } else if (dy > context.range.maxY) {
      dy = context.range.maxY;
    }

    context.dx = dx;
    context.dy = dy;
    if (context.isPan) {
      const e = new Event('drag');
      Object.assign(e, context);
      context.dragEle.dispatchEvent(e);
    } else if ((context.dx * context.dx + context.dy * context.dy) > 100) {
      context.isPan = true;
      const e = new Event('dragstart');
      Object.assign(e, context);
      context.dragEle.dispatchEvent(e);
    }
  }

  const end = (point, context) => {
    if (context.isPan) {
      const e = new Event('dragend');
      Object.assign(e, context);
      context.dragEle.dispatchEvent(e);
    }
  };

  const mouseStart = (event) => {
    event.preventDefault();
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    contexts[mouseSymbol] = {};
    start(event, contexts[mouseSymbol]);
  };

  const mousemove = (event) => {
    event.preventDefault();
    move(event, contexts[mouseSymbol]);
  };

  const mouseup = (event) => {
    event.preventDefault();
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    end(event, contexts[mouseSymbol]);
  };

  const touchstart = (event) => {
    event.preventDefault();
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
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  };

  return {
    /**
     * 启用拖拽
     * @param {Element} el 绑定事件的元素
     */
    enableDrag(el) {
      // 能力检测
      let useTouch = false;
      try {
        document.createEvent('TouchEvent');
        useTouch = true;
      } catch (err) {
        useTouch = false;
      }

      if (useTouch) {
        el.addEventListener('touchstart', touchstart);
        el.addEventListener('touchmove', touchmove);
        el.addEventListener('touchend', touchend);
        el.addEventListener('touchcancel', touchcancel);
      } else {
        el.addEventListener('mousedown', mouseStart);
      }
    },
    /**
     * 取消拖拽
     * @param {Element} el 绑定事件元素
     */
    disableDrag(el) {
      el.removeEventListener('touchstart', touchstart);
      el.removeEventListener('touchmove', touchmove);
      el.removeEventListener('touchend', touchend);
      el.removeEventListener('touchcancel', touchcancel);
      el.removeEventListener('mousedown', mouseStart);

    },
  };
})();

/** 缓存上下文 */
const contexts = Object.create(null);

/**
 * 创建随机 ID, 默认 6 位
 * @param {number} n id 字符数
 */
const generateID = (n = 6) => {
  let str = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < n; i++) {
    str += chars.charAt(Math.floor(Math.random() * 62));
  }
  return str;
};

export default {
  /**
   * 被绑定元素插入父节点时调用
   * @param {Element} el 操作的元素
   * @param {any} binding https://cn.vuejs.org/v2/guide/custom-directive.html
   */
  inserted(el) {

    // 开启拖拽
    dragUtils.enableDrag(el);

    el.addEventListener('dragstart', (event) => {
      // @ts-ignore
      contexts[event.identifier] = {
        dx: 0,
        dy: 0,
      };
      const dragRender = () => {
        requestAnimationFrame(() => {
          // @ts-ignore
          const contex = contexts[event.identifier];
          if (!contex) {
            // @ts-ignore
            el.style.transform = '';
            return;
          }

          // @ts-ignore
          el.style.transform = `translate(${ contex.dx }px, ${ contex.dy }px)`;
          dragRender()
        });
      };
      dragRender();
    });

    el.addEventListener('drag', (event) => {
      // @ts-ignore
      contexts[event.identifier].dx = event.dx;
      // @ts-ignore
      contexts[event.identifier].dy = event.dy;
    });

    el.addEventListener('dragend', (event) => {
      // @ts-ignore
      delete contexts[event.identifier];
    });
  },

  unbind(el) {
    dragUtils.disableDrag(el);
  }
};
