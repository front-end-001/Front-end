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
    this[STATUS_SYMBOL].since = 0;
    this[STATUS_SYMBOL].total = 0;
    this[STATUS_SYMBOL].list = [];
  }

  render() {
    const propsData = this[PROP_SYMBOL].listData || {};
    this[STATUS_SYMBOL].since = propsData.since || 0;
    this[STATUS_SYMBOL].total = propsData.total || 0;
    this[STATUS_SYMBOL].list = propsData.list || [];

    const listData = this[STATUS_SYMBOL].list;
    const createItem = this[PROP_SYMBOL].listFuc;

    const tabItem = (
      <div class="o-list">
        {listData.map((item, index) => (
          <div class="o-list-item">{createItem(item, index)}</div>
        ))}
      </div>
    );

    return tabItem;
  }

  mounted() {
    // this.$el.addEventListener('touchmove', function (e) {
    //   e.cancelBubble = true;
    //   e.stopImmediatePropagation();
    // }, { passive: false});
  }
}
