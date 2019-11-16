import { h, Component } from '../../base';
import Scroll from '../scroll';
import Gesture from '../../packages/gesture';

import './index.scss';

const g = new Gesture();

const ATTRIBUTE_SYMBOL = Symbol('attribute');
const PROPERTY_SYMBOL = Symbol('property');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[STATE_SYMBOL].position = 0;
  }

  mounted() {
    console.log('Tab mounted');
    this.tabHeader = document.querySelector('.comt-tab .tab_header');
    this.tabBarleftMap = this.getTabBarLeftMap();
    this.tabContent = document.querySelector('.comt-tab .tab_content');
    this.init();
  }

  render() {
    return (
      <div className="comt-tab">
        <div className="tab_header" onClick={this.handleTabClick.bind(this)}>
          <div className="tab_bar--active" />
          {this.props.children.map((child, index) => {
            return <div data-index={index}>{child.props.title}</div>;
          })}
        </div>
        <div className="tab_content">
          {this.props.children.map(child => {
            return child;
          })}
          {/*{this.props.children.map(child => {*/}
          {/*  return (*/}
          {/*    <div className="tab_content_item">*/}
          {/*      <div className="tab_content_item_inner">{child}</div>*/}
          {/*    </div>*/}
          {/*  );*/}
          {/*})}*/}
        </div>
      </div>
    );
  }

  init() {
    g.enable(this.tabContent);
    const { width } = this.tabContent.getBoundingClientRect();
    for (const c of this.tabContent.children) {
      c.style.transition = 'ease 0s';
      c.style.transform = `translate(${-this[STATE_SYMBOL].position * width}px)`;
    }
    // const ges = enableGesture(this.tabContent);
    // ges.dispose();
    this.tabContent.addEventListener('pan', event => {
      console.log(111);
      if (event.isVertical) return;

      const { width } = this.tabContent.getBoundingClientRect();
      let { dx } = event;
      if (this[STATE_SYMBOL].position === 0 && event.dx > 0) {
        dx = event.dx / 3;
      }

      if (this[STATE_SYMBOL].position === this.tabContent.children.length - 1 && event.dx < 0) {
        dx = event.dx / 3;
      }

      for (const c of this.tabContent.children) {
        c.style.transition = 'ease 0s';
        c.style.transform = `translate(${dx - this[STATE_SYMBOL].position * width}px)`;
      }
    });

    this.tabContent.addEventListener('panend', event => {
      if (event.isVertical) return;
      const { width } = this.tabContent.getBoundingClientRect();
      let isLeft; // true：左边图片需要过渡；flase：右边图片需要过渡
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          this[STATE_SYMBOL].position -= 1;
          isLeft = true;
        } else {
          this[STATE_SYMBOL].position += 1;
          isLeft = false;
        }
      } else if (event.dx >= width / 2) {
        this[STATE_SYMBOL].position -= 1;
        isLeft = true;
      } else if (event.dx <= -width / 2) {
        this[STATE_SYMBOL].position += 1;
        isLeft = false;
      } else if (event.dx >= 0) {
        isLeft = false;
      } else {
        isLeft = true;
      }

      if (this[STATE_SYMBOL].position < 0) this[STATE_SYMBOL].position = 0;
      if (this[STATE_SYMBOL].position > this.tabContent.children.length - 1) {
        this[STATE_SYMBOL].position = this.tabContent.children.length - 1;
      }

      this.goTo(this[STATE_SYMBOL].position);
    });
  }

  handleTabClick(e) {
    if (e.target.dataset.index == null) return;
    this[STATE_SYMBOL].position = Number(e.target.dataset.index);
    this.goTo(this[STATE_SYMBOL].position);
  }

  goTo(index) {
    index = Number(index);
    const { width } = this.tabContent.getBoundingClientRect();
    for (const c of this.tabContent.children) {
      c.style.transition = 'ease 0.5s';
      c.style.transform = `translate(${-index * width}px)`;
    }
    this.changeTabBar();
  }

  changeTabBar() {
    if (!this.activeBar) {
      this.activeBar = document.querySelector('.tab_bar--active');
    }
    const _c = this.tabHeader.children;
    for (const child of _c) {
      if (Number(child.dataset.index) == this[STATE_SYMBOL].position) {
        child.style.fontWeight = 'bold';
      } else {
        child.style.fontWeight = 'normal';
      }
    }
    this.activeBar.style.left = this.tabBarleftMap[this[STATE_SYMBOL].position];
  }

  getTabBarLeftMap() {
    const result = {};
    let widthAdded = 0;
    Array.from(this.tabHeader.children)
      .slice(1)
      .forEach((child, index) => {
        if (index === 0) {
          child.style.fontWeight = 'bold';
        }
        result[child.dataset.index] =
          (Number(getComputedStyle(child).width.replace('px', '')) - 21) / 2 +
          index * 24 +
          widthAdded +
          'px';
        widthAdded += Number(getComputedStyle(child).width.replace('px', ''));
      });
    this.tabHeader.style.width = widthAdded + (this.props.children.length - 1) * 24 + 'px';
    return result;
  }
}
