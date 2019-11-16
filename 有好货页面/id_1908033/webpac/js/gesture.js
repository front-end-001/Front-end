export function enableGesture(main) {
    let start = (point, context) => {
      // console.log("start", point.clientX, point.clientY);
      context.startX = point.clientX;
      context.startY = point.clientY;
      context.startTime = Date.now();//保存开始时间

      context.isTap = true; // 点击事件 默认为 true
      context.isPan = false; // 移动拖拽事件 默认为 false

      context.isPress = false;// 长按操作
      context.pressHandler =  setTimeout(() => {
        context.isPress = true;
        context.isTap = false;
        let e = new Event("pressstart"); // 添加事件
       
        main.dispatchEvent(e); // 触发事件
        context.pressHandler = null;
      },500)
    };
    let move = (point, context) => {
      // console.log("move", point.clientX, point.clientY);
      let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY; //计算差值，手指移动的距离


      if (Math.abs(dx) > 10 ||Math.abs(dy) > 10 ) {
          
        if(context.pressHandler !== null){
            clearTimeout(context.pressHandler);
            context.pressHandler = null;
            context.isPress = false;
        }else if(context.isPress){
            context.isPress = false;
            let e = new Event("presscancel");
            main.dispatchEvent(e);
        }
        context.isTap = false;

        if (context.isPan == false) {
            if(Math.abs(dx)>Math.abs(dy)){//第一次进来的时候对比dx和dy判断水平还是垂直移动
                context.isVertical = false;//垂直方向
                context.isHorizontal = true;//水平方向
            }else{
                context.isVertical = true;//垂直方向
                context.isHorizontal = false;//水平方向
            }


          let e = new Event("panstart"); // 添加事件
          main.dispatchEvent(e); // 触发事件
          e.startX = context.startX;
          e.startY = context.startY;
          context.isPan = true;


          
        }
      }
      if (context.isPan) {
        // console.log("pan",dx,dy);
        let e = new Event("pan"); // 添加事件
        e.dx = dx;
        e.dy = dy;
        e.isVertical = context.isVertical; //  将 isVertical 暴露到事件上
        e.isHorizontal = context.isHorizontal;//  将 isHorizontal 暴露到事件上

        main.dispatchEvent(e); // 触发事件
      }

      // console.log(dx,dy);
    };
    let end = (point, context) => {
        if(context.pressHandler !== null){
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
        dy = point.clientY - context.startY; //计算差值，手指移动的距离
        let v = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);
        // console.log(v)
      if (context.isPan && v > 0.3) {
          context.isFlick = true;
        let e = new Event("flick");
        e.dx = dx;
        e.dy = dy
        main.dispatchEvent(e);
      }else{
        context.isFlick = false;
      }
      if (context.isPan) {
        let e = new Event("panend");
        // let dx = point.clientX - context.startX,
        //   dy = point.clientY - context.startY; //计算差值，手指移动的距离
        e.dx = dx;
        e.dy = dy;
        e.isVertical = context.isVertical; //  将 isVertical 暴露到事件上
        e.isHorizontal = context.isHorizontal;//  将 isHorizontal 暴露到事件上

        e.isFlick =  context.isFlick;

        main.dispatchEvent(e);
      }
    };
    let cancel = (point, context) => {
      if (context.isPan) {
        //   console.log("pannedcancel");
        let e = new Event("pancancel");
        main.dispatchEvent(e);
      }
      if (context.isPress) {
        let e = new Event("presscancel");
        main.dispatchEvent(e);
      }
      if(context.pressHandler !== null){
        let e = new Event("presscancel");
        main.dispatchEvent(e);
        clearTimeout(context.pressHandler);
    }
    };

    let contexts = Object.create(null);
    let mouseSymbol = Symbol("mouse");

    let mousedown = event => {
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
      contexts[mouseSymbol] = Object.create(null);
      start(event, contexts[mouseSymbol]);
    };
    let mousemove = event => {
      move(event, contexts[mouseSymbol]);
    };
    let mouseup = event => {
      // 鼠标一般只能连接一个，所以这里不需要context
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      end(event, contexts[mouseSymbol]);
      delete contexts[mouseSymbol];
    };

    main.addEventListener("mousedown", mousedown);

    let touchstart = event => {
      for (let touch of event.changedTouches) {
        contexts[touch.identifier] = Object.create(null);
        start(touch, contexts[touch.identifier]);
      }
    };
    let touchmove = event => {
      for (let touch of event.changedTouches) {
        move(touch, contexts[touch.identifier]);
      }
    };
    let touchend = event => {
      for (let touch of event.changedTouches) {
        end(touch, contexts[touch.identifier]);
        delete contexts[touch.identifier];
      }
    };
    let touchcancel = event => {
      for (let touch of event.changedTouches) {
        end(touch, contexts[touch.identifier]);
        delete contexts[touch.identifier];
      }
    };

    main.addEventListener("touchstart", touchstart);
    main.addEventListener("touchmove", touchmove);
    main.addEventListener("touchend", touchend);
    main.addEventListener("touchcancel", touchcancel);
  }
