export function createSpanElem(text: string): HTMLSpanElement {
  const spanElem = document.createElement('span');
  spanElem.innerText = text;
  return spanElem;
}
