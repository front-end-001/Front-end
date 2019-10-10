//避免上下滚屏
document.addEventListener("touchmove",function(e){ 
    if(e.touches.length == 2) 
        e.preventDefault(); 
}, {passive:false});
document.addEventListener("touchmove",function(e){ 
    if(e.touches.length == 1) 
        e.preventDefault(); 
}, {passive:false});
// touchstart事件不能打开，不然headerItem不能点击
// document.addEventListener("touchstart",function(e){ 
//     e.preventDefault(); 
// }, {passive:false});