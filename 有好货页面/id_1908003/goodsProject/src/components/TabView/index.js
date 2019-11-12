import Component, { PROP_SYMBOL, EVENT_SYMBOL, STATUS_SYMBOL } from '../component';
import { getTransformXVal } from '../../assets/utils';
import createComponent from '../createComponent';
import './index.scss';
import testcss from './test.css';
import gesture from '../../assets/gesture';

const contexts = Object.create(null);

console.log(testcss);
// const styleEle = document.createElement('style');
// styleEle.innerHTML = testcss;
// const head = document.getElementsByTagName('head');
// head[0].appendChild(styleEle);

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
      this[STATUS_SYMBOL].contentEle = evt.$el;
      this.$slot = evt.$el;
    };
    const doAlert = () => {
      alert('click');
    };
    const styleObj = {
      'background-color': 'red',
    };
    const tab = <div class="o-tab" styleObj={styleObj}>
      <div style="text-align: center; position: relative; margin: 5vw 0;">
        <img src="/static/image/header-title.png" alt="每日好店" style="width: 25vw;"></img>
        <div style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; display: flex; align-items: center;">
          <img src="/static/image/header-back.png" alt="返回" style="width: 10px; padding: 0 15px;" on-click={doAlert}></img>
          <img src="/static/image/header-share.png" alt="分享" style="width: 24px; margin-left: auto; padding: 0 15px;" on-click={doAlert}></img>
          <img src="/static/image/header-more.png" alt="更多操作" style="width: 20px;  padding: 0 15px;" on-click={doAlert}></img>
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
  

  mounted() {
    // 开启拖拽
    gesture.enableGesture(this[STATUS_SYMBOL].contentEle);

    const contentEle = this[STATUS_SYMBOL].contentEle;
    let currentPos;
    let tabItemWidth;

    contentEle.addEventListener('panstart', (evt) => {
      if (this.children.length === 0) return;
      if (!evt.isHorizontal) return;
      tabItemWidth = this.children[0].$el.getBoundingClientRect().width;
      currentPos = getTransformXVal(this.children[0].$el);
      this[STATUS_SYMBOL].contentEle.classList.add('on-drag');
    }, false);
    contentEle.addEventListener('pan', (evt) => {
      if (this.children.length === 0) return;
      let distance = currentPos + evt.dx;
      if (distance > 0) {
        distance = distance / 3;
      }
      const min = tabItemWidth * (this.children.length - 1) * (-1);
      if (distance < min) {
        distance = min + (distance - min) / 3;
      }
      this.children.forEach((child) => {
        child.$el.style.transform = `translateX(${ distance }px)`;
      });
    }, false);

    contentEle.addEventListener('panend', (evt) => {
      if (this.children.length === 0) return;

      currentPos = getTransformXVal(this.children[0].$el);
      const currentIndex = (Math.round(-1 * currentPos / tabItemWidth));
      this.children[currentIndex].tabName;
      this.setCurrent(this.children[currentIndex].tabName);
      // let distance = currentIndex * (-1) * tabItemWidth;
      this[STATUS_SYMBOL].contentEle.classList.remove('on-drag');
      // this.children.forEach((child) => {
      //   child.$el.style.transform = `translateX(${ distance }px)`;
      // });
    }, false);

    // flip 支持
    contentEle.addEventListener('flick', (evt) => {
      if (this.children.length === 0) return;
      if (!evt.isHorizontal) return;

      this[STATUS_SYMBOL].contentEle.classList.remove('on-drag');

      const dIndex = evt.dx > 0 ? -1 : 1;
      let targetIndex = this.currentIndex + dIndex;
      if (targetIndex < 0) {
        targetIndex = 0;
      } else if (targetIndex >= this.children.length) {
        targetIndex = this.children.length - 1;
      }

      this.setCurrent(this.children[targetIndex].tabName);
    }, false);
  }

  validateChild(child) {
    // 子节点只允许 TabView
    if (child.name !== 'TabItem') {
      return false;
    }
    return true;
  }

  get currentIndex() {
    return this.children.findIndex(child => (child.tabName === this.current));
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

    const tabItemWidth = this.children[0].$el.getBoundingClientRect().width;
    const currentPos = this.children.findIndex((child) => (child.tabName === key));
    const targetPos = currentPos * tabItemWidth * (-1);

    // 确保清除拖拽状态
    this[STATUS_SYMBOL].contentEle.classList.remove('on-drag');
    this.children.forEach((child) => {
      child.$el.style.transform = `translateX(${ targetPos }px)`;
    });
    
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