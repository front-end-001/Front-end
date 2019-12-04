/**
 * speed: 切换速度
 * easing: 动画类型
 * autoplay: 是否自动播放
 * listData: 轮播数据
 */
import Gesture from '../../assets/gesture';
import Timeline from '../../assets/animation';
import Component, {
  PROP_SYMBOL,
  ATTR_SYMBOL,
  EVENT_SYMBOL,
  STATUS_SYMBOL
} from '../component';
import createComponent from '../createComponent';
import { getTransformXVal } from '../../assets/utils';
import './index.scss';

/** 默认配置 */
const DEFAULT_CONFIG = {
  /** 轮播图切换速度, 单位 ms */
  speed: 400,
  /** 动画类型 */
  easing: 'line',
  /** @type {object|false} 自动播放配置 */
  autoplay: {
    /** 自动轮播时间间隔, 单位 ms */
    delay: 3000
  }
};

export default class Carousel extends Component {
  constructor(attrs) {
    super(attrs);
    // 初始化状态
    this[STATUS_SYMBOL].timer = null;
    this[STATUS_SYMBOL].timeLine = null;
    this[STATUS_SYMBOL].data = [];
    this[STATUS_SYMBOL].current = 0;
    /** @type {Element[]} */
    this[STATUS_SYMBOL].slideEle = [];
    /** @type {Element[]} */
    this[STATUS_SYMBOL].pointEle = [];
    // 初始化属性
    for (let propName in DEFAULT_CONFIG) {
      if (typeof this[PROP_SYMBOL][propName] === 'undefined') {
        this[PROP_SYMBOL][propName] = DEFAULT_CONFIG[propName];
      }
    }
  }

  render() {
    const props = this.$getProp();
    this[STATUS_SYMBOL].data = props.listData || [];
    const { data } = this[STATUS_SYMBOL];

    const slideEles = data.map(item => (
      <div class="carousel-slide">
        <img class="slide-img" src={item.img} />
      </div>
    ));

    const paginations = data.map(() => <div class="carousel-point"></div>);

    this[STATUS_SYMBOL].slideEle = slideEles;
    this[STATUS_SYMBOL].pointEle = paginations;

    const carousel = (
      <div class="carousel-container">
        <div class="carousel-wrapper">{slideEles}</div>
        <div class="carousel-pagination">{paginations}</div>
      </div>
    );

    this.setActiveClass();
    return carousel;
  }

  mounted() {
    this.startAutoPlay();
    this.enableGesture();
  }

  get current() {
    return this[STATUS_SYMBOL].current;
  }

  get config() {
    const props = this.$getProp();
    const config = {};
    Object.keys(DEFAULT_CONFIG).forEach(key => {
      config[key] = props[key];
    });
    return config;
  }

