function getTransformXVal(el) {
  let trasVal = window
    .getComputedStyle(el)
    .getPropertyValue('transform');
  const mat = trasVal.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
}
class Carousel {
  /**
   * 
   * @param {Element} container 
   * @param {object[]} data 
   * @param {any} config 
   */
  constructor(container, data, config = {}) {
    this._container = container;
    this._wrapperEle = null;
    this._timer = null;
    this._tl = null;
    this.data = data;
    /** @type {Element[]} */
    this.slideEle = [];
    this.config = Object.assign({}, this.defaultConfig, config);
    this.current = 0;
  }

  /** 默认配置 */
  defaultConfig = {
    /** 轮播图切换速度, 单位 ms */
    speed: 1000,
    /** 循环轮播 */
    loop: true,
    /** @type {object|false} 自动播放配置 */
    autoplay: {
      /** 自动轮播时间间隔, 单位 ms */
      delay: 1000,
    },
  }

  init() {
    // 清空原来内容
    this._container.innerHTML = '';
    this.clearBefore();

    this._container.classList.add('carousel-container');
    const wrapperEle = document.createElement('div');
    this._wrapperEle = wrapperEle;
    wrapperEle.classList.add('carousel-wrapper');
    this._container.appendChild(wrapperEle);
    for (let item of this.data) {
      const slideEle = document.createElement('div');
      slideEle.classList.add('carousel-slide');
      const imgEle = document.createElement('img');
      imgEle.src = item.src;
      imgEle.title = item.title;
      slideEle.appendChild(imgEle);
      wrapperEle.appendChild(slideEle);
    }

    // If we need pagination
    const paginationEle = document.createElement('div');
    paginationEle.classList.add('carousel-pagination');
    this._container.appendChild(paginationEle);

    // If we need navigation buttons
    const prevEle = document.createElement('div');
    prevEle.classList.add('carousel-button-prev');
    this._container.appendChild(prevEle);
    const nextEle = document.createElement('div');
    nextEle.classList.add('carousel-button-next');
    this._container.appendChild(nextEle);

    // 将子元素转化为普通数组
    this.slideEle = Array.prototype.slice.call(wrapperEle.children);

    if (this.config.autoplay) {
      this.startAutoPlay();
    }

    this._container.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });

    this.enableGesture();
  }

  /** 手势支持 */
  enableGesture() {

    gesture.enableGesture(this._wrapperEle);

    // 能力检测
    let useTouch = false;
    try {
      document.createEvent('TouchEvent');
      useTouch = true;
    } catch (err) {
      useTouch = false;
    }

    if (useTouch) {
      this._wrapperEle.addEventListener('touchstart', (event) => {
        this.touchReady(event);
      });
    } else {
      this._wrapperEle.addEventListener('mousedown', (event) => {
        this.touchReady(event);
      });
    }

    /** 鼠标最初位置 */
    let startX;
    /** 水平位移 */
    let disX;

    // this._wrapperEle.addEventListener('pan', (event) => {
    //   if (!event.isHorizontal) {
    //     return;
    //   }
    //   disX = event.clientX - startX;
    //   for (let child of children) {
    //     child.style.transition = 'ease 0s';
    //     child.style.transform = `translate(${-position * width + event.dx}px)`;
    //   }
    // });

    // this._wrapperEle.addEventListener('flick', (event) => {
    //   if (event.isHorizontal) {
    //     if (event.dx < 0) {
    //       position += 1;
    //     } else {
    //       position -= 1;
    //     }
    //   }
    //   position = Math.max(0, Math.min(position, children.length - 1));
    //   for (let child of children) {
    //     child.style.transition = '';
    //     child.style.transform = `translate(${-position * width}px)`;
    //   }
    // });

    // this._wrapperEle.addEventListener('panend', (event) => {
    //   if (event.isFlick) return;

    //   if (event.isHorizontal) {
    //     position = -Math.round((-position * width + event.dx) / width);
    //     position = Math.max(0, Math.min(position, children.length - 1));
    //   }
    //   for (let child of children) {
    //     child.style.transition = '';
    //     child.style.transform = `translate(${-position * width}px)`;
    //   }
    // });

    // 以下两个事件发生后也应自动回复轮播
    this._wrapperEle.addEventListener('pressend', () => {
      this.touchEnd();
    });
    this._wrapperEle.addEventListener('tap', () => {
      this.touchEnd();
    });
  }

  /**
   * 鼠标/触摸开始时需做准备操作
   * 预备函数, 停用当前自动轮播动画, 禁止自动轮播
   * 移动前中后三图到固定位置
   * @param {Event} event 
   */
  touchReady(event) {
    event.preventDefault();
    // 停止当前的自动轮播
    this.stopAutoPlay();
    // 移动前后三张轮播元素到当前接触位置
    /** 轮播宽度 */
    const width = this._wrapperEle.offsetWidth;

    const { prevSlideEle, currentSlideEle, nextSlideEle, prevIndex, currentIndex, nextIndex } = this.getActiveEle();
    const translateX_Val = getTransformXVal(currentSlideEle);
    const dx = translateX_Val + (width * currentIndex);
    prevSlideEle.style.transform = `translateX(${ (-1 * (prevIndex + 1)) * width + dx }px)`;
    nextSlideEle.style.transform = `translateX(${ (-1 *  (nextIndex - 1)) * width + dx }px)`;
  }

  /**
   * 鼠标/触摸开结束时需恢复
   */
  touchEnd() {
    // 计算当前的 current
    /** 轮播宽度 */
    const width = this._wrapperEle.offsetWidth;

    let { prevSlideEle, currentSlideEle, nextSlideEle, prevIndex, currentIndex, nextIndex } = this.getActiveEle();
    const translateX_Val = getTransformXVal(currentSlideEle);
    const dx = translateX_Val + (width * currentIndex);
    let dCurrent = 0;
    let time;

    if (dx > 0 && dx > (width / 2)) {
      dCurrent = 1;
      time = (1 - (dx / width)) * this.config.speed;
    } else if (dx < 0 && (-1 * dx) > (width / 2)) {
      dCurrent = -1;
      time = (1 + (dx / width)) * this.config.speed;
    }

    // 移动前后三张轮播元素到对应位置
    const tl = new anime.timeline({});
    const conterter = (v) => `translateX(${v}px)`;
    tl.add({
        element: currentSlideEle,
        property: 'transform',
        startTime: 0,
        endTime: time,
        startValue: translateX_Val,
        endValue: -1 * width * this.current,
      }, conterter)
      .add({
        element: prevSlideEle,
        property: 'transform',
        startTime: 0,
        endTime: time,
        startValue: translateX_Val - width,
        endValue: -1 * width * (this.current + 1),
      }, conterter)
      .add({
        element: nextSlideEle,
        property: 'transform',
        startTime: 0,
        endTime: time,
        startValue: translateX_Val + width,
        endValue: -1 * width * (this.current - 1),
      }, conterter);
    tl.onFinish = () => {
      // 恢复自动播放
      this.startAutoPlay();
    };
  }

  /**
   * 开始自动播放
   */
  startAutoPlay() {
    this.clearBefore();

    const playFuc = () => {
      this._timer = setTimeout(() => {
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
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    if (this._tl) {
      this._tl.pause();
      this._tl = null;
    }
  }

  /**
   * 获取当前激活元素
   */
  getActiveEle() {
    const prev = this.getIndex(this.current, -1);
    const next = this.getIndex(this.current, 1);
    return {
      prevSlideEle: this.slideEle[prev],
      currentSlideEle: this.slideEle[this.current],
      nextSlideEle: this.slideEle[next],
      prevIndex: prev,
      currentIndex: this.current,
      nextIndex: next,
    };
  }

  /**
   * 自动切换下一页, 自动轮播使用
   */
  doSlide() {
    const { currentSlideEle, nextSlideEle, currentIndex, nextIndex } = this.getActiveEle();

    // 获取当前宽度
    const dw = this._container.offsetWidth;
    const tl = new anime.timeline({});
    const conterter = (v) => `translateX(${v}px)`;
    tl.add({
        element: currentSlideEle,
        property: 'transform',
        startTime: 0,
        endTime: this.config.speed,
        startValue: -1 * dw * currentIndex,
        endValue: -1 * dw * (currentIndex + 1),
      }, conterter)
      .add({
        element: nextSlideEle,
        property: 'transform',
        startTime: 0,
        endTime: this.config.speed,
        startValue: -1 * dw * (nextIndex - 1),
        endValue: -1 * dw * nextIndex,
      }, conterter);
    tl.play();
    tl.onFinish = () => {
      this.current = this.getIndex(this.current, 1);
      this._tl = null;
    };
    this._tl = tl;
  }


  /** 获取对应便宜的 index */
  getIndex(current, d) {
    return (current + this.slideEle.length + d) % this.slideEle.length;
  }

  render() {
    // 将子元素转化为普通数组
    const children = Array.prototype.slice.call(this._container.children);

    /** 当前轮播位置 */
    let position = 0;

    const nextPic = () => {
      /** 下一轮播位置 */
      let nextPosition = position + 1;
      nextPosition = nextPosition % children.length;

      /** 当前轮播元素 */
      const current = children[position];
      /** 下一轮播元素 */
      const next = children[nextPosition];

      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${ -nextPosition * 100 + 100 }%)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          current.style.transform = `translate(${ -100 - 100 * position }%)`;
          next.style.transition = '';
          next.style.transform = `translate(${ -nextPosition * 100 }%)`;
          position = nextPosition;
        });
      });

      this._timer = setTimeout(nextPic, 3000);
    };

    // 注释则不进行自动轮播
    // this._timer = setTimeout(nextPic, 3000);

    /** 鼠标最初位置 */
    let startX;
    /** 水平位移 */
    let disX;
    /** 轮播宽度 */
    const width = this._container.offsetWidth;

    // const start = (event) => {
    //   event.preventDefault();
    //   startX = event.clientX;
    //   disX = 0;
    //   document.addEventListener('mousemove', move);
    //   document.addEventListener('mouseup', end);
    // };

    // const move = (event) => {
    //   event.preventDefault();
    //   disX = event.clientX - startX;
    //   for (let child of children) {
    //     child.style.transition = 'ease 0s';
    //     child.style.transform = `translate(${-position * width + disX}px)`;
    //   }
    // };

    // const end = () => {
    //   position = -Math.round((-position * width + disX) / width);
    //   position = Math.max(0, Math.min(position, children.length - 1));
    //   for (let child of children) {
    //     child.style.transition = '';
    //     child.style.transform = `translate(${-position * width}px)`;
    //   }
    //   document.removeEventListener('mousemove', move);
    //   document.removeEventListener('mouseup', move);
    // };

    // 注释此行禁止原始拖动代码
    // this._container.addEventListener('mousedown', start);

    gesture.enableGesture(this._container);




  }
}


// <!-- Slider main container -->
// <div class="carousel-container">
//     <!-- Additional required wrapper -->
//     <div class="carousel-wrapper">
//         <!-- Slides -->
//         <div class="carousel-slide"><img class="slide-img" title="title" style="object-fit: contain;"></div>
//         <div class="carousel-slide">"><img class="slide-img" title="title" style="object-fit: contain;"></div>
//         <div class="carousel-slide">"><img class="slide-img" title="title" style="object-fit: contain;"></div>
//         ...
//     </div>
//     <!-- If we need pagination -->
//     <div class="carousel-pagination"></div>

//     <!-- If we need navigation buttons -->
//     <div class="carousel-button-prev"></div>
//     <div class="carousel-button-next"></div>

// </div>
