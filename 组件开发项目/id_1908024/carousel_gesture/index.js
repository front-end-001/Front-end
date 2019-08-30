class Carousel {
    constructor(container) {
        this._container = container;
        this.data = null;
        this.setup();
    }

    setup() {
        this._handle = null;
        this.children = null;
        this.position = 0;
    }

    render() {
        for (let d of this.data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }
        this.children = Array.prototype.slice.call(this._container.children);

        this.autoPlay();

        this.bindEvent();
    }

    autoPlay() {
        this._handle = setTimeout(() => this.nextFrame(), 3000);
    }

    bindEvent() {
        enableGesture(this._container);

        this._container.addEventListener("mouseover", event => {
            clearTimeout(this._handle);
            this._handle = null;
        });

        this._container.addEventListener("mouseout", event => {
            if (this._handle === null) {
                this.autoPlay();
            }
        });

        this._container.addEventListener("mousedown", event => {
            event.preventDefault();
        });

        let startTransform;

        this._container.addEventListener("panstart", event => {
            clearTimeout(this._handle);
            this._handle = null;
        });

        this._container.addEventListener("pan", event => {
            startTransform = -500 * this.position;

            for (let child of this.children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translate(${startTransform +
                    event.dx}px)`;
            }
        });

        // 结束滑动事件
        this._container.addEventListener("panend", event => {
            if (event.isVertical) return;

            if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
                if (event.dx > 0) {
                    this.position = this.position - 1;
                }
                if (event.dx < 0) {
                    this.position = this.position + 1;
                }
            } else {
                this.position = -Math.round((startTransform + event.dx) / 500);
            }

            // 给position设置边界
            this.position = Math.max(
                0,
                Math.min(this.position, this.children.length - 1)
            );

            for (let child of this.children) {
                child.style.transition = "";
                child.style.transform = `translate(${-500 * this.position}px)`;
            }

            this.autoPlay();
        });
    }

    nextFrame() {
        let nextPosition = this.position + 1;
        nextPosition = nextPosition % this.children.length;
        let current = this.children[this.position];
        let nextImage = this.children[nextPosition];

        // 把Next 摆到下一张的位置
        nextImage.style.transition = "ease 0s";
        nextImage.style.transform = `translate(${100 - nextPosition * 100}%)`;

        setTimeout(() => {
            // 下一帧开始移动
            // 拿出当前图, 转移出去
            current.style.transition = "";
            current.style.transform = `translate(${-100 -
                100 * this.position}%)`;
            //  拿到下一张图， 转移进入
            // log("nextImage", nextImage, nextPosition);
            nextImage.style.transition = "";
            nextImage.style.transform = `translate(${-100 * nextPosition}%)`;

            this.position = nextPosition;
        }, 16);

        this._handle = setTimeout(() => this.nextFrame(), 3000);
    }
}

const __main = () => {
    let data = [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
    ];

    let carousel = new Carousel(document.querySelector(".carousel"));
    carousel.data = data;
    carousel.render();
};

__main();
