/**
 * 这个是稳定版，滑动的时候不是无限滚动
 */

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

    this._container.addEventListener('mousedown', e => e.preventDefault());
    enableGesture(this._container);
    let x = 0;
    this._container.addEventListener('pan', e => {
      if (e.isVertical) return;

      for (let child of children) {
        child.style.transition = 'ease 0s';
        child.style.transform = `translate(${e.dx + x}px)`;
      }
    })
    this._container.addEventListener('panend', e => {
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

new Carousel(document.getElementById('container'), data).render();
