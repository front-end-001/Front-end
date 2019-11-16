import JreactDom from './jreact-dom'

/**
 * 
 * @param {String} tag 
 * @param {Object} attrs 
 * @param  {String|Object} children 
 */
function createElement(tag, attrs, ...children) {
  return {
    tag, 
    attrs, 
    children,
    key: attrs?(attrs.key?attrs.key:null):null
  }
}

class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }

  setState(state) {
    Object.assign(this.state, state)
    JreactDom.renderComponent(this)
  }
}


export default { createElement, Component }