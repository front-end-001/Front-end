
const PROPERTY = Symbol("property")
const ATTRIBUTE = Symbol("attribute")
const EVENT = Symbol("event")
const STATE = Symbol("state")
const METHOD = Symbol("method")

class Carousel {
    constructor(element, config){
        this[PROPERTY] = Object.create(null)
        this[ATTRIBUTE] = Object.create(null)
        this[EVENT] = Object.create(null)
        this[STATE] = Object.create(null)
        this[METHOD] = Object.create(null)

        // property
        this.children = []
        this.width = config.width // 轮播宽度
        this.height = config.height // 轮播高度
        this.imgUrls = config.imgUrls // 图片地址
        this.position = 0

        // state
        this[STATE].startTransform = 0
        this[STATE].loop = config.loop || false // 是否可以循环
        this[STATE].autoplay = config.autoplay || false // 是否自动播放
        this[STATE].duration = config.duration || 3000 // 播放间隔
        this[STATE].autoplayTimer = null // 自动播放延时器

        // 监听处理手势
        this[METHOD].handleGesture = () => {
            this.root.addEventListener('mousedown', event => event.preventDefault());

            this.root.addEventListener('pan', event => {
                this.update()
                this.stop()
                console.log('pan')
                for (let child of this.children) {
                    child.style.transition = 'ease 0s'
                    child.style.transform = `translate(${this[STATE].startTransform + event.dx}px)`
                }
            })

            this.root.addEventListener('panend', event => {
                this.update()
                console.log('panend')
                this.position = - (Math.round((this[STATE].startTransform + event.dx) / this.width))

                this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

                for (let child of this.children) {
                    child.style.transition = 'ease 0.5s'
                    child.style.transform = `translate(${ - this.position * this.width}px)`
                }
                this[STATE].startTransform = - this.position * this.width;
            })

            this.root.addEventListener('flick', event => {
                this.update()
                this.stop()
                console.log('flick', event.dx)
                if (event.dx > 0) {
                    this.position = this.position - 1
                }
                if (event.dx < 0) {
                    this.position = this.position + 1
                }

                this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

                for (let child of this.children) {
                    child.style.transition = 'ease 0.5s'
                    child.style.transform = `translate(${ - this.position * this.width}px)`
                }
                this[STATE].startTransform = - this.position * this.width;
            })
        }

        // lifeCycle
        this.created()
        this.render()
        this.appendTo(element)
        this.mounted()

        if (this[STATE].autoplay) {
            this.play()
        }
    }
    /**
     * @property {number} width 轮播宽度
     */
    get width(){ return this[PROPERTY].width }
    set width(value){ return this[PROPERTY].width = value }

    /**
     * @property {number} height 轮播高度
     */
    get height(){ return this[PROPERTY].height }
    set height(value){ return this[PROPERTY].height = value }

    /**
     * @property {array} imgUrls 图片地址
     */
    get imgUrls(){ return this[PROPERTY].imgUrls }
    set imgUrls(value){ return this[PROPERTY].imgUrls = value }

    /**
     * @property {number} position 图片地址
     */
    get position(){return this[PROPERTY].position }
    set position(value){
        // let position = 0

        // if (this[STATE].loop) {
        //     position = this[PROPERTY].position = (value + this.children.length) % this.children.length
        // } else {
        //     position = this[PROPERTY].position = Math.max(0, Math.min(value, this.children.length - 1))
        // }
        // console.log('position', position)
        // return position;
        return this[PROPERTY].position = value
    }


    appendTo(element){
        element.appendChild(this.root)
    }

    created(){
        this.root = document.createElement("div")
        this.root.style = `
            white-space: nowrap;
            overflow: hidden;
            width: ${this.width}px;
            height: ${this.height}px;
            font-size: 0;
            outline: 1px solid blue;
        `
        // this.root.style.width = this.width + 'px'
        // this.root.style.height = this.height + 'px'
        this[STATE].h = 0
        this.root.style.backgroundColor = `hsl(${this[STATE].h}, 100%, 50%)`
    }
    mounted(){
        this.root.addEventListener("click", () => {
            this[STATE].h += 60
            this.root.style.backgroundColor = `hsl(${this[STATE].h}, 60%, 70%)`
        })
    }

    render() {
        this.root.innerHTML = ''

        for (let i = 0; i < this.imgUrls.length; i++ ) {
            const children = document.createElement('div')
            children.className = 'slide'
            children.style = `
                display: inline-block;
                transition: ease 0.5s;
            `

            const img = document.createElement('img')
            img.src = this.imgUrls[i]
            img.style = `
                display: block;
                width: 100%;
                height: 100%;
            `

            children.appendChild(img)
            this.root.appendChild(children)
        }

        this.children = Array.prototype.slice.call(this.root.children)

        enableGesture(this.root)
        this[METHOD].handleGesture()
    }

    update(){
        console.log('update')
    }

    unmounted(){

    }

    next() {
        console.log('next')
        this.stop()

        this.position = this.position + 1

        this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

        for (let child of this.children) {
            child.style.transition = 'ease 0.5s'
            child.style.transform = `translate(${ - this.position * this.width}px)`
        }
        this[STATE].startTransform = - this.position * this.width;
    }
    prev() {
        console.log('prev')
        this.stop()

        this.position = this.position - 1

        this.position = Math.max(0, Math.min(this.position, this.children.length - 1))

        for (let child of this.children) {
            child.style.transition = 'ease 0.5s'
            child.style.transform = `translate(${ - this.position * this.width}px)`
        }
        this[STATE].startTransform = - this.position * this.width;
    }

    play() {
        this[STATE].autoplayTimer = setTimeout(() => {
            this.next()
            this.play()
        }, this[STATE].duration);
    }

    stop() {
        if (this[STATE].autoplayTimer) {
            clearTimeout(this[STATE].autoplayTimer)
            this[STATE].autoplayTimer = null
        }
    }


    log(){
        console.log("width:", this.width)
    }

    getAttribute(name){
        return this[ATTRIBUTE][name]
    }

    setAttribute(name, value){
        if(name == "width") {
            this.width = value
            this.triggerEvent("widthchange")
        }
        return this[ATTRIBUTE][name] = value
    }

    addEventListener(type, listener){
        if(!this[EVENT][type])
            this[EVENT][type] = new Set
        this[EVENT][type].add(listener)
    }

    removeEventListener(type, listener){
        if(!this[EVENT][type])
            return
        this[EVENT][type].delete(listener)
    }

    triggerEvent(type){
        for(let event of this[EVENT][type])
            event.call(this)
    }
}