import Component, {
  PROP_SYMBOL,
  EVENT_SYMBOL,
  STATUS_SYMBOL
} from '../component';
import createComponent from '../createComponent';
import './index.scss';

export default class ListView extends Component {
  constructor(attrs) {
    super(attrs);
  }

  render() {
    const children = this.children;
    const tabItem = <div class="o-list">
      <div class="o-list-item">{ children }</div>
    </div>;

    return tabItem;
  }

  mounted() {
    this.$el.addEventListener('touchmove', function (e) {
      e.cancelBubble = true;
      e.stopImmediatePropagation();
    }, { passive: false});
  }
}
