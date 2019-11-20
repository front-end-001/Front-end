// import Text from "../components/Text";
import Wrapper from "./Wrapper";

export function createComponent(Creater, attributes, ...children) {
  const o = typeof Creater === "string" ? new Wrapper(Creater) : new Creater();
  for (const name in attributes) {
    if (typeof attributes[name] === "function" && name.match(/^on([\s\S]+)$/)) {
      o.addEventListener(RegExp.$1, attributes[name]);
    } else {
      o.setAttribute(name, attributes[name]);
    }
  }

  (function renderChildren(c) {
    for (const child of c) {
      if (child instanceof Array) {
        renderChildren(child);
      } else if (typeof child === "object") {
        o.appendChild(child);
      } else {
        o.appendString(child.toString());
        // o.appendChild(new Text(child.toString()));
      }
    }
  }(children));
  return o;
}
