import Component, { PROP_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from '../component';
import createComponent from '../createComponent';
import './index.css';

export default class Tab extends Component {
  constructor(attrs) {
    super(attrs);
  }

  render() {
    const children = this.children;
    const headers = children.map(child => child.title);
    const fuc = (evt) => {
      console.log('click', evt);
    };
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
  setCurrent(key) {
    // 执行子项展示逻辑
    // 暂不考虑动画过程中的当前项判断, 使用 css 逻辑实现切换动画

    // 修改 current 状态
    this[STATUS_SYMBOL].current = key;
  }

  /**
   * 获取当前激活项
   */
  get current() {
    return this[STATUS_SYMBOL].current;
  }

};