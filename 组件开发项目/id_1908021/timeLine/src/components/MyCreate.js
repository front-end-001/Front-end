const myComponents = ['Carousel', 'Tab'];

export default function myCreate(Class, attributes, ...children) {
  console.log(arguments);

  if (Class instanceof Function && myComponents.indexOf(Class.name) >= 0) {
    const object = new Class(attributes);
    for (let child of children) {
      object.appendChild(child);
    }
    return object;
  } else {
    // TODO 白名单校验
    const elem = document.createElement(Class);
    for (let child of children) {
      elem.appendChild(child);
    }
    return elem;
  }
}
