class Carousel {
    constructor(container, data) {
       this._container = container;
       this._container.classList.add("carousel");
       this._handler = null;
       this._data = data;
    }

    render() {
        let i = this._data.length;
        for (let d of this._data) {
            let e = document.createElement("img");
            e.src = d;
            this._container.appendChild(e);
            e.style.zIndex = i++;
        }
        var tl = new Timeline;
        let children = Array.prototype.slice.call(this._container.children);
        let position = 0;
        let offsetTimeStart = 0
        let nextPic = ()=>{
            let nextPosition = position + 1;

            nextPosition = nextPosition % children.length;

            let current = children[position],
                next = children[nextPosition];
            
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`

            offsetTimeStart = Date.now();

            tl.addAnimation(new DomElementStyleNumberAnimation(
                current,
                "transform",
                0, - 500 * position,
                1000, - 500 - 500 * position,
                (v) => `translateX(${v}px)`
            ));
            tl.addAnimation(new DomElementStyleNumberAnimation(
                next,
                "transform",
                0, 500 - 500 * nextPosition,
                1000, - 500 * nextPosition,
                (v) => `translateX(${v}px)`
            ));
            tl.restart();

            position = nextPosition;

            nextPicTimer = setTimeout(nextPic, 3000);
        }
        let nextPicTimer = setTimeout(nextPic,3000);

        let offset = 0;
        this._container.addEventListener("mousedown", event => {
            //startTransform = - position * 500;
            tl.pause();

            let currentTime = Date.now();
            if(currentTime - offsetTimeStart < 1000) {
                offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(nextPicTimer);
        });
        this._container.addEventListener("pan", event => {
            // event.origin.preventDefault();
            event.preventDefault();
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition  + event.dx + offset}px)`

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${- 500 * position + event.dx + offset}px)`
        });
        this._container.addEventListener("panend", event => {
            // event.origin.preventDefault();
            event.preventDefault();
            let isLeft;
            if(event.isFlick) {
                if(event.vx > 0) {
                    position --;
                    isLeft = true;
                }

                if(event.vx < 0) {
                    position ++;
                    isLeft = false;
                }

            } else {
                if(event.dx > 250) {
                    position --
                    isLeft = true;
                } else if(event.dx < -250) {
                    position ++
                    isLeft = false;
                } else if(event.dx > 0) {
                    isLeft = false;
                } else {
                    isLeft = true;
                }

                //position = (Math.round((position * 500 - event.dx) / 500));
            }
            position = (children.length + position) % children.length;

            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];

            if(!isLeft){
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`

            if(isLeft){
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`

            current.style.transition = "";
            current.style.transform = `translate(${- 500 * position}px)`

        });

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
    }
}

let data = ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"];
new Carousel(document.getElementById("container"), data).render();
