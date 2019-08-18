const imgList = [
  '../carousel-vue/public/imgs/cat1.jpg',
  '../carousel-vue/public/imgs/cat2.jpg',
  '../carousel-vue/public/imgs/cat3.jpg',
  '../carousel-vue/public/imgs/cat4.jpg',
];

class Carousel {
  constructor(container) {
    this._container = container;
    this._container.classList.add('carousel');
    this._timer = null;
    this.data = null;
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

    const nextFrame = () => {
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

      this._timer = setTimeout(nextFrame, 3000);
    };

    // 注释则不进行自动轮播
    // this._timer = setTimeout(nextFrame, 3000);

    /** 鼠标最初位置 */
    let startX;
    /** 水平位移 */
    let disX;
    /** 轮播宽度 */
    const width = this._container.offsetWidth;

    const start = (event) => {
      event.preventDefault();
      startX = event.clientX;
      disX = 0;
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', end);
    };

    const move = (event) => {
      event.preventDefault();
      disX = event.clientX - startX;
      for (let child of children) {
        child.style.transition = 'ease 0s';
        child.style.transform = `translate(${-position * width + disX}px)`;
      }
    };

    const end = () => {
      position = -Math.round((-position * width + disX) / width);
      position = Math.max(0, Math.min(position, children.length - 1));
      for (let child of children) {
        child.style.transition = '';
        child.style.transform = `translate(${-position * width}px)`;
      }
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', move);
    };

    // 注释此行禁止原始拖动代码
    // this._container.addEventListener('mousedown', start);

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

const carousel = new Carousel(document.getElementById('carousel'));
carousel.data = imgList;
carousel.render();
