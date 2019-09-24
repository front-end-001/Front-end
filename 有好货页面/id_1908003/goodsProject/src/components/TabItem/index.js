import Component, { PROP_SYMBOL, ATTR_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from '../component';
import createComponent from '../createComponent';

export default class TabItem extends Component {
  constructor(attrs, children) {
    super(attrs, children);
  }

  create() {
    const children = this.children;

    const tabItem = <div class="o-tab-item">
      {children}
    </div>;

    return tabItem;
  }

  attrInterceptor(name, value) {
    if (name === 'style') {
      this.$root.style = value;
    }
  }
};