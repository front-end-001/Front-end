import React from '../react'

class Tab extends React.Component {
  render () {
    const { list } = this.props
    return <div className="tab-container">
      {list.map(value => (<div className="tab-item">{value}</div>))}
    </div>
  }
}

export default Tab
