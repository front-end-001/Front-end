import Component, {
  PROP_SYMBOL,
  ATTR_SYMBOL,
  EVENT_SYMBOL,
  STATUS_SYMBOL
} from '../component';
import createComponent from '../createComponent';
import './index.css';

export default class ScrollView extends Component {
  constructor(attrs, children) {
    super(attrs, children);
  }

  create() {
    const children = this.children;
    const tabItem = <div class="o-scroll">{children}</div>;

    return tabItem;
  }

  mounted(root) {
    root.addEventListener(
      'touchmove',
      function(e) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
      },
      {
        passive: false
      }
    );
  }

  attrInterceptor(name, value) {
    if (name === 'style') {
      this.$root.style = value;
    }
  }
}
