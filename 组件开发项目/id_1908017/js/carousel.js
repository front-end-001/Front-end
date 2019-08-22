class Carousel {
    constructor({ el, items }) {
        this._el = el;
        this._items = items;
        this.initDom();
        this.pos = 0;
        this.autoMove();
        enableGesture(el);
        this.enableAutoMoveStop();
        this.setGesture();
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

        // todo 考虑 与 hover 冲突？ 并集（hover|| 手势）时停止 
        let count = 0;
        const stopAuto = () => {
            count++;
            log('count ++', count);
            clearTimeout(this.autoMoveTimer);
        };
        const startAuto = () => {
            count--;
            log('count --', count);
            count === 0 && this.autoMove();
        };
        const el = this._el;
        el.addEventListener('mouseenter', () => {
            console.log('mouseenter');
            stopAuto();
        })
        el.addEventListener('mouseleave', () => {
            console.log('mouseleave');
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
            console.log('tap', this.pos); //跳转到pos
        });
        //flick 左滑右滑
        el.addEventListener('flick', e => {
            const r2l = e.dx < 0;
            console.log('carousel flick r2l:', r2l);
            //todo 配合 手势 一开始就是高速
            this.move(this.getValidPos(this.pos + (r2l ? 1 : -1)), r2l);
        });
        //todo flick优化 ,快速左右移动时 抖动
        //禁止拖拽图片
        el.addEventListener('mousedown', e => e.preventDefault());
        el.addEventListener('touchstart', e => e.preventDefault());
    }
    getValidPos(pos) {
        return (pos + this._items.length) % this._items.length;
    }
    _moving(poses) {
        const last = this._movingPos || [];
        this._movingPos = poses;
        return last;
    }

    move(enter, r2l = true) {
        const leave = this.pos;
        this.pos = enter;
        const leaveItem = this._el.children[leave];
        const enterItem = this._el.children[enter];
        const lastMove = this._moving([leave, enter]);
        //render
        cssMove(leaveItem, `${(-leave) * 100}%`, `${((r2l ? -1 : 1) - leave) * 100}%`, lastMove.indexOf(leave) > -1);
        cssMove(enterItem, `${((r2l ? 1 : -1) - enter) * 100}%`, `${(-enter) * 100}%`, lastMove.indexOf(enter) > -1);
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

function cssMove(dom, from, to, continuous = false) {
    console.log('cssMove:', continuous);

    if (!continuous) {
        dom.classList.toggle('animate', false);
        dom.style.transform = `translateX(${from})`;
    }
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dom.classList.toggle('animate', true);
            dom.style.transform = `translateX(${to})`;
        });
    });
    //todo：考虑 continuous时 requestAnimationFrame调用导致  被拉开距离了
}

function cssUpdate(dom, pos) {
    dom.classList.toggle('animate', false);
    dom.style.transform = `translateX(${pos})`;
}

function log(...args) {
    console.log.apply(null, args);
}