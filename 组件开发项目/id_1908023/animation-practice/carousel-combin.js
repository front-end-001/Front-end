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

    let children = Array.prototype.slice.call(this._container.children);
    let position = 0;
    let timeout = null;

    let nextPic = () => {
      let nextPosition = position + 1;
      nextPosition = nextPosition % children.length;

      let current = children[position];
      let next = children[nextPosition];

      // 把下一张摆放到正确的位置
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 把 current 挪出视口
          current.style.transition = ''; // 恢复
          current.style.transform = `translate(${-100 - 100 * position}%)`;
  
          // 把下一张挪入视口
          next.style.transition = '';
          next.style.transform = `translate(${-100 * nextPosition}%)`;
          position = nextPosition;
        })
      })
      
      timeout = setTimeout(nextPic, 3000);
    }
    timeout = setTimeout(nextPic, 3000);

    // 拖拽
    this._container.addEventListener('mousedown', e => e.preventDefault());
    enableGesture(this._container);

    this._container.addEventListener('panstart', e => {
      clearTimeout(timeout);
    })

    // 移动中
    this._container.addEventListener('pan', e => {
      if (e.isVertical) return;
      
      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length;
      let last = children[lastPosition];

      // 把上一张摆放到正确的位置
      last.style.transition = 'ease 0s';
      last.style.transform = `translate(${-this.width - this.width * lastPosition + e.dx}px)`;

      // 把下一张摆放到正确的位置
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${this.width - this.width * nextPosition + e.dx}px)`;

      // 当前摆放到正确的位置
      current.style.transition = 'ease 0s';
      current.style.transform = `translate(${- this.width * position + e.dx}px)`;

    })

    // 移动结束
    this._container.addEventListener('panend', e => {
      timeout = setTimeout(nextPic, 3000);
      if (e.isVertical) return;
      let isLeft; // 是否往左滑 dx < 0
      let isReset; // 是否还原状态，没滑过半
      // dx > 0 往右
      if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
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
        if (e.dx > this.width/2) {
          position = position - 1;
          isLeft = false;
          isReset = false;
        } else if (e.dx < -this.width/2) {
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
      }
      // 当前位置
      position = (children.length + position) % children.length

      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length;
      let last = children[lastPosition];

      if (!isLeft && !isReset) {
        last.style.transition = 'ease 0s';
      } else {
        last.style.transition = ''; // 恢复动画
      }

      // 把上一张摆放到正确的位置
      last.style.transform = `translate(${-this.width - this.width * lastPosition}px)`;

      if (isLeft && isReset) {
        next.style.transition = '';
      } else if (!isLeft && !isReset) {
        next.style.transition = '';
      } else {
        next.style.transition = 'ease 0s';
      }

      // 把下一张摆放到正确的位置
      next.style.transform = `translate(${this.width - this.width * nextPosition}px)`;

      // 当前摆放到正确的位置
      current.style.transition = '';
      current.style.transform = `translate(${-this.width * position}px)`;
    })
  }
}

new Carousel(document.getElementById('container'), data).render();
