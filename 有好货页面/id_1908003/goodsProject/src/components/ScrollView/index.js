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

    this[STATUS_SYMBOL].bottomEle = null;
    this[STATUS_SYMBOL].bottomObserver = null;

    if (typeof window !== 'undefined' && window.IntersectionObserver) {
      this[STATUS_SYMBOL].bottomObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.onBottomShow();
            }
          });
        }
      );
    }
  }

  render() {
    if (this[STATUS_SYMBOL].bottomEle) {
      this[STATUS_SYMBOL].bottomObserver.unobserve(
        this[STATUS_SYMBOL].bottomEle.$el
      );
    }

    const bottomEle = <div class='o-scroll-bottom'>加载中...</div>;

    const children = this.children;
    const scrollContainer = <div class='o-scroll-container'>
      {children}
      {bottomEle}
    </div>;
    const tabItem = (
      <div class='o-scroll'>
        { scrollContainer }
      </div>
    );

    this[STATUS_SYMBOL].bottomEle = bottomEle;
    this[STATUS_SYMBOL].bottomObserver.observe(
      this[STATUS_SYMBOL].bottomEle.$el
    );
    return tabItem;
  }

  mounted() {}

  onBottomShow() {
    this.triggerEvent('bottom');
  }

  destroy() {
    this[STATUS_SYMBOL].bottomObserver = null;
  }
}
