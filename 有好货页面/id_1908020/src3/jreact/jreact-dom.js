import Jreact from './jreact'


/**
 * 
 * @param {VNode} vnode 
 * @param {HTMLElement} container 
 */

function createDomFromVnode(vnode) {
  console.log(vnode)
  if(!vnode) return
  if(typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }


  if(Array.isArray(vnode)) {
    let fragment = document.createDocumentFragment()
    vnode.forEach(vnodeChild=> {
      let dom = createDomFromVnode(vnodeChild)
      fragment.appendChild(dom)
    })
    return fragment
  }

  if(typeof vnode === 'object') {
    if(typeof vnode.tag === 'function') {
      //console.log(vnode)
      let component = createComponent(vnode.tag, vnode.attrs)
      renderComponent(component)
      return component.$root
    } else {
      let dom = document.createElement(vnode.tag)
      setAttribute(dom, vnode.attrs)
      vnode.children.forEach(childVnode => _render(childVnode, dom))
      return dom
    }
  }
}

function _render(vnode, container) {
  if(!vnode) return
  let dom = createDomFromVnode(vnode)
  return container.appendChild(dom)
}

function createComponent(constructor, attrs) {
    //创建组件,设置组件属性
    let component 
    
    //如果是用class创建的
    if(constructor.prototype instanceof Jreact.Component) {
      component = new constructor(attrs)
    } else {
      component = new Jreact.Component(attrs)
      component.constructor = constructor
      component.render = function() {
        return this.constructor(attrs)
      }     
    } 
    
    return component
}


function renderComponent(component) {
  let vnode = component.render()
  let dom = diffNode(component.$root, vnode)
  component.$root = dom
  component.$root._component = component
}


/**
 * @param {VNode} vnode 
 * @param {HTMLElement} container 
 */
function render(vnode, container) {
  //--
  //container.innerHTML = ''
  //-- 
  //_render(vnode, container) 

  //++
  return diff( null, vnode, container )
}


function setAttribute(node, key, value) {
  if(key.startsWith('on')) {
    node[key.toLocaleLowerCase()] = value
  } else if(key === 'style') {
    Object.assign(node.style, value)
  } else {
    node[key] = value
  }
}

/**
 * @param {HTMLElement} dom 要对比更新的DOM
 * @param {VNode} vnode  新的vnode
 * @param {HTMLElement} container  DOM的容器
 * @returns {HTMLElement} 更新后的DOM
 */

function diff(dom, vnode, container) {
  console.log('dom',dom,vnode);
  const patchedDom = diffNode(dom, vnode)
  if(container && patchedDom && patchedDom.parentNode !== container) {
      container.appendChild(patchedDom)
  }
  return patchedDom
}


function diffNode(dom, vnode) {
  console.log(vnode);
  if(!vnode) {
    return removeDom(dom)
  }
  let patchedDom = dom

  //如果是文本类型的虚拟DOM，要么替换内容，要么替换元素
  if(typeof vnode === 'string' || typeof vnode === 'number') {
    if(patchedDom && patchedDom.nodeType === 3) {
        if(patchedDom.textContent !== vnode) {
          patchedDom.textContent = vnode
        }
    } else {
      patchedDom = document.createTextNode(vnode)
    }
    return patchedDom
  }



  //如果是组件，就diff组件
  if (typeof vnode === 'object' && typeof vnode.tag === 'function') {
    patchedDom =  diffComponent( dom, vnode )
    return patchedDom
  }

  console.log(vnode);
  //否则就是普通的vnode
  //看dom是不是存在，如果不存就根据vnode创建
  if(!dom) {
    patchedDom = document.createElement(vnode.tag)
  }
  console.log(patchedDom);
  //如果存在但标签变了，就修正标签（创建新标签的dom，把旧标签dom的孩子放到新标签dom里，旧标签替换成新标签）
  if(dom && dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
    patchedDom = document.createElement(vnode.tag)
    dom.childNodes.forEach((child) => patchedDom.appendChild(child))
    replaceDom(patchedDom, dom)
  }
  console.log(patchedDom);
  diffAttributes(patchedDom, vnode)
  console.log(patchedDom,vnode);
  diffChildren(patchedDom, vnode.children)

  return patchedDom
  
}

function diffComponent(dom, vnode) {
  let component = dom?dom._component:null

  if (component && component.constructor === vnode.tag) {
      setComponentProps(component, vnode.attrs)
  } else {
    component = createComponent(vnode.tag, vnode.attrs)
    setComponentProps(component, vnode.attrs )
  }

  return component.$root
}

function setComponentProps(component, props) {
  component.props = props
  renderComponent(component)
}


function diffChildren(patchedDom, vChildren) {

  let domChildren = patchedDom.childNodes
  let domsHasKey = {}
  for(let dom of domChildren) {
    if(dom.key) {
      domsHasKey[dom.key] = dom
    }
  }

  let vChild
  let patchChildDom
  let length = Math.max(domChildren.length, vChildren.length)

  for(let i = 0; i < length; i++) {
    vChild = vChildren[i]

    if(vChild.key && domsHasKey[vChild.key]) {
      patchChildDom = diffNode(domsHasKey[vChild.key], vChild)
    } else {
      patchChildDom = diffNode(domChildren[i], vChild)
    }

    if(patchChildDom.parentNode !== patchedDom) {
      patchedDom.appendChild(patchChildDom)
    }
    setOrderInContainer(patchedDom, patchChildDom, i)
  }
}

function diffAttributes(dom, vnode) {
  const old = {}
  const attrs = vnode.attrs

  for (var i = 0; i < dom.attributes.length; i++ ) {
      const attr = dom.attributes[i]
      old[attr.name] = attr.value
  }
  for (var key in old ) {
      if ( !( key in attrs ) ) {
        setAttribute(dom, key, undefined)
      }
  }
  for (var key in attrs ) {
    console.log(key)
    if(old[ key ] !== attrs[ key ] ) {
        setAttribute( dom, key, attrs[key] )
    }
  }
}

function removeDom(dom) {
  if(dom && dom.parentNode) {
    dom.parentNode.removeChild(dom)
  }
}

function replaceDom(newDom, oldDom) {
  if(dom && dom.parentNode) {
    dom.parentNode.replaceChild(newDom, oldDom)
  }
}

function setOrderInContainer(container, dom, order) {
  if(container.childNodes[order] !== dom) {
    container.childNodes[order].insertAdjacentElement('beforebegin', dom)
  }
}


export default{
  render,
  setAttribute,
  renderComponent
}