  /** 手势支持 */
  enableGesture() {
    // 开启拖拽
    const gesture = new Gesture(this.$el);
    gesture.enable();

    // 轻点 长按, 跳转
    this.$el.addEventListener('tap', () => {
      alert('点击跳转');
    });
    this.$el.addEventListener('pressend', () => {
      alert('长按跳转');
    });

    /** 水平位移 */
    const { current, slideEle, pointEle } = this[STATUS_SYMBOL];
    let leftSlideEle;
    let currentSlideEle;
    let rightSlideEle;
    let leftIndex;
    let currentIndex;
    let rightIndex;
    let leftStartX;
    let currentStartX;
    let rightStartX;
    let width;

    /** 防止 move 事件冒泡 */
    const stopBubble = e => {
      e.cancelBubble = true;
      e.stopImmediatePropagation();
    };

    /** 处理手势移动 */
    const handleMove = e => {
      leftSlideEle.$el.style.transform = `translateX(${leftStartX + e.dx}px)`;
      currentSlideEle.$el.style.transform = `translateX(${currentStartX +
        e.dx}px)`;
      rightSlideEle.$el.style.transform = `translateX(${rightStartX + e.dx}px)`;
    };

    // 鼠标/触摸开始时需做准备操作
    // 预备函数, 停用当前自动轮播动画, 禁止自动轮播
    // 移动前中后三图到固定位置

    this.$el.addEventListener('panstart', event => {
      if (!event.isHorizontal) {
        return;
      }

      this.$el.addEventListener('touchmove', stopBubble, { passive: false });
      this.$el.addEventListener('touchend', stopBubble, { passive: false });
      this.$el.addEventListener('touchcancel', stopBubble, { passive: false });
      this.$el.addEventListener('pan', handleMove);
      window.stopScroll();

      event.preventDefault();
      // 停止当前的自动轮播
      this.stopAutoPlay();
      /** 轮播宽度 */
      width = this.$el.offsetWidth;

      // current 矫正
      currentSlideEle = this.getActiveEle(this.current).currentSlideEle;
      const translateX_Val = getTransformXVal(currentSlideEle.$el);
      let cdx = translateX_Val + this[STATUS_SYMBOL].current * width;
      if (cdx < (-1 * width) / 2) {
        this[STATUS_SYMBOL].current += 1;
        this[STATUS_SYMBOL].current =
          this[STATUS_SYMBOL].current % slideEle.length;
      }

      leftSlideEle = this.getActiveEle(this.current).leftSlideEle;
      currentSlideEle = this.getActiveEle(this.current).currentSlideEle;
      rightSlideEle = this.getActiveEle(this.current).rightSlideEle;
      leftIndex = this.getActiveEle(this.current).leftIndex;
      currentIndex = this.getActiveEle(this.current).currentIndex;
      rightIndex = this.getActiveEle(this.current).rightIndex;

      // 移动前后三张轮播元素到当前接触位置
      currentStartX = translateX_Val;
      leftStartX =
        leftIndex < currentIndex
          ? translateX_Val
          : -1 * slideEle.length * width + translateX_Val;
      rightStartX =
        rightIndex > currentIndex
          ? translateX_Val
          : slideEle.length * width + translateX_Val;
      leftSlideEle.$el.style.transform = `translateX(${leftStartX}px)`;
      rightSlideEle.$el.style.transform = `translateX(${rightStartX}px)`;

      // console.log('current', currentIndex);
      // console.log('leftStartX', leftStartX / width, leftStartX);
      // console.log('currentStartX', currentStartX / width, currentStartX);
      // console.log('rightStartX', rightStartX / width, rightStartX);
    });

    this.$el.addEventListener('panend', event => {
      if (!event.isHorizontal) {
        return;
      }

      setTimeout(() => {
        this.$el.removeEventListener('pan', handleMove);
        this.$el.removeEventListener('touchmove', stopBubble, {
          passive: false
        });
        this.$el.removeEventListener('touchend', stopBubble);
        this.$el.removeEventListener('touchcancel', stopBubble);
        window.cancelStopScroll();
      });

      const translateX_Val = getTransformXVal(currentSlideEle.$el);
      const dx = translateX_Val - currentStartX;
      let time = (dx / width) * this.config.speed;
      let dCurrent = 0;
      if (dx > 0 && dx > width / 2) {
        dCurrent = -1;
        time = (1 - dx / width) * this.config.speed;
      } else if (dx < 0 && -1 * dx > width / 2) {
        dCurrent = 1;
        time = (1 + dx / width) * this.config.speed;
      }
      if (time < 0) {
        time = time * -1;
      }

      // 移动前后三张轮播元素到对应位置
      const tl = new Timeline({});
      this[STATUS_SYMBOL].timeLine = tl;
      const conterter = v => `translateX(${v}px)`;
      tl.add(
        {
          element: currentSlideEle.$el,
          property: 'transform',
          startTime: 0,
          endTime: time,
          startValue: translateX_Val,
          endValue: -1 * width * (this.current + dCurrent)
        },
        conterter
      );
      if (dCurrent <= 0) {
        const targetLeft =
          leftIndex < currentIndex
            ? -1 * width * (this.current + dCurrent)
            : -1 * (slideEle.length + dCurrent) * width;
        tl.add(
          {
            element: leftSlideEle.$el,
            property: 'transform',
            startTime: 0,
            endTime: time,
            startValue: leftStartX + dx,
            endValue: targetLeft
          },
          conterter
        );
      }
      if (dCurrent >= 0) {
        const targetRight =
          rightIndex > currentIndex
            ? -1 * width * (this.current + dCurrent)
            : (1 - dCurrent) * width;
        tl.add(
          {
            element: rightSlideEle.$el,
            property: 'transform',
            startTime: 0,
            endTime: time,
            startValue: rightStartX + dx,
            endValue: targetRight
          },
          conterter
        );
      }
      tl.onFinish = () => {
        this[STATUS_SYMBOL].current += dCurrent;
        this[STATUS_SYMBOL].timeLine = null;
        this.setActiveClass();
        // 恢复自动播放
        // this.startAutoPlay();
      };
      // 开始动画
      tl.play();
    });

    this.$el.addEventListener('flick', event => {
      if (!event.isHorizontal) {
        return;
      }

      setTimeout(() => {
        this.$el.removeEventListener('pan', handleMove);
        this.$el.removeEventListener('touchmove', stopBubble, {
          passive: false
        });
        this.$el.removeEventListener('touchend', stopBubble);
        this.$el.removeEventListener('touchcancel', stopBubble);
        window.cancelStopScroll();
      });

      const translateX_Val = getTransformXVal(currentSlideEle.$el);
      const dx = translateX_Val - currentStartX;
      let time;
      let dCurrent;
      if (event.dx > 0) {
        dCurrent = -1;
        time = (1 - dx / width) * this.config.speed;
      } else {
        dCurrent = 1;
        time = (1 + dx / width) * this.config.speed;
      }

      // 移动前后三张轮播元素到对应位置
      const tl = new Timeline({});
      this[STATUS_SYMBOL].timeLine = tl;
      const conterter = v => `translateX(${v}px)`;
      tl.add(
        {
          element: currentSlideEle.$el,
          property: 'transform',
          startTime: 0,
          endTime: time,
          startValue: translateX_Val,
          endValue: -1 * width * (this.current + dCurrent)
        },
        conterter
      );
      if (dCurrent < 0) {
        const targetLeft =
          leftIndex < currentIndex
            ? -1 * width * (this.current + dCurrent)
            : -1 * (slideEle.length - 1) * width;
        tl.add(
          {
            element: leftSlideEle.$el,
            property: 'transform',
            startTime: 0,
            endTime: time,
            startValue: leftStartX + event.dx,
            endValue: targetLeft
          },
          conterter
        );
      }
      if (dCurrent > 0) {
        const targetRight =
          rightIndex > currentIndex
            ? -1 * width * (this.current + dCurrent)
            : 0;
        tl.add(
          {
            element: rightSlideEle.$el,
            property: 'transform',
            startTime: 0,
            endTime: time,
            startValue: rightStartX + event.dx,
            endValue: targetRight
          },
          conterter
        );
      }
      tl.onFinish = () => {
        this[STATUS_SYMBOL].current += dCurrent;
        this[STATUS_SYMBOL].current =
          (this[STATUS_SYMBOL].current + slideEle.length) % slideEle.length;
        this[STATUS_SYMBOL].timeLine = null;
        this.setActiveClass();
        // 恢复自动播放
        // this.startAutoPlay();
      };
      // 开始动画
      tl.play();

      ///////////////////////////////////////////////////////////////////////////

      // const translateX_Val = getTransformXVal(currentSlideEle.$el);
      // let time;

      // // 移动前后三张轮播元素到对应位置
      // const tl = new Timeline({});
      // this[STATUS_SYMBOL].timeLine = tl;
      // const conterter = v => `translateX(${v}px)`;
      // tl.add(
      //   {
      //     element: currentSlideEle.$el,
      //     property: 'transform',
      //     startTime: 0,
      //     endTime: time,
      //     startValue: translateX_Val,
      //     endValue: -1 * width * (this.current + dCurrent)
      //   },
      //   conterter
      // )
      //   .add(
      //     {
      //       element: leftSlideEle.$el,
      //       property: 'transform',
      //       startTime: 0,
      //       endTime: time,
      //       startValue: translateX_Val - width,
      //       endValue: -1 * width * (this.current + 1 + dCurrent)
      //     },
      //     conterter
      //   )
      //   .add(
      //     {
      //       element: rightSlideEle.$el,
      //       property: 'transform',
      //       startTime: 0,
      //       endTime: time,
      //       startValue: translateX_Val + width,
      //       endValue: -1 * width * (this.current - 1 + dCurrent)
      //     },
      //     conterter
      //   );
      // tl.onFinish = () => {
      //   this[STATUS_SYMBOL].current += dCurrent;
      //   this[STATUS_SYMBOL].timeLine = null;
      //   this.setActiveClass();
      //   // 恢复自动播放
      //   this.startAutoPlay();
      // };
      // // 开始动画
      // tl.play();

      // // this.doSlide(dCurrent);
      // // position = Math.max(0, Math.min(position, slideEle.length - 1));
      // // for (let child of slideEle) {
      // //   child.$el.style.transition = '';
      // //   child.$el.style.transform = `translate(${-position * width}px)`;
      // // }
    });
  }

