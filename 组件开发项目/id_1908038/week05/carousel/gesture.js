//手势库
function enableGesture(main) {
  //逻辑代码
  let start = (point, context) => {
    //记录坐标
    context.startX = point.clientX;
    context.startY = point.clientY;

    context.startTime = Date.now();

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    context.pressHandler = setTimeout(() => {
      context.isPress = true;
      context.isTap = false;
      let e = new Event("press");
      main.dispatchEvent(e);
      context.pressHandler = null;
    }, 500);
  };


  let move = (point, context) => {

    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY; //displacementX, displacementY差值
    if (dx * dx + dy * dy > 100) {
      
      if (context.pressHandler !== null) {
        clearTimeout(context.pressHandler);
        context.pressHandler = null;
        context.isPress = false;
      } else if (context.isPress) {
        context.isPress = false;
        let e = new Event("presscancel");
        main.dispatchEvent(e);
      }

      context.isTap = false;
      
      if (context.isPan == false) {
        //垂直和水平的逻辑
        if (Math.abs(dx) > Math.abs(dy)) {
          context.isVertical = false;
          context.isHorizontal = true;
        } else {
          context.isVertical = true;
          context.isHorizontal = false;
        }
        console.log("pan", dx, dy);
        let e = new Event("panstart"); //触发事件
        e.startX = context.startX;
        e.startY = context.startY;
        main.dispatchEvent(e);
        context.isPan = true;
      }
    }
    if (context.isPan) {
      let e = new Event("pan"); //触发事件
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    }
  };

  let end = (point, context) => {

    if (context.pressHandler !== null) {
      clearTimeout(context.pressHandler);
    }
    if (context.isPress) {
      let e = new Event("pressend");
      main.dispatchEvent(e);
    }
    if (context.isTap) {
      let e = new Event("tap");
      main.dispatchEvent(e);
    }
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;

    let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
    //console.log(v);
    if (context.isPan && v > 0.3) {
      context.isFlick = true;
      let e = new Event("flick");
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
    } else {
      context.isFlick = false;
    }
    if (context.isPan) {
      let e = new Event("panend");
      e.dx = dx;
      e.dy = dy;
      e.isFlick = context.isFlick;
      e.isHorizontal = context.isHorizontal;
      e.isVertical = context.isVertical;
      main.dispatchEvent(e);
    }
  };

  let cancel = (point, context) => {
    if (context.isPan) {
      let e = new Event("pancancel"); //触发事件
      main.dispatchEvent(e);
    }
    if (context.isPress) {
      let e = new Event("presscancel")
      main.dispatchEvent(e);
    }
    if (context.pressHandler !== null) {
      let e = new Event("pancancel");
      main.dispatchEvent(e);
      clearTimeout(context.pressHandler);
    }
  };

  let contexts = Object.create(null); //用来做哈希表的object，都要这么做

  let mouseSymbol = Symbol("mouse");

  let mouseDown = event => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUP);
    contexts[mouseSymbol] = Object.create(null);
    start(event, contexts[mouseSymbol]);
  };

  let mouseMove = event => {
    move(event, contexts[mouseSymbol]);
  };

  let mouseUP = event => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUP);
    end(event, contexts[mouseSymbol]);
    delete contexts[mouseSymbol];
  };
  main.addEventListener("mousedown", mouseDown);


  let touchStart = event => {

    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }

  };

  let touchMove = event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  };

  let touchEnd = event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  };

  let touchCancel = event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  };

  main.addEventListener("touchstart", touchStart);
  main.addEventListener("touchmove", touchMove);
  main.addEventListener("touchend", touchEnd);
  main.addEventListener("touchcancel", touchCancel);

  document.addEventListener("touchmove", event => event.preventDefault(), {passive:false});
}