const myComponents = ['Tab', 'TabPane', 'ScrollView', 'Carousel', 'ListView', 'Title'];

export default function createElement(NodeClass, attributes, ...children) {
  console.log(arguments);

  if (NodeClass instanceof Function && myComponents.indexOf(NodeClass.name) >= 0) {
    const object = new NodeClass();

    for (let attr in attributes) {
      if (attr.match(/^on-([\s\S]+)$/)) {
        object.addEventListener(RegExp.$1, attributes[attr]);
      } else {
        object.setAttribute(attr, attributes[attr]);
      }
    }
    
    for (let child of children) {
      object.appendChild(child);
    }

    if (!object.isValid()) {
      throw Error(`Invalid componet: ${NodeClass.name}`);
    }

    return object;
  } else {
    // TODO 白名单校验 -> 如何判断一个字符串标签是标准HTML标签
    let elem;
    try {
      elem = document.createElement(NodeClass);
      for (let child of children) {
        let childElem = child;
        if (typeof childElem === 'string') {
          childElem = document.createTextNode(child);
        }
        elem.appendChild(childElem);
      }
    } catch (e) {
      elem = undefined;
      console.error(`Not supported HTML tag: ${NodeClass}!`);
    }
    return elem;
  }
}