  /**
   * 开始自动播放
   */
  startAutoPlay() {
    this.clearBefore();

    const playFuc = () => {
      this[STATUS_SYMBOL].timer = setTimeout(() => {
        this.doSlide();

        playFuc();
      }, this.config.autoplay.delay + this.config.speed);
    };

    playFuc();
  }

  /** 停止当前自动轮播 */
  stopAutoPlay() {
    this.clearBefore();
  }

  /**
   * 清除之前的计时器等
   */
  clearBefore() {
    if (this[STATUS_SYMBOL].timer) {
      clearTimeout(this[STATUS_SYMBOL].timer);
      this[STATUS_SYMBOL].timer = null;
    }
    if (this[STATUS_SYMBOL].timeLine) {
      this[STATUS_SYMBOL].timeLine.pause();
      this[STATUS_SYMBOL].timeLine = null;
    }
  }

  /**
   * 获取当前激活元素
   */
  getActiveEle(current, step = 1) {
    let { slideEle } = this[STATUS_SYMBOL];
    if (typeof current !== 'number') {
      throw new Error('current need be number');
    }
    if (current < 0 || current >= slideEle.length) {
      throw new Error('current need be index of slide');
    }
    // 确保整数
    current = Math.floor(current);
    let realStep = step % slideEle.length;
    let left;
    let right;
    // 没有移动目标, 返回前后即可(同值为1的情况)
    if (realStep === 0) {
      realStep = 1;
    }

    // // 总长度为 2 的情况
    // if (slideEle.length === 2) {
    //   let result;
    //   let another = (current === 0) ? 1 : 0;
    //   result = {
    //     prevSlideEle: slideEle[another],
    //     currentSlideEle: slideEle[current],
    //     nextSlideEle: slideEle[another],
    //     prevIndex: another,
    //     currentIndex: current,
    //     nextIndex: another,
    //   };
    //   return result;
    // }

    if (realStep > 0) {
      left = this.getOffsetIndex(current, -1);
      right = this.getOffsetIndex(current, realStep);
    }

    if (realStep < 0) {
      left = this.getOffsetIndex(current, realStep);
      right = this.getOffsetIndex(current, 1);
    }

    const result = {
      leftSlideEle: slideEle[left],
      currentSlideEle: slideEle[current],
      rightSlideEle: slideEle[right],
      leftIndex: left,
      currentIndex: current,
      rightIndex: right
    };

    // console.log('getActiveEle:', result.leftIndex, result.currentIndex, result.rightIndex);

    return result;
  }
  /**
   * 自动切换下一页, 自动轮播使用
   */
  doSlide(step = 1) {
    let { current, slideEle } = this[STATUS_SYMBOL];
    const { speed } = this[PROP_SYMBOL];
    const realStep = step % slideEle.length;

    if (realStep === 0) {
      return;
    }

    const {
      leftSlideEle,
      currentSlideEle,
      rightSlideEle,
      leftIndex,
      currentIndex,
      rightIndex
    } = this.getActiveEle(current, realStep);

    // 获取当前宽度
    const dw = this.$el.offsetWidth;
    const tl = new Timeline({});
    const conterter = v => `translateX(${v}px)`;

    if (realStep > 0) {
      tl.add(
        {
          element: currentSlideEle.$el,
          property: 'transform',
          startTime: 0,
          endTime: speed,
          startValue: -1 * dw * currentIndex,
          endValue: -1 * dw * (currentIndex + 1)
        },
        conterter
      ).add(
        {
          element: rightSlideEle.$el,
          property: 'transform',
          startTime: 0,
          endTime: speed,
          startValue: -1 * dw * (rightIndex - 1),
          endValue: -1 * dw * rightIndex
        },
        conterter
      );
    } else {
      tl.add(
        {
          element: currentSlideEle.$el,
          property: 'transform',
          startTime: 0,
          endTime: speed,
          startValue: -1 * dw * currentIndex,
          endValue: -1 * dw * (currentIndex - 1)
        },
        conterter
      ).add(
        {
          element: leftSlideEle.$el,
          property: 'transform',
          startTime: 0,
          endTime: speed,
          startValue: -1 * dw * (leftIndex + 1),
          endValue: -1 * dw * leftIndex
        },
        conterter
      );
    }

    // 开始动画
    tl.play();

    // 动画结束时修改当前指针和清除动画时间线类
    tl.onFinish = () => {
      this[STATUS_SYMBOL].current = this.getOffsetIndex(current, realStep);
      this[STATUS_SYMBOL].timeLine = null;
      this.setActiveClass();
    };

    this[STATUS_SYMBOL].timeLine = tl;
  }

