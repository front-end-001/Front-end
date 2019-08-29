function enableGesture(main){
    let contexts=Object.create(null);
    let symbolMouse=Symbol("mouse");
   
    //事件
    let start=(point,context)=>{
        console.log("start:",point.clientX,point.clientY);
        context.isPan=false;
        context.isTap=true;
        context.startX=point.clientX;
        context.startY=point.clientY;
    }
    let move =(point,context)=>{
        // console.log("move:",point.clientX,point.clientY);
        let dx=point.clientX-context.startX;
        let dy=point.clientY-context.startY;
        if(dx*dx+dy*dy>100){
            context.isTap=false;
            if(context.isPan==false){
              context.isPan=true;
              let e=new Event("panstart");
              e.dx=dx;
              e.dy=dy;
              main.dispatchEvent(e);
            }
            console.log("pan");
        }
        // console.log("move distance dx dy:",dx,dy);
        if(context.isPan){
            let e=new Event("paning");
            e.dy=dy;
            e.dx=dx;
            main.dispatchEvent(e);
        }
        if(context.isTap){
            let e =new Event("tap");
            e.dy=dy;
            e.dx=dx;
            main.dispatchEvent(e);
        }
    }
    let end = (point,context)=>{
        // console.log("end:",point.clientX,point.clientY);
        let e;
        if(context.isPan){
             e = new Event("panend");
            e.dx=point.clientX-context.startX;
            e.dy=point.clientY-context.startY;
            main.dispatchEvent(e);
        }
        if(context.isTap){
            e = new Event("tapend");
            e.dx=point.clientX-context.startX;
            e.dy=point.clientY-context.startY;
            main.dispatchEvent(e);
        }
      
    }

    //鼠标事件
    let mousedown = event => {
        document.addEventListener("mousemove",mousemove);
        document.addEventListener("mouseup",mouseend);
        contexts[symbolMouse]=Object.create(null);
        start(event,contexts[symbolMouse]);
    }

    let mousemove = event => {
        move(event,contexts[symbolMouse]);
    }

    let mouseend = event  => {
        document.removeEventListener("mousemove",mousemove);
        document.removeEventListener("mouseup",mouseend);
        end(event,contexts[symbolMouse]);
        delete contexts[symbolMouse];
    }
    document.addEventListener("mousedown",mousedown);


     // touch 事件
     let touchstart = event => {
        for(let touch of event.changedTouches){
            contexts[touch.identifier]=Object.create(null);
            start(touch,contexts[touch.identifier]);
        }
     }
     let touchmove = event => {
         for(let touch of event.changedTouches){
             move(touch,contexts[touch.identifier]);
         }
     }
     let touchend = event => {
        for(let touch of event.changedTouches){
            end(touch,contexts[touch.identifier]);
            delete touch[touch.identifier];
        }
     }
     let touchcancle = event => {
         for(let touch of event.changedTouches){
             end(touch,contexts[touch.identifier]);
             delete contexts[touch.identifier];
         }
     }
     document.addEventListener("touchstart",touchstart);
     document.addEventListener("touchmove",touchmove);
     document.addEventListener("touchend",touchend);
     document.addEventListener("touchcancel",touchcancle);
}