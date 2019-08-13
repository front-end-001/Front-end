class Carousel {
    constructor({ el, items }) {
        this._el = el;
        this._items = items;
        this.initDom();
        // this.move();
        this.enableDrag();
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
    enableDrag() {
        const el = this._el;
        ['dragStart', 'dragging', 'dragEnd'].forEach(handler => this[handler] = this[handler].bind(this))
        el.addEventListener('mousedown', this.dragStart);
        for (const img of el.children) {
            img.addEventListener('mousedown', e => e.preventDefault());
        }
    }
    dragStart(e) {
        document.addEventListener('mousemove', this.dragging);
        document.addEventListener('mouseup', this.dragEnd);
        this.dragStatus = {
            initPos: this._position || 0,
            start: e.clientX
        };
    }
    dragging(e) {
        // console.log('move', e.clientX - this.dragStatus.start);
        this._position = this.dragStatus.initPos + e.clientX - this.dragStatus.start;
        this.update(this._position + 'px');
    }
    dragEnd(e) {
        document.removeEventListener('mousemove', this.dragging);
        document.removeEventListener('mouseup', this.dragEnd);
        //弹回
        const containerWidth = this._el.offsetWidth;
        const i = Math.min(this._items.length - 1, Math.max(0, Math.round(-this._position / containerWidth)));
        const from = `${this._position}px`;
        const to = `${this._position  = -i*containerWidth}px`;
        console.log('end:', from, to);
        for (const img of this._el.children) {
            cssMove(img, from, to);
        }
    }
    update(x) {
        for (const img of this._el.children) {
            img.classList.remove('animate');
            img.style.transform = `translateX(${x})`;
        }
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