  /** 获取对应偏移的 index */
  getOffsetIndex(current, d) {
    const { slideEle } = this[STATUS_SYMBOL];
    const total = slideEle.length;
    return (current + total + d) % total;
  }

  setActiveClass() {
    const { current, slideEle, pointEle } = this[STATUS_SYMBOL];

    slideEle.forEach((ele, index) => {
      if (index === current) {
        ele.$el.classList.add('current');
        return;
      }
      ele.$el.classList.remove('current');
    });

    pointEle.forEach((ele, index) => {
      if (index === current) {
        ele.$el.classList.add('current');
        return;
      }
      ele.$el.classList.remove('current');
    });
  }
}

// (function () {

//   /** 默认 props */
//   const DEFAULT_CONFIG = {
//     /** 轮播图切换速度, 单位 ms */
//     speed: 500,
//     /** 动画类型 */
//     easing: 'line',
//     /** @type {object|false} 自动播放配置 */
//     autoplay: false,
//     // autoplay: {
//     //   /** 自动轮播时间间隔, 单位 ms */
//     //   delay: 1000,
//     // },
//     /** 是否启用手势支持 */
//     enableTouch: false,
//     /** 轮播方向 1: 正向 -: 反向 */
//     deriction: 1,
//   };

//   class Carousel extends Component {
//     /**
//      * @param {Element} container
//      * @param {object[]} data
//      * @param {any} config
//      */
//     constructor(container, data, config = {}) {
//       if (!Array.isArray(data) || data.length < 3) {
//         throw new Error('data need array, and length > 2');
//       }

