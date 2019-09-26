/**
 * 手势库
 * 支持移动端 tap轻触 pan拖拽 press按压
 * @param {object} main 
 */
function enableGesture(main) {
  // 抹平鼠标事件和touch事件的差异
  let start = (point, context) => {
    // console.log('start');
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.startTime = Date.now();
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    // 长按，手移动开变成pan
    context.pressHandler = setTimeout(() => {
      context.isPress = true;
      context.isTap = false;
      let e = new Event('pressstart');
      main.dispatchEvent(e);
      context.pressHandler = null;
    }, 500);
  }

  let move = (point, context) => {
    let dx = point.clientX - context.startX; // x轴位移
    let dy = point.clientY - context.startY; // y轴位移

    /*
    // 如果水平移动距离大于图片一半宽度时，则停止移动
    if (Math.abs(dx) > main.clientWidth / 2)
        return;
    */

    // 如果x、y移动距离之和大于100，则就不是tap而是pan
    if (dx * dx + dy * dy > 100) {
      if (context.pressHandler !== null) {
        // 如果pressHandler存在，则将其清除
        clearTimeout(context.pressHandler);
        context.pressHandler = null;
        context.isPress = false;
      } else if (context.isPress) {
        let e = new Event('presscancel');
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
        // 注册panstart事件
        let e = new Event('panstart');
        e.startX = context.startX;
        e.startY = context.startY;
        main.dispatchEvent(e);
        context.isPan = true;
      }
    }

    if (context.isPan) {
      // 注册pan事件
      let e = new Event('pan');
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  }

  let end = (point, context) => {
    if (context.pressHandler !== null) {
      clearTimeout(context.pressHandler);
    }
    // console.log('end');
    if (context.isPress) {
      let e = new Event('pressend');
      main.dispatchEvent(e);
    }
    if (context.isTap) {
      let e = new Event('tap');
      main.dispatchEvent(e);
    }
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
    // console.log(v);
    if (context.isPan && v > 0.3) {
      context.isFlick = true;
      let e = new Event('flick');
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      let e = new Event('panend');
      e.dx = dx;
      e.dy = dy;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      e.isFlick = context.isFlick;
      main.dispatchEvent(e);
    }
  }

  let cancel = (point, context) => {
    if (context.isPan) {
      let e = new Event('pancancel');
      main.dispatchEvent(e);
    }
    if (context.isPress) {
      let e = new Event('presscancel');
      main.dispatchEvent(e);
    }
    if (context.pressHandler !== null) {
      // touchcancel时如果，pressHandler不为null
      // 则说明当前不是pan状态, 触发pancancel事件
      // 并清除pressHandler
      let e = new Event('pancancel');
      main.dispatchEvent(e);
      clearTimeout(context.pressHandler);
    }
  }

  // 全局contexts  解决 多根手指的问题
  // 凡是用hash表的都用Object.create
  let contexts = Object.create(null);
  let mouseSymbol = Symbol('mouse'); // 鼠标只有1个

  let mousedown = event => {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    contexts[mouseSymbol] = Object.create(null);
    start(event, contexts[mouseSymbol]);
  };

  let mousemove = event => {
    move(event, contexts[mouseSymbol]);
  };

  let mouseup = event => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    end(event, contexts[mouseSymbol]);
    delete contexts[mouseSymbol];
  };
  // clientX 相对于视口，不会轻易变动
  main.addEventListener('mousedown', mousedown);


  let touchstart = event => {
    // TouchEvent.changedTouches
    // 一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，
    // 状态发生了改变的触点的 Touch 对象。 https://developer.mozilla.org/zh-CN/docs/Web/API/Touch
    for (let touch of event.changedTouches) {
      // Touch.identifier
      // 此 Touch 对象的唯一标识符. 一次触摸动作(我们指的是手指的触摸)在平面上移动的整个过程中, 该标识符不变. 
      // 可以根据它来判断跟踪的是否是同一次触摸过程. 只读属性.
      contexts[touch.indentifier] = Object.create(null);
      start(touch, contexts[touch.indentifier]);
    }
  }

  let touchmove = event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.indentifier]);
    }
  }

  // 注意touchcancel和touchend的区别
  let touchend = event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.indentifier]);
      delete contexts[touch.indentifier]; // 防止contexts中的对象积累过多
    }
  }

  let touchcancel = event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.indentifier]);
      delete contexts[touch.identifier];
    }
  }

  // clientX 相对于视口，不会轻易变动
  main.addEventListener('touchstart', touchstart);
  main.addEventListener('touchmove', touchmove);
  main.addEventListener('touchend', touchend);
  main.addEventListener('touchcancel', touchcancel);
}

export {
  enableGesture
}