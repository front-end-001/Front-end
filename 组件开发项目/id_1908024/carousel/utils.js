const log = console.log.bind(console);

const e = selector => {
    const element = document.querySelector(selector);
    if (element == null) {
        const s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`;
        alert(s);
    } else {
        return element;
    }
};

const es = selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        const s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`;
        alert(s);
    } else {
        return elements;
    }
};

const appendHtml = (element, html) => {
    element.insertAdjacentHTML("beforeend", html);
};

const appendHtmlBegin = (element, html) => {
    element.insertAdjacentHTML("afterbegin", html);
};

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback);
};

const removeClassAll = className => {
    const selector = "." + className;
    const elements = es(selector);
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i];
        e.classList.remove(className);
    }
};

const bindAll = (selector, eventName, callback) => {
    const elements = es(selector);
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i];
        bindEvent(e, eventName, callback);
    }
};

// find 函数可以查找 element 的所有子元素
const find = function(element, selector) {
    const e = element.querySelector(selector);
    if (e == null) {
        const s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`;
        alert(s);
    } else {
        return e;
    }
};