//       super(container);

//       // 初始化状态
//       this[STATUS_SYMBOL].timer = null;
//       this[STATUS_SYMBOL].timeLine = null;
//       this[STATUS_SYMBOL].data = data;
//       this[STATUS_SYMBOL].current = 0;
//       /** @type {Element[]} */
//       this[STATUS_SYMBOL].slideEle = [];

//       // 初始化属性
//       for (let propName in DEFAULT_CONFIG) {
//         if (typeof config[propName] === 'undefined') {
//           this[PROP_SYMBOL][propName] = DEFAULT_CONFIG[propName];
//         } else {
//           this[PROP_SYMBOL][propName] = config[propName];
//         }
//       }
//     }

//     get container() {
//       return this.getStatus('container');
//     }

//     set container(val) {
//       this.setStatus('container', val);
//     }

//     get config() {
//       return this.getAllProp();
//     }

//     set config(val) {
//       if (typeof val !== 'object') {
//         return;
//       }

//       // 初始化属性
//       const currentConfig = this.getAllProp();
//       for (let propName in currentConfig) {
//         if (typeof val[propName] === 'undefined') {
//           this[PROP_SYMBOL][propName] = currentConfig[propName];
//         } else {
//           this[PROP_SYMBOL][propName] = val[propName];
//         }
//       }
//     }

