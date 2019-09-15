const myComponents = ['Tab', 'TabPane','ScrollView'];

export default function createElement(NodeClass, attributes, ...children) {
  console.log(arguments);

  if (NodeClass instanceof Function && myComponents.indexOf(NodeClass.name) >= 0) {
    const object = new NodeClass();

    for (let child of children) {
      object.appendChild(child);
    }

    if (!object.isValid()) {
      throw Error(`Invalid componet: ${NodeClass.name}`);
    }

    for (let attr in attributes) {
      object.setAttribute(attr, attributes[attr]);
    }
    return object;
  } else if (typeof NodeClass === 'string') {
    // const textNode = document.createTextNode( vnode );
    // return container.appendChild( textNode );
  } else {
    // // TODO 白名单校验
    // const elem = document.createElement(NodeClass);
    // for (let child of children) {
    //   elem.appendChild(child);
    // }
    // return elem;
  }
}
