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
  }

  render() {
    for (let d of data) {
      let img = document.createElement('img');
      img.src = d;
      this._container.appendChild(img);
    }

    let children = Array.prototype.slice.call(this._container.children);
    let position = 0;

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
      
      setTimeout(nextPic, 3000);
    }
    // setTimeout(nextPic, 3000);


    // 拖拽

    this._container.addEventListener('mousedown', e => e.preventDefault());
    enableGesture(this._container);
    // 偏移量
    let x = 0;

    // this._container.addEventListener('panstart', e => {
    //   x = -position * 600;
    // })

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
      last.style.transform = `translate(${-600 - 600 * lastPosition + e.dx}px)`;

      // 把下一张摆放到正确的位置
      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${600 - 600 * nextPosition + e.dx}px)`;

      // 当前摆放到正确的位置
      current.style.transition = 'ease 0s';
      current.style.transform = `translate(${- 600 * position + e.dx}px)`;

    })

    // 移动结束
    this._container.addEventListener('panend', e => {
      if (e.isVertical) return;
      // let condition = 0;
      let isLeft; // 是否往左滑 dx < 0
      // dx > 0 往右
      if (e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)) {
        // condition = e.dx < 0 ? 1 : -1;
        if (e.dx > 0) {
          position = position - 1;
          isLeft = true;
        } else {
          position = position + 1;
          isLeft = false;
        }
      } else {
        if (e.dx > 600/2) {
          position = position - 1;
          isLeft = true;
        } else if (e.dx < -600/2) {
          position = position + 1;
          isLeft = false;
        } else if (e.dx > 0) {
          isLeft = false;
        } else {
          isLeft = true;
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

      if (isLeft) {
        last.style.transition = '';
      } else {
        last.style.transition = 'ease 0s';
      }

      // 把上一张摆放到正确的位置
      // last.style.transition = ''; // 恢复动画
      last.style.transform = `translate(${-600 - 600 * lastPosition}px)`;

      if (!isLeft) {
        next.style.transition = '';
      } else {
        next.style.transition = 'ease 0s';
      }

      // 把下一张摆放到正确的位置
      // next.style.transition = '';
      next.style.transform = `translate(${600 - 600 * nextPosition}px)`;

      // 当前摆放到正确的位置
      current.style.transition = '';
      current.style.transform = `translate(${-600 * position}px)`;


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