//     get current() {
//       return this[STATUS_SYMBOL].current;
//     }

//     set current(val) {
//       const { current, slideEle } = this[STATUS_SYMBOL];
//       const { deriction } = this[PROP_SYMBOL];

//       if (typeof val !== 'number') {
//         throw new Error('current need be number');
//       }

//       if (val < 0 || val >= slideEle.length) {
//         throw new Error('current need be index of slide');
//       }

//       val = Math.floor(val);
//       let d = val - current;

//       if (deriction < 0) {
//         d = current - val;
//       }

//       this.doSlide(d);
//     }

//     created() {
//       const { data, container } = this[STATUS_SYMBOL];

//       const wrapperEle = document.createElement('div');
//       wrapperEle.classList.add('carousel-wrapper');

//       for (let item of data) {
//         const slideEle = document.createElement('div');
//         slideEle.classList.add('carousel-slide');
//         const imgEle = document.createElement('img');
//         imgEle.src = item.src;
//         imgEle.title = item.title;
//         slideEle.appendChild(imgEle);
//         wrapperEle.appendChild(slideEle);
//       }

//       // If we need pagination
//       const paginationEle = document.createElement('div');
//       paginationEle.classList.add('carousel-pagination');
//       container.appendChild(paginationEle);

//       // If we need navigation buttons
//       const prevEle = document.createElement('div');
//       prevEle.classList.add('carousel-button-prev');
//       container.appendChild(prevEle);
//       const nextEle = document.createElement('div');
//       nextEle.classList.add('carousel-button-next');
//       container.appendChild(nextEle);

//       container.addEventListener('mousedown', (event) => {
//         event.preventDefault();
//       });

//       if (this.config.enableTouch) {
//         this.enableGesture();
//       }

//       return wrapperEle;
//     }

//     mounted(ele) {
//       const { container } = this[STATUS_SYMBOL];
//       container.classList.add('carousel-container');
//       // 将子元素转化为普通数组, 存入 status
//       this[STATUS_SYMBOL].slideEle = Array.prototype.slice.call(ele.children);

//       if (this.config.autoplay) {
//         this.startAutoPlay();
//       }
//       if (this.config.enableTouch) {
//         this.enableGesture();
//       }
//     }

//     /** 手势支持 */
//     enableGesture() {
//       gesture.enableGesture(this[STATUS_SYMBOL].root);

//       // 能力检测
//       let useTouch = false;
//       try {
//         document.createEvent('TouchEvent');
//         useTouch = true;
//       } catch (err) {
//         useTouch = false;
//       }

//       if (useTouch) {
//         this.root.addEventListener('touchstart', (event) => {
//           touchReady(event);
//         });
//       } else {
//         this.root.addEventListener('mousedown', (event) => {
//           touchReady(event);
//         });
//       }

//       /** 鼠标最初位置 */
//       let startX;
//       /** 水平位移 */
//       let disX;

//       // this.root.addEventListener('pan', (event) => {
//       //   if (!event.isHorizontal) {
//       //     return;
//       //   }
//       //   disX = event.clientX - startX;
//       //   for (let child of children) {
//       //     child.style.transition = 'ease 0s';
//       //     child.style.transform = `translate(${-position * width + event.dx}px)`;
//       //   }
//       // });

//       // this.root.addEventListener('flick', (event) => {
//       //   if (event.isHorizontal) {
//       //     if (event.dx < 0) {
//       //       position += 1;
//       //     } else {
//       //       position -= 1;
//       //     }
//       //   }
//       //   position = Math.max(0, Math.min(position, children.length - 1));
//       //   for (let child of children) {
//       //     child.style.transition = '';
//       //     child.style.transform = `translate(${-position * width}px)`;
//       //   }
//       // });

//       // this.root.addEventListener('panend', (event) => {
//       //   if (event.isFlick) return;

