const e = function(selector) {
    return document.querySelector(selector)
}

const eAll = function(selector) {
    return document.querySelectorAll(selector)
}

const log = function() {
    console.log.apply(console, arguments)
}
