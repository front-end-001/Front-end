const e = function(selector) {
    return document.querySelector(selector)
}

const eAll = function(selector) {
    return document.querySelectorAll(selector)
}

const log = function() {
    console.log.apply(console, arguments)
}


let dots = e('.carousel .dots')
dots.addEventListener('click', function(event) {
    // 返回事件的目标节点
    let item = event.target
    // log(this)
    // log(item)
    if (item.tagName !== 'SPAN') {
        return false
    }
    let allSpan = eAll('.dots span')
    let index = Array.from(allSpan).indexOf(item)
    // log(index)

    // 绑定下标栏
    const removeActive = function(element) {
        return element.classList.remove('active')
    }
    allSpan.forEach(removeActive)
    allSpan[index].classList.add('active')

    // 索引绑定图片
    const setIndex = function(element) {
        element.style.zIndex = 1
    }
    let allA = eAll('.carousel .panels a')
    allA.forEach(setIndex)
    allA[index].style.zIndex = 10

})


let btnPre = e('.pre')
btnPre.addEventListener('click', function(){
    let picAct = e('.carousel .dots span.active')
    let allSpan = eAll('.carousel .dots span')
    let index = Array.from(allSpan).indexOf(picAct)
    index = (index - 1 + allSpan.length) % allSpan.length
    log(index)

    // 索引绑定图片
    const setIndex = function(element) {
        element.style.zIndex = 1
    }
    let allA = eAll('.carousel .panels a')
    allA.forEach(setIndex)
    allA[index].style.zIndex = 10

    // 绑定下标栏
    const removeActive = function(element) {
        return element.classList.remove('active')
    }
    allSpan.forEach(removeActive)
    allSpan[index].classList.add('active')
})


let btnNext = e('.next')
btnNext.addEventListener('click', function(){
    let picAct = e('.carousel .dots span.active')
    let allSpan = eAll('.carousel .dots span')
    let index = Array.from(allSpan).indexOf(picAct)
    index = (index + 1) % allSpan.length
    log(index)

    // 索引绑定图片
    const setIndex = function(element) {
        element.style.zIndex = 1
    }
    let allA = eAll('.carousel .panels a')
    allA.forEach(setIndex)
    allA[index].style.zIndex = 10

    // 绑定下标栏
    const removeActive = function(element) {
        return element.classList.remove('active')
    }
    allSpan.forEach(removeActive)
    allSpan[index].classList.add('active')
})
