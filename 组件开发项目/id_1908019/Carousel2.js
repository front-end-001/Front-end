const e = function(selector) {
    return document.querySelector(selector)
}

const eAll = function(selector) {
    return document.querySelectorAll(selector)
}

const log = function() {
    console.log.apply(console, arguments)
}

var allSpan = eAll('.carousel-step1 .dots span')
var allA = eAll('.carousel-step1 .panels a')

const setDots = function(index) {
    const removeActive = function(element) {
        return element.classList.remove('active')
    }
    allSpan.forEach(removeActive)
    allSpan[index].classList.add('active')
}

const setPanels = function(index) {
    const setIndex = function(element) {
        element.style.zIndex = 1
    }
    allA.forEach(setIndex)
    allA[index].style.zIndex = 10
}

// 绑定 dots 点击事件
let dots = e('.carousel-step1 .dots')
dots.addEventListener('click', function(event) {
    // 返回事件的目标节点
    let item = event.target
    // log(this)
    // log(item)
    if (item.tagName !== 'SPAN') {
        return false
    }
    let index = Array.from(allSpan).indexOf(item)
    // log(index)

    // 绑定下标栏
    setDots(index)

    // 索引绑定图片
    setPanels(index)

})

// 绑定 pre 点击事件
let btnPre = e('.pre')
btnPre.addEventListener('click', function(){
    let picAct = e('.carousel-step1 .dots span.active')
    let index = Array.from(allSpan).indexOf(picAct)
    index = (index - 1 + allSpan.length) % allSpan.length
    log(index)

    // 索引绑定图片
    setDots(index)

    // 绑定下标栏
    setPanels(index)

})

// 绑定 next 点击事件
let btnNext = e('.next')
btnNext.addEventListener('click', function(){
    let picAct = e('.carousel-step1 .dots span.active')
    let index = Array.from(allSpan).indexOf(picAct)
    index = (index + 1) % allSpan.length
    log(index)

    // 索引绑定图片
    setDots(index)

    // 绑定下标栏
    setPanels(index)
})
