import Wrapper from './component/Wrapper'
class Text {
  constructor(config) {
    this.text = config
    this.created();
  }
  created() {
    this.node = document.createElement("span");
    this.node.innerText = this.text
  }
  mounted() {
  }
  appendTo(el) {
    el.appendChild(this.node);
    this.mounted();
  }
}

function myCreate(Class, attributes, ...children) {
  let object
  if (typeof Class === 'string') {
    object = new Wrapper(Class)
  } else {
    object = new Class();
  }
  for (let name in attributes) {
    if (name.match(/^on-([\s\S]+)$/)) {
      console.log(object)
      object.addEventListener(RegExp.$1, attributes[name])
    } else {
      object.setAttribute(name, attributes[name]);
    }
  }
  for (let child of children) {
    if (Array.isArray(child)) {
      for (const c of child) {
        if (typeof c === 'string') {
          object.appendChild(new Text(c))
        } else {
          object.appendChild(c)
        }
      }
    } else if (typeof child === 'object') {
      object.appendChild(child);
    } else {
      object.appendChild(new Text(child.toString()));
    }

    // if (typeof child === "string") {
    //   object.appendChild(new Text(child));
    // } else {
    //   object.appendChild(child);
    // }
  }
  return object;
}
export default myCreate