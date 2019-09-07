import TimeLine from '../css-animation-lib/animation/Timeline';
import DOMElementStyleNumberAnimation from '../css-animation-lib/animation/DOMElementStyleNumberAnimation';

let data = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
];

class Carousel {
  constructor(container) {
    this._container = container;
    this._handler = null;
    this.data = null;
    // enableGesture(this._container);
  }

  render() {
    let i = data.length;
    for (let d of this.data) {
      let e = document.createElement('img');
      e.src = d;
      this._container.appendChild(e);
      e.style.zIndex = i++;
      // e.onclick = event => console.log(d);
    }
    let tl = new TimeLine();

    let children = Array.prototype.slice.call(container.children);
    let position = 0;
    let offsetTimeStart = 0;
    let nextPicture = () => {
      let nextPosition = position + 1;

      nextPosition = nextPosition % children.length;

      let current = children[position],
        next = children[nextPosition];
      //把next摆到正确的位置
      //next.style.transition = "ease 0s";
      next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

      offsetTimeStart = Date.now();

      tl.addAnimation(
        new DOMElementStyleNumberAnimation(
          current,
          'transform',
          0,
          -500 * position,
          1000,
          -500 - 500 * position,
          v => `translateX(${v}px)`
        )
      );
      tl.addAnimation(
        new DOMElementStyleNumberAnimation(
          next,
          'transform',
          0,
          500 - 500 * nextPosition,
          1000,
          -500 * nextPosition,
          v => `translateX(${v}px)`
        )
      );
      tl.restart();

      position = nextPosition;

      nextPictureTimer = setTimeout(nextPicture, 3000);
    };
    let nextPictureTimer = setTimeout(nextPicture, 3000);

    let offset = 0;
    this._container.addEventListener('mousedown', event => {
      //startTransform = - position * 500;
      tl.pause();

      let currentTime = Date.now();
      if (currentTime - offsetTimeStart < 1000) {
        offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
        console.log(offset);
      } else {
        offset = 0;
      }

      clearTimeout(nextPictureTimer);
    });
    this._container.addEventListener('pan', event => {
      // event.origin.preventDefault();
      let current = children[position];

      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length;
      let last = children[lastPosition];
      last.style.transition = 'ease 0s';
      last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`;

      next.style.transition = 'ease 0s';
      next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`;

      current.style.transition = 'ease 0s';
      current.style.transform = `translate(${-500 * position + event.dx + offset}px)`;
    });
    this._container.addEventListener('panend', event => {
      let isLeft;
      if (event.isFlick) {
        if (event.dx > 0) {
          position--;
          isLeft = true;
        }

        if (event.dx < 0) {
          position++;
          isLeft = false;
        }
      } else {
        if (event.dx > 250) {
          position--;
          isLeft = true;
        } else if (event.dx < -250) {
          position++;
          isLeft = false;
        } else {
          isLeft = event.dx <= 0;
        }
      }
      position = (children.length + position) % children.length;

      let current = children[position];
      let nextPosition = (position + 1) % children.length;
      let next = children[nextPosition];
      let lastPosition = (children.length + position - 1) % children.length;
      let last = children[lastPosition];

      if (!isLeft) {
        last.style.transition = '';
      } else {
        last.style.transition = 'ease 0s';
      }
      last.style.transform = `translate(${-500 - 500 * lastPosition}px)`;

      if (isLeft) {
        next.style.transition = '';
      } else {
        next.style.transition = 'ease 0s';
      }
      next.style.transform = `translate(${500 - 500 * nextPosition}px)`;

      current.style.transition = '';
      current.style.transform = `translate(${-500 * position}px)`;
    });

    this._container.addEventListener('mousedown', event => event.preventDefault());
  }
}

let carousel = new Carousel(document.getElementById('container'));
carousel.data = data;
carousel.render();
