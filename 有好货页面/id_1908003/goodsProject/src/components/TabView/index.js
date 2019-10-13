import Component, { PROP_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from '../component';
import createComponent from '../createComponent';
import './index.scss';

export default class TabView extends Component {
  constructor(attrs) {
    super(attrs);
  }


  render() {
    const children = this.children;
    const childrenData = children.map(child => ({
      title: child.title,
      name: child.tabName,
    }));
    const setSlot = (evt) => {
      this.$slot = evt.$el;
    };
    const doAlert = () => {
      alert('click');
    };
    const tab = <div class="o-tab">
      <div style="text-align: center; position: relative; margin: 50pt 0 10pt;">
        <img src="/static/image/header-title.png" alt="每日好店" style="width: 72pt;"></img>
        <div style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; display: flex; align-items: center;">
          <img src="/static/image/header-back.png" alt="返回" style="width: 8pt; padding: 0 14pt;" on-click={doAlert}></img>
          <img src="/static/image/header-share.png" alt="分享" style="width: 18pt; margin-left: auto; padding: 0 10pt;" on-click={doAlert}></img>
          <img src="/static/image/header-more.png" alt="更多操作" style="width: 16pt;  padding: 0 13pt;" on-click={doAlert}></img>
        </div>
      </div>
      <div class="o-tab-header">
        {childrenData.map((childData) => {
          const addHeader = (childData) => {
            return (evt) => {
              this[STATUS_SYMBOL].headerEles = this[STATUS_SYMBOL].headerEles || {};
              this[STATUS_SYMBOL].headerEles[childData.name] = evt.$el;
            }
          }
          const clickTab = (childData) => {
            return () => {
              this.setCurrent(childData.name)
            }
          }
          return <div class="o-tab-header-item" on-click={clickTab(childData)} on-mounted={addHeader(childData)}>{childData.title}</div>;
        })}
      </div>
      <div class="o-tab-content" on-mounted={setSlot}>
        {children}
      </div>
    </div>;
    console.log(this)
    this.setCurrent();
    return tab;
  }
  

  validateChild(child) {
    // 子节点只允许 TabView
    if (child.name !== 'TabItem') {
      return false;
    }
    return true;
  }

  /**
   * 设置当前激活 tab 项
   */
  setCurrent(key) {
    if (this.children.length === 0) return;

    // 修改 current 状态
    this[STATUS_SYMBOL].current = key || this.children[0].tabName;

    this.children.forEach((child) => {
      if (child.tabName === this.current) {
        child.setActive();
      } else {
        child.setDisactive();
      }
    });

    for (let header in this[STATUS_SYMBOL].headerEles) {
      if (header === this.current) {
        this[STATUS_SYMBOL].headerEles[header].classList.add('active');
      } else {
        this[STATUS_SYMBOL].headerEles[header].classList.remove('active');
      }
    }

    console.log(this[STATUS_SYMBOL].headerEles)
    // 执行子项展示逻辑
    // 暂不考虑动画过程中的当前项判断, 使用 css 逻辑实现切换动画

  }

  /**
   * 获取当前激活项
   */
  get current() {
    return this[STATUS_SYMBOL].current;
  }

};