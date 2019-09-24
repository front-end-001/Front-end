
// 基础接口：
// 1、画布宽高
// 2、轮播时间
// 3、轮播动画
// 4、指示器
// 5、手势


// class CarouselInterface {
//   constructor(width, height, durition, animation, indicator, gesture) {
//     this.width = width;
//     this.height = height;
//     this.durition = durition;
//     this.animation = animation;
//     this.indicator = indicator;
//     this.gesture = gesture;
//   }
// }

// class Carousel extends CarouselInterface {

// }

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const SYSTEM_SYMBOL = Symbol('system');
const STATE_SYMBOL = Symbol('system');

class Carousel {
  constructor(container, data) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[SYSTEM_SYMBOL] = Object.create(null);

    this.created(container, data);
  }

  created(container, data) {
    // this._container = container;
    this[PROPERTY_SYMBOL]._container = container;
    this[PROPERTY_SYMBOL]._container.classList.add('container');
    this.data = data;
  }

  mounted() {
    for (let d of this.data) {
      let img = document.createElement('img');
      img.src = d;
      this[PROPERTY_SYMBOL]._container.appendChild(img);
    }
  }

  render() {
    // ?
    this.mounted();

    let children = Array.prototype.slice.call(this[PROPERTY_SYMBOL]._container.children);
    let position = 0;

    let nextFrame = () => {
      let nextPosition = position + 1;
      nextPosition = nextPosition % children.length;

      let current = children[position];
      let next = children[nextPosition];

      // 把下一张摆放到正确的位置
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        // 把 current 挪出视口
        current.style.transition = ''; // 恢复
        current.style.transform = `translate(${-100 - 100 * position}%)`;

        // 把下一张挪入视口
        next.style.transition = '';
        next.style.transform = `translate(${-100 * nextPosition}%)`;
        position = nextPosition;
      })
      setTimeout(nextFrame, 3000);
    }
    // setTimeout(nextFrame, 3000)

    this[PROPERTY_SYMBOL]._container.addEventListener('mousedown', e => e.preventDefault());
    enableGesture(this[PROPERTY_SYMBOL]._container);
    let x = 0;
    this[PROPERTY_SYMBOL]._container.addEventListener('pan', e => {
      if (e.isVertical) return;

      for (let child of children) {
        child.style.transition = 'ease 0s';
        child.style.transform = `translate(${e.dx + x}px)`;
      }
    })
    this[PROPERTY_SYMBOL]._container.addEventListener('panend', e => {
      if (e.isVertical) return;

      if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
        if (e.dx > 0) {
          position = position - 1;
        }
        if (e.dx < 0) {
          position = position + 1;
        }
      } else {
        position = -(Math.round((e.dx + x) / 600));
      }

      position = Math.max(0, Math.min(position, children.length - 1))
      for (let child of  children) {
        child.style.transition = '';
        child.style.transform = `translate(${-position * 600}px)`;
      }
      x = -position * 600;
    })


    // let startX, startTransform;
    // let start = e => {
    //   e.preventDefault();
    //   // 获取鼠标位置
    //   startX = e.clientX;
    //   // 设置初始转换数值
    //   startTransform = -position * 600;
    //   this._container.addEventListener('mousemove', move);
    //   this._container.addEventListener('mouseup', end);
    // }

    // let move = e => {
    //   e.preventDefault();
    //   for (let child of children) {
    //     child.style.transition = 'ease 0s';
    //     // console.log(startX, startTransform, e.clientX, e.clientX - startX);
    //     child.style.transform = `translate(${startTransform + e.clientX - startX}px)`;
    //   }
    // }

    // let end = e => {
    //   this._container.removeEventListener('mousemove', move);
    //   this._container.removeEventListener('mouseup', end);
    //   console.log(startX, startTransform, e.clientX, e.clientX - startX);
    //   position = -(Math.round((startTransform + e.clientX - startX) / 600));

    //   console.log(position);

    //   position = Math.max(0, Math.min(position, children.length - 1))
    //   console.log(position);

    //   for (let child of  children) {
    //     child.style.transition = '';
    //     child.style.transform = `translate(${-position * 600}px)`;
    //   }
    // }

    // this._container.addEventListener('mousedown', start);
  }

}