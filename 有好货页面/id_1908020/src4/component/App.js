import React from '../react'
import Tab from './Tab'
import Carousel from './Carousel'
import RecommendView from '../view/RecommendView'

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
    return <div className="app">
      <div className="bg"></div>
      <Tab
        index={this.state.index}
        list={this.state.titleList}
        click={index => this.tabClick.call(this, index)}></Tab>
      <Carousel
        name="c1"
        index={this.state.index}
        vm={e => this.carouselVM.call(this, e)}>
        <RecommendView></RecommendView>
        <div>22</div>
        <div>333</div>
      </Carousel>

    </div>
  }

  tabClick (index) {
    this.state.carousel.go(index)
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
