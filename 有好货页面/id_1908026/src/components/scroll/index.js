import { h, Component } from '../../base';
import { throttle } from '../../utils';

import './index.scss';

const STATE_SYMBOL = Symbol('state');

export default class Scroll extends Component {
  constructor(props) {
    super(props);

    this[STATE_SYMBOL] = Object.create(null);

    this[STATE_SYMBOL].position = 0;
    this[STATE_SYMBOL].loading = false;
  }

  mounted() {
    this.scrollDom = this._childNode[0].querySelector('.comt-scroll');
    this.backTopDom = this._childNode[0].querySelector('.back-top');
    this.scrollDom.addEventListener(
      'scroll',
      throttle(async event => {
        if (this.scrollDom.scrollTop > 275) {
          this.backTopDom.style.display = 'block';
        } else {
          this.backTopDom.style.display = 'none';
        }
        if (
          this.scrollDom.scrollTop >=
            this.scrollDom.scrollHeight - this.scrollDom.getBoundingClientRect().height - 20 &&
          !this[STATE_SYMBOL].loading
        ) {
          this[STATE_SYMBOL].loading = true;
          this.dispatchEvent('scrollbottom', 2);
        }
      }),
    );
  }

  render() {
    return (
      <div className="tab_content_item scroll_wrapper">
        <div className="comt-scroll">
          <div className="scroll_inner">{this.props.children}</div>
          <div className="scroll_footer">
            <div style="width:31px;height:1px;background-color: rgb(216, 216, 216);" />
            <div>人家是有底线的啦</div>
            <div style="width:31px;height:1px;background-color: rgb(216, 216, 216);" />
          </div>
        </div>
        <div className="back-top" onClick={this.backTop.bind(this)}>
          <img
            src="http://gw.alicdn.com/tfs/TB1hH4MQVXXXXXhXpXXXXXXXXXX-108-108.png_110x10000.jpg_.webp"
            alt=""
          />
        </div>
      </div>
    );
  }

  backTop() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (this.scrollDom.scrollTop > 0) {
        this.scrollDom.scrollTop -= this.scrollDom.scrollTop / 10;
      } else {
        this.scrollDom.scrollTop = 0;
        this.backTopDom.style.display = 'none';
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 16.6);
  }
}
