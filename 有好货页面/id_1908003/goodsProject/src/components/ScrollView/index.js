import Component, {
  PROP_SYMBOL,
  EVENT_SYMBOL,
  STATUS_SYMBOL
} from '../component';
import createComponent from '../createComponent';
import './index.scss';

export default class ScrollView extends Component {
  constructor(attrs) {
    super(attrs);
  }

  render() {
    const children = this.children;
    const tabItem = <div class="o-scroll">
      <div class="o-scroll-container">{ children }</div>
    </div>;

    return tabItem;
  }

  mounted() {
    // this.$el.addEventListener('touchmove', function (e) {
    //   e.cancelBubble = true;
    //   e.stopImmediatePropagation();
    // }, { passive: false});
  }
}
