// import 'babel-polyfill' // bug regeneratorRuntime is not defined

export function loadScript(src) {
    return new Promise((resolve, reject) => {
        let scriptElement = document.createElement('script')
        scriptElement.src = src
        scriptElement.addEventListener('load', resolve)
        document.documentElement.appendChild(scriptElement)        
    })
}

export function happen(object, type, config) {
    return new Promise((resolve, reject) => {
        object.addEventListener(type, resolve, config);
    })
}

/* happen(document, "DOMContentLoaded").then(() => {
    console.log(document.body)
}) 

fetch("./data.json").then(response => response.json()).then(obj => {
    console.log(obj)
}) 
*/
/*Promise.all([
    happen(document, "DOMContentLoaded"),
    fetch("./data.json").then(response => response.json())
]).then(results => {
    console.log(results)
})
*/ 
//设计IIFE的技巧，如果使用括号（）来做，

// void async function(){ 
//     // let obj = await ((await fetch('./data.json')).json())
//     // await happen(document, "DOMContentLoaded")

//     // 所有的并行都逃避不开Promise.all
//     let [obj, event] = await Promise.all([
//         (async function(){ //async 标签返回的一定是promise
//             return (await fetch('./data.json')).json()
//         })(),
//         //fetch("./data.json").then(res => res.json()), //这里写await是为了先得到response
//         happen(document, "DOMContentLoaded"),
//         loadScript('./app.js')
//     ]);
//     window.render(obj, document.body);
//     // console.log(obj, event)
// }();
