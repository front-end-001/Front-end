function Gesture(main) {
	const contexts = Object.create(null)
	const mouseSymbol = Symbol('mouse')
	const start = (point, context) => { // 起点坐标
		context.startX = point.clientX;
    context.startY = point.clientY;
		context.startTime = new Date();
    context.isTap = true;
    context.isPan = false;
    context.isFlick = false;
    context.pressHandler = setTimeout(() => { // 长按事件开始
    	context.isPress = true;
    	context.isTap = false;
    	let e = new Event("pressstart");
      main.dispatchEvent(e);
      context.pressHandler = null;
    })
	}
	const move = (point, context) => { // 移动坐标
		let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
		if (dx * dx + dy * dy > 100) {
      context.isTap = false;
      
      // 处理长时间点击的事件，如果定时器变量为null表明长按出错如果在滑动中且isPress为true则表明已经不是长按事件了
      if (context.pressHandler !== null) {
				clearTimeout(context.pressHandler);
				context.pressHandler = null;
				context.isPress = false
      } else if (context.isPress) {
      	context.isPress = false;
      	let e = new Event('presscancel')
      	main.dispatchEvent(e)
      }
			
			// 触发移动开始的事件
      if (context.isPan == false) {
        let e = new Event("panstart"); // 
        e.startX = context.startX;
        e.startY = context.startY;
        main.dispatchEvent(e);
        context.isPan = true;
      }
  	}
  	// 触发移动中的事件
  	if (context.isPan) {
      let e = new Event("pan");
      e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
  	}

	}
	const end = (point, context) => { // 终点坐标
		if(context.pressHandler !== null) {
      clearTimeout(context.pressHandler);
    }
		if (context.isTap) {// 点击事件
			let e = new Event("tap");
      main.dispatchEvent(e);
		}

		if (context.isPress) { // 长按事件结束
			let e = new Event("pressend");
      main.dispatchEvent(e);
		}

		let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
		let v = Math.sqrt(dx * dx + dy * dy) / (new Date() - context.startTime);
		if (context.isPan && v > 0.3) {// 快速滑动事件
			context.isFlick = true
			let e = new Event("flick");
			e.dx = dx;
      e.dy = dy;
      main.dispatchEvent(e);
		} else {
			context.isFlick
    }

		if(context.isPan) {
			if(Math.abs(dx) > Math.abs(dy)) { // 如果dx > dy 则表明是水平滑动，否则表明是垂直滑动
        context.isVertical = false;
        context.isHorizontal = true;
      } else {
        context.isVertical = true;
        context.isHorizontal = false;
      }
      let e = new Event("panend");
      e.dx = dx;
      e.dy = dy;
      e.isVertical = context.isVertical // 是否垂直滑动
      e.isHorizontal = context.isHorizontal // 是否水平滑动
      e.isFlick = context.isFlick
      main.dispatchEvent(e);
    }
	}
	let cancel = (point, context) => {
  	if(context.isPan) {
	    let e = new Event("pancancel");
	    main.dispatchEvent(e);
	   }
	}
	const mousedown = event => {
		document.addEventListener('mousemove', mousemove)
		document.addEventListener('mouseup', mouseup)
		start(event, contexts[mouseSymbol])
		event.preventDefault()
	}
	const mousemove = event => {
		move(event, contexts[mouseSymbol])
	}
	const mouseup = event => {
		document.removeEventListener('mousemove', mousemove)
		document.removeEventListener('mouseup', mouseup)
		contexts[mouseSymbol] = Object.create(null)
		end(event, contexts[mouseSymbol])
	}
	main.addEventListener('moustdown', mousedown)

	const touchstart = event => {
		for(let touch of event.changedTouches) {
			contexts[touch.identifier] = Object.create(null)
			start(touch, contexts[touch.identifier])
		}

	}
	const touchmove = event => {
		for(let touch of event.changedTouches) {

			move(touch, contexts[touch.identifier])
		}
		
	}
	const touchend = event => {
		for(let touch of event.changedTouches)
			end(touch, contexts[touch.identifier])
		
	}
	let touchcancel = event => {
  	for(let touch of event.changedTouches){
		  cancel(touch, contexts[touch.identifier]);
		  delete contexts[touch.identifier];
		}
	}
	document.addEventListener("touchstart", event => event.preventDefault(), {passive:false});
	document.addEventListener("touchmove", event => event.preventDefault(), {passive:false});
	main.addEventListener('touchstart', touchstart)
	main.addEventListener('touchmove', touchmove)
	main.addEventListener('touchend', touchend)
	main.addEventListener('touchcancel', touchcancel)
}