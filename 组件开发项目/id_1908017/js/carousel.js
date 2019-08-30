class Carousel {
    constructor({ el, items }) {
        this._el = el;
        this._items = items;
        this.initDom();
        this.pos = 0;
        enableGesture(el);
        // this.autoMove();
        // this.enableAutoMoveStop();
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
            this.move(this.pos, nextPos);
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
        el.addEventListener('pan', e => {
            // console.log('pan', e.dx);
            this.update(e.dx);
        });

        //flick 左滑右滑
        el.addEventListener('panend', e => {
            if (e.isFlick) {
                const r2l = e.dx < 0;
                this.move(this.pos, this.getValidPos(this.pos + (r2l ? 1 : -1)), r2l);
            } else {
                const floatPos = this._getFloatPos(e.dx);
                const aroundPos = Math.round(this._getFloatPos(e.dx));
                const r2l = aroundPos > floatPos;
                this.move(this.getValidPos(aroundPos + (r2l ? -1 : 1)), this.getValidPos(aroundPos), r2l);
            }
            // //todo 配合 手势 一开始就是高速
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
        for (const lastPos of last) {
            this._el.children[lastPos].style.visibility = 'hidden';
        }
        for (const nPos of poses) {
            this._el.children[nPos].style.visibility = '';
        }
        console.log('hide', last, 'show', poses);
        return last;
    }
    _getFloatPos(dx) {
        const containerWidth = this._el.offsetWidth;
        const floatPos = this.pos - dx / containerWidth;
        return floatPos;
    }
    update(dx) {
        const floatPos = this._getFloatPos(dx);
        const dotPos = floatPos - Math.floor(floatPos);
        const leftPos = this.getValidPos(Math.floor(floatPos));
        const rightPos = this.getValidPos(Math.ceil(floatPos));
        console.log('floatPos:', floatPos, leftPos, rightPos);
        const leftItem = this._el.children[leftPos];
        this._moving([leftPos, rightPos]);
        cssUpdate(leftItem, `${(-dotPos - leftPos) * 100}%`);
        if (rightPos !== leftPos) {
            const rightItem = this._el.children[rightPos];
            cssUpdate(rightItem, `${(1 - dotPos - rightPos) * 100}%`);
            //todo 考虑 移走之前的
        }
    }

    move(leave, enter, r2l = true) {
        console.log('leave,enter', leave, enter, r2l);
        const leaveItem = this._el.children[leave];
        const enterItem = this._el.children[enter];
        this.pos = enter;
        const lastMove = this._moving([leave, enter]);
        //render
        cssMove(leaveItem, `${(-leave) * 100}%`, `${((r2l ? -1 : 1) - leave) * 100}%`, lastMove.indexOf(leave) > -1);
        cssMove(enterItem, `${((r2l ? 1 : -1) - enter) * 100}%`, `${(-enter) * 100}%`, lastMove.indexOf(enter) > -1);
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