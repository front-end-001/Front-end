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
      // position++;
      // position = position % children.length;

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

        // 把下一张挪出视口
        next.style.transition = '';
        next.style.transform = `translate(${-100 * nextPosition}%)`;
        position = nextPosition;
      })

      // requestAnimationFrame(() => {
      //   requestAnimationFrame(() => {
      //     // 把 current 挪出视口
      //     current.style.transition = ''; // 恢复
      //     current.style.transform = `translate(${-100 - 100 * position}%)`;

      //     // 把下一张挪出视口
      //     next.style.transition = '';
      //     next.style.transform = `translate(${-100 * nextPosition}%)`;
      //     position = nextPosition;
      //   })
      // })

      // for (let child of children) {
      //   child.style.transform = `translate(${-100 * position}%)`;
      // }
      setTimeout(nextFrame, 3000);
    }
    setTimeout(nextFrame, 3000)
  }
}

new Carousel(document.getElementById('container'), data).render();
