import { h, Component } from '../../base';
import Gesture from '../../packages/gesture';
import Timeline, { ease, StyleNumberAnimation } from '../../packages/timeline';

import './index.scss';

const ATTRIBUTE_SYMBOL = Symbol('attribute');
const PROPERTY_SYMBOL = Symbol('property');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

const g = new Gesture();

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
  }

  mounted() {
    console.log('Carousel mounted');
    this.init();
  }

  render() {
    const data = this.props.data || [
      'http://gw.alicdn.com/imgextra/i3/1618197344/O1CN01ojvFXL247bENVZDBI_!!1618197344-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp',
      'http://gw.alicdn.com/imgextra/i3/626230892/O1CN01a08iOp1ISZp3xGcTx_!!626230892-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp',
      'http://gw.alicdn.com/imgextra/i1/1739653505/TB2YjeTlDqWBKNjSZFxXXcpLpXa_!!1739653505-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp',
    ];
    return (
      <div class="carousel">
        {data.map(child => {
          return (
            <div className="carousel_item">
              <img src={child.coverPic} alt="" style="width: 100%;height:100%" />
              <div className="carousel_item_inner">
                <div className="fashionTag" style={child.fashionTag || `display:none`}>
                  {child.fashionTag}
                </div>
                <div className="title">{child.title}</div>
                <div className="shopName">
                  <img
                    src="http://gw.alicdn.com/tfs/TB1UfHJlQCWBuNjy0FaXXXUlXXa-52-48.png_110x10000.jpg_.webp"
                    alt=""
                    style="width:13px;height12px;margin-right:3px"
                  />
                  {child.shopName}
                </div>
                <div className="shopItem">
                  {child.shopItemVOs.map(c => {
                    return <img src={c.itemPic} alt="" />;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  init() {
    this._container = document.querySelector('.carousel');

    this._width = Number(getComputedStyle(this._container).width.replace('px', ''));
    this._container.style.height = (this._width * 170) / 351 + 'px';
    const children = Array.prototype.slice.call(document.querySelector('.carousel').children);
    let position = 0;
    let offsetTimeStart = 0;
    const tl = new Timeline();
    /* eslint-disable */
    const nextPic = () => {
      const nextPosition = (position + 1) % children.length;
      const [current, next] = [children[position], children[nextPosition]];
      // 矫正下一张的位置
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(
          ${this._width - this._width * nextPosition}px
        )`;
      offsetTimeStart = Date.now();
      tl.clearAnimations();

      tl.addAnimation(
        new StyleNumberAnimation(
          current,
          'transform',
          0,
          -this._width * position,
          500,
          -this._width - this._width * position,
          v => `translateX(${v}px)`,
        ),
      );

      tl.addAnimation(
        new StyleNumberAnimation(
          next,
          'transform',
          0,
          this._width - this._width * nextPosition,
          500,
          -this._width * nextPosition,
          v => `translateX(${v}px)`,
        ),
      );

      tl.restart();
      // setTimeout(() => {
      //   tl.clearTick();
      // }, 1000);
      position = nextPosition;
      this._handler = setTimeout(nextPic, 3000);
    };

    const ges = g.enable(document.querySelector('.carousel'));

    let offset = 0;
    this._container.addEventListener('mousedown', event => {
      event.preventDefault();
      tl.pause();
      let currentTime = Date.now();

      if (currentTime - offsetTimeStart < 500) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 500) * 500;
      } else {
        offset = 0;
      }
      clearTimeout(this._handler);
    });

    this._container.addEventListener('touchstart', event => {
      event.preventDefault();
      tl.pause();
      let currentTime = Date.now();
      if (currentTime - offsetTimeStart < 500) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 500) * 500;
      } else {
        offset = 0;
      }
      clearTimeout(this._handler);
    });

    this._container.addEventListener('pan', event => {
      if (event.isVertical) return;
      let lastPosition = (children.length + position - 1) % children.length;
      let nextPosition = (position + 1) % children.length;
      let last = children[lastPosition];
      let current = children[position];
      let next = children[nextPosition];

      last.style.transition = 'ease 0s';
      last.style.transform = `translate(
          ${-this._width - this._width * lastPosition + event.dx + offset}px
        )`;

      current.style.transition = 'ease 0s';
      current.style.transform = `translate(
          ${-this._width * position + event.dx + offset}px
        )`;
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(
          ${this._width - this._width * nextPosition + event.dx + offset}px
        )`;
    });

    this._container.addEventListener('panend', event => {
      if (event.isVertical) return;
      let isLeft; // true：左边图片需要过渡；flase：右边图片需要过渡
      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          position -= 1;
          isLeft = true;
        } else {
          position += 1;
          isLeft = false;
        }
      } else {
        if (event.dx + offset >= this._width / 2) {
          position -= 1;
          isLeft = true;
        } else if (event.dx + offset <= -this._width / 2) {
          position += 1;
          isLeft = false;
        } else isLeft = event.dx + offset < 0;
      }
      position = (children.length + position) % children.length;
      let current = children[position];
      let lastPosition = (children.length + position - 1) % children.length;
      let nextPosition = (position + 1) % children.length;
      let last = children[lastPosition];
      let next = children[nextPosition];

      if (isLeft) {
        next.style.transition = '';
        last.style.transition = 'ease 0s';
      } else {
        next.style.transition = 'ease 0s';
        last.style.transition = '';
      }
      current.style.transition = '';

      last.style.transform = `translate(
          ${-this._width - this._width * lastPosition}px
        )`;
      current.style.transform = `translate(
          ${-this._width * position}px
        )`;
      next.style.transform = `translate(
          ${this._width - this._width * nextPosition}px
        )`;
    });

    this._container.addEventListener('mousedown', event => {
      event.preventDefault();
    });

    this._handler = setTimeout(nextPic, 3000);
  }
}
