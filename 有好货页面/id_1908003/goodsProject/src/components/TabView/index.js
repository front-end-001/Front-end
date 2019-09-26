import Component, { PROP_SYMBOL, ATTR_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from '../component';
import createComponent from '../createComponent';
import './index.css';

export default class Tab extends Component {
  constructor(attrs, children) {
    super(attrs, children);
  }

  create() {
    const children = this.children;
    console.log(this);
    const fuc = (evt) => {
      console.log('click', evt);
    };
    const headers = children.map(child => child.title);
    const tab = <div class="o-tab">
      <div class="o-tab-header">
        {headers.map((header) => (<div on-click={fuc} >{header}</div>))}
      </div>
      <div class="o-tab-content">
        {children}
      </div>
    </div>;

    return tab;
  }

  /**
   * 设置当前激活 tab 项
   */
  setCurrent() {}

  attrInterceptor(name, value) {
    if (name === 'style') {
      this.$root.style = value;
    }
  }
};