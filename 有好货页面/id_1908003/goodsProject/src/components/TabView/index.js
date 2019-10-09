import Component, { PROP_SYMBOL, ATTR_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from '../component';
import createComponent from '../createComponent';
import './index.css';

export default class Tab extends Component {
  constructor(attrs, children) {
    super(attrs, children);
  }

  create() {
    const children = this.children;

    const tab = <div class="o-tab">
      <div class="o-tab-header"></div>
      <div class="o-tab-content">
        {children}
      </div>
    </div>;

    return tab;
  }

  attrInterceptor(name, value) {
    if (name === 'style') {
      this.$root.style = value;
    }
  }
};