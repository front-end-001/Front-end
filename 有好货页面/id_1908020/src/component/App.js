import React from '../react'
import Tab from './Tab'
import Carousel from './Carousel'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      titleList: ['推荐', '有趣的店', '品牌新店', '发现'],
      index: 0,
      carousel: null
    }
  }

  render () {
    return <div>
      <Tab list={this.state.titleList}></Tab>
      <Carousel index={this.state.index} vm={e => this.carouselVM.call(this, e)}>
        <div>111</div>
        <div>22</div>
        <div>333</div>
      </Carousel>
      <div onClick={this.go.bind(this)}>ssss</div>
    </div>
  }

  carouselVM (that) {
    console.log(that)
    this.state.carousel = that
  }

  go () {
    // this.setState()
    console.log(this.state.carousel)
  }

  componentDidMount (base) {
    console.log(base)
  }
}

export default App
