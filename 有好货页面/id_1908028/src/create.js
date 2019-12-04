import Text from "./component/Text";
import Wrapper from "./component/Wrapper";

export function create(Class, attributes, ...children) {
  let object = void 0;
  if (typeof Class === "function") {
    object = new Class();
  } else {
    object = new Wrapper(Class);
  }

  for (let name in attributes) {
    object.setAttribute(name, attributes[name]);
  }

  for (let child of children) {
    if (typeof child === "string") {
      object.appendChilds(new Text(child));
    } else {
      object.appendChilds(child);
    }
  }

  return object;
}