//       //   if (event.isHorizontal) {
//       //     position = -Math.round((-position * width + event.dx) / width);
//       //     position = Math.max(0, Math.min(position, children.length - 1));
//       //   }
//       //   for (let child of children) {
//       //     child.style.transition = '';
//       //     child.style.transform = `translate(${-position * width}px)`;
//       //   }
//       // });

//       // 以下两个事件发生后也应自动回复轮播
//       this.root.addEventListener('pressend', () => {
//         this.touchEnd();
//       });
//       this.root.addEventListener('tap', () => {
//         this.touchEnd();
//       });

//       /**
//        * 鼠标/触摸开始时需做准备操作
//        * 预备函数, 停用当前自动轮播动画, 禁止自动轮播
//        * 移动前中后三图到固定位置
//        * @param {Event} event
//        */
//       const touchReady = (event) => {
//         event.preventDefault();
//         // 停止当前的自动轮播
//         this.stopAutoPlay();
//         // 移动前后三张轮播元素到当前接触位置
//         /** 轮播宽度 */
//         const width = this.root.offsetWidth;

//         const { prevSlideEle, currentSlideEle, nextSlideEle, prevIndex, currentIndex, nextIndex } = this.getActiveEle(this.current);
//         const translateX_Val = getTransformXVal(currentSlideEle);
//         const dx = translateX_Val + (width * currentIndex);
//         prevSlideEle.style.transform = `translateX(${ (-1 * (prevIndex + 1)) * width + dx }px)`;
//         nextSlideEle.style.transform = `translateX(${ (-1 *  (nextIndex - 1)) * width + dx }px)`;
//       }

//       /**
//        * 鼠标/触摸开结束时需恢复
//        */
//       const touchEnd = () => {
//         // 计算当前的 current
//         /** 轮播宽度 */
//         const width = this.root.offsetWidth;

//         let { prevSlideEle, currentSlideEle, nextSlideEle, prevIndex, currentIndex, nextIndex } = this.getActiveEle(this.current);
//         const translateX_Val = getTransformXVal(currentSlideEle);
//         const dx = translateX_Val + (width * currentIndex);
//         let dCurrent = 0;
//         let time = this.config.speed;

//         if (dx > 0 && dx > (width / 2)) {
//           dCurrent = -1;
//           time = (1 - (dx / width)) * this.config.speed;
//         } else if (dx < 0 && (-1 * dx) > (width / 2)) {
//           dCurrent = 1;
//           time = (1 + (dx / width)) * this.config.speed;
//         }

//         // 移动前后三张轮播元素到对应位置
//         const tl = new Timeline({});
//         const conterter = (v) => `translateX(${v}px)`;
//         tl.add({
//             element: currentSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: time,
//             startValue: translateX_Val,
//             endValue: -1 * width * this.current,
//           }, conterter)
//           .add({
//             element: prevSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: time,
//             startValue: translateX_Val - width,
//             endValue: -1 * width * (this.current + 1),
//           }, conterter)
//           .add({
//             element: nextSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: time,
//             startValue: translateX_Val + width,
//             endValue: -1 * width * (this.current - 1),
//           }, conterter);
//         tl.onFinish = () => {
//           // 恢复自动播放
//           this.startAutoPlay();
//         };
//       }
//     }

//     /**
//      * 开始自动播放
//      */
//     startAutoPlay() {
//       this.clearBefore();

//       const playFuc = () => {
//         this[STATUS_SYMBOL].timer = setTimeout(() => {
//           this.doSlide();

//           playFuc();
//         }, this.config.autoplay.delay + this.config.speed);
//       };

//       playFuc();
//     }

//     /** 停止当前自动轮播 */
//     stopAutoPlay() {
//       this.clearBefore();
//     }

//     /**
//      * 清除之前的计时器等
//      */
//     clearBefore() {
//       if (this[STATUS_SYMBOL].timer) {
//         clearTimeout(this[STATUS_SYMBOL].timer);
//         this[STATUS_SYMBOL].timer = null;
//       }
//       if (this[STATUS_SYMBOL].timeLine) {
//         this[STATUS_SYMBOL].timeLine.pause();
//         this[STATUS_SYMBOL].timeLine = null;
//       }
//     }

