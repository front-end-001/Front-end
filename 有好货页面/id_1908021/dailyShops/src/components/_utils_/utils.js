export function createSpanElem(text) {
  const spanElem = document.createElement('span');
  spanElem.innerText = text;
  return spanElem;
}

export function debounce(func, wait = 0) {
  let tick = null;
  return function() {
    
    clearTimeout(tick);
    tick = setTimeout(() => {
      func.call(this, ...arguments);
    }, wait);
  };
}

export default {
  createSpanElem,
  debounce
};
