import React from '../react'

class Tab extends React.Component {
  render () {
    const { list } = this.props
    return <div className="tab-container">
      {list.map((value, index) => (<div
        className={ `tab-item ${index === this.props.index ? 'active' : ''}` }
        onClick={e => this.handleClick.call(this, index)}>
        {value}
      </div>))}
    </div>
  }

  handleClick (index) {
    this.props.click(index)
    const arr = [...this.dom.children]
    arr.forEach((item, index2) => {
      if (index === index2) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }

  componentDidMount () {
    setTimeout(_ => {
      this.dom = document.querySelector('.tab-container')
      this.dom.children[0].classList.add('active')
    })
  }
}

export default Tab
