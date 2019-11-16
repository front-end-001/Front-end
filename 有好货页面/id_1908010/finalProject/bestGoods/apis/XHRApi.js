
/**
 * XHR方法做请求
 * 
 */
function check() {
    if(!data) return;
    if(!domReady) return;
    render();
}

function render() {
    console.log(document.body)
    console.log(data)
}

let data = null;
let domReady = false; //标志位


// 这里值得关注的点 两个事件的区别 load 和 DOMContentLoaded
// 图片没有加载完成，但是body已经完成了，走DOMContentLoaded事件
// 通常都用DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', event => {
    domReady = true;
    check()
})
// 如果图片也加载出来后，走的是load事件
window.addEventListener('load', event => {

})

// XHR 经典用法
let request = new XMLHttpRequest();
request.open("get", './data.json', true);
request.send(null) //null必须写

request.addEventListener('readystatechange', event => {
    if (request.readyState == 4) { //只有state结果为4，才是请求成功
        // console.log(request.responseText)
        data = request.responseText;
        check()
    }
})
