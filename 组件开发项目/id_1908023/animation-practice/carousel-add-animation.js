/**
 * 这些代码是跟着老师课堂上敲的，还是有 bug，所以只学逻辑，实际使用还是要使用不加 animation 那个版本的
 */


let linear = cubicBezier(0, 0, 1, 1);
let ease = cubicBezier(.25, .1, .25, 1);
let easeIn = cubicBezier(.42, 0, 1, 1);
let easeOut = cubicBezier(0, 0, .58, 1);
let easeInOut = cubicBezier(.42, 0, .58, 1);
let myCB = cubicBezier(.69, -0.85, .25, 1);

let data = [
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MB8nW70tKnB.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MB8nW78nMR-.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MBOqW7OqKnD.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MBOqW7OqL7D.jpg",
];

class Carousel {
  constructor(container, data) {
    this._container = container;
    this._container.classList.add('container');
    this._handler = null;
    this.data = data;
    this.width = this._container.clientWidth;
  }

  render() {
    for (let d of data) {
      let img = document.createElement('img');
      img.src = d;
      this._container.appendChild(img);
    }

    let tl = new Timeline();

    let children = Array.prototype.slice.call(this._container.children);
    let position = 0;
    let timmer = null;
    let offsetTimeStart = 0;

    let nextPic = () => {
      let nextPosition = position + 1;
      nextPosition = nextPosition % children.length;

      let current = children[position];
      let next = children[nextPosition];

      // 把下一张摆放到正确的位置
      // next.style.transition = 'ease 0s';
      next.style.transform = `translate(${this.width - this.width * nextPosition}px)`;

      offsetTimeStart = Date.now();

      tl.addAnimation(new DomElementAnimation(
        current,
        'transform',
        0, -this.width * position,
        500, -this.width - this.width * position,
        v => `translateX(${v}px)`
      ))

      tl.addAnimation(new DomElementAnimation(
        next,
        'transform',
        0, this.width - this.width * nextPosition,
        500, -this.width * nextPosition,
        v => `translateX(${v}px)`
      ))
      tl.restart();
      position = nextPosition;
      // requestAnimationFrame(() => {
      //   requestAnimationFrame(() => {
      //     // 把 current 挪出视口
      //     current.style.transition = ''; // 恢复
      //     current.style.transform = `translate(${-100 - 100 * position}%)`;

      //     // 把下一张挪入视口
      //     next.style.transition = '';
      //     next.style.transform = `translate(${-100 * nextPosition}%)`;
      //     position = nextPosition;
      //   })
      // })

      timmer = setTimeout(nextPic, 3000);
    }
    timmer = setTimeout(nextPic, 3000);


    // 拖拽

    this._container.addEventListener('mousedown', e => e.preventDefault());
    enableGesture(this._container);
    // 偏移量
    let offset = 0;

    this._container.addEventListener('panstart', e => {
      tl.pause();

      let currentTime = Date.now();
      if (currentTime - offsetTimeStart < 500) {
        offset = this.width - (currentTime - offsetTimeStart) / 500 * this.width;
      } else {
        offset = 0;
      }

      clearTimeout(timmer);
    })

    // 移动中
    this._container.addEventListener('pan', e => {
      if (e.isVertical) return;
      // for (let child of children) {
      //   child.style.transition = 'ease 0s';
      //   child.style.transform = `translate(${e.dx + x}px)`;
      // }

      // current.style.transform = `translate(${-position * 600 + e.dx + x}px)`;
      // next.style.transform = `translate(${600 - nextPosition * 600 + e.dx + x}px)`;
      // prev.style.transform = `translate(${-(prevPosition + 1) * 600 + e.dx + x}px)`;
      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length;
      let last = children[lastPosition];

      // last.style.zIndex = 20;
      // next.style.zIndex = 20;
      // current.style.zIndex = 30;

      // 把上一张摆放到正确的位置
      last.style.transition = 'ease 0s';
      last.style.transform = `translate(${-this.width - this.width * lastPosition + e.dx + offset}px)`;

      // 把下一张摆放到正确的位置
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${this.width - this.width * nextPosition + e.dx + offset}px)`;

      // 当前摆放到正确的位置
      current.style.transition = 'ease 0s';
      current.style.transform = `translate(${- this.width * position + e.dx + offset}px)`;

    })

    // 移动结束
    this._container.addEventListener('panend', e => {
      timmer = setTimeout(nextPic, 3000);
      if (e.isVertical) return;
      // let condition = 0;
      let isLeft; // 是否往左滑 dx < 0
      let isReset; // 是否还原状态，没滑过半
      // dx > 0 往右
      if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
        // condition = e.dx < 0 ? 1 : -1;
        if (e.dx > 0) {
          position = position - 1;
          isLeft = false;
          isReset = false;
        } else {
          position = position + 1;
          isLeft = true;
          isReset = false;
        }
      } else {
        if (e.dx > this.width / 2) {
          position = position - 1;
          isLeft = false;
          isReset = false;
        } else if (e.dx < -this.width / 2) {
          position = position + 1;
          isLeft = true;
          isReset = false;
        }
        // 没滑过半的时候，不改变位置即不设置 position 就会还原了
        else if (e.dx > 0) {
          isLeft = false;
          isReset = true;
        } else {
          isLeft = true;
          isReset = true;
        }

        // position = -(Math.round((e.dx + x) / 600));
        // position = Math.round((position * 600 - e.dx) / 600);
        // condition = x < 600 / 2 ? 1 : x > 600 / 2 ? -1 : 0;
      }
      // position = Math.max(0, Math.min(position, children.length - 1))
      // 当前位置
      position = (children.length + position) % children.length
      // position = x < 600 ? (position - 1 + children.length) % children.length : ((position - 2 + 4 + condition) % children.length)

      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length;
      let last = children[lastPosition];

      // if (isLeft) {
      //   last.style.transition = '';
      // } else {
      //   last.style.transition = 'ease 0s';
      // }

      if (!isLeft && !isReset) {
        last.style.transition = 'ease 0s';
      } else {
        last.style.transition = ''; // 恢复动画
      }

      // 把上一张摆放到正确的位置
      // last.style.transition = ''; // 恢复动画
      last.style.transform = `translate(${-this.width - this.width * lastPosition}px)`;

      // if (!isLeft) {
      //   next.style.transition = '';
      // } else {
      //   next.style.transition = 'ease 0s';
      // }

      if (isLeft && isReset) {
        next.style.transition = '';
      } else if (!isLeft && !isReset) {
        next.style.transition = '';
      } else {
        next.style.transition = 'ease 0s';
      }

      // 把下一张摆放到正确的位置
      // next.style.transition = 'ease 0s';
      next.style.transform = `translate(${this.width - this.width * nextPosition}px)`;

      // 当前摆放到正确的位置
      current.style.transition = '';
      current.style.transform = `translate(${-this.width * position}px)`;


      // for (let child of  children) {
      //   child.style.transition = '';
      //   child.style.transform = `translate(${-position * 600}px)`;
      // }
      // x = -position * 600;
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

new Carousel(document.getElementById('container'), data).render();
