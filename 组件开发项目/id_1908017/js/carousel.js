class Carousel {
    constructor({ el, items }) {
        this._el = el;
        this._items = items;
        this.initDom();
        this.pos = 0;
        this.autoMove();
        this.enableAutoMoveStop();
        this.enableGesture();
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

    autoMove() {
        this.autoMoveTimer = setTimeout(() => {
            const nextPos = (this.pos + 1) % this._items.length;
            this.move(nextPos);
            this.autoMove();
        }, 1000);
    }

    /**
     * hover时停止autoMove
     */
    enableAutoMoveStop() {
        const stopAuto = () => clearTimeout(this.autoMoveTimer);
        const startAuto = () => this.autoMove();
        this._el.addEventListener('mouseenter', () => {
            console.log('mouseenter');
            //todo 考虑移出 el
            stopAuto();
        })
        this._el.addEventListener('mouseleave', () => {
            console.log('mouseleave');
            //todo 考虑移出 el
            startAuto();
        })
    }

    enableGesture() {
        const el = this._el;
        enableGesture(el);

        el.addEventListener('tap', () => {
            console.log('tap', this.pos); //跳转到pos
        });
        el.addEventListener('flick', e => {
            const r2l = e.dx < 0;
            console.log('carousel flick r2l:', r2l);
            //todo 配合 手势 一开始就是高速
            this.move(this.getValidPos(this.pos + (r2l ? 1 : -1)), r2l);
        });
        //禁止拖拽 
        el.addEventListener('mousedown', e => e.preventDefault());
        el.addEventListener('touchstart', e => e.preventDefault());
    }
    getValidPos(pos) {
        return (pos + this._items.length) % this._items.length;
    }

    move(to, r2l = true) {
        const from = this.pos;
        this.pos = to;
        const leaveItem = this._el.children[from];
        const enterItem = this._el.children[to];
        //render
        cssMove(leaveItem, `${(-from) * 100}%`, `${((r2l ? -1 : 1) - from) * 100}%`);
        cssMove(enterItem, `${((r2l ? 1 : -1) - to) * 100}%`, `${(-to) * 100}%`);
    }

    enableDrag() {
        const el = this._el;
        ['dragStart', 'dragging', 'dragEnd'].forEach(handler => this[handler] = this[handler].bind(this))
        el.addEventListener('mousedown', this.dragStart);
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
        e.preventDefault();
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
        const to = `${this._position = -i * containerWidth}px`;
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
    //todo ?考虑z—index;
}