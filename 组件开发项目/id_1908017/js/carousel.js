const autoMoveDuration = 2000;
const duration = 1500;
class Carousel {
  constructor({ el, items }) {
    this._el = el;
    this._items = items;
    this.initDom();
    this.pos = 0;
    enableGesture(el);
    this.autoMove = this.autoMove.bind(this);
    this.autoMoveTimer = setTimeout(this.autoMove, autoMoveDuration);
    this.enableAutoMoveStop();
    this.setGesture();
  }

  initDom() {
    const { _el: el, _items: items } = this;
    el.classList.add('carousel');
    this._renders = items.map((pic, i) => {
      const img = new Image();
      img.src = pic;
      el.appendChild(img);
      return new CarouselItemRender(img, -i);
    })
  }

  autoMove() {
    this.move(this.pos, this.pos + 1);
    this.autoMoveTimer = setTimeout(this.autoMove, autoMoveDuration);
  }

  /**
   * hover时停止autoMove
   */
  enableAutoMoveStop() {
    //考虑 与 hover 冲突: 并集（hover|| 手势）时停止 
    let count = 0;
    const stopAuto = () => {
      count++;
      log('count ++', count);
      clearTimeout(this.autoMoveTimer);
    };
    const startAuto = () => {
      count--;
      log('count --', count);
      count === 0 && (this.autoMoveTimer = setTimeout(this.autoMove, autoMoveDuration));
    };
    const el = this._el;
    el.addEventListener('mouseenter', () => {
      // console.log('mouseenter');
      stopAuto();
    })
    el.addEventListener('mouseleave', () => {
      // console.log('mouseleave');
      startAuto();
    })

    //手势开始是停止计时器
    el.addEventListener('start', () => stopAuto());
    el.addEventListener('end', () => startAuto());
    el.addEventListener('cancel', () => startAuto());
  }

  setGesture() {
    const el = this._el;
    //点击跳转
    el.addEventListener('tap', () => {
      console.log('jump to ', this.pos); //跳转到pos
    });
    el.addEventListener('pan', e => {
      // console.log('pan', e.dx);
      this.update(e.dx);
    });

    //flick 左滑右滑
    el.addEventListener('panend', e => {
      const fromPos = this._getFloatPos(e.dx);
      let toPos
      if (e.isFlick) {
        // console.log('flick', e.dx);
        if (e.dx > 0) {
          toPos = Math.ceil(fromPos - 1);
        } else {
          toPos = Math.floor(fromPos + 1);
        }
      } else {
        toPos = Math.round(this._getFloatPos(e.dx));
      }
      this.move(fromPos, toPos);
    });
    //todo flick优化 ,快速左右移动时 抖动 
    //禁止拖拽图片
    el.addEventListener('mousedown', e => e.preventDefault());
    el.addEventListener('touchstart', e => e.preventDefault());
  }
  getValidPos(pos) {
    const len = this._items.length;
    pos = pos % len;
    if (pos < 0) {
      pos += len;
    }
    return pos;
  }
  _getFloatPos(dx) {
    const containerWidth = this._el.offsetWidth;
    const floatPos = this.pos - dx / containerWidth;
    return parseFloat(floatPos.toFixed(2));
  }
  update(dx) {
    const floatPos = this._getFloatPos(dx);
    const leftPos = Math.floor(floatPos);
    const rightPos = Math.ceil(floatPos);
    const [leftVPos, rightVPos] = [leftPos, rightPos].map(pos => this.getValidPos(pos));
    this._stopLast([leftVPos, rightVPos]);
    // console.log('update:', floatPos, [leftVPos, leftPos - floatPos], [rightVPos, rightPos - floatPos])
    this._renders[leftVPos].show(leftPos - floatPos);
    this._renders[rightVPos].show(rightPos - floatPos);
  }

  move(from, to) {
    // console.log('move from', from, to);
    const diff = (to - from).toFixed(2);
    if (Math.abs(diff) > 1) {
      throw new Error('diff should be less or equal  1');
    }
    const leftPos = Math.floor(Math.min(from, to));
    const rightPos = Math.ceil(Math.max(from, to));
    const [leftVPos, rightVPos] = [leftPos, rightPos].map(pos => this.getValidPos(pos));
    this._stopLast([leftVPos, rightVPos]);
    this._renders[leftVPos].move(leftPos - from, leftPos - to);
    this._renders[rightVPos].move(rightPos - from, rightPos - to);
    this.pos = this.getValidPos(to);
  }
  _stopLast(itemsIndex$) {
    for (const index of (this._lastShowItemsIndex$ || [])) {
      this._renders[index].hide();
    }
    this._lastShowItemsIndex$ = itemsIndex$;
  }
}

class CarouselItemRender {
  constructor(el, zeroPos) {
    this.el = el;
    this.zeroPos = zeroPos;
  }
  show(pos) {
    // console.log(`item= ${this.zeroPos} show`, pos);
    this._tlStop();
    this._toggleShow(true);
    this.el.style.transform = this._posToStyle(pos);
  }
  hide() {
    // console.log(`item= ${this.zeroPos} hide`);
    this._tlStop();
    this._toggleShow(false);
  }
  /**
   * 
   * @param {*} from 为0时在视窗显示，随着数字增加向右移动
   * @param {*} to 
   */
  move(from, to) {
    // console.log(`item= ${this.zeroPos} move`, from, to);
    this._tlStop();
    this._toggleShow(true);
    this._tlPlay(duration, { transform: [from, to].map(pos => this._posToStyle(pos)) });
  }
  _toggleShow(isShow) {
    this.el.style.visibility = isShow ? '' : 'hidden';
  }
  _posToStyle(pos) {
    return `translateX(${(pos + this.zeroPos) * 100}%)`;
  }
  _tlPlay(duration, style) {
    const tl = this._tl = new TimeLine();
    tl.addAnimation(new StyleAnimation(this.el, 0, duration, style, ease));
    tl.play();
  }
  _tlStop() {
    const { _tl } = this;
    if (_tl) {
      _tl.pause();
      this._tl = null;
    }
  }
}


function log(...args) {
  console.log.apply(null, args);
}