class Carousel {
    constructor(container, data) {
       this._container = container;
       this._container.classList.add("carousel");
       this._handler = null;
       this._data = data;
    }

    render() {
        for (let d of this._data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
        }

        let children = Array.prototype.slice.call(this._container.children);
        let position = 0;
        let nextframe = () => {
            let nextposition = position + 1;
            nextposition = nextposition % children.length;
            let current = children[position];
            let next = children[nextposition];
            next.style.transition = "ease 0s"
            next.style.transform = `translate(${100 - 100 * nextposition}%)`;

            setTimeout(() => {
                current.style.transition = ""
                current.style.transform = `translate(${- 100 * position - 100}%)`;
    
                next.style.transition = ""
                next.style.transform = `translate(${- 100 * nextposition}%)`;

                position = nextposition;
            }, 16);
           
            setTimeout(nextframe, 2000);
        };
        // setTimeout(nextframe, 2000);

        enableGesture(this._container);

        let x = 0;
        this._container.addEventListener("pan", event => {
            for (let e of children) {
                e.style.transition ="ease 0s";
                e.style.transform = `translateX(${x + event.dx}px)`
            }
        });
        this._container.addEventListener("panend", event => {
            if (event.isVertical) {
                return;
            }
            if (event.isFilck) {
                if (event.dx > 0) {
                    position = position - 1;
                } else {
                    position = position + 1;
                }
            } else {
                position = - Math.round((x + event.dx) / 500);
            }
            
            position = Math.max(0, Math.min(children.length - 1, position));
            for (let e of children) {
                e.style.transition = "";
                e.style.transform = `translate(${- 100 * position}%)`
            }
            x = - 500 * position;
        });

        // let startX;
        // let startTransform;
        // let start = event => {
        //     event.preventDefault();
        //     startX = event.clientX;
        //     startTransform = - 500 * position;
        //     document.addEventListener("mousemove", move);
        //     document.addEventListener("mouseup", end);
        // };
        // let move = event => {
        //     event.preventDefault;
        //     for (let e of children) {
        //         e.style.transition ="ease 0s";
        //         e.style.transform = `translate(${startTransform + event.clientX - startX}px)`
        //     }
        // };
        // let end = event => {
        //     event.preventDefault;
        //     document.removeEventListener("mousemove", move);
        //     document.removeEventListener("mouseup", end);
        //     position = - Math.round((startTransform + event.clientX - startX) / 500);
        //     position = Math.max(0, Math.min(children.length - 1, position));
        //     for (let e of children) {
        //         e.style.transition = "";
        //         e.style.transform = `translate(${- 100 * position}%)`
        //     }
        // }
        // document.addEventListener("mousedown", start);
    }
}

let data = ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"];
new Carousel(document.getElementById("container"), data).render();
