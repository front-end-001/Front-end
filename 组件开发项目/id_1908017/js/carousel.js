class Carousel {
    constructor({ el, items }) {
        this._el = el;
        this._items = items;
        this.initDom();
        this.move();
    }
    initDom() {
        const { _el: el, _items: item } = this;
        el.classList.add('carousel');
        for (const pic of this._items) {
            const img = new Image();
            img.src = pic;
            el.appendChild(img);
        }
    }
    move() {
        if (!this.moveStatus) {
            this.moveStatus = { index: 0 }
        }
        const moveStatus = this.moveStatus;
        const items = Array.from(this._el.children);

        const _move = () => {
            const curPos = moveStatus.index;
            const nextPos = (curPos + 1) % items.length;
            //cur 从 镜头向左移动
            cssMove(items[curPos], `${(-curPos)*100}%`, `-${(curPos+1)*100}%`);
            //next 从 镜头右向左移动
            cssMove(items[nextPos], `${(1-nextPos)*100}%`, `${(-nextPos)*100}%`);

            //定时移动
            this._timer = setTimeout(() => {
                moveStatus.index = nextPos;
                _move();
            }, 2000);
        }
        this._timer = setTimeout(() => {
            _move();
        }, 2000);
    }
}

function cssMove(dom, from, to) {
    dom.classList.remove('animate');
    dom.style.transform = `translateX(${from})`;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dom.classList.add('animate');
            dom.style.transform = `translateX(${to})`;
        });
    });
}