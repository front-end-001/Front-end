import Component from './component'
import {h} from '../lib/h'

export default class ScrollView extends Component {
  constructor(){
    super();
    this.state.triggeredPullDown = false;
    this.state.triggeredPullUp = false;

    this.create()
  }

  create(){
    this.root.className = 'scroll';
    //阻止滑动事件向上传播
    // this.root.addEventListener('touchmove', (event) => {
    //   // event.cancelBubble = true
    //   // event.stopImmediatePropagation();
    // }, {
    //   passive: false
    // })

    this.root.addEventListener("scroll", (event) => {
      let clientRect = this.root.getBoundingClientRect();
      let loadMoreRect = this.loadMoreFooter.root.getBoundingClientRect()

      if (this.root.scrollHeight - clientRect.height <= this.root.scrollTop) {
        if (!this.state.triggeredPullDown) {
          console.log('scrollToBottom')
          this.triggerEvent('scrollToBottom');
          this.state.triggeredPullDown = true;
        }
      } else {
        this.state.triggeredPullDown = false;
      }
    })
  }

  appendChild(child){
    child.appendTo(this.root)

    this.loadMoreFooter = (
        <div className="footer">
        </div>
  )

    this.loadMoreFooter.appendTo(this.root)
  }
}
