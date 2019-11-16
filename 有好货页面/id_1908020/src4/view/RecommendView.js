import React from '../react'
import Carousel from '../component/Carousel'

class RecommendView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      carousel: null
    }
  }

  render () {
    return <div className="recommend-view">
      <div className="recommend-carousel">
        <Carousel
          name="c2"
          index={this.state.index}
          vm={e => this.carouselVM.call(this, e)}>
          <img
            style={{ width: '100%' }}
            src="https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"></img>
          <img
            style={{ width: '100%' }}
            src="https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"></img>
        </Carousel>
      </div>
      <div className="recommend-duo">
        超多人收藏的店!
      </div>

    </div>
  }

  carouselVM (that) {
    console.log(that)
    this.state.carousel = that
  }
}

export default RecommendView
