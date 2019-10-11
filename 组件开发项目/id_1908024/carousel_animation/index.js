class Carousel {
    constructor(container) {
        this._container = container
        this.data = null
        this.setup()
    }

    setup() {
        this._handle = null
        this.children = null
        this.position = 0
        this.offsetTimeStart = 0
        this.tl = new Timeline()
    }

    autoPlay() {
        this._handle = setTimeout(() => this.nextPic(), 3000)
    }

    bindEvent() {
        enableGesture(this._container)

        this._container.addEventListener('mouseover', event => {
            clearTimeout(this._handle)
            this._handle = null
        })

        this._container.addEventListener('mouseout', event => {
            if (this._handle === null) {
                this.autoPlay()
            }
        })

        this._container.addEventListener('mousedown', event => {
            event.preventDefault()
        })

        // let offset = 0
        // this._container.addEventListener('mousedown', event => {
        //     //startTransform = - position * 500;
        //     tl.pause()

        //     let currentTime = Date.now()
        //     if (currentTime - offsetTimeStart < 1000) {
        //         offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500
        //         console.log(offset)
        //     } else {
        //         offset = 0
        //     }

        //     clearTimeout(nextPicTimer)
        // })

        this._container.addEventListener('panstart', event => {
            clearTimeout(this._handle)
            this._handle = null
        })

        let offset = 0

        this._container.addEventListener('pan', event => {
            event.preventDefault()
            log('event', event)
            let current = this.children[this.position]

            let nextPosition = (this.position + 1) % this.children.length
            let next = this.children[nextPosition]
            let lastPosition = (this.children.length + this.position - 1) % this.children.length
            let last = this.children[lastPosition]
            last.style.transition = 'ease 0s'
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`

            next.style.transition = 'ease 0s'
            next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`

            current.style.transition = 'ease 0s'
            current.style.transform = `translate(${-500 * this.position + event.dx + offset}px)`
        })

        // 结束滑动事件
        this._container.addEventListener('panend', event => {
            event.preventDefault()
            let isLeft
            if (event.isFlick) {
                if (event.vx > 0) {
                    this.position--
                    isLeft = true
                }

                if (event.vx < 0) {
                    this.position++
                    isLeft = false
                }
            } else {
                if (event.dx > 250) {
                    this.position--
                    isLeft = true
                } else if (event.dx < -250) {
                    this.position++
                    isLeft = false
                } else if (event.dx > 0) {
                    isLeft = false
                } else {
                    isLeft = true
                }
            }
            this.position = (this.children.length + this.position) % this.children.length

            let current = this.children[this.position]
            let nextPosition = (this.position + 1) % this.children.length
            let next = this.children[nextPosition]
            let lastPosition = (this.children.length + this.position - 1) % this.children.length
            let last = this.children[lastPosition]

            if (!isLeft) {
                last.style.transition = ''
            } else {
                last.style.transition = 'ease 0s'
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`

            if (isLeft) {
                next.style.transition = ''
            } else {
                next.style.transition = 'ease 0s'
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`

            current.style.transition = ''
            current.style.transform = `translate(${-500 * this.position}px)`
        })
    }

    nextPic() {
        let nextPosition = this.position + 1
        nextPosition = nextPosition % this.children.length
        let current = this.children[this.position]
        let nextImage = this.children[nextPosition]

        // 把Next 摆到下一张的位置
        nextImage.style.transition = 'ease 0s'
        nextImage.style.transform = `translateX(${100 - nextPosition * 100}%)`

        this.offsetTimeStart = Date.now()

        this.tl.clear()
        this.tl.addAnimation(
            new DOMElementStyleNumberAnimation({
                element: current,
                property: 'transform',
                startTime: 0,
                startValue: -500 * this.position,
                endTime: 1000,
                endValue: -500 - 500 * this.position,
                callback: v => `translateX(${v}px)`,
            }),
        )
        this.tl.addAnimation(
            new DOMElementStyleNumberAnimation({
                element: nextImage,
                property: 'transform',
                startTime: 0,
                startValue: 500 - 500 * nextPosition,
                endTime: 1000,
                endValue: -500 * nextPosition,
                callback: v => `translateX(${v}px)`,
            }),
        )
        this.tl.restart()
        this.position = nextPosition

        this._handle = setTimeout(() => this.nextPic(), 3000)
    }

    render() {
        for (let d of this.data) {
            let e = document.createElement('img')
            e.src = d
            this._container.appendChild(e)
        }
        this.children = Array.prototype.slice.call(this._container.children)

        this.autoPlay()

        this.bindEvent()
    }
}

const __main = () => {
    let data = [
        'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
        'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
        'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
        'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
    ]

    let carousel = new Carousel(document.querySelector('.carousel'))
    carousel.data = data
    carousel.render()
}

__main()
