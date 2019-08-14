class Carousel {
    constructor(container) {
        this._container = container;
        this._container.classList.add("carousel");
        this._handler = null;
        this.data = null;
        this.position = 0
    }

    autoPlay(children) {
        let nextFrame = () => {
            let nextPosition = this.position + 1;
            nextPosition = nextPosition % children.length;
            let current = children[this.position],
                next = children[nextPosition];
            //把next摆到正确的位置, 清除transition
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 -
                100 * nextPosition}%)`;

            setTimeout(() => {
                //把current挪出视口
                current.style.transition = ""; //transition置空，css中的属性就会生效
                current.style.transform = `translate(${-100 -
                    100 * this.position}%)`;
                //把next挪进视口
                next.style.transition = "";
                next.style.transform = `translate(${-100 * nextPosition}%)`;
                this.position = nextPosition;
            }, 16);
            this._handler = setTimeout(nextFrame, 3000);
        };

        setTimeout(nextFrame, 3000);
    }

    bindMouseEvent(children) {
        let startX;
        let startTransform;

        let start = event => {
            event.preventDefault();

            startX = event.clientX;
            startTransform = -this.position * 500;
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", end);
        };

        let move = event => {
            event.preventDefault();
            for (let child of children) {
                child.style.transition = "ease 0s";
                child.style.transform = `translate(${startTransform +
                    event.clientX -
                    startX}px)`;
            }
        };

        let end = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", end);

            this.position = -Math.round(
                (startTransform + event.clientX - startX) / 500
            );

            this.position = Math.max(0, Math.min(this.position, children.length - 1));

            for (let child of children) {
                child.style.transition = "";
                child.style.transform = `translate(${-this.position * 500}px)`;
            }
        };

        this._container.addEventListener("mousedown", start);
    }

    render() {
        for (let d of this.data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }

        let children = Array.prototype.slice.call(this._container.children);

        this.autoPlay(children)
        this.bindMouseEvent(children)
    }
}

const __main = () => {
    let data = [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
    ];

    let carousel = new Carousel(document.getElementById("container"));
    carousel.data = data;
    carousel.render();
}

__main()
