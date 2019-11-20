import Component, {
  PROP_SYMBOL,
  ATTR_SYMBOL,
  EVENT_SYMBOL,
  STATUS_SYMBOL
} from '../component';
import createComponent from '../createComponent';
import './index.scss';

export default class TabItem extends Component {
  constructor(attrs) {
    super(attrs);
  }

  render() {
    const children = this.children;
    const tabItem = <div class="o-tab-item">{children}</div>;

    return tabItem;
  }

  get tabName() {
    return this[ATTR_SYMBOL]['tab-name'];
  }

  get title() {
    return this[ATTR_SYMBOL]['tab-title'];
  }

  setActive() {
    if (!this.$el) return;
    this.$el.classList.add('active');
  }

  setDisactive() {
    if (!this.$el) return;
    this.$el.classList.remove('active');
  }
}
