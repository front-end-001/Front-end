function diffNode(dom, vnode) {
  if (!vnode) { //如果虚拟 dom 节点为空，就删除真实 dom 节点
    return removeDom(dom)
  }
  let patchedDom = dom

  //如果是文本类型的虚拟DOM ，要么替换内容，要么替换元素
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    if (patchedDom && patchedDom.nodeType === 3) {
      if (patchedDom.textContent !== vnode) {
        patchedDom.textContent = vnode
      }
    } else { //若不是字符串，而是元素
      patchedDom = document.createTextNode(vnode)
    }
    return patchedDom
  }

  //如果是组件，就diff组件
  if (typeof vnode === 'object' && typeof vnode.tag === 'function') {
    patchedDom = diffComponent(dom, vnode) //交给他去处理
    return patchedDom
  }

  //否则就是普通的 vnode
  //看 dom 是不是存在，如果不存在就根据 vnode 创建
  if (!dom) {
    patchedDom = document.createElement(vnode.tag)
  }

  //如果存在但标签变了，就修正标签（创建新标签的 dom ，但旧标签 dom 的孩子放到新标签 dom 里，旧标签替换成新标签）
  if (dom && dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
    patchedDom = document.createElement(vnode.tag)
    dom.childNodes.forEach((child) => patchedDom.appendChild(child))
    replaceDom(patchedDom, dom)
  }

  //diff 属性
  diffAttributes(patchedDom, vnode)

  //diff 子元素
  diffChildren(patchedDom, vnode.children)

  return patchedDom
}

function diffChildren(patchedDom, vChildren) {
  let domChildren = patchedDom.childNodes //子节点
  let domsHasKey = {} //原来 dom 里带 key 的拿出来 {b1:b,c1:c,d1:d}
  for (let dom of domChildren) {
    if (dom.key) {
      domsHasKey[dom.key] = dom
    }
  }

  //用最长的做判断（dom, vdom） 循环一次即可，
  let vChild
  let patchChildDom
  let length = Math.max(domChildren.length, vChildren.length)

  for (let i = 0; i < length; i++) {
    vChild = vChildren[i]

    //有 key 的处理逻辑
    if (vChild.key && domsHasKey[vChild.key]) {
      patchChildDom = diffNode(domsHasKey[vChild.key], vChild)
    } else { //不带 key 的处理逻辑
      patchChildDom = diffNode(domChildren[i], vChild)
    }

    if (patchChildDom.parentNode !== patchedDom) {
      patchedDom.appendChild(patchChildDom)
    }
    //设置子元素在父元素中的位置
    setOrderInContainer(patchedDom, patchChildDom, i)
  }
}

function setOrderInContainer(container, dom, order) {
  if(container.childNodes[order] !== dom) { //如果本身位置是对应的，就不走下面的逻辑了
    container.childNodes[order].insertAdjacentElement('beforebegin', dom) //找到原来的位置，放置于他的前面即可
  }
}

function diffAttributes(dom, vnode) {
  const old = {}
  const attrs = vnode.attrs

  //找到真实 dom 的属性
  for (var i = 0; i < dom.attributes.length; i++) {
    const attrs = dom.attributes[i]
    old[attrs.name] = attr.value
  }
  //自己的属性不在新的属性里，把他删除掉
  for (var key in old) {
    if(!(key in attrs)) {
      setAttribute(dom, key, undefined)
    }
  }
  //重新遍历，设置为新的属性
  for (var key in attrs) {
    console.log(key)
    if(old[key] !== attrs[key]) {
      setAttribute(dom, key, attrs[key])
    }
  }
}

function diffComponent(dom, vnode) {
  let component = dom?dom_component:null //从 dom 上拿到这个组件
  
  //如果 component 是存在的，组件的 constructor 是这个函数(tag: App)，
  if(component && component.constructor === vnode.tag) {
    setComponentProps(component,vnode.attrs) //设置组件的属性
  }else {
    component = createComponent(vnode.tag, vnode.attrs)
    setComponentProps(component, vnode.attrs)
  }

  return component.$root
}

function setComponentProps(component, props) {
  component.props = props //设置组件属性
  renderComponent(component) //渲染组件
}