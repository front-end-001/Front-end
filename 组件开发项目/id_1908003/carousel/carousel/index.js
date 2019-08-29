

class Carousel {
  constructor(container, data, config = {}) {
    this._container = container;
    this._container.classList.add('carousel');
    this._timer = null;
    this.data = null;
    this.config = Object.assign({}, this.defaultConfig, config);
  }

  /** 默认配置 */
  defaultConfig = {
    /** 轮播图切换速度, 单位 ms */
    speed: 300,
    /** 循环轮播 */
    loop: true,
    /** @type {object|false} 自动播放配置 */
    autoplay: {
      /** 自动轮播时间间隔, 单位 ms */
      delay: 3000,
    },
  }

  render() {
    for (let src of this.data) {
      const item = document.createElement('img');
      item.src = src;
      this._container.appendChild(item);
    }

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

    // @ts-ignore
    enableGesture(this._container);


    this._container.addEventListener('pan', (event) => {
      if (!event.isHorizontal) {
        return;
      }
      disX = event.clientX - startX;
      for (let child of children) {
        child.style.transition = 'ease 0s';
        child.style.transform = `translate(${-position * width + event.dx}px)`;
      }
    });

    this._container.addEventListener('flick', (event) => {
      if (event.isHorizontal) {
        if (event.dx < 0) {
          position += 1;
        } else {
          position -= 1;
        }
      }
      position = Math.max(0, Math.min(position, children.length - 1));
      for (let child of children) {
        child.style.transition = '';
        child.style.transform = `translate(${-position * width}px)`;
      }
    });


    this._container.addEventListener('panend', (event) => {
      if (event.isFlick) return;

      if (event.isHorizontal) {
        position = -Math.round((-position * width + event.dx) / width);
        position = Math.max(0, Math.min(position, children.length - 1));
      }
      for (let child of children) {
        child.style.transition = '';
        child.style.transform = `translate(${-position * width}px)`;
      }
    });

    this._container.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });

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

//     <!-- If we need scrollbar -->
//     <div class="carousel-scrollbar"></div>
// </div>