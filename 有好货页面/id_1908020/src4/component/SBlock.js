import React from '../react'

class SBlock extends React.Component {
  render () {
    const { imgList, name, logo } = this.props
    return <div className="s-block-container">
      <div className="s-block-">
        <img src={logo}></img>
        <div>
          <div>{name}</div>
          <div>天猫</div>
        </div>
        <div>
          {imgList.map(item => (<img src={item}></img>))}
        </div>
      </div>
    </div>
  }
}

export default SBlock