//     /**
//      * 获取当前激活元素
//      */
//     getActiveEle(current, step = 1) {
//       let { slideEle } = this[STATUS_SYMBOL];
//       if (typeof current !== 'number') {
//         throw new Error('current need be number');
//       }
//       if (current < 0 || current >= slideEle.length) {
//         throw new Error('current need be index of slide');
//       }
//       // 确保整数
//       current = Math.floor(current);
//       let realStep = step % slideEle.length;
//       let left;
//       let right;
//       // 没有移动目标, 返回前后即可(同值为1的情况)
//       if (realStep === 0) {
//         realStep = 1;
//       };

//       // // 总长度为 2 的情况
//       // if (slideEle.length === 2) {
//       //   let result;
//       //   let another = (current === 0) ? 1 : 0;
//       //   result = {
//       //     prevSlideEle: slideEle[another],
//       //     currentSlideEle: slideEle[current],
//       //     nextSlideEle: slideEle[another],
//       //     prevIndex: another,
//       //     currentIndex: current,
//       //     nextIndex: another,
//       //   };
//       //   return result;
//       // }

//       if (realStep > 0) {
//         left = this.getOffsetIndex(current, -1);
//         right = this.getOffsetIndex(current, realStep);
//       }

//       if (realStep < 0) {
//         left = this.getOffsetIndex(current, realStep);
//         right = this.getOffsetIndex(current, 1);
//       }

//       const result = {
//         leftSlideEle: slideEle[left],
//         currentSlideEle: slideEle[current],
//         rightSlideEle: slideEle[right],
//         leftIndex: left,
//         currentIndex: current,
//         rightIndex: right,
//       };

//       // console.log('getActiveEle:', result.leftIndex, result.currentIndex, result.rightIndex);

//       return result;
//     }

//     /**
//      * 自动切换下一页, 自动轮播使用
//      */
//     doSlide(step = 1) {
//       let { current, slideEle } = this[STATUS_SYMBOL];
//       const { deriction, speed } = this[PROP_SYMBOL];
//       const realStep = step * deriction % slideEle.length;

//       if (realStep === 0) {
//         return;
//       }

//       const {
//         leftSlideEle,
//         currentSlideEle,
//         rightSlideEle,
//         leftIndex,
//         currentIndex,
//         rightIndex,
//       } = this.getActiveEle(current, realStep);

//       // 获取当前宽度
//       const dw = this.container.offsetWidth;
//       const tl = new Timeline({});
//       const conterter = (v) => `translateX(${v}px)`;

//       if (realStep > 0) {
//         tl.add({
//             element: currentSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: speed,
//             startValue: -1 * dw * currentIndex,
//             endValue: -1 * dw * (currentIndex + 1),
//           }, conterter)
//           .add({
//             element: rightSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: speed,
//             startValue: -1 * dw * (rightIndex - 1),
//             endValue: -1 * dw * rightIndex,
//           }, conterter);
//       } else {
//         tl.add({
//             element: currentSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: speed,
//             startValue: -1 * dw * currentIndex,
//             endValue: -1 * dw * (currentIndex - 1),
//           }, conterter)
//           .add({
//             element: leftSlideEle,
//             property: 'transform',
//             startTime: 0,
//             endTime: speed,
//             startValue: -1 * dw * (leftIndex + 1),
//             endValue: -1 * dw * leftIndex,
//           }, conterter);
//       }

//       // 开始动画
//       tl.play();

//       // 动画结束时修改当前指针和清除动画时间线类
//       tl.onFinish = () => {
//         this[STATUS_SYMBOL].current = this.getOffsetIndex(current, realStep);
//         this[STATUS_SYMBOL].timeLine = null;
//       };

//       this[STATUS_SYMBOL].timeLine = tl;
//     }

//     /** 获取对应偏移的 index */
//     getOffsetIndex(current, d) {
//       const { slideEle } = this[STATUS_SYMBOL];
//       const total = slideEle.length;
//       return (current + total + d) % total;
//     }
//   }
//   return Carousel;
// }());

////////////////////////////////////////////////////////////////////////////////////////////////

// <!-- Slider main container -->
